// Initialize the dashboard
let dashboardData = {
    pickingTasks: 0,
    orderVolumes: 0,
    employeePerformance: 0,
    waveTasks: 0,
    trainingCompleted: 0,
    itemVerification: 0,
    volumeProcessed: 0,
    bashQueries: 0,
    packingTotes: 0,
    inventoryMismatch: 0,
    systemErrors: 0,
    performanceImprovement: 0,
    slaCompliance: 0,
    operationsEfficiency: 0
};

// Sample operational data for realistic simulation
const sampleOrders = [
    { id: 'ORD-001', customer: 'John Smith', status: 'Picking', items: 5, priority: 'High' },
    { id: 'ORD-002', customer: 'Sarah Johnson', status: 'Packing', items: 3, priority: 'Normal' },
    { id: 'ORD-003', customer: 'Mike Davis', status: 'Completed', items: 8, priority: 'High' },
    { id: 'ORD-004', customer: 'Emily Brown', status: 'Pending', items: 2, priority: 'Normal' },
    { id: 'ORD-005', customer: 'David Wilson', status: 'Picking', items: 6, priority: 'High' }
];

const sampleEmployees = [
    { name: 'Alex Turner', efficiency: 92, trained: true, tasksCompleted: 45 },
    { name: 'Maria Garcia', efficiency: 88, trained: true, tasksCompleted: 42 },
    { name: 'James Lee', efficiency: 76, trained: false, tasksCompleted: 38 },
    { name: 'Linda Chen', efficiency: 95, trained: true, tasksCompleted: 51 },
    { name: 'Robert Taylor', efficiency: 83, trained: true, tasksCompleted: 40 }
];

const sampleWaves = [
    { id: 'WAVE-101', status: 'Complete', completedTime: '45 min', items: 120 },
    { id: 'WAVE-102', status: 'In Progress', completedTime: '35 min', items: 95 },
    { id: 'WAVE-103', status: 'Pending', completedTime: '-', items: 110 }
];

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    
    // Load saved data from localStorage if available
    loadDashboardData();
    
    // Initialize with sample data
    initializeSampleData();
    
    // Update dashboard
    updateAllMetrics();
    
    // Start automatic updates every 5 seconds
    setInterval(simulateRealtimeUpdates, 5000);
    
    addLogEntry('System initialized successfully');
});

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('currentTime').textContent = timeString;
}

function initializeSampleData() {
    dashboardData.pickingTasks = 15;
    dashboardData.orderVolumes = 47;
    dashboardData.employeePerformance = 87;
    dashboardData.waveTasks = 3;
    dashboardData.trainingCompleted = 4;
    dashboardData.itemVerification = 98.5;
    dashboardData.volumeProcessed = 1247;
    dashboardData.bashQueries = 0;
    dashboardData.packingTotes = 28;
    dashboardData.inventoryMismatch = 2;
    dashboardData.systemErrors = 0;
    dashboardData.performanceImprovement = 15;
    dashboardData.slaCompliance = 94;
    dashboardData.operationsEfficiency = 82;
}

function updateAllMetrics() {
    // Update monitoring metrics
    document.getElementById('pickingTasks').textContent = dashboardData.pickingTasks;
    document.getElementById('orderVolumes').textContent = dashboardData.orderVolumes;
    document.getElementById('empPerformance').textContent = dashboardData.employeePerformance + '%';
    document.getElementById('waveTasks').textContent = dashboardData.waveTasks;
    document.getElementById('trainingMetric').textContent = dashboardData.trainingCompleted + '/' + sampleEmployees.length;
    document.getElementById('itemVerification').textContent = dashboardData.itemVerification + '%';
    document.getElementById('volumeMonitoring').textContent = dashboardData.volumeProcessed;
    document.getElementById('bashFeedback').textContent = dashboardData.bashQueries;
    document.getElementById('packingTotes').textContent = dashboardData.packingTotes;
    document.getElementById('inventoryMismatch').textContent = dashboardData.inventoryMismatch;
    document.getElementById('systemErrors').textContent = dashboardData.systemErrors;
    
    // Update outcomes
    document.getElementById('performanceProgress').style.width = dashboardData.performanceImprovement + '%';
    document.getElementById('performanceValue').textContent = dashboardData.performanceImprovement + '% improvement';
    
    document.getElementById('slaProgress').style.width = dashboardData.slaCompliance + '%';
    document.getElementById('slaValue').textContent = dashboardData.slaCompliance + '% compliance';
    
    document.getElementById('opsProgress').style.width = dashboardData.operationsEfficiency + '%';
    document.getElementById('opsValue').textContent = dashboardData.operationsEfficiency + '% efficiency gain';
    
    // Generate insights based on data
    generateInsights();
    
    // Save to localStorage
    saveDashboardData();
}

