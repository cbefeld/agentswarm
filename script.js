// Graph data structure
let graphData = {
    nodes: [],
    links: []
};

// Timeline variables
let timelineData = {
    nodes: [],
    links: []
};
let currentTime = 0;
let maxTime = 0;
let isTimelineMode = false;
let timelineInterval = null;
let timelineSpeed = 1; // Default speed multiplier

// Dark mode variables
let isDarkMode = false;

// Box selection variables
let selectedNodes = [];
let isBoxSelecting = false;
let selectionBox = null;
let selectionStart = null;

// Dataset library
const datasets = {
    'agents-analysts-products': generateAgentsAnalystsProducts,
    'agents-analysts-products-xxl': generateAgentsAnalystsProductsXXL,
    'collaborative-session': generateCollaborativeSession
};

// Generate 105 nodes with 3 distinct areas
function generateAgentsAnalystsProducts() {
    const nodes = [];
    const links = [];
    
    // Generate nodes with 3 distinct groups
    for (let i = 1; i <= 105; i++) {
        let group, name;
        
        if (i <= 35) {
            group = 1;
            name = `Agent ${i}`;
        } else if (i <= 70) {
            group = 2;
            name = `Analyst ${i - 35}`;
        } else {
            group = 3;
            name = `Product ${i - 70}`;
        }
        
        nodes.push({
            id: i,
            name: name,
            group: group,
            level: Math.floor((i - 1) / 35) + 1, // 3 levels with ~35 nodes each
            x: Math.random() * 1200,
            y: Math.random() * 800,
            timestamp: Math.floor(Math.random() * 100) // Add a timestamp
        });
    }
    
        // Create connections within each group
    const groupRanges = [
        { start: 1, end: 35, name: 'Agents' },
        { start: 36, end: 70, name: 'Analysts' },
        { start: 71, end: 105, name: 'Products' }
    ];
    
    // Create internal connections for each group
    groupRanges.forEach(group => {
        const groupNodes = nodes.filter(n => n.group === groupRanges.indexOf(group) + 1);
        
        // Create some internal connections within each group
        for (let i = 0; i < groupNodes.length * 2; i++) {
            const source = group.start + Math.floor(Math.random() * (group.end - group.start + 1));
            const target = group.start + Math.floor(Math.random() * (group.end - group.start + 1));
            
            if (source !== target) {
                const alreadyConnected = links.some(link => 
                    (link.source === source && link.target === target) ||
                    (link.source === target && link.target === source)
                );
                
                if (!alreadyConnected) {
                    links.push({
                        source: source,
                        target: target,
                        value: Math.floor(Math.random() * 3) + 1,
                        type: 'internal',
                        timestamp: Math.floor(Math.random() * 100) // Add a timestamp
                    });
                }
            }
        }
    });
    
    // Add cross-group connections (Agents work with Analysts, Analysts work with Products)
    const crossConnections = 20;
    for (let i = 0; i < crossConnections; i++) {
        let source, target;
        
        // Agents connect to Analysts
        if (i < crossConnections / 2) {
            source = Math.floor(Math.random() * 35) + 1; // Agent
            target = Math.floor(Math.random() * 35) + 36; // Analyst
        } else {
            // Analysts connect to Products
            source = Math.floor(Math.random() * 35) + 36; // Analyst
            target = Math.floor(Math.random() * 35) + 71; // Product
        }
        
        const alreadyConnected = links.some(link => 
            (link.source === source && link.target === target) ||
            (link.source === target && link.target === source)
        );
        
        if (!alreadyConnected) {
            links.push({
                source: source,
                target: target,
                value: Math.floor(Math.random() * 3) + 1,
                type: 'cross', // Mark as cross connection
                timestamp: Math.floor(Math.random() * 100) // Add a timestamp
            });
        }
    }
    
    return { nodes, links };
}

