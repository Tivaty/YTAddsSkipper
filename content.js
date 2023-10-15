let appName = "YT_Adds_Skipper: ";
let interval = 500;

console.log(appName + 'Content script is running');

let buttonClicked = false; // Biến để theo dõi xem nút đã được nhấn hay chưa

// Kiểm tra sự tồn tại của phần tử mỗi 1 giây
let checkExist = setInterval(function() {
   let adElement = document.querySelector(adElementClassName);
   if (adElement && !buttonClicked) { // Chỉ nhấn nút nếu quảng cáo xuất hiện và nút chưa được nhấn
      let muteButton = document.querySelector(muteButtonElementClassName);
      if (muteButton && muteButton.title === muteButtonElementTitle){
          muteButton.click();
          console.log(appName + "Adds detected and sound muted");
          buttonClicked = true; // Cập nhật trạng thái của nút
      }
      // Gửi tin nhắn đến background.js
      chrome.runtime.sendMessage({message: "ad_detected"});
   }
   
   if(buttonClicked){
	   let skipAddsElement = document.querySelector(skipAddsButtonElementClassName);
	   if(skipAddsElement){
		  skipAddsElement.click();
        console.log(appName + "Skiped adds");
		  let unmuteButton = document.querySelector(unmuteButtonElementClassName);
        if(unmuteButton && unmuteButton.title === unmuteButtonElementTitle){
            unmuteButton.click();
            console.log(appName + "Unmute");
        }
		   // Gửi tin nhắn đến background.js
			chrome.runtime.sendMessage({message: "ad_skipped"});
		   buttonClicked = false;
	   }
   }
}, interval); // Kiểm tra mỗi 1000ms (1 giây)


/******************************************************************************* */


/*
--------Adds infor element----------
<div class="ytp-ad-player-overlay-instream-info">
<span class="ytp-ad-simple-ad-badge" id="simple-ad-badge:fy" style="">
<div class="ytp-ad-text" id="simple-ad-badge:fz" style="">Sponsored 1 of 2 ·</div>
</span>
-----------------------
*/
const adElementClassName = '.ytp-ad-text';
/*
--------mute-button element----------
<button class="ytp-mute-button ytp-button" aria-keyshortcuts="m" data-title-no-tooltip="Mute" aria-label="Mute keyboard shortcut m" title="Mute (m)">
</button>
-----------------------
*/
const muteButtonElementClassName = '.ytp-mute-button.ytp-button';
const muteButtonElementTitle = 'Mute (m)';
/*
--------Unmute-button element----------
<button class="ytp-mute-button ytp-button" aria-keyshortcuts="m" title="Unmute (m)" data-title-no-tooltip="Unmute"></button>
-----------------------
*/

const unmuteButtonElementClassName = '.ytp-mute-button.ytp-button';
const unmuteButtonElementTitle = 'Unmute (m)';

/*
--------SkipAdds-button element----------
<button class="ytp-ad-skip-button ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text" id="ad-text:6" style="">Skip Ads
-----------------------
*/
const skipAddsButtonElementClassName = '.ytp-ad-skip-button.ytp-button';