function handleBashQuery() {
    const input = document.getElementById('bashInput').value.trim();
    const responseDiv = document.getElementById('bashResponse');
    
    if (!input) {
        responseDiv.textContent = 'Error: Please enter a query.';
        return;
    }
    
    dashboardData.bashQueries++;
    
    // Process query and generate response
    const response = processQuery(input);
    responseDiv.textContent = response;
    
    // Clear input
    document.getElementById('bashInput').value = '';
    
    // Update metrics
    updateAllMetrics();
    
    // Log the query
    addLogEntry('Bash query received: ' + input.substring(0, 50) + '...');
}

function processQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Customer orders queries
    if (lowerQuery.includes('order') || lowerQuery.includes('customer')) {
        if (lowerQuery.includes('status') || lowerQuery.includes('track')) {
            return generateOrderStatusResponse();
        }
        if (lowerQuery.includes('volume') || lowerQuery.includes('count') || lowerQuery.includes('how many')) {
            return `Current Order Status:\n\nTotal orders today: ${dashboardData.orderVolumes}\nActive orders: ${sampleOrders.filter(o => o.status !== 'Completed').length}\nCompleted orders: ${sampleOrders.filter(o => o.status === 'Completed').length}\nPending orders: ${sampleOrders.filter(o => o.status === 'Pending').length}`;
        }
    }
    
    // Wave queries
    if (lowerQuery.includes('wave')) {
        return generateWaveStatusResponse();
    }
    
    // Training queries
    if (lowerQuery.includes('training') || lowerQuery.includes('employee')) {
        return generateTrainingResponse();
    }
    
    // Stock/inventory queries
    if (lowerQuery.includes('stock') || lowerQuery.includes('inventory') || lowerQuery.includes('replenish')) {
        return generateStockResponse();
    }
    
    // Performance queries
    if (lowerQuery.includes('performance') || lowerQuery.includes('efficiency')) {
        return generatePerformanceResponse();
    }
    
    // Quality audit queries
    if (lowerQuery.includes('quality') || lowerQuery.includes('audit')) {
        return generateQualityResponse();
    }
    
    // SLA queries
    if (lowerQuery.includes('sla')) {
        return `SLA Performance Report:\n\nCurrent SLA Compliance: ${dashboardData.slaCompliance}%\nTarget: 95%\nStatus: ${dashboardData.slaCompliance >= 95 ? 'Meeting Target' : 'Below Target'}\n\nRecommendation: ${dashboardData.slaCompliance < 95 ? 'Focus on reducing picking time and improving wave completion rates.' : 'Continue maintaining current performance levels.'}`;
    }
    
    // Default response
    return `Query received: "${query}"\n\nAvailable query topics:\n- Customer orders (status, volume, tracking)\n- Wave completion status\n- Employee training and performance\n- Stock replenishment\n- Quality audit rates\n- SLA compliance\n- System metrics\n\nPlease try a more specific query about these topics.`;
}

function generateOrderStatusResponse() {
    let response = 'Customer Order Status Report:\n\n';
    sampleOrders.forEach(order => {
        response += `${order.id} - ${order.customer}\n`;
        response += `  Status: ${order.status}\n`;
        response += `  Items: ${order.items}\n`;
        response += `  Priority: ${order.priority}\n\n`;
    });
    return response;
}

function generateWaveStatusResponse() {
    let response = 'Wave Completion Status:\n\n';
    sampleWaves.forEach(wave => {
        response += `${wave.id}: ${wave.status}\n`;
        response += `  Items: ${wave.items}\n`;
        response += `  Time: ${wave.completedTime}\n\n`;
    });
    response += `Average completion time: ${Math.round(Math.random() * 15 + 40)} minutes\n`;
    response += `Waves completed on time: ${Math.round(sampleWaves.filter(w => w.status === 'Complete').length / sampleWaves.length * 100)}%`;
    return response;
}

function generateTrainingResponse() {
    let response = 'Employee Training Status:\n\n';
    sampleEmployees.forEach(emp => {
        response += `${emp.name}: ${emp.trained ? '✓ Trained' : '✗ Not Trained'}\n`;
        response += `  Efficiency: ${emp.efficiency}%\n`;
        response += `  Tasks Completed: ${emp.tasksCompleted}\n\n`;
    });
    const trainedCount = sampleEmployees.filter(e => e.trained).length;
    response += `Overall: ${trainedCount}/${sampleEmployees.length} employees trained (${Math.round(trainedCount/sampleEmployees.length*100)}%)`;
    return response;
}