// Generate collaborative development session dataset
function generateCollaborativeSession() {
    const nodes = [];
    const links = [];
    
    // Real-world timestamps (in seconds from start)
    const startTime = Date.now() - (2 * 60 * 60 * 1000); // 2 hours ago
    
    // Human Commands (Group 1)
    const humanCommands = [
        { id: 1, name: "Make timeline wider", timestamp: 0, group: 1, realTime: startTime },
        { id: 2, name: "Add speed control", timestamp: 45, group: 1, realTime: startTime + 45000 },
        { id: 3, name: "Add 10x speed option", timestamp: 120, group: 1, realTime: startTime + 120000 },
        { id: 4, name: "Move speed controls left", timestamp: 180, group: 1, realTime: startTime + 180000 },
        { id: 5, name: "Change page title", timestamp: 240, group: 1, realTime: startTime + 240000 },
        { id: 6, name: "Create timeline branch", timestamp: 300, group: 1, realTime: startTime + 300000 },
        { id: 7, name: "Create dark-mode branch", timestamp: 420, group: 1, realTime: startTime + 420000 },
        { id: 8, name: "Implement dark mode", timestamp: 540, group: 1, realTime: startTime + 540000 },
        { id: 9, name: "Make greys darker", timestamp: 720, group: 1, realTime: startTime + 720000 },
        { id: 10, name: "Create experimental-data branch", timestamp: 840, group: 1, realTime: startTime + 840000 },
        { id: 11, name: "Create collaborative dataset", timestamp: 960, group: 1, realTime: startTime + 960000 },
        { id: 12, name: "Add real-time data", timestamp: 1080, group: 1, realTime: startTime + 1080000 },
        { id: 13, name: "Implement live updates", timestamp: 1200, group: 1, realTime: startTime + 1200000 }
    ];
    
    // AI Responses (Group 2)
    const aiResponses = [
        { id: 14, name: "Timeline width increased", timestamp: 15, group: 2, realTime: startTime + 15000 },
        { id: 15, name: "Speed control added", timestamp: 60, group: 2, realTime: startTime + 60000 },
        { id: 16, name: "10x speed implemented", timestamp: 135, group: 2, realTime: startTime + 135000 },
        { id: 17, name: "Speed controls repositioned", timestamp: 195, group: 2, realTime: startTime + 195000 },
        { id: 18, name: "Title updated", timestamp: 255, group: 2, realTime: startTime + 255000 },
        { id: 19, name: "Timeline branch created", timestamp: 315, group: 2, realTime: startTime + 315000 },
        { id: 20, name: "Dark-mode branch ready", timestamp: 435, group: 2, realTime: startTime + 435000 },
        { id: 21, name: "Dark mode implemented", timestamp: 555, group: 2, realTime: startTime + 555000 },
        { id: 22, name: "Darker greys applied", timestamp: 735, group: 2, realTime: startTime + 735000 },
        { id: 23, name: "Experimental branch ready", timestamp: 855, group: 2, realTime: startTime + 855000 },
        { id: 24, name: "Creating collaborative dataset", timestamp: 975, group: 2, realTime: startTime + 975000 },
        { id: 25, name: "Real-time data connected", timestamp: 1095, group: 2, realTime: startTime + 1095000 },
        { id: 26, name: "Live updates active", timestamp: 1215, group: 2, realTime: startTime + 1215000 }
    ];
    
    // Code Changes (Group 3)
    const codeChanges = [
        { id: 27, name: "CSS: min-width 400px", timestamp: 20, group: 3, realTime: startTime + 20000 },
        { id: 28, name: "HTML: Speed selector", timestamp: 70, group: 3, realTime: startTime + 70000 },
        { id: 29, name: "JS: Speed functionality", timestamp: 75, group: 3, realTime: startTime + 75000 },
        { id: 30, name: "CSS: Speed positioning", timestamp: 210, group: 3, realTime: startTime + 210000 },
        { id: 31, name: "HTML: Title change", timestamp: 270, group: 3, realTime: startTime + 270000 },
        { id: 32, name: "Git: Timeline branch", timestamp: 330, group: 3, realTime: startTime + 330000 },
        { id: 33, name: "Git: Dark-mode branch", timestamp: 450, group: 3, realTime: startTime + 450000 },
        { id: 34, name: "CSS: Dark theme vars", timestamp: 570, group: 3, realTime: startTime + 570000 },
        { id: 35, name: "JS: Dark mode toggle", timestamp: 600, group: 3, realTime: startTime + 600000 },
        { id: 36, name: "CSS: Darker colors", timestamp: 750, group: 3, realTime: startTime + 750000 },
        { id: 37, name: "Git: Experimental branch", timestamp: 870, group: 3, realTime: startTime + 870000 },
        { id: 38, name: "JS: Dataset function", timestamp: 990, group: 3, realTime: startTime + 990000 },
        { id: 39, name: "JS: Real-time updates", timestamp: 1110, group: 3, realTime: startTime + 1110000 },
        { id: 40, name: "JS: Live data sync", timestamp: 1230, group: 3, realTime: startTime + 1230000 }
    ];
    
    // Add all nodes
    nodes.push(...humanCommands, ...aiResponses, ...codeChanges);
    
    // Create connections between related items
    const connections = [
        // Timeline width feature
        { source: 1, target: 14, timestamp: 15 }, // Command -> Response
        { source: 14, target: 27, timestamp: 20 }, // Response -> Code Change
        
        // Speed control feature
        { source: 2, target: 15, timestamp: 60 }, // Command -> Response
        { source: 15, target: 28, timestamp: 70 }, // Response -> HTML
        { source: 15, target: 29, timestamp: 75 }, // Response -> JS
        
        // Speed positioning
        { source: 4, target: 17, timestamp: 195 }, // Command -> Response
        { source: 17, target: 30, timestamp: 210 }, // Response -> Code
        
        // Title change
        { source: 5, target: 18, timestamp: 255 }, // Command -> Response
        { source: 18, target: 31, timestamp: 270 }, // Response -> Code
        
        // Branch creation
        { source: 6, target: 19, timestamp: 315 }, // Command -> Response
        { source: 19, target: 32, timestamp: 330 }, // Response -> Git
        
        // Dark mode implementation
        { source: 8, target: 21, timestamp: 555 }, // Command -> Response
        { source: 21, target: 34, timestamp: 570 }, // Response -> CSS
        { source: 21, target: 35, timestamp: 600 }, // Response -> JS
        
        // Darker colors
        { source: 9, target: 22, timestamp: 735 }, // Command -> Response
        { source: 22, target: 36, timestamp: 750 }, // Response -> Code
        
        // Experimental branch
        { source: 10, target: 23, timestamp: 855 }, // Command -> Response
        { source: 23, target: 37, timestamp: 870 }, // Response -> Git
        
        // Current dataset creation
        { source: 11, target: 24, timestamp: 975 }, // Command -> Response
        { source: 24, target: 38, timestamp: 990 }, // Response -> Code
        
        // Real-time data features
        { source: 12, target: 25, timestamp: 1095 }, // Command -> Response
        { source: 25, target: 39, timestamp: 1110 }, // Response -> Code
        { source: 13, target: 26, timestamp: 1215 }, // Command -> Response
        { source: 26, target: 40, timestamp: 1230 }, // Response -> Code
        
        // Cross-feature connections
        { source: 3, target: 16, timestamp: 135 }, // 10x speed -> Response
        { source: 7, target: 20, timestamp: 435 }, // Dark branch -> Response
        
        // Feature evolution connections
        { source: 27, target: 28, timestamp: 70 }, // Timeline -> Speed
        { source: 28, target: 34, timestamp: 570 }, // Speed -> Dark mode
        { source: 34, target: 39, timestamp: 1110 }, // Dark mode -> Real-time
        { source: 30, target: 32, timestamp: 48 }, // Dark mode -> Darker
    ];
    
    // Add all links
    links.push(...connections.map(link => ({
        source: link.source,
        target: link.target,
        value: 1,
        timestamp: link.timestamp
    })));
    
    return { nodes, links };
}

// Generate 315 nodes with 3 distinct areas (3x the original)
function generateAgentsAnalystsProductsXXL() {
    const nodes = [];
    const links = [];
    
    // Generate nodes with 3 distinct groups (3x larger)
    for (let i = 1; i <= 315; i++) {
        let group, name;
        
        if (i <= 105) {
            group = 1;
            name = `Agent ${i}`;
        } else if (i <= 210) {
            group = 2;
            name = `Analyst ${i - 105}`;
        } else {
            group = 3;
            name = `Product ${i - 210}`;
        }
        
        nodes.push({
            id: i,
            name: name,
            group: group,
            level: Math.floor((i - 1) / 105) + 1, // 3 levels with ~105 nodes each
            x: Math.random() * 1200,
            y: Math.random() * 800,
            timestamp: Math.floor(Math.random() * 100) // Add a timestamp
        });
    }
    
    // Create connections within each group (3x more connections)
    const groupRanges = [
        { start: 1, end: 105, name: 'Agents' },
        { start: 106, end: 210, name: 'Analysts' },
        { start: 211, end: 315, name: 'Products' }
    ];
    
    // Create internal connections for each group (3x more)
    groupRanges.forEach(group => {
        const groupNodes = nodes.filter(n => n.group === groupRanges.indexOf(group) + 1);
        
        // Create some internal connections within each group (3x more)
        for (let i = 0; i < groupNodes.length * 6; i++) {
            const source = group.start + Math.floor(Math.random() * (group.end - group.start + 1));
            const target = group.start + Math.floor(Math.random() * (group.end - group.start + 1));
            
            if (source !== target) {
                const alreadyConnected = links.some(link => 
                    (link.source === source && link.target === target) ||
                    (link.source === target && link.target === source)
                );
                
                if (!alreadyConnected) {
                    links.push({
                        source: source,
                        target: target,
                        value: Math.floor(Math.random() * 3) + 1,
                        type: 'internal',
                        timestamp: Math.floor(Math.random() * 100) // Add a timestamp
                    });
                }
            }
        }
    });
    
    // Add cross-group connections (3x more)
    const crossConnections = 60;
    for (let i = 0; i < crossConnections; i++) {
        let source, target;
        
        // Agents connect to Analysts
        if (i < crossConnections / 2) {
            source = Math.floor(Math.random() * 105) + 1; // Agent
            target = Math.floor(Math.random() * 105) + 106; // Analyst
        } else {
            // Analysts connect to Products
            source = Math.floor(Math.random() * 105) + 106; // Analyst
            target = Math.floor(Math.random() * 105) + 211; // Product
        }
        
        const alreadyConnected = links.some(link => 
            (link.source === source && link.target === target) ||
            (link.source === target && link.target === source)
        );
        
        if (!alreadyConnected) {
            links.push({
                source: source,
                target: target,
                value: Math.floor(Math.random() * 3) + 1,
                type: 'cross', // Mark as cross connection
                timestamp: Math.floor(Math.random() * 100) // Add a timestamp
            });
        }
    }
    
    return { nodes, links };
}

