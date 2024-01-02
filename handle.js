document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    const continueButton = document.getElementById("continueButton");
  
    backButton.addEventListener("click", function () {
      console.log("Back button clicked");
      navigator.serviceWorker.controller.postMessage({ action: "goBack" });
    });
  
    continueButton.addEventListener("click", function () {
      console.log("Continue button clicked");
      navigator.serviceWorker.controller.postMessage({ action: "continue" });
    });
    navigator.serviceWorker.addEventListener('message', function(event) {
        const message = event.data;
        if (message.action === "closeTab") {
          window.close(); // Đóng tab
        }
      });

  });
  