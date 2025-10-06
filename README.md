# E-commerce Warehouse Operations Dashboard

A comprehensive localhost monitoring system for warehouse operations, designed to track and manage e-commerce fulfillment processes in real-time.

## Features

### 🔍 Bash Query Interface
- Immediate response to queries about customer orders
- Natural language query processing
- Real-time order status tracking
- Performance metrics on demand

### 📋 Tracking Checklist
Monitor critical operational tasks:
- **Wave Completion**: Track if ran waves are complete within an hour
- **Employee Training**: Monitor training completion status
- **Stock Replenishment**: Analyze delays and optimize picking time
- **Quality Audit Rate**: Adjust and monitor quality audit percentages (target >5%)

### 📊 Real-Time Monitoring Dashboard
Comprehensive metrics tracking:
- Picking tasks
- Order volumes
- Employee performance
- Wave tasks progress
- Employee training status
- Item verification implementation
- Volume monitoring
- Bash feedback tracking
- Packing totes utilization
- Inventory mismatch detection
- System error tracking

### 🎯 Outcomes & Performance
Track key performance indicators:
- **People's Performance Improvement**: Monitor efficiency gains
- **SLA Compliance**: Ensure continuous SLA targets are met
- **Operations Optimization**: Track overall operational efficiency

### 💡 Intelligent Insights
Automatic insight generation based on:
- Critical system errors
- Inventory mismatches
- Performance trends
- SLA compliance issues
- Quality metrics

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server installation required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/peetee09/Ecom-Investigation.git
cd Ecom-Investigation
```

2. Open the dashboard:
```bash
# Simply open index.html in your web browser
# On Linux/Mac:
open index.html
# Or on Windows:
start index.html
```

Alternatively, you can use a simple HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Then open http://localhost:8000 in your browser
```

## Usage

### Bash Query Interface
Type natural language queries to get immediate insights:

**Example Queries:**
- "Show customer order status"
- "What is the current order volume?"
- "Check wave completion status"
- "Show employee training status"
- "Analyze stock replenishment"
- "What is the performance efficiency?"
- "Check quality audit rates"
- "Show SLA compliance"

### Checklist Operations
Click buttons on each checklist item to:
- Check wave completion status
- Verify employee training
- Analyze stock replenishment delays
- Adjust quality audit rates

### Real-Time Monitoring
- Metrics update automatically every 5 seconds
- Click on metric cards for detailed information
- Watch live data changes as operations progress

### Data Persistence
- Dashboard data is automatically saved to browser localStorage
- Data persists across browser sessions
- Clear browser data to reset the dashboard

## System Architecture

### Files
- **index.html**: Main dashboard interface and structure
- **styles.css**: Professional styling and responsive design
- **app.js**: Core application logic and data management
- **EcomAudit**: Original requirements specification

### Key Components

#### Data Management
- Real-time metrics tracking
- Sample operational data for demonstration
- LocalStorage persistence
- Automatic data updates every 5 seconds

#### Query Processing
Handles queries related to:
- Customer orders and status
- Wave completion
- Employee training and performance
- Stock and inventory
- Quality audits
- SLA compliance

#### Insights Engine
Automatically generates insights for:
- Critical issues (system errors, inventory mismatches)
- Warnings (low performance, SLA issues)
- Positive trends (quality improvements, performance gains)

## Customization

### Adding New Metrics
Edit `app.js` and add to `dashboardData` object:
```javascript
dashboardData.newMetric = 0;
```

Update HTML in `index.html`:
```html
<div class="metric-card">
    <div class="metric-icon">🔧</div>
    <h3>New Metric</h3>
    <div class="metric-value" id="newMetric">0</div>
</div>
```

Update metric in `updateAllMetrics()`:
```javascript
document.getElementById('newMetric').textContent = dashboardData.newMetric;
```

### Customizing Appearance
Modify `styles.css` to change:
- Color schemes (gradient backgrounds, card colors)
- Layout (grid columns, spacing)
- Typography (fonts, sizes)
- Animations and transitions

### Adding Query Types
Extend `processQuery()` function in `app.js`:
```javascript
if (lowerQuery.includes('your-keyword')) {
    return generateYourCustomResponse();
}
```

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- Lightweight: ~36KB total (HTML + CSS + JS)
- No external dependencies
- Runs entirely client-side
- Minimal memory footprint

## Future Enhancements
- Backend API integration for real data
- Advanced analytics and reporting
- Export data to CSV/PDF
- User authentication and roles
- Mobile app version
- Real-time notifications
- Historical data tracking
- Multi-warehouse support

## Troubleshooting

### Dashboard not updating?
- Check browser console for errors
- Ensure JavaScript is enabled
- Clear browser cache and reload

### Data not persisting?
- Check browser localStorage settings
- Ensure cookies/storage is enabled
- Try incognito mode to test

### Queries not working?
- Ensure input field has focus
- Try simpler query terms
- Check example queries in this README

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License
This project is open source and available for educational and commercial use.

## Support
For questions or issues, please open an issue on the GitHub repository.

---
**Built for efficient warehouse operations management** 📦🚀