// Function to switch datasets
function switchDataset(datasetName) {
    if (datasets[datasetName]) {
        console.log(`Switching to dataset: ${datasetName}`);
        graphData = datasets[datasetName]();
        console.log(`New graph data: ${graphData.nodes.length} nodes, ${graphData.links.length} links`);
        
        // Reset timeline mode if active
        if (isTimelineMode) {
            isTimelineMode = false;
            const toggleBtn = document.getElementById('timeline-toggle');
            const slider = document.getElementById('timeline-slider');
            const playBtn = document.getElementById('timeline-play');
            const pauseBtn = document.getElementById('timeline-pause');
            const resetBtn = document.getElementById('timeline-reset');
            const speedSelector = document.getElementById('timeline-speed');
            
            toggleBtn.textContent = 'Enable';
            slider.disabled = true;
            playBtn.disabled = true;
            pauseBtn.disabled = true;
            resetBtn.disabled = true;
            speedSelector.disabled = true;
            
            if (timelineInterval) {
                clearInterval(timelineInterval);
                timelineInterval = null;
            }
        }
        
        recreateGraph();
        
        // Reset legend toggles to show all node types
        resetLegendToggles();
        
        // Update legend labels for the new dataset
        updateLegendLabels(datasetName);
        
        // Update AI insights for the new dataset
        updateInfo();
        
        // Clear chat messages for new dataset
        clearChatMessages();
    }
}

// Initialize with default dataset
graphData = generateAgentsAnalystsProducts();



// Color scale for node groups
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Get container dimensions
const container = document.getElementById('graph-container');
const width = container.clientWidth;
const height = container.clientHeight;

// Create SVG with zoom support
const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Create zoom behavior
const zoom = d3.zoom()
    .scaleExtent([0.1, 4]) // Min zoom 0.1x, max zoom 4x
    .on('zoom', (event) => {
        g.attr('transform', event.transform);
        // Update zoom level indicator
        const zoomPercent = Math.round(event.transform.k * 100);
        document.getElementById('zoomLevel').textContent = `${zoomPercent}%`;
    })
    .filter(event => !event.shiftKey); // Disable zoom when Shift is held

// Apply zoom to SVG
svg.call(zoom);

// Add box selection event handlers
svg.on('mousedown', handleMouseDown)
   .on('mousemove', handleMouseMove)
   .on('mouseup', handleMouseUp)
   .on('click', function(event) {
       // Canvas click handler to deselect all nodes
       if (event.target === this) { // Only if clicking on the SVG background
           console.log('Canvas clicked - deselecting all nodes');
           selectedNodes = [];
           node.classed('selected', false);
           link.classed('selected', false);
           updateNodeInfoForSelection();
       }
   });

// Create a group for all graph elements
const g = svg.append('g');

// Create selection box (initially hidden) - add to graph group so it transforms with zoom
selectionBox = g.append('rect')
    .attr('class', 'selection-box')
    .attr('fill', 'rgba(0, 123, 255, 0.1)')
    .attr('stroke', 'rgba(0, 123, 255, 0.5)')
    .attr('stroke-width', 1)
    .style('display', 'none');

// Create close button for selection box (initially hidden) - add to graph group
const selectionCloseBtn = g.append('g')
    .attr('class', 'selection-close-btn')
    .style('display', 'none')
    .style('cursor', 'pointer')
    .on('click', clearSelection);

// Add close button elements
selectionCloseBtn.append('circle')
    .attr('r', 8)
    .attr('fill', 'white')
    .attr('stroke', 'rgba(0, 123, 255, 0.8)')
    .attr('stroke-width', 1);

selectionCloseBtn.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold')
    .attr('fill', 'rgba(0, 123, 255, 0.8)')
    .text('×');

// Create force simulation with adaptive parameters based on dataset size
const nodeCount = graphData.nodes.length;
const isLargeDataset = nodeCount > 200;

// Density control variables
let densityMultiplier = 1.0;
let groupSpacingMultiplier = 1.0;
let baseLinkDistance = isLargeDataset ? 30 : 40;
let baseChargeStrength = isLargeDataset ? -60 : -80;
let baseCollisionRadius = isLargeDataset ? 12 : 15;

const simulation = d3.forceSimulation(graphData.nodes)
    .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(baseLinkDistance))
    .force('charge', d3.forceManyBody().strength(baseChargeStrength))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(baseCollisionRadius));

// Create links
let link = g.append('g')
    .selectAll('line')
    .data(graphData.links)
    .enter().append('line')
    .attr('class', 'link')
    .attr('stroke-width', 1);

