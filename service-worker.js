
chrome.omnibox.onInputStarted.addListener(function () {
  appendLog('💬 onInputStarted');

  chrome.omnibox.setDefaultSuggestion({
    description:
      "Here is a default <match>suggestion</match>. <url>It's <match>url</match> here</url>"
  });
});

chrome.omnibox.onInputEntered.addListener((text) => {
  const inputUrl = encodeURIComponent(text);
  const apiUrl = `http://127.0.0.1:9999/detect?URL=${inputUrl}`;

  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
    if (data === 'benign') {
      chrome.tabs.create({ url: text });
    } else if (data === 'defacement' || data === 'phising') {
      chrome.tabs.create({ url: 'hello.html' });

    } else {
     
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  
  
});

