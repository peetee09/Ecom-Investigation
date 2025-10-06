# Setup Guide - E-Commerce Operations Tracking System

## Prerequisites

### Required Software
- **Web Browser** (Chrome, Firefox, Edge, or Safari)
- **Microsoft Excel** or compatible spreadsheet software (LibreOffice Calc, Google Sheets) - for viewing generated reports

## Installation Steps

### Step 1: Open the Dashboard

**No installation required!** This system runs entirely in your web browser.

1. Navigate to the repository directory
2. Open `index.html` in your web browser:
   - **Windows**: Double-click `index.html` OR right-click and select "Open with" → your browser
   - **macOS**: Double-click `index.html` OR use command: `open index.html`
   - **Linux**: Double-click `index.html` OR use command: `xdg-open index.html`

### Step 2: Generate Excel Reports

The dashboard includes a built-in Excel report generator:

1. Click the **"📊 Generate Excel Report"** button in the dashboard header
2. The system will automatically generate and download `Ecom_Operations_Tracking_System.xlsx`
3. Open the downloaded file with Microsoft Excel or compatible software

**No Python or dependencies required!** Everything runs in JavaScript.

### Step 3: Start Using

1. Use the Bash Query Interface to ask questions about operations
2. Monitor real-time metrics in the dashboard
3. Click the checklist buttons to update statuses
4. Generate Excel reports whenever needed for detailed tracking
5. Refer to `USAGE_GUIDE.md` for daily operations

## Verification

To verify the system is working correctly:

1. Open `index.html` in your browser
2. Verify the dashboard loads with all sections visible
3. Click "📊 Generate Excel Report" button
4. Check your Downloads folder for `Ecom_Operations_Tracking_System.xlsx`
5. Open the Excel file and verify it has 12 sheets:
   - Dashboard
   - Bash Queries Response
   - Wave Tracking
   - Employee Training
   - Stock Replenishment
   - Quality Audit
   - Picking Tasks
   - Order Volumes
   - Employee Performance
   - Inventory Mismatch
   - System Errors
   - Insights & Analytics

## Troubleshooting

### Problem: Dashboard doesn't load
**Solution:**
- Ensure JavaScript is enabled in your browser
- Try a different browser (Chrome, Firefox, Edge recommended)
- Check browser console for errors (F12)

### Problem: Excel generation fails
**Solution:**
- Check your internet connection (SheetJS library loads from CDN)
- Try refreshing the page and clicking the button again
- Ensure pop-ups are not blocked in your browser
- Check if downloads are allowed in browser settings

### Problem: Excel file won't open
**Possible Causes:**
1. File is corrupted - Try generating again
2. Incompatible Excel version - Try LibreOffice Calc or Google Sheets
3. Download was interrupted - Check file size (should be > 10KB)

**Solution:**
- Click "📊 Generate Excel Report" button again
- Try opening with LibreOffice Calc or upload to Google Sheets

### Problem: Button doesn't respond
**Solution:**
- Wait a few seconds for libraries to load
- Refresh the page and try again
- Check browser console (F12) for JavaScript errors
- Ensure you have an active internet connection

## Files in This Repository

```
Ecom-Investigation/
├── EcomAudit                              # Original requirements document
├── index.html                             # Main dashboard interface
├── app.js                                 # Dashboard functionality
├── generate_excel.js                      # Excel generator (JavaScript)
├── styles.css                             # Dashboard styling
├── generate_ecom_tracking_system.py       # Legacy Python script (optional)
├── Ecom_Operations_Tracking_System.xlsx   # Sample Excel workbook
├── README.md                              # Main documentation
├── USAGE_GUIDE.md                         # Daily operations guide
├── QUICK_START.md                         # Quick start guide
└── SETUP.md                               # This file
```

## Quick Setup Summary

For experienced users:

```bash
# Open dashboard
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Click "📊 Generate Excel Report" button in the dashboard
# Excel file will download automatically
```

**That's it!** No installation, no dependencies, no Python required.

## Regenerating the Excel File

You can generate a fresh Excel report anytime:

1. Open `index.html` in your browser
2. Click **"📊 Generate Excel Report"** button
3. A new file will be downloaded with current date/time

Each generated file includes:
- Current date and time
- Sample operational data
- All 12 tracking sheets
- Formulas and formatting

**Note:** Each generation creates a fresh template with sample data. Save your working data separately before regenerating.

## Customization

To customize the Excel template:

1. Edit `generate_excel.js`
2. Modify the relevant `create*Sheet()` functions
3. Refresh the browser and click "📊 Generate Excel Report" to test

Example modifications:
- Add new columns to existing sheets in the `data` arrays
- Create new tracking sheets by adding new `create*Sheet()` functions
- Modify sample data in the sheet creation functions
- Add formulas by including them in the data arrays (e.g., `"=SUM(A1:A10)"`)
- Adjust column widths in the `ws['!cols']` arrays

To customize the dashboard:
1. Edit `index.html` for structure changes
2. Edit `styles.css` for visual styling
3. Edit `app.js` for functionality changes

## System Requirements

### Minimum Requirements:
- **OS:** Windows 7+, macOS 10.12+, or Linux (any recent distribution)
- **Browser:** Chrome 90+, Firefox 88+, Edge 90+, or Safari 14+
- **RAM:** 1GB minimum
- **Disk Space:** 10MB for repository files + Excel reports
- **Internet Connection:** Required for initial load (SheetJS CDN)

### Recommended:
- **OS:** Windows 10+, macOS 11+, or Ubuntu 20.04+
- **Browser:** Latest version of Chrome, Firefox, or Edge
- **RAM:** 2GB or more
- **Disk Space:** 100MB for working with multiple Excel files

## Next Steps

After setup is complete:

1. ✅ Read `README.md` for system overview
2. ✅ Review `USAGE_GUIDE.md` for daily operations
3. ✅ Open the Dashboard sheet in Excel
4. ✅ Start logging operations data
5. ✅ Review Insights & Analytics sheet weekly

## Support

If you encounter issues not covered here:
1. Check `README.md` for detailed documentation
2. Review `USAGE_GUIDE.md` for common scenarios
3. Verify your browser supports JavaScript and localStorage
4. Try a different browser (Chrome or Firefox recommended)
5. Check browser console (F12) for error messages

---

**Setup Complete!** You're ready to start tracking e-commerce operations.

**No Python, no dependencies, just open and use!** 🚀
