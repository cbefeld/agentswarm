# D3 Graph Visualization

A beautiful and interactive graph visualization built with D3.js that allows you to explore and manipulate network data.

## Features

- **Interactive Force-Directed Graph**: Nodes are positioned using D3's force simulation
- **Drag & Drop**: Move nodes around by dragging them
- **Node Selection**: Click on nodes to highlight them and their connections
- **Dynamic Graph**: Add new nodes and edges interactively
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient background and smooth animations

## How to Use

1. **Open the visualization**: Open `index.html` in your web browser
2. **Interact with nodes**: 
   - Drag nodes to move them around
   - Click on nodes to select them and highlight their connections
3. **Add elements**:
   - Click "Add Node" to add a new node to the graph
   - Click "Add Edge" to create a random connection between existing nodes
4. **Reset**: Click "Reset Graph" to return to the initial state

## File Structure

```
d3-graph-viz/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # D3.js implementation
└── README.md       # This file
```

## Technical Details

- **D3.js v7**: Latest version for optimal performance
- **Force Simulation**: Uses D3's force layout for automatic positioning
- **SVG Graphics**: Scalable vector graphics for crisp rendering
- **Event Handling**: Mouse interactions for dragging and selection
- **Dynamic Updates**: Real-time graph updates when adding nodes/edges

## Customization

You can easily customize the visualization by modifying:

- **Colors**: Change the color scheme in `script.js` (line with `d3.schemeCategory10`)
- **Node Size**: Adjust the radius in `script.js` (line with `.attr('r', 20)`)
- **Force Parameters**: Modify simulation forces in `script.js`
- **Styling**: Update CSS in `styles.css` for different visual themes

## Browser Compatibility

This visualization works in all modern browsers that support:
- ES6+ JavaScript
- SVG graphics
- CSS Grid and Flexbox

## Getting Started

Simply open `index.html` in your web browser - no server setup required!

```bash
# If you have Python installed, you can also serve it locally:
python -m http.server 8000
# Then visit http://localhost:8000
```

Enjoy exploring your graph data! 🚀 