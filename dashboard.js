/**
 * E-commerce Operations Dashboard - Interactive Features
 * Handles query processing, metrics updates, and checklist actions
 */

// Sample data store
const dashboardData = {
    metrics: {
        waveCompletion: 95,
        employeeTraining: 87,
        stockReplenishment: 2.5,
        qualityAudit: 5,
        pickingEfficiency: 92,
        orderVolume: 1247,
        slaCompliance: 96,
        inventoryAccuracy: 98.5,
        systemUptime: 99.2,
        activeEmployees: 47,
        pendingTasks: 23
    },
    employees: [
        { id: 'EMP-001', name: 'John Smith', trained: true },
        { id: 'EMP-002', name: 'Jane Doe', trained: true },
        { id: 'EMP-003', name: 'Bob Johnson', trained: false },
        { id: 'EMP-004', name: 'Alice Brown', trained: true },
        { id: 'EMP-005', name: 'Charlie Davis', trained: false },
        { id: 'EMP-006', name: 'Diana Wilson', trained: true }
    ],
    waves: [
        { id: 'W-001', complete: true, time: 55 },
        { id: 'W-002', complete: true, time: 65 },
        { id: 'W-003', complete: false, time: 30 }
    ]
};

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupExcelGenerator();
    loadSavedData(); // Loads saved data and updates display
    updateMetrics();
    setInterval(updateMetrics, 5000); // Update every 5 seconds
    initializeDataEntryForm();
    loadAndDisplayEntries();
});

// Initialize dashboard functionality
function initializeDashboard() {
    const queryInput = document.getElementById('queryInput');
    const submitButton = document.getElementById('submitQuery');

    // Handle query submission
    submitButton.addEventListener('click', handleQuery);
    queryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleQuery();
        }
    });
}

// Handle Bash-style queries
function handleQuery() {
    const queryInput = document.getElementById('queryInput');
    const queryResponse = document.getElementById('queryResponse');
    const query = queryInput.value.trim().toLowerCase();

    if (!query) {
        queryResponse.textContent = '⚠️ Please enter a query.';
        return;
    }

    let response = processQuery(query);
    queryResponse.textContent = response;

    // Save to localStorage
    saveQueryHistory(query, response);
}