function generateStockResponse() {
    const avgTime = Math.round(Math.random() * 3 + 2);
    return `Stock Replenishment Analysis:\n\nAverage replenishment time: ${avgTime} hours\nTarget time: 2 hours\nStatus: ${avgTime > 2 ? 'DELAYED' : 'ON TIME'}\n\nDelays caused by:\n- Warehouse congestion (35%)\n- Staff shortage during peak hours (25%)\n- Inventory system delays (20%)\n- Supplier delays (20%)\n\nRecommendation: Increase staff during peak hours and optimize warehouse layout for faster replenishment.`;
}

function generatePerformanceResponse() {
    let response = 'Performance Metrics:\n\n';
    response += `Average Employee Efficiency: ${dashboardData.employeePerformance}%\n`;
    response += `Top Performer: ${sampleEmployees[0].name} (${sampleEmployees[0].efficiency}%)\n`;
    response += `Items Verified: ${dashboardData.itemVerification}%\n`;
    response += `Volume Processed Today: ${dashboardData.volumeProcessed} units\n\n`;
    response += `Performance Improvement: ${dashboardData.performanceImprovement}%\n`;
    response += `Operations Efficiency: ${dashboardData.operationsEfficiency}%`;
    return response;
}

function generateQualityResponse() {
    const currentRate = 5;
    const proposedRate = 10;
    return `Quality Audit Analysis:\n\nCurrent audit rate: ${currentRate}%\nProposed audit rate: ${proposedRate}%\n\nImpact Analysis:\n- Additional items for audit: ${Math.round(dashboardData.volumeProcessed * 0.05)} units/day\n- Estimated time increase: 30-45 minutes\n- Quality improvement expected: 15-20%\n\nRecommendation: Gradual increase to ${proposedRate}% over 2 weeks to allow resource adjustment.`;
}

// Checklist functions
function checkWaves() {
    const statusElement = document.getElementById('wavesStatus');
    const timeElement = document.getElementById('wavesTime');
    
    const completedWaves = sampleWaves.filter(w => w.status === 'Complete').length;
    const totalWaves = sampleWaves.length;
    const isComplete = completedWaves === totalWaves;
    
    statusElement.innerHTML = isComplete 
        ? '<span class="status-badge complete">All Complete ✓</span>'
        : `<span class="status-badge warning">${completedWaves}/${totalWaves} Complete</span>`;
    
    timeElement.textContent = new Date().toLocaleTimeString();
    addLogEntry(`Wave status checked: ${completedWaves}/${totalWaves} complete`);
}

function checkTraining() {
    const statusElement = document.getElementById('trainingStatus');
    const rateElement = document.getElementById('trainingRate');
    
    const trainedCount = sampleEmployees.filter(e => e.trained).length;
    const totalCount = sampleEmployees.length;
    const rate = Math.round(trainedCount / totalCount * 100);
    
    statusElement.innerHTML = rate === 100
        ? '<span class="status-badge complete">All Trained ✓</span>'
        : `<span class="status-badge warning">${trainedCount}/${totalCount} Trained</span>`;
    
    rateElement.textContent = rate + '%';
    addLogEntry(`Training check: ${rate}% employees trained`);
}

function analyzeStock() {
    const statusElement = document.getElementById('stockStatus');
    const timeElement = document.getElementById('stockTime');
    
    const avgTime = Math.round(Math.random() * 2 + 2);
    statusElement.innerHTML = avgTime <= 2
        ? '<span class="status-badge complete">On Time ✓</span>'
        : `<span class="status-badge warning">Delayed (${avgTime}h)</span>`;
    
    timeElement.textContent = avgTime + 'h';
    addLogEntry(`Stock replenishment analysis: Average ${avgTime}h (Target: 2h)`);
}

function adjustQuality() {
    const statusElement = document.getElementById('qualityStatus');
    const targetElement = document.getElementById('qualityTarget');
    
    const newRate = Math.min(parseInt(targetElement.textContent) + 1, 15);
    targetElement.textContent = newRate + '%';
    statusElement.innerHTML = `<span class="status-badge complete">Adjusted to ${newRate}% ✓</span>`;
    
    addLogEntry(`Quality audit rate adjusted to ${newRate}%`);
}

