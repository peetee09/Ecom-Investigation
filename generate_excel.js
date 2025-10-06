/**
 * E-commerce Operations Tracking System Generator (JavaScript)
 * Creates a comprehensive Excel workbook for monitoring warehouse operations
 * Uses SheetJS (xlsx) library for Excel generation
 */

// This file can be run in the browser to generate the Excel file
// Load SheetJS library from CDN: https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js

function createEcomTrackingSystem() {
    console.log("=".repeat(60));
    console.log("E-Commerce Operations Tracking System Generator");
    console.log("=".repeat(60));
    
    // Create new workbook
    const wb = XLSX.utils.book_new();
    
    // Create all sheets
    createDashboardSheet(wb);
    createBashQueriesSheet(wb);
    createWaveTrackingSheet(wb);
    createEmployeeTrainingSheet(wb);
    createStockReplenishmentSheet(wb);
    createQualityAuditSheet(wb);
    createPickingTaskSheet(wb);
    createOrderVolumesSheet(wb);
    createEmployeePerformanceSheet(wb);
    createInventoryMismatchSheet(wb);
    createSystemErrorsSheet(wb);
    createInsightsSheet(wb);
    
    // Generate Excel file
    const filename = "Ecom_Operations_Tracking_System.xlsx";
    XLSX.writeFile(wb, filename);
    
    console.log(`✓ Excel tracking system created successfully: ${filename}`);
    console.log("\nSystem ready for use!");
    console.log("=".repeat(60));
    
    // Show user notification
    alert(`✓ Excel tracking system created successfully!\n\nFile: ${filename}\n\nThe file has been downloaded to your Downloads folder.`);
}

