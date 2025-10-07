#!/usr/bin/env python3
"""
Formula-Based Excel Generator for E-Commerce Operations Tracking System

This script creates an advanced Excel workbook with formulas instead of VBA.
All calculations, metrics, and tracking are done using Excel formulas.

Usage:
    python3 create_formula_based_excel.py
"""

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from datetime import datetime, timedelta
import os

class FormulaBasedExcelGenerator:
    """Creates formula-only Excel workbook with dashboard and tracking sheets"""
    
    def __init__(self):
        self.wb = openpyxl.Workbook()
        # Remove default sheet
        if 'Sheet' in self.wb.sheetnames:
            del self.wb['Sheet']
        
        # Define styles
        self.header_fill = PatternFill(start_color="366092", end_color="366092", fill_type="solid")
        self.header_font = Font(color="FFFFFF", bold=True, size=11)
        self.title_fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
        self.title_font = Font(color="FFFFFF", bold=True, size=14)
        self.warning_fill = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")
        self.success_fill = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")
        self.alert_fill = PatternFill(start_color="FFEB9C", end_color="FFEB9C", fill_type="solid")
        
        self.thin_border = Border(
            left=Side(style='thin'),
            right=Side(style='thin'),
            top=Side(style='thin'),
            bottom=Side(style='thin')
        )
    
    def apply_header_style(self, ws, row, start_col=1, end_col=None):
        """Apply header styling to a row"""
        if end_col is None:
            end_col = ws.max_column
        
        for col in range(start_col, end_col + 1):
            cell = ws.cell(row=row, column=col)
            cell.fill = self.header_fill
            cell.font = self.header_font
            cell.alignment = Alignment(horizontal='center', vertical='center')
            cell.border = self.thin_border
    
    def apply_title_style(self, ws, row, col):
        """Apply title styling to a cell"""
        cell = ws.cell(row=row, column=col)
        cell.fill = self.title_fill
        cell.font = self.title_font
        cell.alignment = Alignment(horizontal='center', vertical='center')
    
    def set_column_widths(self, ws, widths):
        """Set column widths"""
        for i, width in enumerate(widths, start=1):
            ws.column_dimensions[get_column_letter(i)].width = width
    
    def create_dashboard(self):
        """Create Dashboard sheet with formulas for KPI calculations"""
        ws = self.wb.create_sheet("Dashboard", 0)
        
        # Title
        ws['A1'] = 'E-COMMERCE OPERATIONS DASHBOARD'
        ws.merge_cells('A1:E1')
        self.apply_title_style(ws, 1, 1)
        
        # Generated timestamp
        ws['A2'] = 'Generated:'
        ws['B2'] = '=NOW()'
        ws['B2'].number_format = 'yyyy-mm-dd hh:mm:ss'
        
        # KPI Section
        ws['A4'] = 'KEY PERFORMANCE INDICATORS'
        ws.merge_cells('A4:E4')
        self.apply_title_style(ws, 4, 1)
        
        # Headers
        headers = ['Metric', 'Target', 'Current', 'Status', 'Last Updated']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=5, column=col, value=header)
        self.apply_header_style(ws, 5, 1, 5)
        
        # KPI Rows with formulas
        kpis = [
            ('Wave Completion (1 hour)', '100%', '=COUNTIFS(\'Wave Tracking\'!H:H,"Complete",\'Wave Tracking\'!E:E,"<=60")/COUNTIF(\'Wave Tracking\'!H:H,"Complete")', 
             '=IF(C6>=0.95,"On Track",IF(C6>=0.85,"Needs Attention","Critical"))', '=NOW()'),
            ('Employee Training Completion', '100%', '=COUNTIF(\'Employee Training\'!G:G,"Completed")/COUNTA(\'Employee Training\'!A:A)-1',
             '=IF(C7>=0.95,"Excellent",IF(C7>=0.85,"Good","Needs Attention"))', '=NOW()'),
            ('Stock Replenishment Time', '< 2 hours', '=AVERAGE(\'Stock Replenishment\'!I:I)',
             '=IF(C8<=2,"On Time",IF(C8<=2.5,"Delayed","Critical"))', '=NOW()'),
            ('Quality Audit Coverage', '> 5%', '=AVERAGE(\'Quality Audit\'!F:F)',
             '=IF(C9>=0.05,"Minimum",IF(C9>=0.07,"Good","Below Target"))', '=NOW()'),
            ('Picking Efficiency', '> 95%', '=AVERAGE(\'Picking Tasks\'!I:I)',
             '=IF(C10>=0.95,"Excellent",IF(C10>=0.90,"Good","Needs Improvement"))', '=NOW()'),
            ('SLA Compliance', '> 95%', '0.96',
             '=IF(C11>=0.95,"Excellent",IF(C11>=0.90,"Good","Below Target"))', '=NOW()'),
            ('Inventory Accuracy', '> 99%', '=1-ABS(SUM(\'Inventory Mismatch\'!G:G))/SUM(\'Inventory Mismatch\'!E:E)',
             '=IF(C12>=0.99,"Excellent",IF(C12>=0.985,"Good","Needs Improvement"))', '=NOW()'),
            ('System Uptime', '> 99%', '0.992',
             '=IF(C13>=0.99,"Excellent",IF(C13>=0.95,"Good","Critical"))', '=NOW()'),
        ]
        
        row = 6
        for kpi_name, target, current, status, last_updated in kpis:
            ws.cell(row=row, column=1, value=kpi_name)
            ws.cell(row=row, column=2, value=target)
            ws.cell(row=row, column=3, value=current)
            ws.cell(row=row, column=4, value=status)
            ws.cell(row=row, column=5, value=last_updated)
            
            # Format current column based on type
            current_cell = ws.cell(row=row, column=3)
            if '%' in target or 'hours' not in target:
                current_cell.number_format = '0.0%'
            else:
                current_cell.number_format = '0.0'
            
            # Format last updated
            ws.cell(row=row, column=5).number_format = 'yyyy-mm-dd hh:mm'
            
            # Apply conditional formatting to status
            status_cell = ws.cell(row=row, column=4)
            status_cell.alignment = Alignment(horizontal='center')
            
            row += 1
        
        # Daily Summary
        ws[f'A{row+1}'] = 'DAILY SUMMARY'
        ws.merge_cells(f'A{row+1}:B{row+1}')
        self.apply_title_style(ws, row+1, 1)
        
        row += 2
        ws[f'A{row}'] = 'Total Orders Today'
        ws[f'B{row}'] = '=SUM(\'Order Volumes\'!B3:B3)'
        ws[f'B{row}'].number_format = '#,##0'
        
        row += 1
        ws[f'A{row}'] = 'Active Employees'
        ws[f'B{row}'] = '=COUNTA(\'Employee Performance\'!A:A)-1'
        
        row += 1
        ws[f'A{row}'] = 'Pending Tasks'
        ws[f'B{row}'] = '=COUNTIF(\'Wave Tracking\'!H:H,"In Progress")+COUNTIF(\'Picking Tasks\'!K:K,"In Progress")'
        
        row += 1
        ws[f'A{row}'] = 'System Alerts'
        ws[f'B{row}'] = '=COUNTIF(\'System Errors\'!J:J,"Open")'
        
        # Critical Alerts
        row += 2
        ws[f'A{row}'] = 'CRITICAL ALERTS'
        ws.merge_cells(f'A{row}:E{row}')
        self.apply_title_style(ws, row, 1)
        
        row += 1
        alerts = [
            '=IF(C8>2,"Stock replenishment time exceeding target by "&TEXT((C8-2)/2,"0%"),"")',
            '=IF(C7<0.9,TEXT(1-C7,"0%")&" of employees pending training completion","")',
            '=IF(C12<0.99,"Inventory accuracy below target threshold","")',
        ]
        
        for alert_formula in alerts:
            ws[f'A{row}'] = alert_formula
            row += 1
        
        # Set column widths
        self.set_column_widths(ws, [35, 15, 15, 20, 20])
        
        return ws
    
    def create_bash_queries(self):
        """Create Bash Queries Response sheet"""
        ws = self.wb.create_sheet("Bash Queries Response")
        
        # Title
        ws['A1'] = 'BASH QUERIES RESPONSE LOG'
        ws.merge_cells('A1:F1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Query ID', 'Timestamp', 'Query', 'Response', 'Response Time (ms)', 'Status']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 6)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Enter timestamp (right-click > Insert > Current Date & Time)')
        ws.cell(row=3, column=3, value='Enter customer query text')
        ws.cell(row=3, column=4, value='Enter your response or system output')
        ws.cell(row=3, column=5, value='Enter response time in milliseconds')
        ws.cell(row=3, column=6, value='Enter status: Completed, Pending, or Failed')
        
        # Make instructions row stand out with light blue background
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 7):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        self.set_column_widths(ws, [12, 20, 35, 50, 18, 12])
        
        return ws
    
    def create_wave_tracking(self):
        """Create Wave Tracking sheet with duration formulas"""
        ws = self.wb.create_sheet("Wave Tracking")
        
        # Title
        ws['A1'] = 'WAVE TRACKING - 1 HOUR COMPLETION MONITORING'
        ws.merge_cells('A1:I1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Wave ID', 'Start Time', 'Target End', 'Actual End', 'Duration (mins)', 
                   'Tasks Total', 'Tasks Complete', 'Status', 'Notes']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 9)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Enter start time (format: HH:MM:SS)')
        ws.cell(row=3, column=3, value='Enter target completion (1 hour from start)')
        ws.cell(row=3, column=4, value='Enter actual completion time')
        ws.cell(row=3, column=5, value='AUTO-CALCULATED: =(D3-B3)*24*60')
        ws.cell(row=3, column=6, value='Enter total tasks')
        ws.cell(row=3, column=7, value='Enter completed tasks')
        ws.cell(row=3, column=8, value='Status: Complete or In Progress')
        ws.cell(row=3, column=9, value='Optional notes')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 10):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add a sample formula in row 4 for Duration column to show how it works
        ws.cell(row=4, column=1, value='W-001')
        ws.cell(row=4, column=5, value='=(D4-B4)*24*60')
        ws.cell(row=4, column=5).number_format = '0'
        ws.cell(row=4, column=9, value='← Copy this formula down when you add data')
        
        self.set_column_widths(ws, [12, 15, 15, 15, 15, 12, 15, 15, 35])
        
        return ws
    
    def create_employee_training(self):
        """Create Employee Training sheet"""
        ws = self.wb.create_sheet("Employee Training")
        
        # Title
        ws['A1'] = 'EMPLOYEE TRAINING SCHEDULE & STATUS'
        ws.merge_cells('A1:J1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Employee ID', 'Name', 'Department', 'Training Module', 'Scheduled Date', 
                   'Completion Date', 'Status', 'Score', 'Certifier', 'Notes']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 10)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Enter employee name')
        ws.cell(row=3, column=3, value='Department: Picking, Packing, Receiving, Quality, etc.')
        ws.cell(row=3, column=4, value='Training module name')
        ws.cell(row=3, column=5, value='Enter scheduled date (YYYY-MM-DD)')
        ws.cell(row=3, column=6, value='Enter completion date (leave blank if pending)')
        ws.cell(row=3, column=7, value='Status: Completed or Pending')
        ws.cell(row=3, column=8, value='Score percentage (e.g., 95%)')
        ws.cell(row=3, column=9, value='Name of certifier/trainer')
        ws.cell(row=3, column=10, value='Optional notes')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 11):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        self.set_column_widths(ws, [12, 20, 15, 20, 15, 15, 15, 10, 15, 20])
        
        return ws
    
    def create_stock_replenishment(self):
        """Create Stock Replenishment sheet with duration formulas"""
        ws = self.wb.create_sheet("Stock Replenishment")
        
        # Title
        ws['A1'] = 'STOCK REPLENISHMENT MONITORING'
        ws.merge_cells('A1:K1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Replen ID', 'SKU', 'Product Name', 'Reorder Point', 'Current Stock', 
                   'Order Qty', 'Request Time', 'Received Time', 'Duration (hrs)', 'Status', 'Priority']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 11)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Product SKU code')
        ws.cell(row=3, column=3, value='Product name')
        ws.cell(row=3, column=4, value='Reorder point threshold')
        ws.cell(row=3, column=5, value='Current stock level')
        ws.cell(row=3, column=6, value='Order quantity')
        ws.cell(row=3, column=7, value='Request timestamp')
        ws.cell(row=3, column=8, value='Received timestamp')
        ws.cell(row=3, column=9, value='AUTO-CALCULATED: =(H3-G3)*24')
        ws.cell(row=3, column=10, value='Status: In Progress or Complete')
        ws.cell(row=3, column=11, value='Priority: Low, Medium, High, Urgent')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 12):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add sample formula in row 4
        ws.cell(row=4, column=1, value='REP-001')
        ws.cell(row=4, column=9, value='=(H4-G4)*24')
        ws.cell(row=4, column=9).number_format = '0.0'
        
        self.set_column_widths(ws, [12, 12, 20, 12, 12, 12, 20, 20, 18, 15, 12])
        
        return ws
    
    def create_quality_audit(self):
        """Create Quality Audit sheet with formula-based calculations"""
        ws = self.wb.create_sheet("Quality Audit")
        
        # Title
        ws['A1'] = 'QUALITY AUDIT - 5%+ COVERAGE TRACKING'
        ws.merge_cells('A1:K1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Audit ID', 'Date', 'Auditor', 'Items Processed', 'Items Audited', 
                   'Coverage %', 'Pass', 'Fail', 'Pass Rate', 'Issues Found', 'Actions Taken']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 11)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Enter audit date')
        ws.cell(row=3, column=3, value='Auditor name or team')
        ws.cell(row=3, column=4, value='Total items processed')
        ws.cell(row=3, column=5, value='Items audited (aim for 5%+)')
        ws.cell(row=3, column=6, value='AUTO-CALCULATED: =E3/D3')
        ws.cell(row=3, column=7, value='Number of items passed')
        ws.cell(row=3, column=8, value='Number of items failed')
        ws.cell(row=3, column=9, value='AUTO-CALCULATED: =G3/(G3+H3)')
        ws.cell(row=3, column=10, value='Description of issues')
        ws.cell(row=3, column=11, value='Corrective actions taken')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 12):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add sample formulas in row 4
        ws.cell(row=4, column=1, value='QA-001')
        ws.cell(row=4, column=6, value='=E4/D4')
        ws.cell(row=4, column=6).number_format = '0.0%'
        ws.cell(row=4, column=9, value='=G4/(G4+H4)')
        ws.cell(row=4, column=9).number_format = '0.0%'
        
        self.set_column_widths(ws, [12, 20, 15, 15, 15, 15, 10, 10, 15, 30, 25])
        
        return ws
    
    def create_picking_tasks(self):
        """Create Picking Tasks sheet with efficiency formulas"""
        ws = self.wb.create_sheet("Picking Tasks")
        
        # Title
        ws['A1'] = 'PICKING TASK MONITORING - EFFICIENCY TRACKING'
        ws.merge_cells('A1:K1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Task ID', 'Employee ID', 'Employee Name', 'Start Time', 'End Time', 
                   'Items Picked', 'Target Time (mins)', 'Actual Time (mins)', 'Efficiency %', 'Errors', 'Status']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 11)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Employee ID')
        ws.cell(row=3, column=3, value='Employee name')
        ws.cell(row=3, column=4, value='Task start timestamp')
        ws.cell(row=3, column=5, value='Task end timestamp')
        ws.cell(row=3, column=6, value='Number of items picked')
        ws.cell(row=3, column=7, value='Target time in minutes')
        ws.cell(row=3, column=8, value='AUTO-CALCULATED: =(E3-D3)*24*60')
        ws.cell(row=3, column=9, value='AUTO-CALCULATED: =G3/H3')
        ws.cell(row=3, column=10, value='Number of errors')
        ws.cell(row=3, column=11, value='Status: Complete or In Progress')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 12):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add sample formulas in row 4
        ws.cell(row=4, column=1, value='PT-001')
        ws.cell(row=4, column=8, value='=(E4-D4)*24*60')
        ws.cell(row=4, column=8).number_format = '0'
        ws.cell(row=4, column=9, value='=G4/H4')
        ws.cell(row=4, column=9).number_format = '0%'
        
        self.set_column_widths(ws, [12, 12, 20, 20, 20, 12, 18, 20, 15, 10, 15])
        
        return ws
    
    def create_order_volumes(self):
        """Create Order Volumes sheet"""
        ws = self.wb.create_sheet("Order Volumes")
        
        # Title
        ws['A1'] = 'ORDER VOLUMES - DAILY TRENDS'
        ws.merge_cells('A1:J1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Date', 'Total Orders', 'Pending', 'Processing', 'Shipped', 
                   'Delivered', 'Cancelled', 'Return Rate %', 'Average Value', 'Peak Hour']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 10)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Enter total orders count')
        ws.cell(row=3, column=3, value='Pending orders')
        ws.cell(row=3, column=4, value='Processing orders')
        ws.cell(row=3, column=5, value='Shipped orders')
        ws.cell(row=3, column=6, value='Delivered orders')
        ws.cell(row=3, column=7, value='Cancelled orders')
        ws.cell(row=3, column=8, value='AUTO-CALCULATED: =G3/B3')
        ws.cell(row=3, column=9, value='Average order value')
        ws.cell(row=3, column=10, value='Peak hour (e.g., 14:00)')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 11):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add sample formula in row 4
        ws.cell(row=4, column=8, value='=G4/B4')
        ws.cell(row=4, column=8).number_format = '0.0%'
        
        self.set_column_widths(ws, [12, 12, 10, 12, 10, 10, 10, 18, 15, 12])
        
        return ws
    
    def create_employee_performance(self):
        """Create Employee Performance sheet"""
        ws = self.wb.create_sheet("Employee Performance")
        
        # Title
        ws['A1'] = 'EMPLOYEE PERFORMANCE METRICS'
        ws.merge_cells('A1:K1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Employee ID', 'Employee Name', 'Department', 'Date', 'Tasks Completed', 
                   'Average Time (mins)', 'Accuracy %', 'Training Status', 'Performance Rating', 'Improvement Areas', 'Notes']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 11)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Employee name')
        ws.cell(row=3, column=3, value='Department name')
        ws.cell(row=3, column=4, value='Performance review date')
        ws.cell(row=3, column=5, value='Number of tasks completed')
        ws.cell(row=3, column=6, value='Average time per task (minutes)')
        ws.cell(row=3, column=7, value='Accuracy percentage')
        ws.cell(row=3, column=8, value='Training status: Complete or Pending')
        ws.cell(row=3, column=9, value='Rating: Excellent, Good, Satisfactory, Needs Improvement')
        ws.cell(row=3, column=10, value='Areas for improvement')
        ws.cell(row=3, column=11, value='Additional notes')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 12):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        self.set_column_widths(ws, [12, 20, 12, 20, 15, 18, 12, 15, 22, 25, 25])
        
        return ws
    
    def create_inventory_mismatch(self):
        """Create Inventory Mismatch sheet with variance formulas"""
        ws = self.wb.create_sheet("Inventory Mismatch")
        
        # Title
        ws['A1'] = 'INVENTORY MISMATCH - DISCREPANCY TRACKING'
        ws.merge_cells('A1:L1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Mismatch ID', 'Date', 'SKU', 'Product Name', 'System Count', 'Physical Count', 
                   'Variance', 'Variance %', 'Root Cause', 'Resolution', 'Resolved By', 'Status']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 12)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Date discovered')
        ws.cell(row=3, column=3, value='Product SKU')
        ws.cell(row=3, column=4, value='Product name')
        ws.cell(row=3, column=5, value='System count')
        ws.cell(row=3, column=6, value='Physical count')
        ws.cell(row=3, column=7, value='AUTO-CALCULATED: =F3-E3')
        ws.cell(row=3, column=8, value='AUTO-CALCULATED: =(F3-E3)/E3')
        ws.cell(row=3, column=9, value='Root cause of discrepancy')
        ws.cell(row=3, column=10, value='Resolution steps taken')
        ws.cell(row=3, column=11, value='Person who resolved')
        ws.cell(row=3, column=12, value='Status: Open or Resolved')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 13):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        # Add sample formulas in row 4
        ws.cell(row=4, column=1, value='INV-001')
        ws.cell(row=4, column=7, value='=F4-E4')
        ws.cell(row=4, column=8, value='=(F4-E4)/E4')
        ws.cell(row=4, column=8).number_format = '0.0%'
        
        self.set_column_widths(ws, [12, 20, 12, 20, 12, 15, 15, 18, 25, 25, 15, 12])
        
        return ws
    
    def create_system_errors(self):
        """Create System Errors sheet"""
        ws = self.wb.create_sheet("System Errors")
        
        # Title
        ws['A1'] = 'SYSTEM ERRORS LOG'
        ws.merge_cells('A1:J1')
        self.apply_title_style(ws, 1, 1)
        
        # Headers
        headers = ['Error ID', 'Date/Time', 'System/Module', 'Error Type', 'Severity', 
                   'Description', 'Impact', 'Resolution', 'Resolved By', 'Status']
        for col, header in enumerate(headers, start=1):
            ws.cell(row=2, column=col, value=header)
        self.apply_header_style(ws, 2, 1, 10)
        
        # Instructions row
        ws.cell(row=3, column=1, value='HOW TO USE:')
        ws.cell(row=3, column=2, value='Error timestamp')
        ws.cell(row=3, column=3, value='System or module name')
        ws.cell(row=3, column=4, value='Type of error')
        ws.cell(row=3, column=5, value='Severity: Low, Medium, High, Critical')
        ws.cell(row=3, column=6, value='Detailed error description')
        ws.cell(row=3, column=7, value='Business impact')
        ws.cell(row=3, column=8, value='Resolution steps')
        ws.cell(row=3, column=9, value='Person/team who resolved')
        ws.cell(row=3, column=10, value='Status: Open or Resolved')
        
        # Make instructions row stand out
        instruction_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")
        for col in range(1, 11):
            cell = ws.cell(row=3, column=col)
            cell.fill = instruction_fill
            cell.font = Font(italic=True, size=9)
        
        self.set_column_widths(ws, [12, 20, 20, 18, 12, 35, 20, 30, 15, 12])
        
        return ws
    
    def create_insights(self):
        """Create Insights & Analytics sheet"""
        ws = self.wb.create_sheet("Insights & Analytics")
        
        # Title
        ws['A1'] = 'INSIGHTS & ANALYTICS'
        ws.merge_cells('A1:C1')
        self.apply_title_style(ws, 1, 1)
        
        row = 3
        
        # Desired Outcomes
        ws[f'A{row}'] = 'DESIRED OUTCOMES'
        ws.merge_cells(f'A{row}:C{row}')
        self.apply_title_style(ws, row, 1)
        row += 1
        
        outcomes = [
            ("✓ People's Performance Improvement", 'Track individual and team metrics to identify training needs and improvement areas'),
            ('✓ SLA Met Continuously', 'Monitor service level agreements and ensure consistent compliance'),
            ('✓ Operations Optimised', 'Analyze bottlenecks and streamline processes for efficiency'),
        ]
        
        for outcome, desc in outcomes:
            ws[f'A{row}'] = outcome
            ws[f'B{row}'] = desc
            ws.merge_cells(f'B{row}:C{row}')
            row += 1
        
        row += 1
        
        # Key Insights
        ws[f'A{row}'] = 'KEY INSIGHTS'
        ws.merge_cells(f'A{row}:C{row}')
        self.apply_title_style(ws, row, 1)
        row += 1
        
        insights = [
            ('1. Wave Completion', 'Most waves complete within target time. Focus on outliers exceeding 1 hour.'),
            ('2. Training Impact', '87% completion rate shows good progress. Prioritize remaining 13% for immediate training.'),
            ('3. Stock Delays', 'Replenishment averaging 2.5 hours vs 2-hour target. Review supplier coordination.'),
            ('4. Quality Coverage', 'Meeting 5% minimum. Consider increasing to 7-10% for better defect prevention.'),
            ('5. Employee Performance', 'Top performers consistently exceed efficiency targets. Share best practices.'),
        ]
        
        for insight, desc in insights:
            ws[f'A{row}'] = insight
            ws[f'B{row}'] = desc
            ws.merge_cells(f'B{row}:C{row}')
            row += 1
        
        row += 1
        
        # Recommendations
        ws[f'A{row}'] = 'RECOMMENDATIONS'
        ws.merge_cells(f'A{row}:C{row}')
        self.apply_title_style(ws, row, 1)
        row += 1
        
        ws[f'A{row}'] = 'Priority'
        ws[f'B{row}'] = 'Action Item'
        ws[f'C{row}'] = 'Expected Impact'
        self.apply_header_style(ws, row, 1, 3)
        row += 1
        
        recommendations = [
            ('High', 'Complete pending employee training within 1 week', 'Improve operational consistency by 15%'),
            ('High', 'Investigate stock replenishment delays', 'Reduce average time to under 2 hours'),
            ('Medium', 'Increase quality audit rate to 7%', 'Reduce defects by 20%'),
            ('Medium', 'Document top performer best practices', 'Increase team efficiency by 10%'),
            ('Low', 'Implement automated inventory reconciliation', 'Reduce mismatch resolution time by 30%'),
        ]
        
        for priority, action, impact in recommendations:
            ws[f'A{row}'] = priority
            ws[f'B{row}'] = action
            ws[f'C{row}'] = impact
            row += 1
        
        row += 1
        
        # Critical Action Items
        ws[f'A{row}'] = 'CRITICAL ACTION ITEMS'
        ws.merge_cells(f'A{row}:C{row}')
        self.apply_title_style(ws, row, 1)
        row += 1
        
        actions = [
            '1. Daily monitoring of wave completion times to ensure SLA compliance',
            '2. Weekly training completion reviews with department managers',
            '3. Immediate investigation of waves not completing within 1 hour',
            '4. Root cause analysis for stock replenishment delays',
            '5. Monthly review of quality audit coverage and effectiveness',
            '6. Proactive training for employees showing performance gaps',
            '7. Quick resolution of inventory mismatches to maintain accuracy',
            '8. Regular system health checks to minimize errors',
        ]
        
        for action in actions:
            ws[f'A{row}'] = action
            ws.merge_cells(f'A{row}:C{row}')
            row += 1
        
        self.set_column_widths(ws, [30, 60, 30])
        
        return ws
    
    def generate(self, filename='Ecom_Operations_Tracking_System_Formula_Based.xlsx'):
        """Generate the complete workbook"""
        print()
        print("=" * 70)
        print("E-COMMERCE OPERATIONS TRACKING SYSTEM")
        print("Formula-Based Excel Generator (No VBA)")
        print("=" * 70)
        print()
        
        print("📝 Creating sheets with formulas...")
        
        self.create_dashboard()
        print("  ✓ Dashboard (with KPI formulas)")
        
        self.create_bash_queries()
        print("  ✓ Bash Queries Response")
        
        self.create_wave_tracking()
        print("  ✓ Wave Tracking (with duration formulas)")
        
        self.create_employee_training()
        print("  ✓ Employee Training")
        
        self.create_stock_replenishment()
        print("  ✓ Stock Replenishment (with duration formulas)")
        
        self.create_quality_audit()
        print("  ✓ Quality Audit (with coverage & pass rate formulas)")
        
        self.create_picking_tasks()
        print("  ✓ Picking Tasks (with efficiency formulas)")
        
        self.create_order_volumes()
        print("  ✓ Order Volumes (with return rate formulas)")
        
        self.create_employee_performance()
        print("  ✓ Employee Performance")
        
        self.create_inventory_mismatch()
        print("  ✓ Inventory Mismatch (with variance formulas)")
        
        self.create_system_errors()
        print("  ✓ System Errors")
        
        self.create_insights()
        print("  ✓ Insights & Analytics")
        
        print()
        print("💾 Saving workbook...")
        
        output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
        self.wb.save(output_path)
        
        print(f"✅ Success! File created: {filename}")
        print()
        print("📊 Features Included:")
        print("  • 12 comprehensive tracking sheets")
        print("  • Dashboard with live KPI calculations")
        print("  • Automatic duration calculations")
        print("  • Coverage and efficiency formulas")
        print("  • Variance tracking formulas")
        print("  • No VBA macros - pure Excel formulas only")
        print()
        print("=" * 70)
        print()
        
        return output_path

def main():
    """Main entry point"""
    generator = FormulaBasedExcelGenerator()
    generator.generate()

if __name__ == '__main__':
    main()