// Process different types of queries
function processQuery(query) {
    const timestamp = new Date().toLocaleTimeString();

    // Customer order queries
    if (query.includes('order') && query.includes('status')) {
        return `[${timestamp}] 📦 Order Status Report:\n` +
               `- Total Orders Today: ${dashboardData.metrics.orderVolume}\n` +
               `- Pending: 45\n` +
               `- Processing: 178\n` +
               `- Shipped: 892\n` +
               `- Delivered: 120\n` +
               `- Average Processing Time: 3.2 hours`;
    }

    if (query.includes('order') && (query.includes('volume') || query.includes('many'))) {
        return `[${timestamp}] 📊 Order Volume:\n` +
               `- Today: ${dashboardData.metrics.orderVolume} orders\n` +
               `- Yesterday: 1,189 orders\n` +
               `- This Week Average: 1,227 orders/day\n` +
               `- Trend: +4.9% vs last week`;
    }

    // Wave completion queries
    if (query.includes('wave')) {
        const completed = dashboardData.waves.filter(w => w.complete).length;
        const total = dashboardData.waves.length;
        return `[${timestamp}] 🔄 Wave Completion Status:\n` +
               `- Completed: ${completed}/${total} waves\n` +
               `- Current Rate: ${dashboardData.metrics.waveCompletion}%\n` +
               `- Average Time: 63 minutes\n` +
               `- Target: 60 minutes (1 hour)\n` +
               `- Status: ${dashboardData.metrics.waveCompletion >= 95 ? '✅ On Track' : '⚠️ Needs Attention'}`;
    }

    // Employee/Training queries
    if (query.includes('employee') || query.includes('training')) {
        const trained = dashboardData.employees.filter(e => e.trained).length;
        const total = dashboardData.employees.length;
        return `[${timestamp}] 👥 Employee Training Status:\n` +
               `- Trained: ${trained}/${total} employees (${dashboardData.metrics.employeeTraining}%)\n` +
               `- Pending: ${total - trained} employees\n` +
               `- Next Session: Tomorrow 9:00 AM\n` +
               `- Recommendation: Schedule training for pending employees`;
    }

    // Stock replenishment queries
    if (query.includes('stock') || query.includes('replenishment')) {
        return `[${timestamp}] 📦 Stock Replenishment Analysis:\n` +
               `- Average Time: ${dashboardData.metrics.stockReplenishment} hours\n` +
               `- Target: < 2 hours\n` +
               `- Variance: +0.5 hours (+25%)\n` +
               `- Root Cause: Supplier coordination delays\n` +
               `- Recommendation: Review supplier agreements and implement faster communication protocol`;
    }

    // Quality audit queries
    if (query.includes('quality') || query.includes('audit')) {
        return `[${timestamp}] ✅ Quality Audit Status:\n` +
               `- Current Rate: ${dashboardData.metrics.qualityAudit}%\n` +
               `- Target: > 5%\n` +
               `- Today's Audits: 206 items checked\n` +
               `- Pass Rate: 96.3%\n` +
               `- Recommendation: Consider increasing to 7-10% for better defect prevention`;
    }

    // SLA queries
    if (query.includes('sla') || query.includes('compliance')) {
        return `[${timestamp}] 📋 SLA Compliance Report:\n` +
               `- Current: ${dashboardData.metrics.slaCompliance}%\n` +
               `- Target: > 95%\n` +
               `- Status: ✅ EXCELLENT\n` +
               `- Consecutive Days Met: 15 days\n` +
               `- Key Factors: Efficient wave completion, trained staff`;
    }

    // Performance queries
    if (query.includes('performance') || query.includes('efficiency')) {
        return `[${timestamp}] 📈 Performance Metrics:\n` +
               `- Picking Efficiency: ${dashboardData.metrics.pickingEfficiency}%\n` +
               `- SLA Compliance: ${dashboardData.metrics.slaCompliance}%\n` +
               `- Inventory Accuracy: ${dashboardData.metrics.inventoryAccuracy}%\n` +
               `- System Uptime: ${dashboardData.metrics.systemUptime}%\n` +
               `- Overall Status: Good - Minor improvements needed in picking efficiency`;
    }

    // Default response
    return `[${timestamp}] ℹ️ Query processed: "${query}"\n` +
           `Try queries like:\n` +
           `- "Show customer order status"\n` +
           `- "Check wave completion"\n` +
           `- "Show employee training status"\n` +
           `- "Why is stock replenishment delayed?"\n` +
           `- "What is SLA compliance?"`;
}

// Update metrics display
function updateMetrics() {
    const now = new Date().toLocaleString();
    document.getElementById('lastUpdated').textContent = now;

    // Simulate slight variations in metrics
    if (Math.random() > 0.7) {
        dashboardData.metrics.waveCompletion = Math.min(100, dashboardData.metrics.waveCompletion + (Math.random() * 2 - 1));
        dashboardData.metrics.pickingEfficiency = Math.min(100, dashboardData.metrics.pickingEfficiency + (Math.random() * 2 - 1));
        
        // Update display
        document.getElementById('waveCompletion').textContent = 
            dashboardData.metrics.waveCompletion.toFixed(0) + '%';
        document.getElementById('pickingEfficiency').textContent = 
            dashboardData.metrics.pickingEfficiency.toFixed(0) + '%';
    }
}

// Checklist button functions
function checkWaveStatus() {
    const statusElement = document.getElementById('waveStatus');
    const completed = dashboardData.waves.filter(w => w.complete).length;
    const total = dashboardData.waves.length;
    const now = new Date().toLocaleTimeString();
    
    statusElement.textContent = `✅ ${completed}/${total} waves complete - Last checked: ${now}`;
    statusElement.style.color = completed === total ? 'green' : 'orange';
    
    saveToLocalStorage();
}