function getCurrentDateTime() {
    return new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function createDashboardSheet(wb) {
    const data = [
        ["E-COMMERCE OPERATIONS DASHBOARD"],
        [`Generated: ${getCurrentDateTime()}`],
        [],
        ["KEY PERFORMANCE INDICATORS"],
        ["Metric", "Target", "Current", "Status", "Last Updated"],
        ["Wave Completion (1 hour)", "100%", "=COUNTA('Wave Tracking'!A:A)-1", "", getCurrentDateTime()],
        ["Employee Training Completion", "100%", "=COUNTA('Employee Training'!A:A)-1", "", getCurrentDateTime()],
        ["Picking Within Hours Target", "95%", "=COUNTA('Picking Tasks'!A:A)-1", "", getCurrentDateTime()],
        ["Quality Audit Coverage", ">5%", "=COUNTA('Quality Audit'!A:A)-1", "", getCurrentDateTime()],
        ["Open System Errors", "0", "=COUNTA('System Errors'!A:A)-1", "", getCurrentDateTime()],
        ["Inventory Mismatches", "0", "=COUNTA('Inventory Mismatch'!A:A)-1", "", getCurrentDateTime()],
        ["SLA Compliance Rate", ">98%", "98.5%", "ON TARGET", getCurrentDateTime()],
        [],
        [],
        ["MONITORING AREAS"],
        ["• Bash Queries Response - Track customer order queries"],
        ["• Wave Tracking - Monitor wave completion status"],
        ["• Employee Training - Track training completion"],
        ["• Stock Replenishment - Monitor stock refill times"],
        ["• Quality Audit - Track quality checks and rechecks"],
        ["• Picking Tasks - Monitor picking efficiency"],
        ["• Order Volumes - Track daily order volumes"],
        ["• Employee Performance - Monitor staff performance"],
        ["• Inventory Mismatch - Track inventory discrepancies"],
        ["• System Errors - Log and track system issues"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Dashboard");
}

function createBashQueriesSheet(wb) {
    const data = [
        ["BASH QUERIES - CUSTOMER ORDER RESPONSES"],
        ["Query ID", "Date/Time", "Customer Name", "Order ID", "Query Type", "Query Details", "Status", "Response", "Responded By", "Response Time (mins)"],
        ["Q001", getCurrentDateTime(), "John Doe", "ORD-10001", "Order Status", "Where is my order?", "RESPONDED", "Order is in picking stage", "Agent A", "5"],
        ["Q002", getCurrentDateTime(), "Jane Smith", "ORD-10002", "Delivery Time", "When will order arrive?", "RESPONDED", "Expected delivery tomorrow", "Agent B", "3"],
        ["Q003", getCurrentDateTime(), "Mike Johnson", "ORD-10003", "Order Issue", "Wrong item received", "IN PROGRESS", "Investigating with warehouse", "Agent A", ""]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 30 }, { wch: 18 }, { wch: 30 }, { wch: 18 }, { wch: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Bash Queries Response");
}

function createWaveTrackingSheet(wb) {
    const data = [
        ["WAVE TRACKING - COMPLETION STATUS"],
        ["Wave ID", "Date", "Start Time", "Expected Completion", "Actual Completion", "Status", "Orders Count", "Completion Time (mins)", "Notes"],
        ["WAVE-001", getCurrentDate(), "08:00", "09:00", "08:55", "COMPLETED", "150", "55", "On time"],
        ["WAVE-002", getCurrentDate(), "09:00", "10:00", "10:05", "COMPLETED", "145", "65", "Slight delay"],
        ["WAVE-003", getCurrentDate(), "10:00", "11:00", "", "IN PROGRESS", "160", "", ""]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Wave Tracking");
}

function createEmployeeTrainingSheet(wb) {
    const data = [
        ["EMPLOYEE TRAINING RECORDS"],
        ["Employee ID", "Employee Name", "Department", "Training Type", "Scheduled Date", "Completion Date", "Status", "Score/Result", "Trainer", "Notes"],
        ["EMP001", "John Smith", "Warehouse", "Picking Training", "2024-01-15", "2024-01-15", "COMPLETED", "95%", "Trainer A", "Excellent"],
        ["EMP002", "Sarah Wilson", "Warehouse", "Quality Audit", "2024-01-16", "2024-01-16", "COMPLETED", "88%", "Trainer B", "Good"],
        ["EMP003", "Mike Brown", "Warehouse", "Safety Training", "2024-01-20", "", "SCHEDULED", "", "Trainer A", ""],
        ["EMP004", "Lisa Davis", "Packing", "Packing Standards", "2024-01-18", "2024-01-18", "COMPLETED", "92%", "Trainer C", "Very good"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Employee Training");
}

function createStockReplenishmentSheet(wb) {
    const now = new Date();
    const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000);
    const oneHourAgo = new Date(now - 1 * 60 * 60 * 1000);
    const fiveHoursAgo = new Date(now - 5 * 60 * 60 * 1000);
    const twoHoursAgo = new Date(now - 2 * 60 * 60 * 1000);
    
    const data = [
        ["STOCK REPLENISHMENT MONITORING"],
        ["Replenishment ID", "Item SKU", "Item Name", "Current Stock", "Reorder Point", "Quantity Ordered", "Request Time", "Completion Time", "Duration (hours)", "Status", "Notes"],
        ["REP-001", "SKU-1001", "Widget A", "50", "100", "500", threeHoursAgo.toLocaleString(), oneHourAgo.toLocaleString(), "2.0", "COMPLETED", "On time"],
        ["REP-002", "SKU-1002", "Widget B", "25", "100", "750", fiveHoursAgo.toLocaleString(), now.toLocaleString(), "5.0", "COMPLETED", "Delayed - investigate"],
        ["REP-003", "SKU-1003", "Widget C", "10", "100", "1000", twoHoursAgo.toLocaleString(), "", "", "IN PROGRESS", "Urgent"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Stock Replenishment");
}

function createQualityAuditSheet(wb) {
    const data = [
        ["QUALITY AUDIT TRACKING (Target: >5% Diversion)"],
        ["Audit ID", "Date", "Order ID", "Item SKU", "Audit Type", "Result", "Issue Found", "Action Taken", "Audited By", "Recheck Required", "Notes"],
        ["STATISTICS:", "Total Orders Today:", "1000", "Audited (Current %):", "=COUNTA(A5:A100)", "Audit %:", "=(E3/C3)*100", "Target: >5%"],
        [],
        ["AUD-001", getCurrentDate(), "ORD-10001", "SKU-1001", "Random Check", "PASS", "None", "None", "QA Team A", "NO", ""],
        ["AUD-002", getCurrentDate(), "ORD-10015", "SKU-1002", "Random Check", "FAIL", "Wrong quantity", "Repack ordered", "QA Team B", "YES", "Critical"],
        ["AUD-003", getCurrentDate(), "ORD-10025", "SKU-1003", "Random Check", "PASS", "None", "None", "QA Team A", "NO", ""],
        ["AUD-004", getCurrentDate(), "ORD-10042", "SKU-1004", "Targeted Check", "FAIL", "Damaged item", "Item replaced", "QA Team C", "YES", "Minor damage"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 22 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Quality Audit");
}

function createPickingTaskSheet(wb) {
    const data = [
        ["PICKING TASK MONITORING"],
        ["Task ID", "Wave ID", "Order ID", "Picker ID", "Start Time", "End Time", "Duration (mins)", "Items Count", "Status", "Notes"],
        ["PICK-001", "WAVE-001", "ORD-10001", "EMP001", "08:00", "08:15", "15", "5", "COMPLETED", ""],
        ["PICK-002", "WAVE-001", "ORD-10002", "EMP002", "08:05", "08:25", "20", "8", "COMPLETED", ""],
        ["PICK-003", "WAVE-002", "ORD-10003", "EMP001", "09:00", "09:30", "30", "12", "COMPLETED", ""],
        ["PICK-004", "WAVE-003", "ORD-10004", "EMP003", "10:00", "", "", "6", "IN PROGRESS", ""]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Picking Tasks");
}

function createOrderVolumesSheet(wb) {
    const data = [
        ["ORDER VOLUMES MONITORING"],
        ["Date", "Total Orders", "Orders Picked", "Orders Packed", "Orders Shipped", "Pending Orders", "Cancelled Orders", "Average Processing Time (hrs)", "Notes"]
    ];
    
    // Add last 7 days of data
    for (let day = 7; day > 0; day--) {
        const date = new Date();
        date.setDate(date.getDate() - day);
        const dateStr = date.toISOString().split('T')[0];
        
        data.push([
            dateStr,
            950 + (day * 10),
            940 + (day * 10),
            935 + (day * 10),
            930 + (day * 10),
            20 - day,
            5,
            2.5,
            "Normal operations"
        ]);
    }
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
        { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Order Volumes");
}

function createEmployeePerformanceSheet(wb) {
    const data = [
        ["EMPLOYEE PERFORMANCE METRICS"],
        ["Employee ID", "Employee Name", "Department", "Date", "Tasks Completed", "Average Time (mins)", "Accuracy %", "Training Status", "Performance Rating", "Improvement Areas", "Notes"],
        ["EMP001", "John Smith", "Picking", getCurrentDate(), "45", "18", "98%", "COMPLETED", "EXCELLENT", "None", "Top performer"],
        ["EMP002", "Sarah Wilson", "Picking", getCurrentDate(), "42", "20", "96%", "COMPLETED", "GOOD", "Speed", "Consistent"],
        ["EMP003", "Mike Brown", "Packing", getCurrentDate(), "38", "22", "94%", "IN PROGRESS", "AVERAGE", "Accuracy", "Needs training"],
        ["EMP004", "Lisa Davis", "Packing", getCurrentDate(), "48", "17", "99%", "COMPLETED", "EXCELLENT", "None", "Star performer"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 25 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Employee Performance");
}

function createInventoryMismatchSheet(wb) {
    const data = [
        ["INVENTORY MISMATCH TRACKING"],
        ["Mismatch ID", "Date Discovered", "Item SKU", "Item Name", "System Count", "Physical Count", "Variance", "Root Cause", "Resolution", "Status"],
        ["MIS-001", getCurrentDate(), "SKU-1001", "Widget A", "500", "498", "-2", "Picking error", "System updated", "RESOLVED"],
        ["MIS-002", getCurrentDate(), "SKU-1005", "Widget E", "200", "205", "+5", "Receiving error", "Under investigation", "IN PROGRESS"],
        ["MIS-003", getCurrentDate(), "SKU-1008", "Widget H", "150", "148", "-2", "Unknown", "Investigating", "OPEN"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 18 },
        { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 18 }, { wch: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Mismatch");
}

function createSystemErrorsSheet(wb) {
    const data = [
        ["SYSTEM ERRORS LOG"],
        ["Error ID", "Date/Time", "System/Module", "Error Type", "Severity", "Description", "Impact", "Resolution", "Resolved By", "Status"],
        ["ERR-001", getCurrentDateTime(), "WMS", "Database Connection", "HIGH", "Connection timeout", "Picking delayed 5 mins", "Server restarted", "IT Team", "RESOLVED"],
        ["ERR-002", getCurrentDateTime(), "Barcode Scanner", "Hardware", "MEDIUM", "Scanner not reading", "Manual entry required", "Scanner replaced", "IT Team", "RESOLVED"],
        ["ERR-003", getCurrentDateTime(), "Packing System", "Software Bug", "LOW", "Print label delay", "Minor slowdown", "Investigating", "IT Team", "OPEN"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 18 },
        { wch: 30 }, { wch: 25 }, { wch: 18 }, { wch: 18 }, { wch: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "System Errors");
}

function createInsightsSheet(wb) {
    const data = [
        ["INSIGHTS & ANALYTICS"],
        [],
        ["EXPECTED OUTCOMES"],
        ["✓ People's Performance Improvement", "Track individual and team metrics to identify training needs and improvement areas"],
        ["✓ SLA Met Continuously", "Monitor service level agreements and ensure consistent compliance"],
        ["✓ Operations Optimised", "Analyze bottlenecks and streamline processes for efficiency"],
        [],
        ["KEY INSIGHTS"],
        ["Wave Completion", "Monitor waves completing within 1 hour target. Identify patterns of delays."],
        ["Training Effectiveness", "Track training completion and correlate with performance improvements."],
        ["Replenishment Speed", "Analyze stock replenishment times to reduce picking delays."],
        ["Quality Coverage", "Ensure >5% quality audit coverage and track defect rates."],
        ["Employee Productivity", "Monitor picking/packing rates and identify top performers for recognition."],
        ["Error Patterns", "Track system errors and inventory mismatches to prevent recurrence."],
        ["Customer Satisfaction", "Fast response to Bash queries improves customer satisfaction."],
        [],
        ["RECOMMENDED ACTIONS"],
        ["1. Daily review of dashboard KPIs to catch issues early"],
        ["2. Weekly analysis of employee performance trends"],
        ["3. Immediate investigation of waves not completing within 1 hour"],
        ["4. Root cause analysis for stock replenishment delays"],
        ["5. Monthly review of quality audit coverage and effectiveness"],
        ["6. Proactive training for employees showing performance gaps"],
        ["7. Quick resolution of inventory mismatches to maintain accuracy"],
        ["8. Regular system health checks to minimize errors"]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 30 }, { wch: 60 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Insights & Analytics");
}

// Export function for use in HTML
if (typeof window !== 'undefined') {
    window.createEcomTrackingSystem = createEcomTrackingSystem;
}
