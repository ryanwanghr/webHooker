# Draggable Hello World Chrome Extension

A simple Chrome extension that creates a beautiful, draggable popup panel displaying "Hello World!" on any webpage.

## Features

- ✨ Beautiful gradient popup with modern design
- 🖱️ Fully draggable by clicking and dragging the header
- 🎯 Works on any website
- 🔄 Easy to close with the X button
- 📱 Responsive and smooth animations
- 🎨 CSS-styled with hover effects

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
   - Find "Draggable Hello World Popup" and click the pin icon

## Usage

1. **Navigate to any webpage** (e.g., google.com, github.com, etc.)

2. **Click the extension icon** in your Chrome toolbar

   - The icon should appear as a puzzle piece or in your pinned extensions

3. **Click "Create Draggable Popup"** in the extension popup

   - A beautiful "Hello World!" popup will appear on the page

4. **Drag the popup around:**

   - Click and hold the header area (where it says "Draggable Popup")
   - Drag to move the popup anywhere on the page
   - Release to drop it in the new position

5. **Close the popup:**
   - Click the "×" button in the top-right corner of the popup

## File Structure

```
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup interface
├── popup.js              # Extension popup logic
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