function verifyTraining() {
    const statusElement = document.getElementById('trainingStatus');
    const trained = dashboardData.employees.filter(e => e.trained).length;
    const total = dashboardData.employees.length;
    const percentage = ((trained / total) * 100).toFixed(0);
    const now = new Date().toLocaleTimeString();
    
    const untrained = dashboardData.employees.filter(e => !e.trained);
    const untrainedNames = untrained.map(e => e.name).join(', ');
    
    statusElement.textContent = `📚 ${trained}/${total} trained (${percentage}%) - Pending: ${untrainedNames} - Checked: ${now}`;
    statusElement.style.color = trained === total ? 'green' : 'orange';
    
    saveToLocalStorage();
}

function analyzeStock() {
    const statusElement = document.getElementById('stockStatus');
    const avgTime = dashboardData.metrics.stockReplenishment;
    const target = 2;
    const variance = ((avgTime - target) / target * 100).toFixed(0);
    const now = new Date().toLocaleTimeString();
    
    statusElement.textContent = `📦 Avg: ${avgTime}hrs (Target: ${target}hrs, +${variance}% over) - Analyzed: ${now}`;
    statusElement.style.color = avgTime > target ? 'red' : 'green';
    
    saveToLocalStorage();
}

function adjustQualityRate() {
    const statusElement = document.getElementById('qualityStatus');
    const currentRate = dashboardData.metrics.qualityAudit;
    const newRate = Math.min(10, currentRate + 2);
    dashboardData.metrics.qualityAudit = newRate;
    
    document.getElementById('qualityAudit').textContent = newRate + '%';
    
    const now = new Date().toLocaleTimeString();
    statusElement.textContent = `📊 Rate increased from ${currentRate}% to ${newRate}% - Updated: ${now}`;
    statusElement.style.color = 'green';
    
    saveToLocalStorage();
}

// LocalStorage functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem('dashboardData');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(dashboardData, parsed);
        }
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
    }
    // Always update display after attempting to load
    updateMetricsDisplay();
}

function updateMetricsDisplay() {
    document.getElementById('waveCompletion').textContent = dashboardData.metrics.waveCompletion.toFixed(0) + '%';
    document.getElementById('employeeTraining').textContent = dashboardData.metrics.employeeTraining + '%';
    document.getElementById('stockReplenishment').textContent = dashboardData.metrics.stockReplenishment + ' hrs';
    document.getElementById('qualityAudit').textContent = dashboardData.metrics.qualityAudit + '%';
    document.getElementById('pickingEfficiency').textContent = dashboardData.metrics.pickingEfficiency + '%';
    document.getElementById('orderVolume').textContent = dashboardData.metrics.orderVolume.toLocaleString();
    document.getElementById('slaCompliance').textContent = dashboardData.metrics.slaCompliance + '%';
    document.getElementById('inventoryAccuracy').textContent = dashboardData.metrics.inventoryAccuracy + '%';
    document.getElementById('systemUptime').textContent = dashboardData.metrics.systemUptime + '%';
    document.getElementById('activeEmployees').textContent = dashboardData.metrics.activeEmployees;
    document.getElementById('pendingTasks').textContent = dashboardData.metrics.pendingTasks;
}

function saveQueryHistory(query, response) {
    try {
        let history = JSON.parse(localStorage.getItem('queryHistory') || '[]');
        history.unshift({
            query,
            response,
            timestamp: new Date().toISOString()
        });
        // Keep only last 50 queries
        history = history.slice(0, 50);
        localStorage.setItem('queryHistory', JSON.stringify(history));
    } catch (e) {
        console.error('Failed to save query history:', e);
    }
}

// ============================================================
// DATA ENTRY FORM FUNCTIONS
// ============================================================

