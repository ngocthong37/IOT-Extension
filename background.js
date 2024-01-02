chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "goBack") {
      history.back();
    } else if (message.action === "continue") {
      console.log("Vao toi day");
      chrome.storage.local.get(["originalURL"], function (result) {
        const originalURL = result.originalURL;
        if (originalURL) {
          chrome.tabs.create({ url: originalURL });
        }
      });
    }
  });