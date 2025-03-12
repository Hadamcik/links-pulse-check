document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("sessionLinks");
    let clearButton = document.getElementById("clearSession");

    chrome.runtime.sendMessage({ action: "getSession" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving session data:", chrome.runtime.lastError);
            container.innerHTML = "<p>Error loading data. Please try again.</p>";
            return;
        }

        if (response && response.sessionLinks && typeof response.sessionLinks === "object" && Object.keys(response.sessionLinks).length > 0) {
            Object.entries(response.sessionLinks).forEach(([sourceUrl, links]) => {
                if (!Array.isArray(links)) return;

                let sourceDiv = document.createElement("div");
                sourceDiv.innerHTML = `<h2><a href="${sourceUrl}" target="_blank">${sourceUrl}</a></h2>`;

                let deadLinks = links.filter(link => link.type === "dead");
                let lockedLinks = links.filter(link => link.type === "locked");

                if (deadLinks.length > 0) {
                    let deadSection = document.createElement("div");
                    deadSection.innerHTML = "<h5>Broken Links:</h5>";
                    deadLinks.forEach(link => {
                        let item = document.createElement("div");
                        item.innerHTML = `<a href="${link.targetUrl}" target="_blank">${link.targetUrl}</a>`;
                        deadSection.appendChild(item);
                    });
                    sourceDiv.appendChild(deadSection);
                }

                if (lockedLinks.length > 0) {
                    let lockedSection = document.createElement("div");
                    lockedSection.innerHTML = "<h5>Locked Links:</h5>";
                    lockedLinks.forEach(link => {
                        let item = document.createElement("div");
                        item.innerHTML = `<a href="${link.targetUrl}" target="_blank">${link.targetUrl}</a>`;
                        lockedSection.appendChild(item);
                    });
                    sourceDiv.appendChild(lockedSection);
                }
                sourceDiv.appendChild(document.createElement("hr"));

                container.appendChild(sourceDiv);
            });
        } else {
            container.innerHTML = "<p>No broken or locked links found in this session.</p>";
        }
    });

    clearButton.addEventListener("click", function() {
        chrome.runtime.sendMessage({ action: "clearSession" }, (response) => {
            if (response.success) {
                container.innerHTML = "<p>Session data cleared.</p>";
            }
        });
    });
});
