#!/usr/bin/env python3
"""
Build vbaProject.bin from VBA source files

This script attempts to create a vbaProject.bin file from .bas and .frm source files.
It uses olefile to create the OLE compound file structure required by Excel.

WARNING: This is an experimental script. The created vbaProject.bin may not work
in all Excel versions. The most reliable method is to create it using Excel on Windows.

For production use, consider:
1. Creating vbaProject.bin once using Excel on Windows
2. Committing vbaProject.bin to repository
3. Using deploy_xlsm.py --with-vba for all future deployments
"""

import olefile
import os
import struct
import sys
import zlib

def read_vba_source(filepath):
    """Read VBA source code from .bas or .frm file"""
    if not os.path.exists(filepath):
        return None
    
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    return content

def compress_vba_code(code):
    """
    Compress VBA code using RLE compression (simplified version)
    
    Note: Real VBA compression is more complex and uses a proprietary algorithm.
    This is a simplified version that may not work in all cases.
    """
    # Convert to bytes
    code_bytes = code.encode('utf-8')
    
    # Use simple compression (not actual VBA compression)
    compressed = zlib.compress(code_bytes, 9)
    
    return compressed

def create_minimal_vba_project(vba_module_path, vba_form_path=None, output_path='vbaProject.bin'):
    """
    Attempt to create a minimal vbaProject.bin file
    
    WARNING: This is experimental and may not work with all Excel versions.
    """
    
    print("=" * 70)
    print("VBA PROJECT BINARY BUILDER (Experimental)")
    print("=" * 70)
    print()
    print("⚠️  WARNING: This is an experimental script!")
    print()
    print("   Creating a proper vbaProject.bin requires:")
    print("   • Complex OLE structure")
    print("   • Proprietary VBA compression")
    print("   • Excel-specific metadata")
    print("   • VBA bytecode compilation")
    print()
    print("   This script creates a MINIMAL structure that may not work.")
    print("   Recommended approach: Create vbaProject.bin using Excel.")
    print()
    
    # Read VBA source
    vba_code = read_vba_source(vba_module_path)
    if not vba_code:
        print(f"❌ Error: Could not read VBA module: {vba_module_path}")
        return False
    
    print(f"✓ Read VBA module: {os.path.basename(vba_module_path)}")
    print(f"  Size: {len(vba_code)} characters")
    
    # Read form if provided
    frm_code = None
    if vba_form_path and os.path.exists(vba_form_path):
        frm_code = read_vba_source(vba_form_path)
        print(f"✓ Read VBA form: {os.path.basename(vba_form_path)}")
        print(f"  Size: {len(frm_code)} characters")
    
    print()
    print("❌ LIMITATION:")
    print("   Python cannot create a fully compatible vbaProject.bin without Excel.")
    print()
    print("   The OLE structure, VBA compression, and bytecode compilation")
    print("   require proprietary Microsoft Office components.")
    print()
    
    return False

def create_vba_project_template():
    """
    Create a template instruction file for vbaProject.bin creation
    """
    
    template = """# vbaProject.bin Creation Template

## What is vbaProject.bin?

vbaProject.bin is a binary file containing compiled VBA code in Microsoft's 
proprietary OLE (Object Linking and Embedding) format. It includes:

- Compiled VBA bytecode
- Module metadata
- Form definitions  
- Project settings
- Digital signatures (if signed)

## Why Can't We Create It on Linux?

Creating vbaProject.bin requires:

1. **VBA Compiler**: Microsoft's proprietary VBA compiler (not available on Linux)
2. **OLE Structure**: Complex binary format specific to Office
3. **Compression**: Proprietary RLE/LZ77 hybrid compression
4. **Metadata**: Excel-specific project metadata

## How to Create vbaProject.bin

### Method 1: Using Excel (Windows or Mac)

1. Open Excel
2. Create new workbook, save as .xlsm
3. Press Alt+F11 (VBA Editor)
4. File → Import → Select VBA_Modules.bas
5. (Optional) Import BashQueryForm.frm
6. Save and close Excel
7. Extract binary:
   - Rename .xlsm to .zip
   - Extract xl/vbaProject.bin
   - Copy to repository root

### Method 2: Using the Deployment Script

```bash
# Create base .xlsm
python3 deploy_xlsm.py

# Open in Excel, import VBA (Alt+F11 → File → Import)
# Then extract:
python3 deploy_xlsm.py --extract Ecom_Operations_Tracking_System.xlsm
```

### Method 3: Using Office 365 Web (Limited)

Office 365 web version has limited VBA support. Use desktop Excel instead.

## Once You Have vbaProject.bin

Commit it to the repository:

```bash
git add vbaProject.bin
git commit -m "Add VBA project binary for automated deployment"
git push
```

Then all future deployments are fully automated:

```bash
python3 deploy_xlsm.py --with-vba
```

This creates a ready-to-use .xlsm with VBA embedded!

## Alternative: Distribute Without VBA Binary

Users can still use the system:

1. Distribute .xlsm created by deploy_xlsm.py
2. Include VBA_Modules.bas and BashQueryForm.frm
3. Users import VBA manually (one-time setup)
4. See README_VBA.md for instructions

## For Developers

If you need to build vbaProject.bin programmatically:

- Use Windows with Excel installed
- Use pywin32 library with COM automation
- See example scripts in community repos
- Consider Docker with Wine + Excel (complex)

## Security Note

vbaProject.bin contains compiled code. Always:

- ✓ Review source .bas/.frm files
- ✓ Use virus scanning
- ✓ Consider code signing for enterprise
- ✓ Keep source and binary in version control
- ✓ Document VBA changes

"""
    
    output_file = 'VBA_BINARY_TEMPLATE.md'
    with open(output_file, 'w') as f:
        f.write(template)
    
    print(f"✓ Created template: {output_file}")
    print()
    print("See VBA_BINARY_TEMPLATE.md for detailed instructions")
    print("on creating vbaProject.bin using Excel.")
    
    return True

def main():
    """Main entry point"""
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    vba_module = os.path.join(base_dir, 'VBA_Modules.bas')
    vba_form = os.path.join(base_dir, 'BashQueryForm.frm')
    output_bin = os.path.join(base_dir, 'vbaProject.bin')
    
    # Check if vbaProject.bin already exists
    if os.path.exists(output_bin):
        print(f"✓ vbaProject.bin already exists!")
        print(f"  Location: {output_bin}")
        size = os.path.getsize(output_bin)
        print(f"  Size: {size:,} bytes")
        print()
        print("You can now run: python3 deploy_xlsm.py --with-vba")
        return 0
    
    # Attempt to create (will explain limitations)
    result = create_minimal_vba_project(vba_module, vba_form, output_bin)
    
    if not result:
        print("=" * 70)
        print("SOLUTION: Create vbaProject.bin Using Excel")
        print("=" * 70)
        print()
        create_vba_project_template()
        print()
        print("=" * 70)
        print("QUICK STEPS:")
        print("=" * 70)
        print()
        print("1. Run: python3 deploy_xlsm.py")
        print("2. Open Ecom_Operations_Tracking_System.xlsm in Excel")
        print("3. Press Alt+F11 → File → Import → VBA_Modules.bas")
        print("4. Save and close Excel")
        print("5. Run: python3 deploy_xlsm.py --extract Ecom_Operations_Tracking_System.xlsm")
        print("6. Run: python3 deploy_xlsm.py --with-vba")
        print()
        print("After step 5, vbaProject.bin is created and can be reused forever!")
        print()
        return 1
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
