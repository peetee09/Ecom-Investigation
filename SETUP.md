# Setup Guide - E-Commerce Operations Tracking System

## Prerequisites

### Required Software
- **Python 3.6 or higher** - [Download Python](https://www.python.org/downloads/)
- **Microsoft Excel** or compatible spreadsheet software (LibreOffice Calc, Google Sheets)

### Python Package Requirements
- `openpyxl` - For creating and manipulating Excel files

## Installation Steps

### Step 1: Install Python (if not already installed)

**Windows:**
```bash
# Download from https://www.python.org/downloads/
# Make sure to check "Add Python to PATH" during installation
```

**macOS:**
```bash
# Using Homebrew
brew install python3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

### Step 2: Install Required Python Package

```bash
pip3 install openpyxl
```

**Verification:**
```bash
python3 -c "import openpyxl; print('✓ openpyxl installed successfully')"
```

### Step 3: Generate the Excel Tracking System

```bash
# Navigate to the repository directory
cd /path/to/Ecom-Investigation

# Run the generator script
python3 generate_ecom_tracking_system.py
```

**Expected Output:**
```
============================================================
E-Commerce Operations Tracking System Generator
============================================================
✓ Excel tracking system created successfully: Ecom_Operations_Tracking_System.xlsx

System ready for use!
============================================================
```

### Step 4: Open and Start Using

1. Locate the generated file: `Ecom_Operations_Tracking_System.xlsx`
2. Open with Microsoft Excel or compatible software
3. Start with the **Dashboard** sheet
4. Refer to `USAGE_GUIDE.md` for daily operations

## Verification

To verify the system was created correctly:

```bash
# Check if the Excel file exists
ls -lh Ecom_Operations_Tracking_System.xlsx

# Verify Excel file structure using Python
python3 << 'EOF'
import openpyxl
wb = openpyxl.load_workbook('Ecom_Operations_Tracking_System.xlsx')
print(f"✓ Workbook has {len(wb.sheetnames)} sheets")
print("✓ Sheets:", ', '.join(wb.sheetnames))
wb.close()
EOF
```

## Troubleshooting

### Problem: "openpyxl not found"
**Solution:**
```bash
pip3 install openpyxl --user
# or
python3 -m pip install openpyxl
```

### Problem: "Permission denied"
**Solution:**
```bash
# On Linux/macOS, ensure script is executable
chmod +x generate_ecom_tracking_system.py

# Or run with python3 explicitly
python3 generate_ecom_tracking_system.py
```

### Problem: Excel file won't open
**Possible Causes:**
1. File is corrupted - Regenerate using the script
2. Incompatible Excel version - Try LibreOffice Calc or Google Sheets
3. File permissions - Check file permissions and ownership

**Solution:**
```bash
# Regenerate the file
python3 generate_ecom_tracking_system.py

# Check file permissions
ls -l Ecom_Operations_Tracking_System.xlsx
```

### Problem: Python version too old
**Solution:**
```bash
# Check Python version
python3 --version

# If < 3.6, upgrade Python:
# Windows: Download latest from python.org
# macOS: brew upgrade python3
# Linux: Follow distribution-specific upgrade instructions
```

## Files in This Repository

```
Ecom-Investigation/
├── EcomAudit                              # Original requirements document
├── generate_ecom_tracking_system.py       # Excel generator script
├── Ecom_Operations_Tracking_System.xlsx   # Generated Excel workbook
├── README.md                              # Main documentation
├── USAGE_GUIDE.md                         # Daily operations guide
└── SETUP.md                               # This file
```

## Quick Setup Summary

For experienced users:

```bash
# Install dependencies
pip3 install openpyxl

# Generate Excel file
python3 generate_ecom_tracking_system.py

# Open and use
open Ecom_Operations_Tracking_System.xlsx  # macOS
xdg-open Ecom_Operations_Tracking_System.xlsx  # Linux
start Ecom_Operations_Tracking_System.xlsx  # Windows
```

## Regenerating the Excel File

If you need a fresh template (e.g., after making changes to the generator):

```bash
# Backup existing data (optional)
cp Ecom_Operations_Tracking_System.xlsx Ecom_Operations_Tracking_System_backup_$(date +%Y%m%d).xlsx

# Regenerate
python3 generate_ecom_tracking_system.py
```

**⚠️ Warning:** Regenerating creates a new file with sample data. Your existing data will be overwritten.

## Customization

To customize the Excel template:

1. Edit `generate_ecom_tracking_system.py`
2. Modify the relevant `create_*_sheet()` functions
3. Run the script to regenerate the Excel file

Example modifications:
- Add new columns to existing sheets
- Create new tracking sheets
- Change colors and formatting
- Modify sample data
- Add formulas and calculations

## System Requirements

### Minimum Requirements:
- **OS:** Windows 7+, macOS 10.12+, or Linux (any recent distribution)
- **Python:** 3.6 or higher
- **RAM:** 2GB minimum
- **Disk Space:** 50MB for Python + packages + Excel files

### Recommended:
- **OS:** Windows 10+, macOS 11+, or Ubuntu 20.04+
- **Python:** 3.9 or higher
- **RAM:** 4GB or more
- **Disk Space:** 500MB for working with multiple Excel files

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
3. Verify Python and openpyxl are correctly installed
4. Try regenerating the Excel file

---

**Setup Complete!** You're ready to start tracking e-commerce operations.
