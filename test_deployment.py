#!/usr/bin/env python3
"""
Test the deployment workflow

This script tests the complete deployment process:
1. Creates .xlsm file
2. Verifies file structure
3. Checks for VBA (if available)
4. Validates all sheets
"""

import os
import sys
import zipfile

def test_deployment():
    """Test the deployment workflow"""
    
    print("=" * 70)
    print("DEPLOYMENT WORKFLOW TEST")
    print("=" * 70)
    print()
    
    # Test files
    tests_passed = 0
    tests_failed = 0
    
    # Test 1: Check required files exist
    print("Test 1: Checking required files...")
    required_files = [
        'Ecom_Operations_Tracking_System.xlsx',
        'VBA_Modules.bas',
        'BashQueryForm.frm',
        'deploy_xlsm.py'
    ]
    
    for file in required_files:
        if os.path.exists(file):
            print(f"  ✓ {file}")
            tests_passed += 1
        else:
            print(f"  ✗ {file} NOT FOUND")
            tests_failed += 1
    print()
    
    # Test 2: Check if .xlsm was created
    print("Test 2: Checking generated .xlsm file...")
    xlsm_file = 'Ecom_Operations_Tracking_System.xlsm'
    
    if os.path.exists(xlsm_file):
        size = os.path.getsize(xlsm_file)
        print(f"  ✓ File exists: {xlsm_file}")
        print(f"  ✓ Size: {size:,} bytes")
        tests_passed += 2
        
        # Test 3: Verify .xlsm structure
        print()
        print("Test 3: Verifying .xlsm structure...")
        try:
            with zipfile.ZipFile(xlsm_file, 'r') as zip_ref:
                files = zip_ref.namelist()
                
                # Check for essential Excel components
                essential = [
                    'xl/workbook.xml',
                    'xl/worksheets/sheet1.xml',
                    '[Content_Types].xml'
                ]
                
                for essential_file in essential:
                    if essential_file in files:
                        print(f"  ✓ {essential_file}")
                        tests_passed += 1
                    else:
                        print(f"  ✗ {essential_file} missing")
                        tests_failed += 1
                
                # Count worksheets
                sheets = [f for f in files if f.startswith('xl/worksheets/sheet')]
                print(f"  ✓ Found {len(sheets)} worksheets")
                tests_passed += 1
                
                # Check for VBA
                if 'xl/vbaProject.bin' in files:
                    vba_size = zip_ref.getinfo('xl/vbaProject.bin').file_size
                    print(f"  ✓ VBA project found ({vba_size:,} bytes)")
                    tests_passed += 1
                else:
                    print(f"  ℹ No VBA project (run with --with-vba after creating vbaProject.bin)")
                
        except Exception as e:
            print(f"  ✗ Error reading .xlsm: {e}")
            tests_failed += 1
    else:
        print(f"  ✗ File not found: {xlsm_file}")
        print(f"     Run: python3 deploy_xlsm.py")
        tests_failed += 1
    
    print()
    
    # Test 4: Check VBA source files
    print("Test 4: Checking VBA source files...")
    vba_module = 'VBA_Modules.bas'
    if os.path.exists(vba_module):
        with open(vba_module, 'r', encoding='utf-8-sig') as f:
            content = f.read()
            # Look for key functions
            functions = ['ShowDashboard', 'AddBashQuery', 'CheckWaveStatus']
            for func in functions:
                if func in content:
                    print(f"  ✓ Found function: {func}")
                    tests_passed += 1
                else:
                    print(f"  ✗ Missing function: {func}")
                    tests_failed += 1
    else:
        print(f"  ✗ VBA module not found")
        tests_failed += 1
    
    print()
    
    # Test 5: Check documentation
    print("Test 5: Checking documentation...")
    docs = [
        'QUICK_DEPLOY.md',
        'DEPLOYMENT_GUIDE.md',
        'README_VBA.md',
        'VBA_SETUP_GUIDE.md'
    ]
    
    for doc in docs:
        if os.path.exists(doc):
            print(f"  ✓ {doc}")
            tests_passed += 1
        else:
            print(f"  ✗ {doc} NOT FOUND")
            tests_failed += 1
    
    print()
    print("=" * 70)
    print("TEST RESULTS")
    print("=" * 70)
    print(f"Tests Passed: {tests_passed}")
    print(f"Tests Failed: {tests_failed}")
    print()
    
    if tests_failed == 0:
        print("✅ ALL TESTS PASSED!")
        print()
        print("Deployment system is ready to use.")
        print()
        print("Next steps:")
        print("1. Create vbaProject.bin using Excel (see QUICK_DEPLOY.md)")
        print("2. Run: python3 deploy_xlsm.py --with-vba")
        print("3. Distribute Ecom_Operations_Tracking_System.xlsm")
        return 0
    else:
        print("⚠️  SOME TESTS FAILED")
        print()
        print("Please check the errors above and ensure all files are present.")
        return 1

if __name__ == '__main__':
    sys.exit(test_deployment())