// Create nodes
let node = g.append('g')
    .selectAll('circle')
    .data(graphData.nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', isLargeDataset ? 2 : 6)
    .attr('fill', d => color(d.group))
    .call(drag(simulation));

// Add node labels
let nodeLabel = g.append('g')
    .selectAll('text')
    .data(graphData.nodes)
    .enter().append('text')
    .attr('class', 'node-label')
    .attr('dy', '.35em')
    .text(d => d.name);

// Drag behavior - enhanced for multi-node selection
function drag(simulation) {
    let dragOffset = { x: 0, y: 0 };
    let selectedNodesData = [];
    
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        
        // Check if this node is part of a multi-selection
        const isMultiSelection = selectedNodes.length > 1 && selectedNodes.includes(d.id);
        
        if (isMultiSelection) {
            // Store data for all selected nodes
            selectedNodesData = graphData.nodes.filter(node => selectedNodes.includes(node.id));
            
            // Calculate offset from drag start position
            dragOffset.x = event.x - d.x;
            dragOffset.y = event.y - d.y;
            
            // Fix positions for all selected nodes
            selectedNodesData.forEach(node => {
                node.fx = node.x;
                node.fy = node.y;
            });
            
            console.log('Multi-drag started with', selectedNodesData.length, 'nodes');
        } else {
            // Single node drag
            d.fx = d.x;
            d.fy = d.y;
            selectedNodesData = [d];
            dragOffset = { x: 0, y: 0 };
        }
    }

    function dragged(event, d) {
        if (selectedNodesData.length > 1) {
            // Multi-node drag
            const dx = event.x - d.x;
            const dy = event.y - d.y;
            
            selectedNodesData.forEach(node => {
                node.fx += dx;
                node.fy += dy;
            });
            
            console.log('Multi-dragging', selectedNodesData.length, 'nodes');
        } else {
            // Single node drag
            d.fx = event.x;
            d.fy = event.y;
        }
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        
        if (selectedNodesData.length > 1) {
            // Release all selected nodes
            selectedNodesData.forEach(node => {
                node.fx = null;
                node.fy = null;
            });
            console.log('Multi-drag ended');
        } else {
            // Release single node
            d.fx = null;
            d.fy = null;
        }
        
        selectedNodesData = [];
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

// Box selection functions
function handleMouseDown(event) {
    // Only start box selection if Shift is held and not clicking on a node
    if (event.shiftKey && event.target === svg.node()) {
        isBoxSelecting = true;
        const [x, y] = d3.pointer(event);
        selectionStart = { x, y };
        
        console.log('Box selection started at:', x, y);
        
        // Show selection box
        selectionBox
            .style('display', 'block')
            .attr('x', x)
            .attr('y', y)
            .attr('width', 0)
            .attr('height', 0);
        
        // Show close button
        d3.select('.selection-close-btn')
            .style('display', 'block')
            .attr('transform', `translate(${x + 10}, ${y - 10})`);
    } else if (event.target === svg.node() && !event.shiftKey) {
        // Clear selection when clicking on empty space without Shift
        selectedNodes = [];
        node.classed('selected', false);
        link.classed('selected', false);
        updateNodeInfoForSelection();
        
        // Hide selection box if it's visible
        if (selectionBox.style('display') !== 'none') {
            selectionBox.style('display', 'none');
        }
    }
}

function handleMouseMove(event) {
    if (isBoxSelecting && selectionStart) {
        const [x, y] = d3.pointer(event);
        
        // Update selection box dimensions
        const width = x - selectionStart.x;
        const height = y - selectionStart.y;
        
        selectionBox
            .attr('x', width < 0 ? x : selectionStart.x)
            .attr('y', height < 0 ? y : selectionStart.y)
            .attr('width', Math.abs(width))
            .attr('height', Math.abs(height));
        
        // Update close button position to top right of selection box
        const boxX = width < 0 ? x : selectionStart.x;
        const boxY = height < 0 ? y : selectionStart.y;
        d3.select('.selection-close-btn')
            .attr('transform', `translate(${boxX + Math.abs(width) + 10}, ${boxY - 10})`);
        
        console.log('Box selection updating:', { x, y, width, height });
    }
}

function handleMouseUp(event) {
    if (isBoxSelecting) {
        isBoxSelecting = false;
        
        console.log('Box selection ended');
        
        // Get selection box bounds
        const boxX = parseFloat(selectionBox.attr('x'));
        const boxY = parseFloat(selectionBox.attr('y'));
        const boxWidth = parseFloat(selectionBox.attr('width'));
        const boxHeight = parseFloat(selectionBox.attr('height'));
        
        console.log('Selection box bounds:', { boxX, boxY, boxWidth, boxHeight });
        
        // Find nodes within the selection box using D3's pointer and transform
        const selectedNodeIds = [];
        
        // Get the current transform from the graph group
        const graphGroup = d3.select('g').node();
        const transform = d3.zoomTransform(graphGroup);
        
        // Convert selection box coordinates to graph coordinates
        const graphBoxX = (boxX - transform.x) / transform.k;
        const graphBoxY = (boxY - transform.y) / transform.k;
        const graphBoxWidth = boxWidth / transform.k;
        const graphBoxHeight = boxHeight / transform.k;
        
        console.log('Selection box in graph coordinates:', {
            x: graphBoxX, y: graphBoxY, width: graphBoxWidth, height: graphBoxHeight
        });
        
        // Check each node using graph coordinates
        node.each(function(d) {
            const nodeX = d.x;
            const nodeY = d.y;
            
            // Check if node center is within the selection box
            if (nodeX >= graphBoxX && nodeX <= graphBoxX + graphBoxWidth &&
                nodeY >= graphBoxY && nodeY <= graphBoxY + graphBoxHeight) {
                selectedNodeIds.push(d.id);
                console.log(`Node ${d.id} (${nodeX}, ${nodeY}) is within selection box`);
            }
        });
        
        console.log('Found nodes in selection:', selectedNodeIds);
        
        // Apply box selection
        console.log('Box selection found nodes:', selectedNodeIds);
        
        if (selectedNodeIds.length > 0) {
            if (event.shiftKey) {
                // Add to existing selection
                selectedNodeIds.forEach(id => {
                    if (!selectedNodes.includes(id)) {
                        selectedNodes.push(id);
                    }
                });
            } else {
                // Replace selection
                selectedNodes = selectedNodeIds;
                node.classed('selected', false);
            }
            
            // Apply visual selection
            node.filter(d => selectedNodes.includes(d.id)).classed('selected', true);
            
            // Update link highlighting
            link.classed('selected', false);
            if (selectedNodes.length > 0) {
                link.filter(d => {
                    // Handle different link data structures
                    let sourceId, targetId;
                    
                    if (typeof d.source === 'object' && d.source.id !== undefined) {
                        sourceId = d.source.id;
                    } else if (typeof d.source === 'number') {
                        sourceId = d.source;
                    } else {
                        sourceId = d.source;
                    }
                    
                    if (typeof d.target === 'object' && d.target.id !== undefined) {
                        targetId = d.target.id;
                    } else if (typeof d.target === 'number') {
                        targetId = d.target;
                    } else {
                        targetId = d.target;
                    }
                    
                    return selectedNodes.includes(sourceId) && selectedNodes.includes(targetId);
                }).classed('selected', true);
            }
            
            console.log('Box selection applied. Total selected:', selectedNodes.length);
        }
        
        updateNodeInfoForSelection();
        
        // Hide selection box and close button
        selectionBox.style('display', 'none');
        d3.select('.selection-close-btn').style('display', 'none');
        selectionStart = null;
    }
}

function updateLinkSelection() {
    // Clear all link selections first
    link.classed('selected', false);
    
    // Highlight links between selected nodes only
    const selectedLinkElements = link.filter(d => {
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetId = typeof d.target === 'object' ? d.target.id : d.target;
        return selectedNodes.includes(sourceId) && selectedNodes.includes(targetId);
    });
    selectedLinkElements.classed('selected', true);
    console.log('Updated link selection:', selectedLinkElements.size(), 'links');
}

function updateNodeInfoForSelection() {
    console.log('Updating node info for selection:', selectedNodes);
    
    const infoDetails = document.getElementById('info-details');
    const placeholderMessage = document.querySelector('.placeholder-message');
    const selectionCountElement = document.getElementById('selection-count');
    
    // Update selection count indicator
    if (selectedNodes.length > 1) {
        selectionCountElement.textContent = `${selectedNodes.length} selected`;
        selectionCountElement.style.display = 'block';
    } else {
        selectionCountElement.style.display = 'none';
    }
    
    if (selectedNodes.length === 0) {
        // Show placeholder
        placeholderMessage.style.display = 'block';
        infoDetails.style.display = 'none';
        console.log('Showing placeholder - no nodes selected');
    } else if (selectedNodes.length === 1) {
        // Show single node details
        const node = graphData.nodes.find(n => n.id === selectedNodes[0]);
        if (node) {
            showNodeInfo(node);
            console.log('Showing single node details for:', node.name);
        }
    } else {
        // Show multiple nodes summary
        placeholderMessage.style.display = 'none';
        infoDetails.style.display = 'block';
        
        const selectedNodeData = graphData.nodes.filter(n => selectedNodes.includes(n.id));
        const groupCounts = {};
        selectedNodeData.forEach(n => {
            groupCounts[n.group] = (groupCounts[n.group] || 0) + 1;
        });
        
        const groupNames = { 1: 'Agents', 2: 'Analysts', 3: 'Products' };
        const groupSummary = Object.keys(groupCounts).map(groupId => 
            `${groupCounts[groupId]} ${groupNames[groupId]}`
        ).join(', ');
        
        const avgConnections = calculateAverageConnections(selectedNodeData).toFixed(1);
        
        infoDetails.innerHTML = `
            <h4>Multiple Nodes Selected</h4>
            <p><strong>${selectedNodes.length}</strong> nodes selected</p>
            <p><strong>Groups:</strong> ${groupSummary}</p>
            <p><strong>Average connections:</strong> ${avgConnections}</p>
        `;
        
        console.log(`Showing multiple nodes summary: ${selectedNodes.length} nodes, groups: ${groupSummary}, avg connections: ${avgConnections}`);
    }
}

function calculateAverageConnections(nodes) {
    let totalConnections = 0;
    nodes.forEach(node => {
        const connections = graphData.links.filter(link => 
            link.source.id === node.id || link.target.id === node.id
        ).length;
        totalConnections += connections;
    });
    return totalConnections / nodes.length;
}

// Timeline functions
function toggleTimelineMode() {
    console.log('toggleTimelineMode called, current state:', isTimelineMode);
    
    isTimelineMode = !isTimelineMode;
    const toggleBtn = document.getElementById('timeline-toggle');
    const slider = document.getElementById('timeline-slider');
    const playBtn = document.getElementById('timeline-play');
    const pauseBtn = document.getElementById('timeline-pause');
    const resetBtn = document.getElementById('timeline-reset');
    const speedSelector = document.getElementById('timeline-speed');
    
    console.log('Found elements:', { toggleBtn, slider, playBtn, pauseBtn, resetBtn, speedSelector });
    
    if (isTimelineMode) {
        // Enable timeline mode
        toggleBtn.textContent = 'Disable';
        slider.disabled = false;
        playBtn.disabled = false;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        speedSelector.disabled = false;
        
        // Calculate max time from data
        const nodeMaxTime = Math.max(...graphData.nodes.map(n => n.timestamp));
        const linkMaxTime = Math.max(...graphData.links.map(l => l.timestamp));
        maxTime = Math.max(nodeMaxTime, linkMaxTime);
        
        console.log('Time ranges:', { nodeMaxTime, linkMaxTime, maxTime });
        
        // Update slider range
        slider.max = maxTime;
        slider.value = 0;
        currentTime = 0;
        
        // Initialize timeline data
        timelineData = {
            nodes: [...graphData.nodes],
            links: [...graphData.links]
        };
        
        // Hide all nodes and links initially
        updateTimelineVisibility();
        
        console.log('Timeline mode enabled, max time:', maxTime);
    } else {
        // Disable timeline mode
        toggleBtn.textContent = 'Enable';
        slider.disabled = true;
        playBtn.disabled = true;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        speedSelector.disabled = true;
        
        // Stop any running animation
        if (timelineInterval) {
            clearInterval(timelineInterval);
            timelineInterval = null;
        }
        
        // Show all nodes and links
        node.style('opacity', 1).classed('timeline-hidden', false);
        link.style('opacity', 1).classed('timeline-hidden', false);
        
        console.log('Timeline mode disabled');
    }
    
    updateCurrentTimeDisplay();
}

function handleTimelineScrub(event) {
    if (!isTimelineMode) return;
    
    currentTime = parseInt(event.target.value);
    updateTimelineVisibility();
    updateCurrentTimeDisplay();
}

function playTimeline() {
    console.log('playTimeline called, isTimelineMode:', isTimelineMode, 'timelineInterval:', timelineInterval);
    
    if (!isTimelineMode || timelineInterval) {
        console.log('Play blocked - timeline mode:', isTimelineMode, 'interval exists:', !!timelineInterval);
        return;
    }
    
    console.log('Starting timeline animation from time:', currentTime, 'to max:', maxTime, 'speed:', timelineSpeed);
    
    // Calculate interval based on speed (base interval is 200ms)
    const baseInterval = 200;
    const interval = baseInterval / timelineSpeed;
    
    timelineInterval = setInterval(() => {
        currentTime++;
        if (currentTime > maxTime) {
            currentTime = 0;
        }
        
        const slider = document.getElementById('timeline-slider');
        slider.value = currentTime;
        updateTimelineVisibility();
        updateCurrentTimeDisplay();
        
        console.log('Timeline tick - current time:', currentTime, 'speed:', timelineSpeed);
    }, interval);
}

function pauseTimeline() {
    if (timelineInterval) {
        clearInterval(timelineInterval);
        timelineInterval = null;
    }
}

function resetTimeline() {
    if (!isTimelineMode) return;
    
    pauseTimeline();
    currentTime = 0;
    const slider = document.getElementById('timeline-slider');
    slider.value = 0;
    updateTimelineVisibility();
    updateCurrentTimeDisplay();
}

function updateTimelineVisibility() {
    if (!isTimelineMode) {
        console.log('updateTimelineVisibility called but timeline mode is off');
        return;
    }
    
    console.log('Updating timeline visibility for time:', currentTime);
    
    let visibleNodes = 0;
    let visibleLinks = 0;
    
    // Update node visibility
    node.each(function(d) {
        const nodeElement = d3.select(this);
        if (d.timestamp <= currentTime) {
            nodeElement.style('opacity', 1).classed('timeline-hidden', false);
            visibleNodes++;
            if (d.timestamp === currentTime) {
                nodeElement.classed('timeline-new', true);
                setTimeout(() => nodeElement.classed('timeline-new', false), 500);
                console.log('New node appeared:', d.name, 'at time:', d.timestamp);
            }
        } else {
            nodeElement.style('opacity', 0.3).classed('timeline-hidden', true);
        }
    });
    
    // Update link visibility
    link.each(function(d) {
        const linkElement = d3.select(this);
        if (d.timestamp <= currentTime) {
            linkElement.style('opacity', 1).classed('timeline-hidden', false);
            visibleLinks++;
            if (d.timestamp === currentTime) {
                linkElement.classed('timeline-new', true);
                setTimeout(() => linkElement.classed('timeline-new', false), 500);
                console.log('New link appeared at time:', d.timestamp);
            }
        } else {
            linkElement.style('opacity', 0.1).classed('timeline-hidden', true);
        }
    });
    
    console.log('Timeline update complete - visible nodes:', visibleNodes, 'visible links:', visibleLinks);
    
    // Add timestamp tooltips to nodes
    node.each(function(d) {
        const minutes = Math.floor(d.timestamp / 60);
        const seconds = d.timestamp % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        d3.select(this).attr('title', `${d.name} (${timeString})`);
    });
}

function updateCurrentTimeDisplay() {
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay && graphData.nodes.length > 0) {
        // Convert timeline position to real time
        const maxTime = Math.max(...graphData.nodes.map(n => n.timestamp));
        const timeProgress = currentTime / maxTime;
        
        // Get the actual timestamp for current position
        const sortedNodes = graphData.nodes.sort((a, b) => a.timestamp - b.timestamp);
        const currentTimestamp = sortedNodes[Math.floor(timeProgress * sortedNodes.length)]?.timestamp || 0;
        
        // Convert to readable time format
        const minutes = Math.floor(currentTimestamp / 60);
        const seconds = currentTimestamp % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeDisplay.textContent = timeString;
        
        // Update tooltip with more detailed info
        const currentNode = sortedNodes.find(n => n.timestamp >= currentTimestamp);
        if (currentNode) {
            timeDisplay.title = `${currentNode.name} (${timeString})`;
        }
    }
}

function clearSelection() {
    // Clear all selections
    selectedNodes = [];
    node.classed('selected', false);
    link.classed('selected', false);
    
    // Hide selection box and close button
    selectionBox.style('display', 'none');
    d3.select('.selection-close-btn').style('display', 'none');
    
    // Update node info panel
    updateNodeInfoForSelection();
}

// Update positions on simulation tick
simulation.on('tick', () => {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    nodeLabel
        .attr('x', d => d.x)
        .attr('y', d => d.y);
});

// Node click handler
node.on('click', function(event, d) {
    // Remove previous selections
    node.classed('selected', false);
    link.classed('selected', false);
    
    // Select clicked node
    d3.select(this).classed('selected', true);
    
    // Highlight connected links
    link.filter(l => l.source.id === d.id || l.target.id === d.id)
        .classed('selected', true);
    
    // Show node info box
    showNodeInfo(d);
    
    console.log('Selected node:', d);
});

// Function to show node info
function showNodeInfo(node) {
    // Count connections
    const connections = graphData.links.filter(l => 
        l.source.id === node.id || l.target.id === node.id
    ).length;
    
    // Get connected node names
    const connectedNodes = graphData.links
        .filter(l => l.source.id === node.id || l.target.id === node.id)
        .map(l => {
            if (l.source.id === node.id) {
                return graphData.nodes.find(n => n.id === l.target.id)?.name || 'Unknown';
            } else {
                return graphData.nodes.find(n => n.id === l.source.id)?.name || 'Unknown';
            }
        });
    
    // Update info box content
    document.getElementById('node-id').textContent = node.id;
    document.getElementById('node-name').textContent = node.name;
    document.getElementById('node-group').textContent = `Group ${node.group}`;
    document.getElementById('node-connections').textContent = `${connections} (${connectedNodes.join(', ')})`;
    document.getElementById('node-position').textContent = `(${Math.round(node.x)}, ${Math.round(node.y)})`;
    
    // Show the info box and details, hide placeholder
    const infoBox = document.getElementById('node-info-box');
    const placeholder = document.querySelector('.placeholder-message');
    const details = document.querySelector('.info-details');
    
    infoBox.classList.remove('hidden');
    placeholder.style.display = 'none';
    details.classList.remove('hidden');
}

// Close info box handler
document.getElementById('close-info').addEventListener('click', () => {
    const infoBox = document.getElementById('node-info-box');
    const placeholder = document.querySelector('.placeholder-message');
    const details = document.querySelector('.info-details');
    
    // Show placeholder, hide details
    placeholder.style.display = 'block';
    details.classList.add('hidden');
    
    // Clear node selection
    node.classed('selected', false);
    link.classed('selected', false);
});

// Close info box when clicking outside
document.addEventListener('click', (event) => {
    const infoBox = document.getElementById('node-info-box');
    const closeBtn = document.getElementById('close-info');
    const placeholder = document.querySelector('.placeholder-message');
    const details = document.querySelector('.info-details');
    
    if (!infoBox.contains(event.target) && !event.target.closest('.node')) {
        // Show placeholder, hide details
        placeholder.style.display = 'block';
        details.classList.add('hidden');
        
        // Clear node selection
        node.classed('selected', false);
        link.classed('selected', false);
    }
});

// Update info panel
function updateInfo() {
    document.getElementById('node-count').textContent = `Nodes: ${graphData.nodes.length}`;
    document.getElementById('edge-count').textContent = `Edges: ${graphData.links.length}`;
    generateAIInsights();
}

// Generate AI insights about the graph
function generateAIInsights() {
    const insights = [];
    
    // Analyze node connections
    const nodeConnections = graphData.nodes.map(node => {
        const connections = graphData.links.filter(link => 
            link.source.id === node.id || link.target.id === node.id
        ).length;
        return { node, connections };
    });
    
    // Find most connected node
    const mostConnected = nodeConnections.reduce((max, current) => 
        current.connections > max.connections ? current : max
    );
    
    if (mostConnected.connections > 0) {
        insights.push(`🔗 <strong>${mostConnected.node.name}</strong> has the most connections (${mostConnected.connections})`);
    }
    
    // Analyze group distributions
    const groupCounts = {};
    graphData.nodes.forEach(node => {
        groupCounts[node.group] = (groupCounts[node.group] || 0) + 1;
    });
    
    const groupNames = { 1: 'Agents', 2: 'Analysts', 3: 'Products' };
    const largestGroup = Object.keys(groupCounts).reduce((max, current) => 
        groupCounts[current] > groupCounts[max] ? current : max
    );
    
    insights.push(`📊 <strong>${groupNames[largestGroup]}</strong> is the largest group with ${groupCounts[largestGroup]} nodes`);
    
    // Analyze cross-group connections
    const crossConnections = graphData.links.filter(link => {
        const sourceGroup = typeof link.source === 'object' ? link.source.group : graphData.nodes.find(n => n.id === link.source)?.group;
        const targetGroup = typeof link.target === 'object' ? link.target.group : graphData.nodes.find(n => n.id === link.target)?.group;
        return sourceGroup !== targetGroup;
    }).length;
    
    if (crossConnections > 0) {
        insights.push(`🌐 There are <strong>${crossConnections}</strong> cross-group connections`);
    }
    
    // Find isolated nodes
    const isolatedNodes = graphData.nodes.filter(node => 
        !graphData.links.some(link => 
            link.source.id === node.id || link.target.id === node.id
        )
    );
    
    if (isolatedNodes.length > 0) {
        insights.push(`⚠️ <strong>${isolatedNodes.length}</strong> nodes are isolated (no connections)`);
    }
    
    // Analyze connection density
    const totalPossibleConnections = (graphData.nodes.length * (graphData.nodes.length - 1)) / 2;
    const connectionDensity = (graphData.links.length / totalPossibleConnections * 100).toFixed(1);
    
    insights.push(`📈 Connection density: <strong>${connectionDensity}%</strong>`);
    
    // Display insights
    const insightsContainer = document.getElementById('ai-insights');
    insightsContainer.innerHTML = insights.map(insight => 
        `<div class="insight-item">${insight}</div>`
    ).join('');
}

// AI Chat functionality
function addChatMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserQuestion(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Analyze the graph data for responses
    const nodeConnections = graphData.nodes.map(node => {
        const connections = graphData.links.filter(link => 
            link.source.id === node.id || link.target.id === node.id
        ).length;
        return { node, connections };
    });
    
    const groupCounts = {};
    graphData.nodes.forEach(node => {
        groupCounts[node.group] = (groupCounts[node.group] || 0) + 1;
    });
    
    const groupNames = { 1: 'Agents', 2: 'Analysts', 3: 'Products' };
    
    // Handle different types of questions
    if (lowerQuestion.includes('most connected') || lowerQuestion.includes('highest connections')) {
        const mostConnected = nodeConnections.reduce((max, current) => 
            current.connections > max.connections ? current : max
        );
        return `${mostConnected.node.name} has the most connections with ${mostConnected.connections} links.`;
    }
    
    if (lowerQuestion.includes('group') && lowerQuestion.includes('largest')) {
        const largestGroup = Object.keys(groupCounts).reduce((max, current) => 
            groupCounts[current] > groupCounts[max] ? current : max
        );
        return `The ${groupNames[largestGroup]} group is the largest with ${groupCounts[largestGroup]} nodes.`;
    }
    
    if (lowerQuestion.includes('total') && lowerQuestion.includes('node')) {
        return `There are ${graphData.nodes.length} total nodes in the graph.`;
    }
    
    if (lowerQuestion.includes('total') && lowerQuestion.includes('connection') || lowerQuestion.includes('edge')) {
        return `There are ${graphData.links.length} total connections in the graph.`;
    }
    
    if (lowerQuestion.includes('isolated') || lowerQuestion.includes('no connection')) {
        const isolatedNodes = graphData.nodes.filter(node => 
            !graphData.links.some(link => 
                link.source.id === node.id || link.target.id === node.id
            )
        );
        return `There are ${isolatedNodes.length} isolated nodes with no connections.`;
    }
    
    if (lowerQuestion.includes('density') || lowerQuestion.includes('connected')) {
        const totalPossibleConnections = (graphData.nodes.length * (graphData.nodes.length - 1)) / 2;
        const connectionDensity = (graphData.links.length / totalPossibleConnections * 100).toFixed(1);
        return `The graph has a connection density of ${connectionDensity}%.`;
    }
    
    if (lowerQuestion.includes('help') || lowerQuestion.includes('what can you do')) {
        return `I can help you analyze your graph! Try asking about:
• Most connected nodes
• Largest groups
• Total nodes/connections
• Isolated nodes
• Connection density
• Or any other graph metrics!`;
    }
    
    return `I'm not sure about that specific question. Try asking about connections, groups, or graph statistics. You can also ask "help" to see what I can do!`;
}

// Chat event listeners
document.getElementById('send-chat').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const question = input.value.trim();
    
    if (question) {
        addChatMessage(question, true);
        input.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = processUserQuestion(question);
            addChatMessage(response);
        }, 500);
    }
});

