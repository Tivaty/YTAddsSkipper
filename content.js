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

            muteButtonElementClassName.forEach(element => {
                let muteButton = document.querySelector(element);
                if (muteButton && muteButtonElementTitle.includes(muteButton.title)) {
                    muteButton.click();
                    console.log(appName + "Muted sound");
                    muteButtonClicked = true; // Cập nhật trạng thái của nút
                }
            });

            if (muteButtonClicked == false) {
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
            unmuteButtonElementClassName.forEach(element => {
                let unmuteButton = document.querySelector(element);
                if (unmuteButton && unmuteButtonElementTitle.includes(unmuteButton.title)) {
                    unmuteButton.click();
                    console.log(appName + "Unmuted sound");
                    muteButtonClicked = false;
                }
            });
            if (muteButtonClicked == true)
                console.log(appName + "Can not find Unmuted button");
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
-----
<tp-yt-paper-icon-button class="volume style-scope ytmusic-player-bar" title="Mute" aria-label="Mute" role="button" tabindex="0" style-target="host" aria-disabled="false" aria-pressed="false"><!--css-build:shady--><tp-yt-iron-icon id="icon" class="style-scope tp-yt-paper-icon-button"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M17.5,12c0,2.14-1.5,3.92-3.5,4.38v-1.04c1.44-0.43,2.5-1.76,2.5-3.34c0-1.58-1.06-2.9-2.5-3.34V7.62 C16,8.08,17.5,9.86,17.5,12z M12,4.07v15.86L6.16,15H3V9h3.16L12,4.07z M11,6.22L6.52,10H4v4h2.52L11,17.78V6.22z M21,12 c0,4.08-3.05,7.44-7,7.93v-1.01c3.39-0.49,6-3.4,6-6.92s-2.61-6.43-6-6.92V4.07C17.95,4.56,21,7.92,21,12z" class="style-scope tp-yt-iron-icon"></path></g></svg><!--css-build:shady-->
</tp-yt-iron-icon></tp-yt-paper-icon-button>

-----------------------
*/
const muteButtonElementClassName = ['.ytp-mute-button.ytp-button', '.volume style-scope.ytmusic-player-bar'];
const muteButtonElementTitle = ['Mute (m)', 'Mute'];
/*
--------Unmute-button element----------
<button class="ytp-mute-button ytp-button" aria-keyshortcuts="m" title="Unmute (m)" data-title-no-tooltip="Unmute"></button>
-----------------------
<tp-yt-paper-icon-button class="volume style-scope ytmusic-player-bar" title="Mute" aria-label="Mute" role="button" tabindex="0" style-target="host" aria-disabled="false" aria-pressed="true"><!--css-build:shady--><tp-yt-iron-icon id="icon" class="style-scope tp-yt-paper-icon-button"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M3.15,3.85l4.17,4.17L6.16,9H3v6h3.16L12,19.93v-7.22l2.45,2.45c-0.15,0.07-0.3,0.13-0.45,0.18v1.04 c0.43-0.1,0.83-0.27,1.2-0.48l1.81,1.81c-0.88,0.62-1.9,1.04-3.01,1.2v1.01c1.39-0.17,2.66-0.71,3.73-1.49l2.42,2.42l0.71-0.71 l-17-17L3.15,3.85z M11,11.71v6.07L6.52,14H4v-4h2.52l1.5-1.27L11,11.71z M10.33,6.79L9.62,6.08L12,4.07v4.39l-1-1V6.22L10.33,6.79 z M14,8.66V7.62c2,0.46,3.5,2.24,3.5,4.38c0,0.58-0.13,1.13-0.33,1.64l-0.79-0.79c0.07-0.27,0.12-0.55,0.12-0.85 C16.5,10.42,15.44,9.1,14,8.66z M14,5.08V4.07c3.95,0.49,7,3.85,7,7.93c0,1.56-0.46,3.01-1.23,4.24l-0.73-0.73 C19.65,14.48,20,13.28,20,12C20,8.48,17.39,5.57,14,5.08z" class="style-scope tp-yt-iron-icon"></path></g></svg><!--css-build:shady-->
*/

const unmuteButtonElementClassName = ['.ytp-mute-button.ytp-button', '.volume style-scope .ytmusic-player-bar'];
const unmuteButtonElementTitle = ['Unmute (m)', 'Mute'];

/*
--------SkipAdds-button element----------
<button class="ytp-ad-skip-button ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text" id="ad-text:6" style="">Skip Ads
-----------------------
<button class="ytp-ad-skip-button-modern ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:31" style="">Skip</div><span class="ytp-ad-skip-button-icon-modern"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>
-----
<button class="ytp-skip-ad-button" id="skip-button:5e" style="opacity: 0.5;"><div class="ytp-skip-ad-button__text">Skip</div><span class="ytp-skip-ad-button__icon"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>
-----
<button class="ytp-ad-skip-button-modern ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:6" style="">Skip</div><span class="ytp-ad-skip-button-icon-modern"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>
*/
const skipAddsButtonElementClassName = ['.ytp-ad-skip-button.ytp-button', '.ytp-ad-skip-button-modern.ytp-button', '.ytp-skip-ad-button'];


