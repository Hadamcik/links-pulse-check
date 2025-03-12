chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkLink") {
        fetch(message.url, {
            method: "HEAD",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                "Referer": "https://www.google.com/",
                "Accept-Language": "en-US,en;q=0.9"
            }
        })
        .then(response => sendResponse({ status: response.status }))
        .catch(() => sendResponse({ status: 0 }));
        return true;
    }
});
