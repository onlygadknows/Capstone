// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: copyParagraph
//     });
// });

// var copiedContent = [];

// function copyParagraph() {
//     const paragraph = document.querySelector('p');
//     if (paragraph) {
//         const text = paragraph.textContent.trim();
//         if (text) {
//             copiedContent.push(text);
//             console.log('Text copied to list:', text);
//             // Update the copied list display in the popup
//             chrome.storage.local.set({ copiedContent: copiedContent });
//             // Notify the user that the text has been copied
//             chrome.notifications.create({
//                 type: 'basic',
//                 iconUrl: 'icon.png',
//                 title: 'Text Copied',
//                 message: 'Text has been copied successfully.'
//             });
//         }
//     } else {
//         console.error('No paragraph found on the page.');
//     }
// }

// var context_id = -1;

// chrome.input.ime.onFocus.addListener(function(context) {
//   context_id = context.contextID;
// });

let copiedText = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'copyText') {
        copiedText.push(message.text);
    } else if (message.action === 'getStoredText') {
        sendResponse({ text: copiedText });
    }
});


chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'My Context Menu',
    contexts: ['all']
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText;
    console.log(selectedText);
})