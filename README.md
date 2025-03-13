# Link Checker Chrome Extension

A Chrome extension that helps you identify dead and locked links on web pages in real time. The extension also provides a popup interface to view and manage sessions of identified broken and locked links.

---

## Features
- **Real-Time Analysis**: Marks links on a webpage as ✅ (healthy), ❌ (dead), or 🔒 (locked).
- **Session History**: Collects and displays broken/locked links for easy access later.
- **Clear Session Data**: Easily clear session data via the popup interface.

---

## Installation Instructions

### 1. Clone or Download the Project
First, clone or download the source code for this project to your local machine.

```bash
git clone https://github.com/your-repository-here.git
```

Alternatively, download the ZIP file and extract it.

---

### 2. Enable Developer Mode in Chrome
1. Open Google Chrome.
2. Navigate to the Extensions page:
   - Open a new tab and go to: `chrome://extensions`
   - Alternatively, click the three-dot menu in the top-right corner → Hover over **More Tools** → Click **Extensions**.
3. Enable **Developer Mode** using the toggle in the top-right corner.

---

### 3. Load the Unpacked Extension
1. Click the **Load unpacked** button on the Extensions page.
2. In the file selection dialog, locate and select the root folder of this project (where `manifest.json` is located).

---

### 4. Test the Extension
- Open a webpage with links.
- The extension will highlight dead (`❌`), locked (`🔒`), and healthy (`✅`) links on the page.
- Click on the extension icon in the Chrome toolbar to open the popup interface and view session data.

---

## How It Works
### **Background Script**
The `background.js` file listens for messages from the content script and handles the following:
1. Checks the status of URLs by making `HEAD` requests.
2. Manages session storage using Chrome's `chrome.storage.session` to log broken and locked links.
3. Clears session data when required.

---

### **Content Script**
The `content.js` file is injected into web pages and:
1. Iterates over all `<a>` elements (`links`) on a page.
2. Sends each link URL to the background script for validation.
3. Highlights links on the DOM:
   - `✅` Healthy links are marked with a checkmark.
   - `❌` Dead links are marked with an "X" and a red border.
   - `🔒` Locked links are marked with a lock icon and a blue border.

---

### **Popup Interface**
The `popup.html` and `popup.js` files handle:
1. Displaying session data that categorizes broken/locked links by their source URL.
2. Clearing session data based on user interaction.

---

## Development and Contribution
Interested in contributing? Follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add a new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).

---