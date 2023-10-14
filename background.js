console.log('Background script is running');
// Phần còn lại của mã của bạn ở đây

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "ad_detected") {
			console.log("Mute adds");
            // let muteButton = document.querySelector('.ytp-mute-button.ytp-button');
            // if (muteButton) {
                // muteButton.click();
            // }
        }
    }
);
