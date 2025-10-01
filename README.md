# Live Clipboard Monitor Chrome Extension

A Chrome extension that creates a beautiful, draggable popup panel that automatically monitors and displays your clipboard content in real-time.

## Features

- ✨ Beautiful gradient popup with modern design
- 🖱️ Fully draggable by clicking and dragging the header
- 📋 Real-time clipboard monitoring and display
- 🔄 Toggle popup visibility by clicking the extension icon
- 🎯 Works on any website
- 📱 Responsive and smooth animations
- 🎨 CSS-styled with hover effects
- 🚀 One-click activation - no intermediate popup needed

## Installation

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Enable Developer Mode in Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle the "Developer mode" switch in the top-right corner

2. **Load the Extension:**

   - Click the "Load unpacked" button
   - Navigate to and select the folder containing this extension
   - The extension should now appear in your extensions list

3. **Pin the Extension (Optional):**
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "Live Clipboard Monitor" and click the pin icon

## Usage

1. **Navigate to any webpage** (e.g., google.com, github.com, etc.)

2. **Click the extension icon** in your Chrome toolbar to **toggle the popup**

   - First click: Creates a draggable popup showing your current clipboard content
   - Second click: Removes the popup
   - The icon should appear as a puzzle piece or in your pinned extensions

3. **Interact with the popup:**

   - **Real-time clipboard monitoring:** The popup automatically updates when your clipboard changes
   - **Drag the popup around:** Click and hold the header area to move it anywhere on the page
   - **Manual close:** Click the "×" button in the top-right corner of the popup

## File Structure

```
├── manifest.json          # Extension configuration
├── background.js          # Background script for extension icon handling
├── content.js            # Main draggable popup functionality
├── styles.css            # Popup styling
└── README.md             # This file
```

## Technical Details

### Manifest V3 Compliance

This extension uses Chrome Extension Manifest V3, the latest standard for Chrome extensions.

### Permissions

- `activeTab`: Allows the extension to interact with the currently active tab

### Content Script

The extension injects a content script (`content.js`) into all web pages that:

- Creates the draggable popup element
- Handles drag-and-drop functionality
- Manages popup lifecycle (create/destroy)

### Styling

The popup uses:

- CSS Grid and Flexbox for layout
- CSS transforms for smooth dragging
- Modern gradient backgrounds
- Responsive hover effects
- High z-index to appear above page content

## Customization

### Changing the Message

To change "Hello World!" to something else:

1. Open `content.js`
2. Find the line: `<p class="hello-text">Hello World!</p>`
3. Replace "Hello World!" with your desired text

### Styling the Popup

To customize the appearance:

1. Edit `styles.css`
2. Modify colors, sizes, fonts, or animations
3. Reload the extension to see changes

### Changing Initial Position

To change where the popup first appears:

1. Open `content.js`
2. Find the line: `this.setPosition(100, 100);`
3. Change the numbers (x, y coordinates in pixels)

## Troubleshooting

### Extension Not Working

- Make sure Developer Mode is enabled
- Try reloading the extension in `chrome://extensions/`
- Check the browser console for error messages

### Popup Not Appearing

- Ensure you're on a regular webpage (not chrome:// pages)
- Check that the extension has permission for the current site
- Try refreshing the webpage

### Can't Drag the Popup

- Make sure you're clicking on the header area (dark blue section)
- Try clicking on the "Draggable Popup" text specifically

## Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Microsoft Edge (Chromium-based)
- ✅ Other Chromium-based browsers
- ❌ Firefox (uses different extension format)
- ❌ Safari (uses different extension format)

## Development

### Making Changes

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test your changes

### Debugging

- Use Chrome DevTools on the webpage to debug `content.js`
- Right-click the extension popup and select "Inspect" to debug `popup.js`
- Check the Extensions page for any load errors

## License

This project is open source. Feel free to modify and distribute as needed.

## Version History

- **v1.0**: Initial release with draggable "Hello World!" popup
