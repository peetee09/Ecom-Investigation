/**
 * E-commerce Operations Tracking System - JavaScript Excel Generator
 * Uses SheetJS (xlsx) library for client-side Excel generation
 * Replicates all functionality from the Python version
 */

// Check if XLSX library is loaded
function checkXLSXLibrary() {
    if (typeof XLSX === 'undefined') {
        return {
            success: false,
            message: '❌ SheetJS library not loaded. Please check your internet connection.'
        };
    }
    return { success: true };
}

// Generate complete Excel workbook
function generateExcelReport() {
    const libraryCheck = checkXLSXLibrary();
    if (!libraryCheck.success) {
        return libraryCheck;
    }

    try {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Generate all sheets
        createDashboardSheet(wb);
        createBashQueriesSheet(wb);
        createWaveTrackingSheet(wb);
        createEmployeeTrainingSheet(wb);
        createStockReplenishmentSheet(wb);
        createQualityAuditSheet(wb);
        createPickingTasksSheet(wb);
        createOrderVolumesSheet(wb);
        createEmployeePerformanceSheet(wb);
        createInventoryMismatchSheet(wb);
        createSystemErrorsSheet(wb);
        createInsightsSheet(wb);

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `Ecom_Operations_Tracking_${timestamp}.xlsx`;

        // Write file and trigger download
        XLSX.writeFile(wb, filename);

        return {
            success: true,
            message: `✅ Excel report generated successfully: ${filename}`
        };
    } catch (error) {
        return {
            success: false,
            message: `❌ Error generating Excel: ${error.message}`
        };
    }
}

// Helper function to create styled header row
function createHeaderRow(data, startRow = 0) {
    return data;
}

