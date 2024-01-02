const protocol = window.location.protocol;
const inputUrl = protocol + "//" + window.location.hostname;
const apiUrl = `http://127.0.0.1:9999/detect?URL=${inputUrl}`;

console.log("URL: ", apiUrl);

chrome.omnibox.onInputEntered.addListener((text) => {
  console.log("okla");
  // Encode user input for special characters , / ? : @ & = + $ #
  const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});

window.addEventListener("message", function (event) {
  const message = event.data;
  if (message.action === "closeTab") {
    window.close(); // Đóng tab hiện tại
  }
});



// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }
//     return response.text();
//   })
//   .then(data => {
//     console.log("data", data); // Xử lý dữ liệu trả về ở đây
//     if (data === 'benign') {
//       // Hiển thị thông báo khi trang được xác định là an toàn
//       alert('Trang web này an toàn!');
//     } else if (data === 'defacement' || data === 'phising') {
//       // Hiển thị thông báo và chặn truy cập nếu trang được xác định là độc hại
//       alert('Trang web này có thể độc hại và đã bị chặn!');
//       // Chuyển hướng người dùng đến trang cảnh báo hoặc an toàn khác nếu cần
//       window.location.href = 'https://chongluadao.vn';
//     } else {
//       // Xử lý trường hợp khác nếu cần thiết
//     }
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
