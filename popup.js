document.addEventListener('DOMContentLoaded', function() {
    chrome.action.setBadgeText({text: 'ON'})
    chrome.action.setBadgeTextColor({color: 'pink'});
    let pasted =  document.getElementById('paste-container');
    let storedText = []

    // Send message to background script to retrieve stored text
    chrome.runtime.sendMessage({ action: 'getStoredText' }, function(response) {
        storedText.push(response.text)

        let p = document.createElement('p');
        p.classList.add('texts');
        
        if (storedText) {
            storedText.map((text) => {
                p.innerText = `${text}`;
               pasted.appendChild(p);
            })
        }
    });

    function copyText(text) {
        if (!text) {
            return
        }
        let element;
    }

    document.getElementById('btn').addEventListener('click', () => {
        copyText()
    })
});