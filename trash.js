document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const copiedList = document.getElementById('copiedList');
  
    copyButton.addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: copyParagraph
        });
      });
    });
  
    // Retrieve copied content from storage and display it
    chrome.storage.local.get('copiedContent', function(result) {
      const copiedContent = result.copiedContent || [];
      updateCopiedList(copiedContent);
    });
  });
  
  function updateCopiedList(content) {
    const copiedList = document.getElementById('paste-area');
    copiedList.innerHTML = '';
    content.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item;
      copiedList.appendChild(li);
    });
  }


  var copiedContent = [];

// Listen for keydown event on the document
document.addEventListener('keydown', function(event) {
    // Check if Ctrl key is pressed along with the corresponding letter key (C for copy, V for paste)
    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
        copyText();
    } else if (event.ctrlKey && event.key.toLowerCase() === 'v') {
        pasteText();
    }
});

function copyText() {
    var selection = window.getSelection().toString();
    if (selection) {
        copiedContent.push(selection);
        console.log('Text copied:', selection);
        updateCopiedList();
    }
}

function pasteText() {
    var pasteArea = document.getElementById('pasteArea');
    pasteArea.value = copiedContent.join('\n');
}

function updateCopiedList() {
    var copiedList = document.getElementById('copiedList');
    copiedList.innerHTML = '';
    copiedContent.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        copiedList.appendChild(li);
    });
}
