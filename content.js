(function () {
    let links = document.querySelectorAll("a");
    let sessionLinks = [];

    links.forEach(link => {
        let url = link.href;
        if (!url.startsWith("http")) return;

        chrome.runtime.sendMessage({action: "checkLink", url: url}, response => {
            if (response && response.status) {
                if (response.status === 403 || response.status === 503) {
                    markLinkAsLocked(link, url);
                } else if (response.status >= 200 && response.status < 400) {
                    markLinkAsOk(link);
                } else {
                    markLinkAsDead(link, url);
                }
            } else {
                markLinkAsDead(link, url);
            }
        });
    });

    function markLinkAsLocked(link, url) {
        link.insertAdjacentText("afterend", " 🔒");
        addBorderToLink(link, "blue");
        storeSessionLink(url, document.location.href, "locked");
    }

    function markLinkAsDead(link, url) {
        link.insertAdjacentText("afterend", " ❌");
        addBorderToLink(link, "red");
        storeSessionLink(url, document.location.href, "dead");
    }

    function markLinkAsOk(link) {
        link.insertAdjacentText("afterend", " ✅");
    }

    function addBorderToLink(link, color) {
        link.style.border = "3px solid " + color;
        link.style.padding = "1px";
    }

    function storeSessionLink(targetUrl, sourceUrl, type) {
        chrome.runtime.sendMessage({action: "storeSession", targetUrl, sourceUrl, type});
    }
})();
