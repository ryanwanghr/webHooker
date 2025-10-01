// Content script for creating and managing draggable popup
class DraggablePopup {
  constructor() {
    this.popup = null;
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.initialX = 0;
    this.initialY = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.clipboardMonitor = null;
    this.lastClipboardContent = "";
    this.isMonitoring = false;
  }

  create(clipboardContent = "Hello World!") {
    // Remove existing popup if it exists
    this.remove();

    // Create popup element
    this.popup = document.createElement("div");
    this.popup.className = "draggable-hello-popup";
    this.popup.innerHTML = `
            <div class="popup-header">
                <h3 class="popup-title">Live Clipboard Monitor</h3>
                <button class="popup-close" title="Close">&times;</button>
            </div>
            <div class="popup-content">
                <p class="hello-text">${this.escapeHtml(clipboardContent)}</p>
            </div>
        `;

    // Add event listeners
    this.addEventListeners();

    // Add to page
    document.body.appendChild(this.popup);

    // Set initial position
    this.setPosition(100, 100);

    // Start monitoring clipboard changes
    this.startClipboardMonitoring();
  }

  addEventListeners() {
    const header = this.popup.querySelector(".popup-header");
    const closeButton = this.popup.querySelector(".popup-close");

    // Close button functionality
    closeButton.addEventListener("click", () => {
      this.remove();
    });

    // Dragging functionality
    header.addEventListener("mousedown", this.dragStart.bind(this));
    document.addEventListener("mousemove", this.dragMove.bind(this));
    document.addEventListener("mouseup", this.dragEnd.bind(this));

    // Prevent default drag behavior on images and other elements
    this.popup.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  }

  dragStart(e) {
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (
      e.target === this.popup.querySelector(".popup-header") ||
      e.target === this.popup.querySelector(".popup-title")
    ) {
      this.isDragging = true;
      this.popup.classList.add("dragging");
    }
  }

  dragMove(e) {
    if (this.isDragging) {
      e.preventDefault();

      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setTranslate(this.currentX, this.currentY);
    }
  }

  dragEnd(e) {
    this.initialX = this.currentX;
    this.initialY = this.currentY;
    this.isDragging = false;

    if (this.popup) {
      this.popup.classList.remove("dragging");
    }
  }

  setTranslate(xPos, yPos) {
    if (this.popup) {
      this.popup.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }

  setPosition(x, y) {
    if (this.popup) {
      this.popup.style.left = x + "px";
      this.popup.style.top = y + "px";
      this.xOffset = 0;
      this.yOffset = 0;
    }
  }

  remove() {
    // Stop clipboard monitoring
    this.stopClipboardMonitoring();

    if (this.popup && this.popup.parentNode) {
      this.popup.parentNode.removeChild(this.popup);
      this.popup = null;
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  async startClipboardMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;

    // Try to get initial clipboard content
    try {
      this.lastClipboardContent = await navigator.clipboard.readText();
    } catch (error) {
      console.log("Could not read initial clipboard content:", error);
      this.lastClipboardContent = "";
    }

    // Start monitoring clipboard changes
    this.clipboardMonitor = setInterval(async () => {
      if (!this.popup) {
        this.stopClipboardMonitoring();
        return;
      }

      try {
        const currentClipboard = await navigator.clipboard.readText();

        // Check if clipboard content has changed
        if (currentClipboard !== this.lastClipboardContent) {
          this.lastClipboardContent = currentClipboard;
          this.updatePopupContent(currentClipboard);
        }
      } catch (error) {
        // Silently handle clipboard access errors
        // This can happen when the page loses focus or clipboard access is restricted
      }
    }, 500); // Check every 500ms
  }

  stopClipboardMonitoring() {
    if (this.clipboardMonitor) {
      clearInterval(this.clipboardMonitor);
      this.clipboardMonitor = null;
    }
    this.isMonitoring = false;
  }

  updatePopupContent(newContent) {
    if (!this.popup) return;

    const contentElement = this.popup.querySelector(".hello-text");
    if (contentElement) {
      // Add a subtle animation to indicate content change
      contentElement.style.opacity = "0.5";
      contentElement.style.transition = "opacity 0.2s ease";

      setTimeout(() => {
        contentElement.innerHTML = this.escapeHtml(
          newContent || "Clipboard is empty"
        );
        contentElement.style.opacity = "1";
      }, 100);
    }
  }
}

// Initialize the draggable popup manager
let draggablePopup = new DraggablePopup();

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createDraggablePopup") {
    draggablePopup.create(request.clipboardContent);
    sendResponse({ status: "Popup created successfully" });
  }
});

// Clean up when page is about to unload
window.addEventListener("beforeunload", () => {
  draggablePopup.remove();
});
