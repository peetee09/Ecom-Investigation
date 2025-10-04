// Training Tracker JavaScript
class TrainingManager {
    constructor() {
        this.app = app;
        this.init();
    }

    init() {
        this.loadTrainingTable();
        this.setupEventListeners();
    }

    loadTrainingTable() {
        const container = document.getElementById('training-table-body');
        const employees = this.app.data.employees;

        container.innerHTML = employees.map(employee => {
            const percentage = this.app.calculateTrainingPercentage(employee);
            const status = percentage === 100 ? 'Fully Trained' : 
                          percentage > 0 ? 'Partial' : 'Needs Training';
            const statusClass = percentage === 100 ? 'success' : 
                              percentage > 0 ? 'warning' : 'danger';

            return `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>
                        <span class="badge bg-${this.app.getStatusBadge(employee.orderProcessing)}">
                            ${employee.orderProcessing}
                        </span>
                    </td>
                    <td>
                        <span class="badge bg-${this.app.getStatusBadge(employee.qualityControl)}">
                            ${employee.qualityControl}
                        </span>
                    </td>
                    <td>
                        <span class="badge bg-${this.app.getStatusBadge(employee.returnsHandling)}">
                            ${employee.returnsHandling}
                        </span>
                    </td>
                    <td>
                        <div class="progress" style="height: 20px;">
                            <div class="progress-bar bg-${statusClass}" 
                                 style="width: ${percentage}%">
                                ${Math.round(percentage)}%
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-${statusClass}">${status}</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary edit-training" 
                                data-employee-id="${employee.id}"
                                data-employee-name="${employee.name}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    setupEventListeners() {
        // Edit training buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.edit-training')) {
                const button = e.target.closest('.edit-training');
                const employeeId = button.getAttribute('data-employee-id');
                const employeeName = button.getAttribute('data-employee-name');
                this.openEditModal(employeeId, employeeName);
            }
        });

        // Save training changes
        document.getElementById('save-training-btn').addEventListener('click', () => {
            this.saveTrainingChanges();
        });
    }

    openEditModal(employeeId, employeeName) {
        const employee = this.app.data.employees.find(emp => emp.id === employeeId);
        
        document.getElementById('editEmployeeId').value = employeeId;
        document.getElementById('editEmployeeName').value = employeeName;
        document.getElementById('editOrderProcessing').value = employee.orderProcessing;
        document.getElementById('editQualityControl').value = employee.qualityControl;
        document.getElementById('editReturnsHandling').value = employee.returnsHandling;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('editTrainingModal'));
        modal.show();
    }

    saveTrainingChanges() {
        const employeeId = document.getElementById('editEmployeeId').value;
        const trainingData = {
            orderProcessing: document.getElementById('editOrderProcessing').value,
            qualityControl: document.getElementById('editQualityControl').value,
            returnsHandling: document.getElementById('editReturnsHandling').value
        };

        if (this.app.updateEmployeeTraining(employeeId, trainingData)) {
            // Close modal and refresh table
            const modal = bootstrap.Modal.getInstance(document.getElementById('editTrainingModal'));
            modal.hide();
            this.loadTrainingTable();
            
            // Show success message
            this.showAlert('Training status updated successfully!', 'success');
        } else {
            this.showAlert('Error updating training status', 'danger');
        }
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Initialize training manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('training-table-body')) {
        new TrainingManager();
    }
});