document.getElementById('chat-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('send-chat').click();
    }
});

// Add node button
document.getElementById('addNode').addEventListener('click', () => {
    const newNodeId = Math.max(...graphData.nodes.map(n => n.id)) + 1;
    const newNode = {
        id: newNodeId,
        name: `Node ${newNodeId}`,
        group: Math.floor(Math.random() * 5) + 1,
        x: Math.random() * width,
        y: Math.random() * height,
        timestamp: Math.floor(Math.random() * 100) // Add a timestamp
    };
    
    graphData.nodes.push(newNode);
    
    // Recreate visualization
    recreateGraph();
    updateInfo();
});

// Add edge button
document.getElementById('addEdge').addEventListener('click', () => {
    if (graphData.nodes.length < 2) {
        alert('Need at least 2 nodes to create an edge!');
        return;
    }
    
    const sourceNode = graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)];
    const targetNode = graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)];
    
    if (sourceNode.id !== targetNode.id) {
        const newLink = {
            source: sourceNode.id,
            target: targetNode.id,
            value: 1,
            timestamp: Math.floor(Math.random() * 100) // Add a timestamp
        };
        
        // Check if link already exists
        const linkExists = graphData.links.some(l => 
            (l.source.id === sourceNode.id && l.target.id === targetNode.id) ||
            (l.source.id === targetNode.id && l.target.id === sourceNode.id)
        );
        
        if (!linkExists) {
            graphData.links.push(newLink);
            recreateGraph();
            updateInfo();
        } else {
            alert('This edge already exists!');
        }
    }
});

