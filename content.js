

console.log('Content script is running');

let buttonClicked = false; // Biến để theo dõi xem nút đã được nhấn hay chưa

// Kiểm tra sự tồn tại của phần tử mỗi 1 giây
let checkExist = setInterval(function() {
   let adElement = document.querySelector('.ytp-ad-text');
   if (adElement && !buttonClicked) { // Chỉ nhấn nút nếu quảng cáo xuất hiện và nút chưa được nhấn
      let muteButton = document.querySelector('.ytp-mute-button.ytp-button');
      if (muteButton) {
          
          console.log("Adds detected and sound muted");
          buttonClicked = true; // Cập nhật trạng thái của nút
      }
      // Gửi tin nhắn đến background.js
      chrome.runtime.sendMessage({message: "ad_detected"});
   }
   
   if(buttonClicked){
	   let skipAddsElement = document.querySelector('.ytp-ad-skip-button.ytp-button');
	   if(skipAddsElement){
		  skipAddsElement.click();
		  let muteButton = document.querySelector('.ytp-mute-button.ytp-button');
		   muteButton.click();
		   console.log("Skiped adds and unmute");
		   // Gửi tin nhắn đến background.js
			chrome.runtime.sendMessage({message: "ad_skipped"});
		   buttonClicked = false;
	   }
   }
}, 1000); // Kiểm tra mỗi 1000ms (1 giây)
