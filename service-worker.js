chrome.omnibox.onInputStarted.addListener(function () {
  chrome.omnibox.setDefaultSuggestion({
    description:
      "Here is a default <match>suggestion</match>. <url>It's <match>url</match> here</url>",
  });
});

chrome.omnibox.onInputEntered.addListener((text) => {
  const URL = text;
  const inputUrl = encodeURIComponent(text);
  const apiUrl = `http://127.0.0.1:9999/detect?URL=${inputUrl}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.text();
    })
    .then((data) => {
      console.log("data: ", data);
      if (data === "benign") {
        console.log("url: ", URL);
        chrome.tabs.create({ url: URL });
      } else if (data === "defacement") {
        console.log("come here: ", data);
        chrome.storage.local.set({ originalURL: text }, function () {
          chrome.tabs.create({ url: "warning.html" });
        });
      }
      else if (data === "phishing") {
        console.log("come here: ", data);
        chrome.storage.local.set({ originalURL: text }, function () {
          chrome.tabs.create({ url: "warning.html" });
        });
      }
      else if (data === "malware") {
        console.log("come here: ", data);
        chrome.storage.local.set({ originalURL: text }, function () {
          chrome.tabs.create({ url: "warning.html" });
        });
      }

    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Trong service-worker.js
self.addEventListener("message", function (event) {
  const message = event.data;
  if (message.action === "goBack") {
    clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ action: "closeTab" });
      });
    });
  } else if (message.action === "continue") {
    // Thực hiện hành động mở URL trong extension
    // Ví dụ: mở URL đã lưu trong chrome.storage.local
    chrome.storage.local.get(["originalURL"], function (result) {
      const originalURL = result.originalURL;
      if (originalURL) {
        chrome.tabs.create({ url: originalURL });
      }
    });
  }
});
