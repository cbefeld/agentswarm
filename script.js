// Graph data structure
let graphData = {
    nodes: [],
    links: []
};

// Box selection variables
let selectedNodes = [];
let isBoxSelecting = false;
let selectionBox = null;
let selectionStart = null;

// Dataset library
const datasets = {
    'agents-analysts-products': generateAgentsAnalystsProducts,
    'agents-analysts-products-xxl': generateAgentsAnalystsProductsXXL
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
            y: Math.random() * 800
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
                        type: 'internal'
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
                type: 'cross' // Mark as cross connection
            });
        }
    }
    
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
            y: Math.random() * 800
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
                        type: 'internal'
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
                type: 'cross' // Mark as cross connection
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
        recreateGraph();
        
        // Reset legend toggles to show all node types
        resetLegendToggles();
        
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
   .on('mouseup', handleMouseUp);

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

const simulation = d3.forceSimulation(graphData.nodes)
    .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(isLargeDataset ? 30 : 40))
    .force('charge', d3.forceManyBody().strength(isLargeDataset ? -60 : -80))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(isLargeDataset ? 12 : 15));

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

// Drag behavior
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
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
        
        // Find nodes within the selection box
        const selectedNodeIds = [];
        node.each(function(d) {
            const nodeX = d.x;
            const nodeY = d.y;
            
            console.log(`Node ${d.id} at graph coords: (${nodeX}, ${nodeY})`);
            
            if (nodeX >= boxX && nodeX <= boxX + boxWidth &&
                nodeY >= boxY && nodeY <= boxY + boxHeight) {
                selectedNodeIds.push(d.id);
                console.log(`Node ${d.id} is within selection box`);
            }
        });
        
        console.log('Found nodes in selection:', selectedNodeIds);
        
        // Update selection
        if (selectedNodeIds.length > 0) {
            selectNodes(selectedNodeIds);
        }
        
        // Hide selection box and close button
        selectionBox.style('display', 'none');
        d3.select('.selection-close-btn').style('display', 'none');
        selectionStart = null;
    }
}

function selectNodes(nodeIds) {
    console.log('selectNodes called with:', nodeIds);
    
    // Clear previous selection
    selectedNodes = [];
    node.classed('selected', false);
    link.classed('selected', false);
    
    // Add new selection
    selectedNodes = nodeIds;
    
    // Highlight selected nodes
    const selectedNodeElements = node.filter(d => selectedNodes.includes(d.id));
    selectedNodeElements.classed('selected', true);
    console.log('Applied selected class to', selectedNodeElements.size(), 'nodes');
    
    // Highlight connected links
    const selectedLinkElements = link.filter(d => {
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetId = typeof d.target === 'object' ? d.target.id : d.target;
        return selectedNodes.includes(sourceId) || selectedNodes.includes(targetId);
    });
    selectedLinkElements.classed('selected', true);
    console.log('Applied selected class to', selectedLinkElements.size(), 'links');
    
    // Update node info panel
    updateNodeInfoForSelection();
}

function updateNodeInfoForSelection() {
    console.log('Updating node info for selection:', selectedNodes);
    
    const infoDetails = document.getElementById('info-details');
    const placeholderMessage = document.getElementById('placeholder-message');
    
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
        y: Math.random() * height
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
            value: 1
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
    // If Shift is held, add to selection instead of replacing
    if (event.shiftKey) {
        if (selectedNodes.includes(d.id)) {
            // Remove from selection
            selectedNodes = selectedNodes.filter(id => id !== d.id);
        } else {
            // Add to selection
            selectedNodes.push(d.id);
        }
        selectNodes(selectedNodes);
    } else {
        // Single node selection
        selectedNodes = [d.id];
        selectNodes(selectedNodes);
    }
    console.log('Selected node:', d);
});
    
    // Recreate simulation for force layout with adaptive parameters
    simulation.nodes(graphData.nodes);
    simulation.force('link').links(graphData.links);
    simulation.force('link').distance(isLargeDataset ? 30 : 40);
    simulation.force('charge').strength(isLargeDataset ? -60 : -80);
    simulation.force('collision').radius(isLargeDataset ? 12 : 15);
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



 