// Generate insights based on current data
function generateInsights() {
    const container = document.getElementById('insightsContainer');
    const insights = [];
    
    // Check for critical issues
    if (dashboardData.systemErrors > 0) {
        insights.push({
            type: 'critical',
            icon: '🚨',
            title: 'System Errors Detected',
            message: `${dashboardData.systemErrors} system error(s) require immediate attention. Check logs and resolve issues.`
        });
    }
    
    if (dashboardData.inventoryMismatch > 5) {
        insights.push({
            type: 'critical',
            icon: '⚠️',
            title: 'Inventory Mismatch Alert',
            message: `${dashboardData.inventoryMismatch} inventory mismatches detected. Conduct physical count and system reconciliation.`
        });
    }
    
    // Check for warnings
    if (dashboardData.employeePerformance < 85) {
        insights.push({
            type: 'warning',
            icon: '📊',
            title: 'Performance Below Target',
            message: `Average employee efficiency is ${dashboardData.employeePerformance}%. Consider additional training or process optimization.`
        });
    }
    
    if (dashboardData.slaCompliance < 95) {
        insights.push({
            type: 'warning',
            icon: '⏰',
            title: 'SLA Compliance Issue',
            message: `SLA compliance at ${dashboardData.slaCompliance}%, below target of 95%. Focus on reducing order processing time.`
        });
    }
    
    // Check for positive insights
    if (dashboardData.itemVerification >= 98) {
        insights.push({
            type: 'success',
            icon: '✅',
            title: 'Excellent Verification Rate',
            message: `Item verification accuracy at ${dashboardData.itemVerification}%. Maintain current quality standards.`
        });
    }
    
    if (dashboardData.performanceImprovement > 10) {
        insights.push({
            type: 'success',
            icon: '📈',
            title: 'Performance Improvement',
            message: `${dashboardData.performanceImprovement}% performance improvement achieved. Continue monitoring for sustained growth.`
        });
    }
    
    // Operational insights
    if (dashboardData.pickingTasks > 20) {
        insights.push({
            type: 'warning',
            icon: '📦',
            title: 'High Picking Load',
            message: `${dashboardData.pickingTasks} active picking tasks. Consider redistributing workload or adding staff.`
        });
    }
    
    // Default insight if none generated
    if (insights.length === 0) {
        insights.push({
            type: '',
            icon: '✨',
            title: 'Operations Running Smoothly',
            message: 'All metrics within acceptable ranges. Continue monitoring for any changes.'
        });
    }
    
    // Update insights container
    container.innerHTML = insights.map(insight => `
        <div class="insight-item ${insight.type}">
            <div class="insight-icon">${insight.icon}</div>
            <div class="insight-content">
                <h4>${insight.title}</h4>
                <p>${insight.message}</p>
            </div>
        </div>
    `).join('');
}

// Simulate real-time updates
function simulateRealtimeUpdates() {
    // Randomly update some metrics
    dashboardData.orderVolumes += Math.floor(Math.random() * 3);
    dashboardData.volumeProcessed += Math.floor(Math.random() * 50);
    
    if (Math.random() > 0.7) {
        dashboardData.pickingTasks += Math.floor(Math.random() * 3) - 1;
        dashboardData.pickingTasks = Math.max(0, dashboardData.pickingTasks);
    }
    
    if (Math.random() > 0.9) {
        dashboardData.inventoryMismatch += Math.random() > 0.5 ? 1 : -1;
        dashboardData.inventoryMismatch = Math.max(0, dashboardData.inventoryMismatch);
    }
    
    // Gradually improve metrics
    if (Math.random() > 0.8) {
        dashboardData.performanceImprovement = Math.min(100, dashboardData.performanceImprovement + 0.5);
        dashboardData.slaCompliance = Math.min(100, dashboardData.slaCompliance + 0.3);
        dashboardData.operationsEfficiency = Math.min(100, dashboardData.operationsEfficiency + 0.4);
    }
    
    updateAllMetrics();
}

// Log management
function addLogEntry(message) {
    const logContainer = document.getElementById('alertLog');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">${timeString}</span>
        <span class="log-message">${message}</span>
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 20 entries
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Data persistence
function saveDashboardData() {
    try {
        localStorage.setItem('warehouseDashboardData', JSON.stringify(dashboardData));
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

function loadDashboardData() {
    try {
        const saved = localStorage.getItem('warehouseDashboardData');
        if (saved) {
            dashboardData = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading data:', e);
    }
}

// Allow Enter key to submit queries
document.addEventListener('DOMContentLoaded', function() {
    const bashInput = document.getElementById('bashInput');
    if (bashInput) {
        bashInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleBashQuery();
            }
        });
    }
});
