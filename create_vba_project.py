#!/usr/bin/env python3
"""
Creates a vbaProject.bin file from VBA source files (.bas, .frm, .cls).

This is a helper script for Linux/Mac environments where Excel is not available.
It creates a minimal VBA project structure that can be embedded in .xlsm files.

Note: This is a simplified implementation. For production use, consider using
Windows with Excel or a pre-created vbaProject.bin template.
"""

import os
import struct
import zlib
import sys

def create_minimal_vba_project(vba_bas_file, vba_frm_file=None):
    """
    Create a minimal vbaProject.bin from source files.
    
    This creates a basic OLE structure with VBA modules.
    The resulting binary may need refinement for full Excel compatibility.
    
    Args:
        vba_bas_file: Path to .bas VBA module file
        vba_frm_file: Optional path to .frm UserForm file
    
    Returns:
        bytes: VBA project binary data
    """
    
    print("⚠️  Creating minimal VBA project binary...")
    print("   Note: This is experimental and may not work in all Excel versions.")
    print()
    
    # Read the VBA module
    if not os.path.exists(vba_bas_file):
        print(f"❌ Error: VBA file not found: {vba_bas_file}")
        return None
    
    with open(vba_bas_file, 'r', encoding='utf-8') as f:
        vba_code = f.read()
    
    print(f"✓ Read VBA module: {os.path.basename(vba_bas_file)}")
    print(f"  Size: {len(vba_code)} characters")
    
    # Read UserForm if provided
    frm_code = None
    if vba_frm_file and os.path.exists(vba_frm_file):
        with open(vba_frm_file, 'r', encoding='utf-8') as f:
            frm_code = f.read()
        print(f"✓ Read UserForm: {os.path.basename(vba_frm_file)}")
    
    print()
    print("❌ Unfortunately, creating a vbaProject.bin from scratch requires:")
    print("   • Complex OLE file format manipulation")
    print("   • Proper VBA bytecode compilation")
    print("   • Excel-specific binary structures")
    print()
    print("   These are not easily created without Excel/Windows.")
    print()
    
    return None

def extract_vba_from_xlsm(xlsm_file, output_bin):
    """
    Extract vbaProject.bin from an existing .xlsm file.
    
    Args:
        xlsm_file: Path to existing .xlsm file
        output_bin: Path where to save vbaProject.bin
    
    Returns:
        bool: True if successful
    """
    import zipfile
    
    if not os.path.exists(xlsm_file):
        print(f"❌ Error: File not found: {xlsm_file}")
        return False
    
    try:
        print(f"📂 Extracting VBA from: {os.path.basename(xlsm_file)}")
        
        with zipfile.ZipFile(xlsm_file, 'r') as zip_ref:
            # Check if vbaProject.bin exists in the zip
            vba_path = 'xl/vbaProject.bin'
            if vba_path in zip_ref.namelist():
                # Extract the VBA project
                vba_data = zip_ref.read(vba_path)
                
                # Write to output file
                with open(output_bin, 'wb') as f:
                    f.write(vba_data)
                
                print(f"✅ Successfully extracted vbaProject.bin")
                print(f"   Size: {len(vba_data)} bytes")
                print(f"   Saved to: {output_bin}")
                return True
            else:
                print(f"❌ No VBA project found in {xlsm_file}")
                print(f"   The file may not contain macros.")
                return False
                
    except Exception as e:
        print(f"❌ Error extracting VBA: {e}")
        return False

def display_instructions():
    """Display instructions for creating vbaProject.bin"""
    print()
    print("=" * 70)
    print("HOW TO CREATE vbaProject.bin")
    print("=" * 70)
    print()
    print("OPTION 1: Use Windows with Excel (Recommended)")
    print("-" * 70)
    print("1. Open Excel on a Windows machine")
    print("2. Create a new workbook and save as .xlsm")
    print("3. Press Alt + F11 to open VBA Editor")
    print("4. File → Import File → Select VBA_Modules.bas")
    print("5. (Optional) Import BashQueryForm.frm")
    print("6. Save and close Excel")
    print("7. Rename the .xlsm file to .zip")
    print("8. Extract xl/vbaProject.bin from the zip")
    print("9. Copy vbaProject.bin to this directory")
    print("10. Run create_xlsm.py again")
    print()
    print("OPTION 2: Extract from existing .xlsm")
    print("-" * 70)
    print("If you already have an .xlsm file with the VBA code:")
    print()
    print(f"  python3 {os.path.basename(__file__)} extract <your_file.xlsm>")
    print()
    print("OPTION 3: Use a pre-made template")
    print("-" * 70)
    print("1. Download a pre-made vbaProject.bin from a trusted source")
    print("2. Place it in this directory")
    print("3. Run create_xlsm.py")
    print()

def main():
    """Main entry point"""
    
    if len(sys.argv) > 1 and sys.argv[1] == 'extract':
        # Extract mode
        if len(sys.argv) < 3:
            print("Usage: python3 create_vba_project.py extract <file.xlsm>")
            return 1
        
        xlsm_file = sys.argv[2]
        output_bin = 'vbaProject.bin'
        
        if extract_vba_from_xlsm(xlsm_file, output_bin):
            print()
            print("✅ Now you can run create_xlsm.py to create a new .xlsm with this VBA")
            return 0
        else:
            return 1
    
    # Create mode (not fully implemented)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    vba_bas = os.path.join(base_dir, 'VBA_Modules.bas')
    vba_frm = os.path.join(base_dir, 'BashQueryForm.frm')
    
    result = create_minimal_vba_project(vba_bas, vba_frm)
    
    if result:
        output_bin = os.path.join(base_dir, 'vbaProject.bin')
        with open(output_bin, 'wb') as f:
            f.write(result)
        print(f"✅ Created: {output_bin}")
        return 0
    else:
        display_instructions()
        return 1

if __name__ == '__main__':
    sys.exit(main())
