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
        addExist = false;
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
        skipAddsButtonElementClassName.forEach(element => {
            let skipAddsElement = document.querySelector(element);
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
        });

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
<button class="ytp-ad-skip-button-modern ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:31" style="">Skip</div><span class="ytp-ad-skip-button-icon-modern"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>
-----
<button class="ytp-skip-ad-button" id="skip-button:5e" style="opacity: 0.5;"><div class="ytp-skip-ad-button__text">Skip</div><span class="ytp-skip-ad-button__icon"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>
*/
const skipAddsButtonElementClassName = ['.ytp-ad-skip-button.ytp-button', '.ytp-ad-skip-button-modern.ytp-button', '.ytp-skip-ad-button'];


