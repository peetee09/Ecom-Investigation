# Visual Reference - Formula-Based Excel Structure

## 📊 Dashboard Sheet Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ E-COMMERCE OPERATIONS DASHBOARD                                      │
├─────────────────────────────────────────────────────────────────────┤
│ Generated: 2024-10-07 05:40:15                                       │
│                                                                       │
│ KEY PERFORMANCE INDICATORS                                           │
├─────────────────┬─────────┬──────────┬──────────────┬───────────────┤
│ Metric          │ Target  │ Current  │ Status       │ Last Updated  │
├─────────────────┼─────────┼──────────┼──────────────┼───────────────┤
│ Wave Completion │ 100%    │ 95.0%    │ On Track     │ 2024-10-07    │
│ Training        │ 100%    │ 87.0%    │ Needs Attn   │ 2024-10-07    │
│ Stock Time      │ < 2 hrs │ 2.5 hrs  │ Delayed      │ 2024-10-07    │
│ Quality Audit   │ > 5%    │ 5.0%     │ Minimum      │ 2024-10-07    │
│ Picking Eff     │ > 95%   │ 92.0%    │ Needs Improv │ 2024-10-07    │
│ SLA Compliance  │ > 95%   │ 96.0%    │ Excellent    │ 2024-10-07    │
│ Inventory Acc   │ > 99%   │ 98.5%    │ Good         │ 2024-10-07    │
│ System Uptime   │ > 99%   │ 99.2%    │ Excellent    │ 2024-10-07    │
└─────────────────┴─────────┴──────────┴──────────────┴───────────────┘

DAILY SUMMARY
├──────────────────────┬────────┐
│ Total Orders Today   │ 1,247  │
│ Active Employees     │ 47     │
│ Pending Tasks        │ 23     │
│ System Alerts        │ 5      │
└──────────────────────┴────────┘

CRITICAL ALERTS
├────────────────────────────────────────────────────────────────────┐
│ Stock replenishment time exceeding target by 25%                   │
│ 13% of employees pending training completion                       │
│ Inventory accuracy below target threshold                          │
└────────────────────────────────────────────────────────────────────┘
```

## 🔄 Wave Tracking Sheet

```
WAVE TRACKING - 1 HOUR COMPLETION MONITORING
┌────────┬────────────┬────────────┬────────────┬──────────┬──────┬──────────┬────────────┬──────────┐
│Wave ID │ Start Time │ Target End │ Actual End │ Duration │Total │ Complete │ Status     │ Notes    │
│        │            │            │            │ (mins)   │Tasks │          │            │          │
├────────┼────────────┼────────────┼────────────┼──────────┼──────┼──────────┼────────────┼──────────┤
│ W-001  │ 04:40:15   │ 05:40:15   │ 05:35:15   │ [=55]    │  50  │    50    │ Complete   │ On time  │
│ W-002  │ 03:40:15   │ 04:40:15   │ 04:45:15   │ [=65]    │  45  │    45    │ Complete   │ Delayed  │
│ W-003  │ 05:10:15   │ 06:10:15   │            │          │  40  │    38    │ In Progres │ 2 remain │
│ W-004  │ 05:25:15   │ 06:25:15   │            │          │  35  │    12    │ In Progres │ Early    │
└────────┴────────────┴────────────┴────────────┴──────────┴──────┴──────────┴────────────┴──────────┘

Formula in Duration column: =(D3-B3)*24*60
```

## 📚 Employee Training Sheet

```
EMPLOYEE TRAINING SCHEDULE & STATUS
┌──────────┬─────────────┬───────────┬──────────────────┬──────────────┬─────────────┬───────────┬───────┬───────────┬──────────┐
│Employee  │ Name        │ Dept      │ Training Module  │ Scheduled    │ Completion  │ Status    │ Score │ Certifier │ Notes    │
│ ID       │             │           │                  │ Date         │ Date        │           │       │           │          │
├──────────┼─────────────┼───────────┼──────────────────┼──────────────┼─────────────┼───────────┼───────┼───────────┼──────────┤
│ EMP-001  │ John Smith  │ Picking   │ Safety Procedure │ 2024-01-15   │ 2024-01-15  │ Completed │ 95%   │ Trainer A │ Excellent│
│ EMP-002  │ Jane Doe    │ Packing   │ Quality Standard │ 2024-01-16   │ 2024-01-16  │ Completed │ 92%   │ Trainer B │ Good     │
│ EMP-003  │ Bob Johnson │ Receiving │ System Training  │ 2024-01-17   │             │ Pending   │       │           │ Scheduled│
└──────────┴─────────────┴───────────┴──────────────────┴──────────────┴─────────────┴───────────┴───────┴───────────┴──────────┘
```

## 📦 Stock Replenishment Sheet

```
STOCK REPLENISHMENT MONITORING
┌──────────┬──────────┬─────────────┬────────┬─────────┬─────────┬──────────────┬──────────────┬──────────┬────────────┬──────────┐
│ Replen   │ SKU      │ Product     │Reorder │ Current │ Order   │ Request Time │ Received     │ Duration │ Status     │ Priority │
│ ID       │          │ Name        │ Point  │ Stock   │ Qty     │              │ Time         │ (hrs)    │            │          │
├──────────┼──────────┼─────────────┼────────┼─────────┼─────────┼──────────────┼──────────────┼──────────┼────────────┼──────────┤
│ REP-001  │ SKU-1001 │ Widget A    │   5    │    3    │   500   │ 2024-10-07   │              │ [=2.5]   │ In Progres │ High     │
│ REP-002  │ SKU-1002 │ Widget B    │  10    │    8    │   750   │ 2024-10-07   │ 2024-10-07   │ [=1.8]   │ Complete   │ Medium   │
└──────────┴──────────┴─────────────┴────────┴─────────┴─────────┴──────────────┴──────────────┴──────────┴────────────┴──────────┘