// Reset button
document.getElementById('reset').addEventListener('click', () => {
    graphData = generateLargeGraph();
    recreateGraph();
    updateInfo();
});

// Function to recreate the entire graph
function recreateGraph() {
    // Clear existing elements in the group
    g.selectAll('*').remove();
    
    // Clear selection
    selectedNodes = [];
    
    // Update global variables for adaptive parameters
    const nodeCount = graphData.nodes.length;
    const isLargeDataset = nodeCount > 200;
    
    // Recreate links
    link = g.append('g')
        .selectAll('line')
        .data(graphData.links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('stroke-width', 1);
    
    // Recreate nodes
    console.log(`Creating ${graphData.nodes.length} nodes, isLargeDataset: ${isLargeDataset}`);
    node = g.append('g')
        .selectAll('circle')
        .data(graphData.nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', isLargeDataset ? 2 : 6)
        .attr('fill', d => color(d.group))
        .call(drag(simulation));
    console.log(`Created ${node.size()} node elements`);
    
    // Recreate labels
    nodeLabel = g.append('g')
        .selectAll('text')
        .data(graphData.nodes)
        .enter().append('text')
        .attr('class', 'node-label')
        .attr('dy', '.35em')
        .text(d => d.name);
    
    // Reattach event handlers
node.on('click', function(event, d) {
    event.stopPropagation(); // Prevent canvas click from deselecting
    
    console.log('Node clicked:', d.id, 'Shift key:', event.shiftKey);
    
    if (event.shiftKey) {
        // Multi-selection: toggle this node
        const isSelected = d3.select(this).classed('selected');
        d3.select(this).classed('selected', !isSelected);
        
        if (!isSelected) {
            // Add to selection
            selectedNodes.push(d.id);
        } else {
            // Remove from selection
            selectedNodes = selectedNodes.filter(id => id !== d.id);
        }
    } else {
        // Single selection: clear all and select only this one
        node.classed('selected', false);
        selectedNodes = [d.id];
        d3.select(this).classed('selected', true);
    }
    
    console.log('Selected nodes:', selectedNodes);
    console.log('Selected nodes count:', selectedNodes.length);
    
    // Update link highlighting
    link.classed('selected', false);
    if (selectedNodes.length > 0) {
        link.filter(d => {
            // Handle different link data structures
            let sourceId, targetId;
            
            if (typeof d.source === 'object' && d.source.id !== undefined) {
                sourceId = d.source.id;
            } else if (typeof d.source === 'number') {
                sourceId = d.source;
            } else {
                sourceId = d.source;
            }
            
            if (typeof d.target === 'object' && d.target.id !== undefined) {
                targetId = d.target.id;
            } else if (typeof d.target === 'number') {
                targetId = d.target;
            } else {
                targetId = d.target;
            }
            
            console.log('Link check:', { sourceId, targetId, selectedNodes });
            return selectedNodes.includes(sourceId) && selectedNodes.includes(targetId);
        }).classed('selected', true);
    }
    
    updateNodeInfoForSelection();
});
    
    // Update base parameters for new dataset
    const newNodeCount = graphData.nodes.length;
    const newIsLargeDataset = newNodeCount > 200;
    baseLinkDistance = newIsLargeDataset ? 30 : 40;
    baseChargeStrength = newIsLargeDataset ? -60 : -80;
    baseCollisionRadius = newIsLargeDataset ? 12 : 15;
    
    // Recreate simulation for force layout with adaptive parameters
    simulation.nodes(graphData.nodes);
    simulation.force('link').links(graphData.links);
    
    // Calculate group-based charge strength
    const groupChargeStrength = baseChargeStrength * densityMultiplier * groupSpacingMultiplier;
    
    // Calculate centering strength based on group spacing
    const centeringStrength = groupSpacingMultiplier < 1 ? (1 - groupSpacingMultiplier) * 0.3 : 0;
    
    simulation.force('link').distance(baseLinkDistance * densityMultiplier);
    simulation.force('charge').strength(groupChargeStrength);
    simulation.force('collision').radius(baseCollisionRadius * densityMultiplier);
    
    // Add or update centering force
    if (centeringStrength > 0) {
        simulation.force('center', d3.forceCenter(width / 2, height / 2).strength(centeringStrength));
    } else {
        simulation.force('center', d3.forceCenter(width / 2, height / 2));
    }
    
    simulation.alpha(1).restart();
    
    // Update tick function
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        nodeLabel
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
    
    // Ensure all elements are visible after recreation
    link.style('display', 'block');
    node.style('display', 'block');
    nodeLabel.style('display', 'block');
    
    // Recreate selection box and close button
    selectionBox = g.append('rect')
        .attr('class', 'selection-box')
        .attr('fill', 'rgba(0, 123, 255, 0.1)')
        .attr('stroke', 'rgba(0, 123, 255, 0.5)')
        .attr('stroke-width', 1)
        .style('display', 'none');
    
    const selectionCloseBtn = g.append('g')
        .attr('class', 'selection-close-btn')
        .style('display', 'none')
        .style('cursor', 'pointer')
        .on('click', clearSelection);
    
    selectionCloseBtn.append('circle')
        .attr('r', 8)
        .attr('fill', 'white')
        .attr('stroke', 'rgba(0, 123, 255, 0.8)')
        .attr('stroke-width', 1);
    
    selectionCloseBtn.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', 'rgba(0, 123, 255, 0.8)')
        .text('×');
}

// Initialize info panel
updateInfo();

// Initialize legend labels
updateLegendLabels('agents-analysts-products');





// Update visualization without simulation
function updateVisualization() {
    // Update link positions
    link
        .attr('x1', d => {
            const source = typeof d.source === 'object' ? d.source : graphData.nodes.find(n => n.id === d.source);
            return source.x;
        })
        .attr('y1', d => {
            const source = typeof d.source === 'object' ? d.source : graphData.nodes.find(n => n.id === d.source);
            return source.y;
        })
        .attr('x2', d => {
            const target = typeof d.target === 'object' ? d.target : graphData.nodes.find(n => n.id === d.target);
            return target.x;
        })
        .attr('y2', d => {
            const target = typeof d.target === 'object' ? d.target : graphData.nodes.find(n => n.id === d.target);
            return target.y;
        });

    // Update node positions
    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    // Update label positions
    nodeLabel
        .attr('x', d => d.x)
        .attr('y', d => d.y);
}



// Zoom control handlers
document.getElementById('zoomIn').addEventListener('click', () => {
    svg.transition().duration(300).call(
        zoom.scaleBy, 1.3
    );
});

document.getElementById('zoomOut').addEventListener('click', () => {
    svg.transition().duration(300).call(
        zoom.scaleBy, 1 / 1.3
    );
});

document.getElementById('zoomReset').addEventListener('click', () => {
    svg.transition().duration(300).call(
        zoom.transform, d3.zoomIdentity
    );
});

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    svg.attr('width', newWidth).attr('height', newHeight);
    simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(1).restart();
});

