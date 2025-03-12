chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkLink") {
        fetch(message.url, { method: "HEAD" })
            .then(response => sendResponse({ status: response.status }))
            .catch(() => sendResponse({ status: 0 }));
        return true;
    } else if (message.action === "storeSession") {
        chrome.storage.session.get({ sessionLinks: {} }, (data) => {
            let sessionLinks = data.sessionLinks || {};
            if (!sessionLinks[message.sourceUrl]) {
                sessionLinks[message.sourceUrl] = [];
            }

            // Check if the link already exists
            if (!sessionLinks[message.sourceUrl].some(link => link.targetUrl === message.targetUrl)) {
                sessionLinks[message.sourceUrl].push({ targetUrl: message.targetUrl, type: message.type });
                chrome.storage.session.set({ sessionLinks });
            }
        });
    } else if (message.action === "getSession") {
        chrome.storage.session.get({ sessionLinks: {} }, (data) => {
            sendResponse({ sessionLinks: data.sessionLinks || {} });
        });
        return true;
    } else if (message.action === "clearSession") {
        chrome.storage.session.clear(() => {
            sendResponse({ success: true });
        });
        return true;
    }
});
