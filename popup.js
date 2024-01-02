chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'showNotification') {
      // Hiển thị thông báo trên popup
      alert('The content is benign.');
    }
  });
