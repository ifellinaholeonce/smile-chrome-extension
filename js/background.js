chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
    if (msg.value) {
      chrome.browserAction.setIcon({ path: "smilefullico.png", tabId: sender.tab.id });
    } else {
      chrome.browserAction.setIcon({ path: "nosmileico.png", tabId: sender.tab.id });
    }
  }
});