// Helper function to get current date/time
function getCurrentDateTime() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// 1. Dashboard Sheet
function createDashboardSheet(wb) {
    const data = [
        ['E-COMMERCE OPERATIONS DASHBOARD'],
        [`Generated: ${getCurrentDateTime()}`],
        [],
        ['KEY PERFORMANCE INDICATORS'],
        ['Metric', 'Target', 'Current', 'Status', 'Last Updated'],
        ['Wave Completion (1 hour)', '100%', '95%', 'On Track', getCurrentDateTime()],
        ['Employee Training Completion', '100%', '87%', 'Needs Attention', getCurrentDateTime()],
        ['Stock Replenishment Time', '< 2 hours', '2.5 hours', 'Delayed', getCurrentDateTime()],
        ['Quality Audit Coverage', '> 5%', '5%', 'Minimum', getCurrentDateTime()],
        ['Picking Efficiency', '> 95%', '92%', 'Needs Improvement', getCurrentDateTime()],
        ['SLA Compliance', '> 95%', '96%', 'Excellent', getCurrentDateTime()],
        ['Inventory Accuracy', '> 99%', '98.5%', 'Good', getCurrentDateTime()],
        ['System Uptime', '> 99%', '99.2%', 'Excellent', getCurrentDateTime()],
        [],
        ['DAILY SUMMARY'],
        ['Total Orders Today', '1,247'],
        ['Active Employees', '47'],
        ['Pending Tasks', '23'],
        ['System Alerts', '5'],
        [],
        ['CRITICAL ALERTS'],
        ['Stock replenishment time exceeding target by 25%'],
        ['13% of employees pending training completion'],
        ['Inventory accuracy below target threshold']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 35 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
}

// 2. Bash Queries Response Sheet
function createBashQueriesSheet(wb) {
    const data = [
        ['BASH QUERIES RESPONSE LOG'],
        ['Query ID', 'Timestamp', 'Query', 'Response', 'Response Time (ms)', 'Status'],
        ['Q-001', getCurrentDateTime(), 'Show customer order status', 'Order #12345: In Transit, ETA: 2 days', '45', 'Completed'],
        ['Q-002', getCurrentDateTime(), 'Check wave completion', 'Wave W-789: 95% complete, 5 tasks remaining', '32', 'Completed'],
        ['Q-003', getCurrentDateTime(), 'Show employee training status', '87% trained, 13 employees pending', '28', 'Completed'],
        ['Q-004', getCurrentDateTime(), 'Why is stock replenishment delayed?', 'Average time: 2.5 hrs (target: 2 hrs). Delays due to supplier issues.', '67', 'Completed'],
        ['Q-005', getCurrentDateTime(), 'What is SLA compliance?', 'Current SLA compliance: 96% (target: >95%)', '23', 'Completed'],
        ['Q-006', getCurrentDateTime(), 'Show quality audit rate', 'Current rate: 5%, Recommendation: Increase to 10%', '41', 'Completed'],
        ['Q-007', getCurrentDateTime(), 'How many orders today?', 'Total orders today: 1,247', '19', 'Completed']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 35 },
        { wch: 50 },
        { wch: 18 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Bash Queries Response');
}

// 3. Wave Tracking Sheet
function createWaveTrackingSheet(wb) {
    const now = new Date();
    const data = [
        ['WAVE TRACKING - 1 HOUR COMPLETION MONITORING'],
        ['Wave ID', 'Start Time', 'Target End', 'Actual End', 'Duration (mins)', 'Tasks Total', 'Tasks Complete', 'Status', 'Notes'],
        ['W-001', new Date(now - 3600000).toISOString().slice(11, 19), new Date(now - 0).toISOString().slice(11, 19), new Date(now - 300000).toISOString().slice(11, 19), '55', '50', '50', 'Complete', 'On time'],
        ['W-002', new Date(now - 7200000).toISOString().slice(11, 19), new Date(now - 3600000).toISOString().slice(11, 19), new Date(now - 3300000).toISOString().slice(11, 19), '65', '45', '45', 'Complete', 'Slightly delayed'],
        ['W-003', new Date(now - 1800000).toISOString().slice(11, 19), new Date(now + 1800000).toISOString().slice(11, 19), '', '', '40', '38', 'In Progress', '2 tasks remaining'],
        ['W-004', new Date(now - 900000).toISOString().slice(11, 19), new Date(now + 2700000).toISOString().slice(11, 19), '', '', '35', '12', 'In Progress', 'Early stage']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 25 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Wave Tracking');
}

// 4. Employee Training Sheet
function createEmployeeTrainingSheet(wb) {
    const data = [
        ['EMPLOYEE TRAINING SCHEDULE & STATUS'],
        ['Employee ID', 'Name', 'Department', 'Training Module', 'Scheduled Date', 'Completion Date', 'Status', 'Score', 'Certifier', 'Notes'],
        ['EMP-001', 'John Smith', 'Picking', 'Safety Procedures', '2024-01-15', '2024-01-15', 'Completed', '95%', 'Trainer A', 'Excellent'],
        ['EMP-002', 'Jane Doe', 'Packing', 'Quality Standards', '2024-01-16', '2024-01-16', 'Completed', '92%', 'Trainer B', 'Good'],
        ['EMP-003', 'Bob Johnson', 'Receiving', 'System Training', '2024-01-17', '', 'Pending', '', '', 'Scheduled'],
        ['EMP-004', 'Alice Brown', 'Picking', 'Equipment Operation', '2024-01-18', '2024-01-18', 'Completed', '88%', 'Trainer A', 'Satisfactory'],
        ['EMP-005', 'Charlie Davis', 'Quality', 'Audit Procedures', '2024-01-19', '', 'Pending', '', '', 'Not started'],
        ['EMP-006', 'Diana Wilson', 'Packing', 'Safety Procedures', '2024-01-20', '2024-01-20', 'Completed', '97%', 'Trainer C', 'Outstanding']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 15 },
        { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Employee Training');
}

// 5. Stock Replenishment Sheet
function createStockReplenishmentSheet(wb) {
    const data = [
        ['STOCK REPLENISHMENT MONITORING'],
        ['Replen ID', 'SKU', 'Product Name', 'Reorder Point', 'Current Stock', 'Order Qty', 'Request Time', 'Received Time', 'Duration (hrs)', 'Status', 'Priority'],
        ['REP-001', 'SKU-1001', 'Widget A', '5', '3', '500', getCurrentDateTime(), '', '2.5', 'In Progress', 'High'],
        ['REP-002', 'SKU-1002', 'Widget B', '10', '8', '750', getCurrentDateTime(), getCurrentDateTime(), '1.8', 'Complete', 'Medium'],
        ['REP-003', 'SKU-1003', 'Widget C', '10', '100', '1000', getCurrentDateTime(), '', '3.2', 'In Progress', 'Urgent'],
        ['REP-004', 'SKU-1004', 'Widget D', '15', '12', '600', getCurrentDateTime(), getCurrentDateTime(), '2.1', 'Complete', 'Medium']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Stock Replenishment');
}

// 6. Quality Audit Sheet
function createQualityAuditSheet(wb) {
    const data = [
        ['QUALITY AUDIT - 5%+ COVERAGE TRACKING'],
        ['Audit ID', 'Date', 'Auditor', 'Items Processed', 'Items Audited', 'Coverage %', 'Pass', 'Fail', 'Pass Rate', 'Issues Found', 'Actions Taken'],
        ['QA-001', getCurrentDateTime(), 'QA Team A', '1000', '50', '5.0%', '48', '2', '96%', 'Minor labeling errors', 'Re-labeled'],
        ['QA-002', getCurrentDateTime(), 'QA Team B', '850', '43', '5.1%', '41', '2', '95.3%', 'Packaging defects', 'Repackaged'],
        ['QA-003', getCurrentDateTime(), 'QA Team A', '1200', '65', '5.4%', '63', '2', '96.9%', 'Quantity mismatch', 'Corrected'],
        ['QA-004', getCurrentDateTime(), 'QA Team C', '950', '48', '5.1%', '47', '1', '97.9%', 'Damaged item', 'Replaced']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 10 },
        { wch: 10 },
        { wch: 12 },
        { wch: 25 },
        { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Quality Audit');
}

// 7. Picking Tasks Sheet
function createPickingTasksSheet(wb) {
    const data = [
        ['PICKING TASK MONITORING - EFFICIENCY TRACKING'],
        ['Task ID', 'Employee ID', 'Employee Name', 'Start Time', 'End Time', 'Items Picked', 'Target Time (mins)', 'Actual Time (mins)', 'Efficiency %', 'Errors', 'Status'],
        ['PT-001', 'EMP-001', 'John Smith', getCurrentDateTime(), getCurrentDateTime(), '45', '30', '28', '107%', '0', 'Complete'],
        ['PT-002', 'EMP-002', 'Jane Doe', getCurrentDateTime(), getCurrentDateTime(), '50', '35', '38', '92%', '1', 'Complete'],
        ['PT-003', 'EMP-003', 'Bob Johnson', getCurrentDateTime(), '', '40', '28', '', '', '', 'In Progress'],
        ['PT-004', 'EMP-004', 'Alice Brown', getCurrentDateTime(), getCurrentDateTime(), '55', '38', '36', '106%', '0', 'Complete']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 12 },
        { wch: 18 },
        { wch: 18 },
        { wch: 12 },
        { wch: 10 },
        { wch: 15 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Picking Tasks');
}

// 8. Order Volumes Sheet
function createOrderVolumesSheet(wb) {
    const data = [
        ['ORDER VOLUMES - DAILY TRENDS'],
        ['Date', 'Total Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Return Rate %', 'Average Value', 'Peak Hour'],
        ['2024-01-20', '1247', '45', '178', '892', '120', '12', '2.3%', '$156.78', '14:00'],
        ['2024-01-19', '1189', '38', '165', '856', '115', '15', '2.8%', '$148.92', '15:00'],
        ['2024-01-18', '1312', '52', '189', '934', '125', '12', '2.1%', '$162.45', '13:00'],
        ['2024-01-17', '1098', '41', '142', '789', '110', '16', '3.1%', '$151.33', '14:00'],
        ['2024-01-16', '1256', '47', '176', '901', '118', '14', '2.5%', '$159.67', '15:00']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 12 },
        { wch: 10 },
        { wch: 12 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Order Volumes');
}

// 9. Employee Performance Sheet
function createEmployeePerformanceSheet(wb) {
    const data = [
        ['EMPLOYEE PERFORMANCE METRICS'],
        ['Employee ID', 'Employee Name', 'Department', 'Date', 'Tasks Completed', 'Average Time (mins)', 'Accuracy %', 'Training Status', 'Performance Rating', 'Improvement Areas', 'Notes'],
        ['EMP-001', 'John Smith', 'Picking', getCurrentDateTime(), '45', '28', '98%', 'Complete', 'Excellent', 'None', 'Top performer'],
        ['EMP-002', 'Jane Doe', 'Packing', getCurrentDateTime(), '42', '32', '96%', 'Complete', 'Good', 'Speed improvement', 'Consistent'],
        ['EMP-003', 'Bob Johnson', 'Receiving', getCurrentDateTime(), '38', '35', '94%', 'Pending', 'Satisfactory', 'Training needed', 'Needs support'],
        ['EMP-004', 'Alice Brown', 'Picking', getCurrentDateTime(), '48', '27', '99%', 'Complete', 'Excellent', 'None', 'Outstanding'],
        ['EMP-005', 'Charlie Davis', 'Quality', getCurrentDateTime(), '35', '40', '92%', 'Pending', 'Needs Improvement', 'Accuracy, Speed', 'Requires coaching']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
        { wch: 20 },
        { wch: 15 },
        { wch: 18 },
        { wch: 12 },
        { wch: 15 },
        { wch: 18 },
        { wch: 20 },
        { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Employee Performance');
}

// 10. Inventory Mismatch Sheet
function createInventoryMismatchSheet(wb) {
    const data = [
        ['INVENTORY MISMATCH - DISCREPANCY TRACKING'],
        ['Mismatch ID', 'Date', 'SKU', 'Product Name', 'System Count', 'Physical Count', 'Variance', 'Variance %', 'Root Cause', 'Resolution', 'Resolved By', 'Status'],
        ['INV-001', getCurrentDateTime(), 'SKU-1001', 'Widget A', '500', '498', '-2', '-0.4%', 'Picking error', 'Inventory adjusted', 'Manager A', 'Resolved'],
        ['INV-002', getCurrentDateTime(), 'SKU-1002', 'Widget B', '750', '755', '+5', '+0.7%', 'Receiving error', 'System updated', 'Manager B', 'Resolved'],
        ['INV-003', getCurrentDateTime(), 'SKU-1003', 'Widget C', '1000', '990', '-10', '-1.0%', 'Unrecorded damage', 'Under investigation', 'Manager A', 'Open'],
        ['INV-004', getCurrentDateTime(), 'SKU-1004', 'Widget D', '600', '602', '+2', '+0.3%', 'Data entry error', 'Corrected', 'Manager C', 'Resolved']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
        { wch: 15 },
        { wch: 10 },
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Inventory Mismatch');
}

// 11. System Errors Sheet
function createSystemErrorsSheet(wb) {
    const data = [
        ['SYSTEM ERRORS LOG'],
        ['Error ID', 'Date/Time', 'System/Module', 'Error Type', 'Severity', 'Description', 'Impact', 'Resolution', 'Resolved By', 'Status'],
        ['ERR-001', getCurrentDateTime(), 'Warehouse Management', 'Database Connection', 'High', 'Connection timeout to inventory DB', 'Delayed updates', 'Restarted DB service', 'IT Team', 'Resolved'],
        ['ERR-002', getCurrentDateTime(), 'Picking System', 'Scanner Malfunction', 'Medium', 'Barcode scanner not reading', 'Manual entry required', 'Scanner replaced', 'Tech Support', 'Resolved'],
        ['ERR-003', getCurrentDateTime(), 'Order Management', 'API Timeout', 'Low', 'Third-party API slow response', 'Minor delays', 'Monitoring', 'IT Team', 'Open'],
        ['ERR-004', getCurrentDateTime(), 'Shipping Integration', 'Label Printer Error', 'Medium', 'Printer offline', 'Manual processing', 'Printer reconnected', 'Warehouse Staff', 'Resolved']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 18 },
        { wch: 12 },
        { wch: 30 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'System Errors');
}

// 12. Insights & Analytics Sheet
function createInsightsSheet(wb) {
    const data = [
        ['INSIGHTS & ANALYTICS'],
        [],
        ['DESIRED OUTCOMES'],
        ['✓ People\'s Performance Improvement', 'Track individual and team metrics to identify training needs and improvement areas'],
        ['✓ SLA Met Continuously', 'Monitor service level agreements and ensure consistent compliance'],
        ['✓ Operations Optimised', 'Analyze bottlenecks and streamline processes for efficiency'],
        [],
        ['KEY INSIGHTS'],
        ['1. Wave Completion', 'Most waves complete within target time. Focus on outliers exceeding 1 hour.'],
        ['2. Training Impact', '87% completion rate shows good progress. Prioritize remaining 13% for immediate training.'],
        ['3. Stock Delays', 'Replenishment averaging 2.5 hours vs 2-hour target. Review supplier coordination.'],
        ['4. Quality Coverage', 'Meeting 5% minimum. Consider increasing to 7-10% for better defect prevention.'],
        ['5. Employee Performance', 'Top performers consistently exceed efficiency targets. Share best practices.'],
        [],
        ['RECOMMENDATIONS'],
        ['Priority', 'Action Item', 'Expected Impact'],
        ['High', 'Complete pending employee training within 1 week', 'Improve operational consistency by 15%'],
        ['High', 'Investigate stock replenishment delays', 'Reduce average time to under 2 hours'],
        ['Medium', 'Increase quality audit rate to 7%', 'Reduce defects by 20%'],
        ['Medium', 'Document top performer best practices', 'Increase team efficiency by 10%'],
        ['Low', 'Implement automated inventory reconciliation', 'Reduce mismatch resolution time by 30%'],
        [],
        ['CRITICAL ACTION ITEMS'],
        ['1. Daily monitoring of wave completion times to ensure SLA compliance'],
        ['2. Weekly training completion reviews with department managers'],
        ['3. Immediate investigation of waves not completing within 1 hour'],
        ['4. Root cause analysis for stock replenishment delays'],
        ['5. Monthly review of quality audit coverage and effectiveness'],
        ['6. Proactive training for employees showing performance gaps'],
        ['7. Quick resolution of inventory mismatches to maintain accuracy'],
        ['8. Regular system health checks to minimize errors']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
        { wch: 30 },
        { wch: 60 },
        { wch: 30 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Insights & Analytics');
}

// Event listener setup (will be called from dashboard.js)
function setupExcelGenerator() {
    const generateBtn = document.getElementById('generateExcelBtn');
    const statusIndicator = document.getElementById('statusIndicator');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            statusIndicator.textContent = 'Generating...';
            statusIndicator.className = 'status-indicator processing';

            // Small delay to show processing state
            setTimeout(() => {
                const result = generateExcelReport();
                
                statusIndicator.textContent = result.success ? 'Success!' : 'Error';
                statusIndicator.className = `status-indicator ${result.success ? 'success' : 'error'}`;

                // Clear status after 5 seconds
                setTimeout(() => {
                    statusIndicator.textContent = '';
                    statusIndicator.className = 'status-indicator';
                }, 5000);

                // Show alert with result
                alert(result.message);
            }, 100);
        });
    }
}