Formula in Duration column: =(H3-G3)*24
```

## 🎯 Quality Audit Sheet

```
QUALITY AUDIT - 5%+ COVERAGE TRACKING
┌──────────┬──────────────┬──────────┬─────────┬─────────┬──────────┬──────┬──────┬──────────┬──────────────┬──────────────┐
│ Audit ID │ Date         │ Auditor  │ Items   │ Items   │ Coverage │ Pass │ Fail │ Pass     │ Issues       │ Actions      │
│          │              │          │Processed│ Audited │ %        │      │      │ Rate     │ Found        │ Taken        │
├──────────┼──────────────┼──────────┼─────────┼─────────┼──────────┼──────┼──────┼──────────┼──────────────┼──────────────┤
│ QA-001   │ 2024-10-07   │ QA Tm A  │  1000   │   50    │ [=5.0%]  │  48  │   2  │ [=96.0%] │ Labeling err │ Re-labeled   │
│ QA-002   │ 2024-10-07   │ QA Tm B  │   850   │   43    │ [=5.1%]  │  41  │   2  │ [=95.3%] │ Packaging    │ Repackaged   │
└──────────┴──────────────┴──────────┴─────────┴─────────┴──────────┴──────┴──────┴──────────┴──────────────┴──────────────┘

Coverage formula: =E3/D3
Pass Rate formula: =G3/(G3+H3)
```

## 🎯 Picking Tasks Sheet

```
PICKING TASK MONITORING - EFFICIENCY TRACKING
┌─────────┬──────────┬──────────────┬──────────────┬──────────────┬──────┬────────────┬────────────┬──────────┬────────┬──────────┐
│ Task ID │Employee  │ Employee     │ Start Time   │ End Time     │Items │ Target Time│ Actual Time│Efficiency│ Errors │ Status   │
│         │ ID       │ Name         │              │              │Picked│ (mins)     │ (mins)     │ %        │        │          │
├─────────┼──────────┼──────────────┼──────────────┼──────────────┼──────┼────────────┼────────────┼──────────┼────────┼──────────┤
│ PT-001  │ EMP-001  │ John Smith   │ 2024-10-07   │ 2024-10-07   │  45  │     30     │   [=28]    │ [=107%]  │   0    │ Complete │
│ PT-002  │ EMP-002  │ Jane Doe     │ 2024-10-07   │ 2024-10-07   │  50  │     35     │   [=38]    │ [=92%]   │   1    │ Complete │
└─────────┴──────────┴──────────────┴──────────────┴──────────────┴──────┴────────────┴────────────┴──────────┴────────┴──────────┘

Actual Time formula: =(E3-D3)*24*60
Efficiency formula: =G3/H3
```

## 📈 Order Volumes Sheet

```
ORDER VOLUMES - DAILY TRENDS
┌────────────┬───────┬─────────┬────────────┬─────────┬───────────┬───────────┬─────────┬─────────┬───────────┐
│ Date       │ Total │ Pending │ Processing │ Shipped │ Delivered │ Cancelled │ Return  │ Average │ Peak Hour │
│            │Orders │         │            │         │           │           │ Rate %  │ Value   │           │
├────────────┼───────┼─────────┼────────────┼─────────┼───────────┼───────────┼─────────┼─────────┼───────────┤
│ 2024-01-20 │ 1247  │   45    │    178     │   892   │    120    │     12    │ [=2.3%] │ $156.78 │   14:00   │
│ 2024-01-19 │ 1189  │   38    │    165     │   856   │    115    │     15    │ [=2.8%] │ $148.92 │   15:00   │
└────────────┴───────┴─────────┴────────────┴─────────┴───────────┴───────────┴─────────┴─────────┴───────────┘

