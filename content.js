(function() {
    let links = document.querySelectorAll("a");
    links.forEach(link => {
        let url = link.href;
        if (!url.startsWith("http")) return;

        chrome.runtime.sendMessage({ action: "checkLink", url: url }, response => {
            if (response && response.status) {
                let symbol;
                if (response.status === 403 || response.status === 503) {
                    symbol = " 🔒"; // Cloudflare challenge
                } else {
                    symbol = response.status >= 200 && response.status < 400 ? " ✅" : " ❌";
                }
                link.insertAdjacentText("afterend", symbol);
            } else {
                link.insertAdjacentText("afterend", " ❌");
            }
        });
    });
})();
