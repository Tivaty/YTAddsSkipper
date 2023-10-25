let appName = "YT_Adds_Skipper: ";
let interval = 500;

console.log(appName + 'Content script is running');

let muteButtonClicked = false; // Biến để theo dõi xem nút đã được nhấn hay chưa
let addExist = false;

// Kiểm tra sự tồn tại của phần tử
let checkExist = setInterval(function () {
    let adElement = document.querySelector(adElementClassName);
    if (adElement) {
        if (!addExist) {
            addExist = true;
            console.log(appName + "Adds detected");
            // Gửi tin nhắn đến background.js

            let muteButton = document.querySelector(muteButtonElementClassName);
            if (muteButton && muteButton.title === muteButtonElementTitle) {
                muteButton.click();
                console.log(appName + "Muted sound");
                muteButtonClicked = true; // Cập nhật trạng thái của nút
            } else {
                console.log(appName + "Can not find \"Muted sound\"");
            }


            try {
                chrome.runtime.sendMessage({ message: "ad_detected" });
            } catch {

            }
        }
    } else {
        addExist = true;
        if (muteButtonClicked) {
            let unmuteButton = document.querySelector(unmuteButtonElementClassName);
            if (unmuteButton && unmuteButton.title === unmuteButtonElementTitle) {
                unmuteButton.click();
                console.log(appName + "Unmuted sound");
            } else {
                console.log(appName + "Can not find \"Unmuted sound\"");
            }
            muteButtonClicked = false;
        }
    }

    if (addExist) {
        let skipAddsElement = document.querySelector(skipAddsButtonElementClassName);
        if (skipAddsElement) {
            skipAddsElement.click();
            addExist = false;
            console.log(appName + "Skiped adds");
            try {
                // Gửi tin nhắn đến background.js
                chrome.runtime.sendMessage({ message: "ad_skipped" });
            } catch {

            }
        }
    }

}, interval);


/******************************************************************************* */

/*
--------Adds infor element----------
<div class="ytp-ad-player-overlay-instream-info">
<span class="ytp-ad-simple-ad-badge" id="simple-ad-badge:fy" style="">
<div class="ytp-ad-text" id="simple-ad-badge:fz" style="">Sponsored 1 of 2 ·</div>
</span>
-----
<span class="ytp-ad-simple-ad-badge" id="simple-ad-badge:u" style="">
    <div class="ytp-ad-text" id="simple-ad-badge:v" style="">Sponsored ·
</div></span>
-----------------------
*/
const adElementClassName = '.ytp-ad-simple-ad-badge';
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


