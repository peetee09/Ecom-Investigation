# Quick Start Guide

## Get Started in 3 Steps

### Step 1: Open the Dashboard
```bash
# Navigate to the project directory
cd Ecom-Investigation

# Open index.html in your browser
# Option A: Double-click index.html in your file browser
# Option B: Use command line
open index.html           # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**No installation required!** Works entirely in your browser - no Python needed!

### Step 2: Use the Bash Query Interface
Type any of these queries in the input box:
- `Show customer order status`
- `How many orders today?`
- `Check wave completion`
- `Show employee training status`
- `Why is stock replenishment delayed?`
- `What is our SLA compliance?`
- `Show performance metrics`

### Step 3: Monitor Operations & Generate Reports
- Watch metrics update in real-time (every 5 seconds)
- Click buttons in the checklist section to update statuses
- Review insights and alerts at the bottom
- **Click "📊 Generate Excel Report" to download comprehensive tracking spreadsheet**

## Example Queries

### Customer Orders
```
Show customer order status
What is the current order volume?
How many pending orders?
```

### Employee & Training
```
Check employee training status
Show employee performance
Who needs training?
```

### Operations
```
Check wave completion status
Why is stock replenishment taking too long?
Show quality audit rate
What is the SLA compliance?
```

## Checklist Buttons

### Check Status (Waves)
- Shows completion ratio (e.g., 1/3 waves complete)
- Displays last check time
- Updates status indicator

### Verify Training
- Shows trained vs untrained employees
- Displays completion percentage
- Lists individual employee status

### Analyze Issues (Stock)
- Analyzes replenishment delays
- Shows average time vs target
- Provides recommendations

### Adjust Rate (Quality)
- Increases quality audit percentage
- Updates from current 5% to target 10%+
- Shows immediate feedback

## Tips

✨ **Auto-Save**: Your data is automatically saved to browser localStorage

🔄 **Auto-Update**: Metrics refresh every 5 seconds automatically

📱 **Mobile Friendly**: Works on phones, tablets, and desktops

⌨️ **Keyboard Shortcut**: Press Enter to submit queries

🎨 **Professional UI**: Modern, clean interface with smooth animations

## Troubleshooting

**Q: Nothing appears when I open index.html**
- Make sure JavaScript is enabled in your browser
- Try opening in a different browser (Chrome, Firefox, Edge)

**Q: Data is not saving**
- Check that cookies/localStorage is enabled
- Try clearing cache and reloading

**Q: Metrics not updating**
- Page should auto-update every 5 seconds
- Try refreshing the page (F5)

**Q: Query responses are empty**
- Make sure to type a query before clicking Submit
- Try the example queries listed above

**Q: Excel generation button doesn't work**
- Wait a few seconds for libraries to load after page opens
- Check your internet connection (required for SheetJS library)
- Try refreshing the page
- Check browser console (F12) for errors

## Need More Info?

📖 Read the full **README.md** for detailed documentation

📊 Check **IMPLEMENTATION_SUMMARY.md** for technical details

📝 Review **EcomAudit** for original requirements

## Support

For issues or questions, please open an issue on the GitHub repository.

---
**Happy Monitoring! 🚀📦**
