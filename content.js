(function() {
    let links = document.querySelectorAll("a");
    links.forEach(link => {
        let url = link.href;
        if (!url.startsWith("http")) return;

        chrome.runtime.sendMessage({ action: "checkLink", url: url }, response => {
            if (response && response.status) {
                if (response.status === 403 || response.status === 503) {
                  markLinkAsLocked(link);
                } 
                else if (response.status >= 200 && response.status < 400) {
                  markLinkAsOk(link);
                }
                else {
                  markLinkAsDead(link);
                }
            } else {
                markLinkAsDead(link);
            }
        });
    });
})();

function markLinkAsLocked(link) {
  link.insertAdjacentText("afterend", " 🔒");
  link.style.border = "5px solid blue";
  link.style.padding = "5px";
}
function markLinkAsDead(link) {
  link.insertAdjacentText("afterend", " ❌");
  link.style.border = "5px solid red";
  link.style.padding = "5px";
}
function markLinkAsOk(link) {
  link.insertAdjacentText("afterend", " ✅");
}
