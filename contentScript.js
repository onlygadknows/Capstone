chrome.runtime.sendMessage({greeting: "Hello World"}, function(response) {
    console.log(response.farewell)
})

let copiedContent = [];

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            chrome.runtime.sendMessage({ action: 'copyText', text: selectedText });
        }
    }
    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
        copyText();
    }
    // else if (event.ctrlKey && event.key.toLowerCase() === 'v') {
    //     pasteText();
    // }
});

function copyText() {
    let selection = window.getSelection().toString();
    if (selection) {
        copiedContent.push(selection);
        console.log('Text copied:', selection);
        chrome.runtime.sendMessage({ action: 'copyText', text: copiedContent });
    }
}
