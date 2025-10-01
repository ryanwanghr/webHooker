document.addEventListener("DOMContentLoaded", function () {
  const createPopupButton = document.getElementById("createPopup");

  createPopupButton.addEventListener("click", async function () {
    try {
      // Read clipboard content
      const clipboardText = await navigator.clipboard.readText();

      // Send message to content script with clipboard content
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "createDraggablePopup",
          clipboardContent: clipboardText || "Clipboard is empty",
        });
        window.close(); // Close the extension popup
      });
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      // Fallback if clipboard access fails
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "createDraggablePopup",
          clipboardContent: "Unable to access clipboard",
        });
        window.close(); // Close the extension popup
      });
    }
  });
});
