// Dashboard specific JavaScript
class DashboardManager {
    constructor() {
        this.app = app;
        this.init();
    }

    init() {
        this.loadMetricsCards();
        this.loadPerformanceTable();
        this.loadTrainingStats();
        this.loadRecentActivity();
    }

    loadMetricsCards() {
        const metrics = this.app.data.dashboardMetrics;
        const container = document.getElementById('metrics-cards');
        
        const metricsConfig = [
            { key: 'orderAccuracy', title: 'Order Accuracy', value: metrics.orderAccuracy + '%', target: '99.0%', color: 'primary', icon: 'fa-check-circle' },
            { key: 'fulfillmentRate', title: 'Fulfillment Rate', value: metrics.fulfillmentRate + '%', target: '98.0%', color: 'success', icon: 'fa-shipping-fast' },
            { key: 'avgPickTime', title: 'Avg Pick Time', value: metrics.avgPickTime + ' min', target: '5.0 min', color: 'info', icon: 'fa-clock' },
            { key: 'trainingCompletion', title: 'Training Completion', value: metrics.trainingCompletion + '%', target: '95.0%', color: 'warning', icon: 'fa-graduation-cap' }
        ];

        container.innerHTML = metricsConfig.map(metric => `
            <div class="col-md-3">
                <div class="card text-white bg-${metric.color} metric-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5 class="card-title">${metric.title}</h5>
                                <h2 class="card-text">${metric.value}</h2>
                                <small>Target: ${metric.target}</small>
                            </div>
                            <div class="display-4">
                                <i class="fas ${metric.icon}"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadPerformanceTable() {
        const metrics = this.app.data.dashboardMetrics;
        const tableBody = document.querySelector('#performance-table tbody');
        
        const performanceData = [
            { metric: 'Order Accuracy', target: 99.0, actual: parseFloat(metrics.orderAccuracy) },
            { metric: 'Fulfillment Rate', target: 98.0, actual: parseFloat(metrics.fulfillmentRate) },
            { metric: 'Avg Pick Time', target: 5.0, actual: parseFloat(metrics.avgPickTime), reverse: true },
            { metric: 'Training Completion', target: 95.0, actual: parseFloat(metrics.trainingCompletion) }
        ];

        tableBody.innerHTML = performanceData.map(item => {
            let status, badgeClass;
            if (item.reverse) {
                status = item.actual <= item.target ? 'On Target' : 'Needs Attention';
                badgeClass = item.actual <= item.target ? 'success' : 'warning';
            } else {
                status = item.actual >= item.target ? 'Good' : 'Needs Attention';
                badgeClass = item.actual >= item.target ? 'success' : 'warning';
            }

            return `
                <tr>
                    <td>${item.metric}</td>
                    <td>${item.target}${item.metric.includes('Time') ? ' min' : '%'}</td>
                    <td>${item.actual}${item.metric.includes('Time') ? ' min' : '%'}</td>
                    <td><span class="badge bg-${badgeClass}">${status}</span></td>
                </tr>
            `;
        }).join('');
    }

    loadTrainingStats() {
        const employees = this.app.data.employees;
        const container = document.getElementById('training-stats');
        
        let fullyTrained = 0;
        let partiallyTrained = 0;
        let needsTraining = 0;

        employees.forEach(employee => {
            const percentage = this.app.calculateTrainingPercentage(employee);
            if (percentage === 100) fullyTrained++;
            else if (percentage > 0) partiallyTrained++;
            else needsTraining++;
        });

        const total = employees.length;
        
        container.innerHTML = `
            <div class="col-4">
                <div class="border rounded p-3 bg-success text-white">
                    <h4>${Math.round((fullyTrained / total) * 100)}%</h4>
                    <small>Fully Trained</small>
                </div>
            </div>
            <div class="col-4">
                <div class="border rounded p-3 bg-warning">
                    <h4>${Math.round((partiallyTrained / total) * 100)}%</h4>
                    <small>Partial</small>
                </div>
            </div>
            <div class="col-4">
                <div class="border rounded p-3 bg-danger text-white">
                    <h4>${Math.round((needsTraining / total) * 100)}%</h4>
                    <small>Needs Training</small>
                </div>
            </div>
        `;
    }

    loadRecentActivity() {
        const container = document.getElementById('recent-activity');
        const recentQC = this.app.data.qcChecks.slice(-3).reverse();
        const recentFeedback = this.app.data.feedbackSessions.slice(-2).reverse();
        
        let activities = [];
        
        recentQC.forEach(check => {
            activities.push({
                type: 'QC Check',
                description: `${check.orderId} - ${check.status}`,
                date: check.date,
                icon: 'fa-clipboard-check',
                color: check.status === 'Passed' ? 'success' : check.status === 'Needs Rework' ? 'warning' : 'danger'
            });
        });

        recentFeedback.forEach(feedback => {
            activities.push({
                type: 'Feedback',
                description: `Session with ${feedback.employee}`,
                date: feedback.date,
                icon: 'fa-comments',
                color: 'info'
            });
        });

        // Sort by date and take latest 5
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        activities = activities.slice(0, 5);

        container.innerHTML = activities.map(activity => `
            <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0">
                    <i class="fas ${activity.icon} text-${activity.color} fa-lg"></i>
                </div>
                <div class="flex-grow-1 ms-3">
                    <small class="text-muted">${activity.type}</small>
                    <div class="fw-bold">${activity.description}</div>
                    <small class="text-muted">${this.app.formatDate(activity.date)}</small>
                </div>
            </div>
        `).join('');
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('metrics-cards')) {
        new DashboardManager();
    }
});
