#!/usr/bin/env python3
"""
Create a minimal VBA project binary for Excel

This creates a basic OLE structure with minimal VBA project metadata.
The resulting file allows Excel to recognize it as a macro-enabled workbook,
but the actual VBA code must still be imported through Excel.

This is a bootstrap solution for environments without Excel.
"""

import struct
import os

def create_minimal_ole_header():
    """
    Create a minimal OLE file header
    
    OLE files start with a specific signature and header structure.
    """
    # OLE file signature (8 bytes): D0 CF 11 E0 A1 B1 1A E1
    signature = bytes([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])
    
    # Class ID (16 bytes of zeros)
    clsid = bytes(16)
    
    # Minor version (2 bytes): 0x003E  
    minor_version = struct.pack('<H', 0x003E)
    
    # Major version (2 bytes): 0x0003 for version 3, 0x0004 for version 4
    major_version = struct.pack('<H', 0x0003)
    
    # Byte order (2 bytes): 0xFFFE for little-endian
    byte_order = struct.pack('<H', 0xFFFE)
    
    # Sector size (2 bytes): 0x0009 (512 bytes)
    sector_size = struct.pack('<H', 0x0009)
    
    # Mini sector size (2 bytes): 0x0006 (64 bytes)
    mini_sector_size = struct.pack('<H', 0x0006)
    
    # Reserved (6 bytes of zeros)
    reserved1 = bytes(6)
    
    # Total sectors (4 bytes): 0 for version 3
    total_sectors = struct.pack('<I', 0)
    
    # FAT sectors (4 bytes)
    fat_sectors = struct.pack('<I', 0)
    
    # First directory sector (4 bytes)
    first_dir_sector = struct.pack('<I', 0)
    
    # Transaction signature (4 bytes)
    trans_sig = struct.pack('<I', 0)
    
    # Mini stream cutoff size (4 bytes): 0x00001000 (4096 bytes)
    mini_cutoff = struct.pack('<I', 0x00001000)
    
    # First mini FAT sector (4 bytes)
    first_mini_fat = struct.pack('<I', 0xFFFFFFFE)
    
    # Total mini FAT sectors (4 bytes)
    total_mini_fat = struct.pack('<I', 0)
    
    # First DIFAT sector (4 bytes)
    first_difat = struct.pack('<I', 0xFFFFFFFE)
    
    # Total DIFAT sectors (4 bytes)
    total_difat = struct.pack('<I', 0)
    
    # DIFAT array (436 bytes)
    difat = struct.pack('<I', 0xFFFFFFFD) + (bytes([0xFF]) * 432)
    
    # Combine all parts
    header = (signature + clsid + minor_version + major_version + byte_order +
              sector_size + mini_sector_size + reserved1 + total_sectors +
              fat_sectors + first_dir_sector + trans_sig + mini_cutoff +
              first_mini_fat + total_mini_fat + first_difat + total_difat + difat)
    
    return header

def create_bootstrap_vba_project():
    """
    Create a minimal bootstrap vbaProject.bin
    
    This creates just enough structure for Excel to recognize the file
    as containing macros, but the actual VBA code must be imported via Excel.
    """
    
    print("Creating minimal VBA project bootstrap...")
    print()
    print("⚠️  IMPORTANT: This creates a PLACEHOLDER only!")
    print()
    print("   The file allows Excel to:")
    print("   • Recognize the workbook as macro-enabled")
    print("   • Open the VBA editor")
    print()
    print("   You MUST still import VBA_Modules.bas using Excel:")
    print("   Alt+F11 → File → Import → VBA_Modules.bas")
    print()
    
    # Create OLE header
    header = create_minimal_ole_header()
    
    # Pad to create a minimal valid OLE file (at least 512 bytes)
    # Real VBA projects are much larger with complex structures
    padding = bytes(512 - len(header)) if len(header) < 512 else bytes()
    
    minimal_vba = header + padding
    
    # Add a second sector with minimal directory entries
    # This is highly simplified and may not work in all cases
    dir_sector = bytes(512)
    minimal_vba += dir_sector
    
    return minimal_vba

def main():
    """Main entry point"""
    
    output_file = 'vbaProject.bin'
    
    # Check if file already exists
    if os.path.exists(output_file):
        print(f"✓ {output_file} already exists!")
        print(f"  Size: {os.path.getsize(output_file):,} bytes")
        print()
        response = input("Overwrite? (yes/no): ")
        if response.lower() not in ['yes', 'y']:
            print("Aborted.")
            return 0
        print()
    
    print("=" * 70)
    print("MINIMAL VBA PROJECT BOOTSTRAP CREATOR")
    print("=" * 70)
    print()
    
    # Create the minimal VBA project
    vba_data = create_bootstrap_vba_project()
    
    # Write to file
    with open(output_file, 'wb') as f:
        f.write(vba_data)
    
    print(f"✅ Created: {output_file}")
    print(f"   Size: {len(vba_data):,} bytes")
    print()
    print("=" * 70)
    print("NEXT STEPS")
    print("=" * 70)
    print()
    print("1. Create the .xlsm file with this bootstrap:")
    print("   python3 deploy_xlsm.py --with-vba")
    print()
    print("2. Open Ecom_Operations_Tracking_System.xlsm in Excel")
    print()
    print("3. Import VBA code:")
    print("   • Press Alt+F11 (VBA Editor)")
    print("   • File → Import File")
    print("   • Select VBA_Modules.bas")
    print("   • (Optional) Import BashQueryForm.frm")
    print("   • Save and close")
    print()
    print("4. Extract the complete VBA binary:")
    print("   python3 deploy_xlsm.py --extract Ecom_Operations_Tracking_System.xlsm")
    print()
    print("5. Future deployments are fully automated:")
    print("   python3 deploy_xlsm.py --with-vba")
    print()
    print("=" * 70)
    print()
    print("⚠️  NOTE: The bootstrap is a placeholder. Real VBA code")
    print("   must be imported via Excel (one-time setup).")
    print()
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main())
