chrome.runtime.sendMessage({greeting: "Hello World"}, function(response) {
    console.log(response.farewell)
})

let copiedContent = [];

function copyText(selection) {
    if (selection) {
        copiedContent.push(selection);
        console.log('Text copied:', selection);
        chrome.runtime.sendMessage({ action: 'copyText', text: copiedContent });
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
        event.preventDefault(); // Prevent default copy action

        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            copyText(selectedText);
        }
    }
});