// Initialize data entry form
function initializeDataEntryForm() {
    const form = document.getElementById('dataEntryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });

    form.addEventListener('reset', () => {
        // Small delay to let the reset complete
        setTimeout(() => {
            console.log('Form reset');
        }, 0);
    });
}

// Handle form submission
function handleFormSubmit() {
    // Get form values
    const customerName = document.getElementById('customerName').value.trim();
    const orderID = document.getElementById('orderID').value.trim();
    const queryType = document.getElementById('queryType').value;
    const status = document.getElementById('status').value;
    const queryDetails = document.getElementById('queryDetails').value.trim();
    const response = document.getElementById('response').value.trim();

    // Validate required fields
    if (!customerName || !orderID || !queryType || !queryDetails) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }

    // Create entry object
    const entry = {
        id: generateEntryID(),
        customerName,
        orderID,
        queryType,
        status,
        queryDetails,
        response: response || 'N/A',
        timestamp: new Date().toISOString(),
        respondedBy: getUsername()
    };

    // Save to localStorage
    saveEntry(entry);

    // Show success message
    showSuccessMessage(entry);

    // Reset form
    document.getElementById('dataEntryForm').reset();

    // Reload entries display
    loadAndDisplayEntries();

    // Update metrics
    updateOrderMetrics();
}

// Generate unique entry ID
function generateEntryID() {
    const entries = getEntries();
    const nextNum = entries.length + 1;
    return `Q${String(nextNum).padStart(3, '0')}`;
}

// Get username (from browser or default)
function getUsername() {
    // Try to get from localStorage, otherwise use default
    let username = localStorage.getItem('username');
    if (!username) {
        username = 'User';
    }
    return username;
}

// Save entry to localStorage
function saveEntry(entry) {
    try {
        const entries = getEntries();
        entries.unshift(entry); // Add to beginning
        localStorage.setItem('customerEntries', JSON.stringify(entries));
    } catch (e) {
        console.error('Failed to save entry:', e);
        alert('Failed to save entry. Please try again.');
    }
}

// Get all entries from localStorage
function getEntries() {
    try {
        const stored = localStorage.getItem('customerEntries');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to load entries:', e);
        return [];
    }
}

// Show success message
function showSuccessMessage(entry) {
    const message = `✅ Query added successfully!\n\nQuery ID: ${entry.id}\nCustomer: ${entry.customerName}\nOrder ID: ${entry.orderID}\nStatus: ${entry.status}`;
    alert(message);
}

// Load and display entries
function loadAndDisplayEntries() {
    const entriesList = document.getElementById('entriesList');
    if (!entriesList) return;

    const entries = getEntries();

    if (entries.length === 0) {
        entriesList.innerHTML = '<div class="no-entries">No entries yet. Submit the form above to add your first entry.</div>';
        return;
    }

    // Display last 10 entries
    const recentEntries = entries.slice(0, 10);
    
    entriesList.innerHTML = recentEntries.map(entry => {
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleString();
        const statusClass = entry.status.toLowerCase().replace(' ', '-');

        return `
            <div class="entry-item">
                <div class="entry-header">
                    <span class="entry-id">${entry.id}</span>
                    <span class="entry-timestamp">${formattedDate}</span>
                </div>
                <div class="entry-details">
                    <div class="entry-field"><strong>Customer:</strong> ${entry.customerName}</div>
                    <div class="entry-field"><strong>Order ID:</strong> ${entry.orderID}</div>
                    <div class="entry-field"><strong>Type:</strong> ${entry.queryType}</div>
                    <div class="entry-field">
                        <strong>Status:</strong> 
                        <span class="entry-status ${statusClass}">${entry.status}</span>
                    </div>
                </div>
                <div class="entry-field"><strong>Details:</strong> ${entry.queryDetails}</div>
                ${entry.response !== 'N/A' ? `<div class="entry-field"><strong>Response:</strong> ${entry.response}</div>` : ''}
                <div class="entry-field" style="font-size: 0.85rem; color: #666; margin-top: 5px;">
                    <strong>Responded By:</strong> ${entry.respondedBy}
                </div>
            </div>
        `;
    }).join('');
}

// Update order metrics based on entries
function updateOrderMetrics() {
    const entries = getEntries();
    
    // Update order volume with actual entry count
    dashboardData.metrics.orderVolume = Math.max(1247, 1200 + entries.length);
    document.getElementById('orderVolume').textContent = dashboardData.metrics.orderVolume.toLocaleString();
    
    // Save updated data
    saveToLocalStorage();
}
