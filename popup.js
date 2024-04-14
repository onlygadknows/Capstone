document.addEventListener('DOMContentLoaded', function() {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeTextColor({ color: 'pink' });
    let pasted = document.getElementById('paste-container');

    // Function to update the UI with stored text
    function updateUI(storedText) {
        pasted.innerHTML = ''; // Clear previous content
        storedText.forEach(text => {
            let p = document.createElement('p');
            p.classList.add('texts');
            p.innerText = text;
            pasted.appendChild(p);
        });
    }

    // Function to handle messages from the background script
    function handleMessage(message) {
        if (message.action === 'updateStoredText') {
            updateUI(message.text);
        }
    }

    // Send message to background script to retrieve stored text
    chrome.runtime.sendMessage({ action: 'getStoredText' }, function(response) {
        updateUI(response.text);
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(handleMessage);
});
