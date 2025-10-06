# VBA Quick Reference Card

## 🚀 One-Page Guide to VBA Operations

### Initial Setup (One Time Only)
1. Enable macros in Excel (File → Options → Trust Center)
2. Open VBA Editor: **Alt + F11** (Windows) or **Fn + Option + F11** (Mac)
3. Import `VBA_Modules.bas` (File → Import File)
4. Save as `.xlsm` (Macro-Enabled Workbook)
5. Add buttons to Dashboard (optional but recommended)

### Quick Access Methods
- **Buttons**: Click buttons on Dashboard sheet (after setup)
- **Macros Menu**: Press **Alt + F8**, select macro, click Run
- **VBA Editor**: Press **Alt + F11**, then **F5** to run current macro

---

## 📋 Most Common Operations

### Daily Operations

| Operation | Macro Name | When to Use |
|-----------|------------|-------------|
| 📊 Refresh Dashboard | `RefreshDashboardMetrics` | Start of day, after updates |
| ➕ Add Query | `AddBashQuery` | Bash asks about orders |
| 🔍 Check Waves | `CheckWaveStatus` | Every hour |
| 📈 Check SLA | `CheckSLACompliance` | End of day |

### Weekly Operations

| Operation | Macro Name | When to Use |
|-----------|------------|-------------|
| 👥 Training Status | `VerifyTraining` | Weekly review |
| 📦 Stock Analysis | `AnalyzeStockIssues` | Weekly planning |
| ✅ Quality Check | `CheckQualityRate` | Weekly audit review |
| 📊 Performance | `ViewPerformanceMetrics` | Weekly summary |

---

## 🎯 Quick Commands

### To Run a Macro:
1. Press **Alt + F8**
2. Type first few letters of macro name
3. Press Enter

### Common Macros Alphabetically:

```
AddBashQuery          - Add customer order query
AddBashQuerySimple    - Add query (simple version)
AddWaveRecord         - Add wave tracking record
AdjustQualityRate     - View quality recommendations
AnalyzeStockIssues    - Analyze stock delays
CheckInventoryMismatches - Check inventory status
CheckQualityRate      - Check audit coverage
CheckSLACompliance    - Calculate SLA metrics
CheckWaveStatus       - View wave completion
RefreshDashboardMetrics - Update all KPIs
ShowDashboard         - Go to dashboard & refresh
ShowQuickHelp         - Display help
VerifyTraining        - Check training completion
ViewPerformanceMetrics - All performance checks
ViewRecentQueries     - Show last 10 queries
ViewSystemErrors      - Check system errors
```

---

## 🔄 Typical Daily Workflow

### Morning (5 min)
```
1. Open file → Enable macros
2. Run: ShowDashboard
3. Run: ViewSystemErrors
```

### During Day (as needed)
```
• Bash query? → Run: AddBashQuery
• Hourly check → Run: CheckWaveStatus
• Stock issue? → Run: AnalyzeStockIssues
```

### End of Day (10 min)
```
1. Run: RefreshDashboardMetrics
2. Run: CheckSLACompliance
3. Run: ViewPerformanceMetrics
```

---

## 💡 Pro Tips

### Speed Tips
- Add buttons to Dashboard for one-click access
- Assign keyboard shortcuts (Alt + F8 → Options)
- Keep VBA_QUICK_REFERENCE open for easy lookup

### Data Entry Tips
- Use `AddBashQuery` for interactive form
- Use `AddBashQuerySimple` for quick entry
- Response time goal: ≤5 minutes

### Monitoring Tips
- Run `CheckWaveStatus` every hour
- Target: 100% wave completion within 1 hour
- If delayed, investigate immediately

### Quality Tips
- Run `CheckQualityRate` weekly
- Target: >5% audit coverage (ideal: 10%+)
- Use `AdjustQualityRate` for recommendations

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Macros disabled | File → Options → Trust Center → Enable macros |
| Can't find macro | Alt + F11 → Check module exists |
| Form doesn't work | Use `AddBashQuerySimple` instead |
| Buttons missing | Manually add: Developer → Insert → Button |
| Data not refreshing | Run `RefreshDashboardMetrics` |

---

## 📱 Keyboard Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Macros Menu | Alt + F8 | Option + F8 |
| VBA Editor | Alt + F11 | Fn + Option + F11 |
| Run Macro | F5 (in editor) | Cmd + R (in editor) |
| Stop Macro | Esc | Esc |

---

## 🎓 Remember

✅ **Always** enable macros when opening the file  
✅ **Goal:** Respond to Bash queries within 5 minutes  
✅ **Target:** >98% SLA compliance  
✅ **Monitor:** Waves complete within 1 hour  
✅ **Quality:** >5% audit coverage (aim for 10%+)  

---

## 📖 More Information

- Full details: `VBA_SETUP_GUIDE.md`
- Workflow examples: `USAGE_GUIDE.md`
- General setup: `SETUP.md`

---

**Keep this reference handy for quick lookups!** 🚀