// Handle dataset selector change
document.getElementById('dataset-selector').addEventListener('change', (event) => {
    switchDataset(event.target.value);
});

// Handle legend toggle switches
document.getElementById('toggle-agents').addEventListener('change', (event) => {
    toggleNodeType(1, event.target.checked);
});

document.getElementById('toggle-analysts').addEventListener('change', (event) => {
    toggleNodeType(2, event.target.checked);
});

document.getElementById('toggle-products').addEventListener('change', (event) => {
    toggleNodeType(3, event.target.checked);
});

// Apply colors to toggle switches
document.querySelector('#toggle-agents + .slider').classList.add('agents-color');
document.querySelector('#toggle-analysts + .slider').classList.add('analysts-color');
document.querySelector('#toggle-products + .slider').classList.add('products-color');

// Multi-select mode variables (Commented Out)
// let isMultiSelectMode = false;

// Multi-select mode toggle handler (Commented Out)
/*
document.getElementById('toggle-multi-select').addEventListener('change', function() {
    isMultiSelectMode = this.checked;
    const statusElement = document.querySelector('.multi-select-status');
    
    if (isMultiSelectMode) {
        statusElement.textContent = 'On';
        statusElement.style.color = '#28a745';
        console.log('Multi-select mode enabled');
    } else {
        statusElement.textContent = 'Off';
        statusElement.style.color = 'var(--text-color)';
        // Clear any existing multi-selection when turning off
        if (selectedNodes.length > 1) {
            selectedNodes = [];
            node.classed('selected', false);
            link.classed('selected', false);
            updateNodeInfoForSelection();
        }
        console.log('Multi-select mode disabled');
    }
});
*/