Return Rate formula: =G3/B3
```

## 📊 Inventory Mismatch Sheet

```
INVENTORY MISMATCH - DISCREPANCY TRACKING
┌──────────┬──────────────┬──────────┬─────────────┬────────┬──────────┬──────────┬──────────┬──────────────┬──────────────┬────────────┬──────────┐
│Mismatch  │ Date         │ SKU      │ Product     │ System │ Physical │ Variance │ Variance │ Root Cause   │ Resolution   │ Resolved   │ Status   │
│ ID       │              │          │ Name        │ Count  │ Count    │          │ %        │              │              │ By         │          │
├──────────┼──────────────┼──────────┼─────────────┼────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼────────────┼──────────┤
│ INV-001  │ 2024-10-07   │ SKU-1001 │ Widget A    │  500   │   498    │  [=-2]   │ [=-0.4%] │ Picking err  │ Inv adjusted │ Manager A  │ Resolved │
│ INV-002  │ 2024-10-07   │ SKU-1002 │ Widget B    │  750   │   755    │  [=+5]   │ [=+0.7%] │ Receiving    │ Sys updated  │ Manager B  │ Resolved │
└──────────┴──────────────┴──────────┴─────────────┴────────┴──────────┴──────────┴──────────┴──────────────┴──────────────┴────────────┴──────────┘

Variance formula: =F3-E3
Variance % formula: =(F3-E3)/E3
```

## 💡 Formula Legend

```
[=value]  - Cell contains a formula that calculates this value
Regular   - Cell contains static data entered by user
```

## 🎨 Color Scheme

```
┌────────────────────────────────────┐
│ Title Row: #4472C4 (Blue)          │ ← Dashboard title, sheet titles
├────────────────────────────────────┤
│ Header Row: #366092 (Dark Blue)    │ ← Column headers
├────────────────────────────────────┤
│ Data Cells: White background       │ ← All data
└────────────────────────────────────┘
```

## 📝 Key Formula Types Used

### 1. Conditional Counting
```excel
=COUNTIF(range, "criteria")
=COUNTIFS(range1, "criteria1", range2, "criteria2")
```

### 2. Statistical Functions
```excel
=AVERAGE(range)
=SUM(range)
```

### 3. Conditional Logic
```excel
=IF(condition, true_value, false_value)
=IF(cond1, val1, IF(cond2, val2, val3))  // Nested IF
```

### 4. Date/Time Calculations
```excel
=(End_Date - Start_Date) * 24        // Hours
=(End_Date - Start_Date) * 24 * 60   // Minutes
```

### 5. Mathematical Operations
```excel
=Value1 / Value2                     // Division
=Value1 - Value2                     // Subtraction
=ABS(value)                          // Absolute value
```

### 6. Cross-Sheet References
```excel
='Sheet Name'!CellReference
='Sheet Name'!Range
```

## 🔍 How to View Formulas

### In Excel:
1. Click any cell with a formula
2. Look at the **formula bar** at the top
3. See the complete formula

### Show All Formulas:
1. Press `Ctrl + ~` (tilde)
2. All formulas display in cells
3. Press `Ctrl + ~` again to return to values

### Trace Formulas:
1. Select cell with formula
2. **Formulas** tab → **Trace Precedents**
3. See arrows showing cell dependencies

## 📊 Dashboard KPI Summary

All Dashboard KPIs are **calculated automatically** from data in tracking sheets:

| KPI                  | Data Source            | Formula Type           |
|---------------------|------------------------|------------------------|
| Wave Completion     | Wave Tracking          | COUNTIFS / COUNTIF     |
| Training Completion | Employee Training      | COUNTIF / COUNTA       |
| Stock Time          | Stock Replenishment    | AVERAGE                |
| Quality Coverage    | Quality Audit          | AVERAGE                |
| Picking Efficiency  | Picking Tasks          | AVERAGE                |
| Inventory Accuracy  | Inventory Mismatch     | Complex (SUM/ABS)      |
| Status Indicators   | Calculated values      | Nested IF              |
| Daily Summary       | Multiple sheets        | SUM, COUNTA, COUNTIF   |
| Critical Alerts     | Calculated values      | IF with text concat    |

## ✨ Benefits of Visual Structure

1. **Clear Organization** - Each sheet has a specific purpose
2. **Professional Appearance** - Consistent formatting throughout
3. **Easy Navigation** - Sheet tabs clearly labeled
4. **Self-Documenting** - Headers explain each column
5. **Intuitive Layout** - Similar sheets follow same pattern
6. **Formula Transparency** - All calculations visible in formula bar

---

**Note:** Brackets `[=formula]` in this visual reference indicate cells containing formulas. In the actual Excel file, these display calculated values.