// Start real-time clock
function updateRealTimeClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    // Update any real-time display elements
    const realTimeElements = document.querySelectorAll('.real-time-clock');
    realTimeElements.forEach(el => {
        el.textContent = timeString;
    });
}

// Update clock every second
setInterval(updateRealTimeClock, 1000);
updateRealTimeClock(); // Initial call



// Timeline controls
console.log('Setting up timeline event listeners...');
document.getElementById('timeline-toggle').addEventListener('click', toggleTimelineMode);
document.getElementById('timeline-slider').addEventListener('input', handleTimelineScrub);
document.getElementById('timeline-play').addEventListener('click', playTimeline);
document.getElementById('timeline-pause').addEventListener('click', pauseTimeline);
document.getElementById('timeline-reset').addEventListener('click', resetTimeline);

// Speed control
document.getElementById('timeline-speed').addEventListener('change', (event) => {
    timelineSpeed = parseFloat(event.target.value);
    console.log('Timeline speed changed to:', timelineSpeed);
    
    // If timeline is currently playing, restart it with new speed
    if (timelineInterval) {
        pauseTimeline();
        playTimeline();
    }
});

console.log('Timeline event listeners attached');

// Debug: Add global mouse event listener to test if events are being captured
document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        console.log('Shift key pressed');
    }
});

// Function to reset legend toggles to show all node types
function resetLegendToggles() {
    // Reset all checkboxes to checked (show all nodes)
    document.getElementById('toggle-agents').checked = true;
    document.getElementById('toggle-analysts').checked = true;
    document.getElementById('toggle-products').checked = true;
    
    // Show all nodes, labels, and links
    if (node) node.style('display', 'block');
    if (nodeLabel) nodeLabel.style('display', 'block');
    if (link) link.style('display', 'block');
}

// Function to update legend labels based on dataset
function updateLegendLabels(datasetName) {
    const legendAgents = document.getElementById('legend-agents');
    const legendAnalysts = document.getElementById('legend-analysts');
    const legendProducts = document.getElementById('legend-products');
    
    if (datasetName === 'collaborative-session') {
        legendAgents.textContent = 'Human Commands';
        legendAnalysts.textContent = 'AI Responses';
        legendProducts.textContent = 'Code Changes';
    } else {
        legendAgents.textContent = 'Agents';
        legendAnalysts.textContent = 'Analysts';
        legendProducts.textContent = 'Products';
    }
}

// Function to clear chat messages
function clearChatMessages() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
}

// Function to toggle node types
function toggleNodeType(groupId, visible) {
    console.log(`Toggling group ${groupId}, visible: ${visible}`);
    
    if (visible) {
        // Show nodes of this type
        node.filter(d => d.group === groupId).style('display', 'block');
        nodeLabel.filter(d => d.group === groupId).style('display', 'block');
    } else {
        // Hide nodes of this type
        node.filter(d => d.group === groupId).style('display', 'none');
        nodeLabel.filter(d => d.group === groupId).style('display', 'none');
    }
    
    // Simple link visibility - hide links connected to hidden nodes
    link.style('display', function(d) {
        const sourceGroup = typeof d.source === 'object' ? d.source.group : graphData.nodes.find(n => n.id === d.source)?.group;
        const targetGroup = typeof d.target === 'object' ? d.target.group : graphData.nodes.find(n => n.id === d.target)?.group;
        
        const sourceVisible = document.getElementById(`toggle-${sourceGroup === 1 ? 'agents' : sourceGroup === 2 ? 'analysts' : 'products'}`).checked;
        const targetVisible = document.getElementById(`toggle-${targetGroup === 1 ? 'agents' : targetGroup === 2 ? 'analysts' : 'products'}`).checked;
        
        return sourceVisible && targetVisible ? 'block' : 'none';
    });
}

// Dark mode functionality

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const toggleBtn = document.getElementById('darkModeToggle');
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
        toggleBtn.title = 'Switch to Light Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleBtn.textContent = '🌙';
        toggleBtn.title = 'Switch to Dark Mode';
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

function initializeDarkMode() {
    // Check for saved preference or default to light mode
    const savedDarkMode = localStorage.getItem('darkMode');
    isDarkMode = savedDarkMode === 'true';
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeToggle').textContent = '☀️';
        document.getElementById('darkModeToggle').title = 'Switch to Light Mode';
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initializeDarkMode);

// Dark mode toggle event listener
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Density control functionality
function updateDensity(value) {
    densityMultiplier = parseFloat(value);
    
    // Update the display
    document.getElementById('densityValue').textContent = `${densityMultiplier.toFixed(1)}x`;
    
    // Update simulation forces
    updateSimulationForces();
}

function updateGroupSpacing(value) {
    groupSpacingMultiplier = parseFloat(value);
    
    // Update the display
    document.getElementById('groupSpacingValue').textContent = `${groupSpacingMultiplier.toFixed(1)}x`;
    
    // Update simulation forces
    updateSimulationForces();
}

function updateSimulationForces() {
    // Calculate group-based charge strength
    const groupChargeStrength = baseChargeStrength * densityMultiplier * groupSpacingMultiplier;
    
    // Calculate centering strength based on group spacing
    // Lower group spacing = stronger centering force to pull groups together
    const centeringStrength = groupSpacingMultiplier < 1 ? (1 - groupSpacingMultiplier) * 0.3 : 0;
    
    // Update simulation forces
    simulation.force('link').distance(baseLinkDistance * densityMultiplier);
    simulation.force('charge').strength(groupChargeStrength);
    simulation.force('collision').radius(baseCollisionRadius * densityMultiplier);
    
    // Add or update centering force
    if (centeringStrength > 0) {
        simulation.force('center', d3.forceCenter(width / 2, height / 2).strength(centeringStrength));
    } else {
        simulation.force('center', d3.forceCenter(width / 2, height / 2));
    }
    
    // Restart simulation with new parameters
    simulation.alpha(0.3).restart();
}

// Density slider event listener
document.getElementById('density-slider').addEventListener('input', (event) => {
    updateDensity(event.target.value);
});

// Group spacing slider event listener
document.getElementById('group-spacing-slider').addEventListener('input', (event) => {
    updateGroupSpacing(event.target.value);
});



 