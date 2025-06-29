// Sample data for reports
const reportData = {
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [185000, 210000, 195000, 230000, 245000, 260000]
    },
    clients: {
        startup: 45,
        sme: 78,
        enterprise: 89,
        government: 23,
        education: 12
    },
    products: {
        labels: ['Copy Paper', 'Pens', 'Chairs', 'Desks', 'Coffee', 'Cleaning'],
        data: [125000, 89000, 156000, 234000, 67000, 98000]
    },
    margins: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [22.5, 23.1, 22.8, 23.4, 23.7, 24.1]
    }
};

const topProducts = [
    { name: "Standing Desks", category: "Furniture", revenue: 234000, margin: 22.0, units: 390, growth: 15.3 },
    { name: "Ergonomic Chairs", category: "Furniture", revenue: 156000, margin: 18.5, units: 520, growth: 12.7 },
    { name: "Premium Copy Paper", category: "Paper & Printing", revenue: 125000, margin: 25.5, units: 13900, growth: 8.9 },
    { name: "Executive Pens", category: "Writing Supplies", revenue: 89000, margin: 32.0, units: 7120, growth: 11.2 },
    { name: "Cleaning Supplies Kit", category: "Janitorial", revenue: 98000, margin: 35.0, units: 1090, growth: 18.5 }
];

const clientSegments = [
    { segment: "Enterprise", clients: 89, revenue: 1450000, avgOrder: 16292, retention: 94.2, growth: 12.5 },
    { segment: "SME", clients: 78, revenue: 890000, avgOrder: 11410, retention: 87.3, growth: 8.7 },
    { segment: "Startup", clients: 45, revenue: 320000, avgOrder: 7111, retention: 76.8, growth: 15.2 },
    { segment: "Government", clients: 23, revenue: 180000, avgOrder: 7826, retention: 98.5, growth: 5.3 },
    { segment: "Education", clients: 12, revenue: 75000, avgOrder: 6250, retention: 91.7, growth: 9.8 }
];

// DOM elements
const generateReportBtn = document.getElementById('generate-report-btn');
const reportType = document.getElementById('report-type');
const dateRange = document.getElementById('date-range');
const clientSegment = document.getElementById('client-segment');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeCharts();
    populateTables();
});

function setupEventListeners() {
    generateReportBtn.addEventListener('click', generateReport);
    reportType.addEventListener('change', updateReportDisplay);
    dateRange.addEventListener('change', updateReportDisplay);
    clientSegment.addEventListener('change', updateReportDisplay);
}

function initializeCharts() {
    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: reportData.revenue.labels,
            datasets: [{
                label: 'Revenue ($)',
                data: reportData.revenue.data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });

    // Client Type Chart
    const clientCtx = document.getElementById('client-chart').getContext('2d');
    new Chart(clientCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(reportData.clients).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
            datasets: [{
                data: Object.values(reportData.clients),
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Product Performance Chart
    const productCtx = document.getElementById('product-chart').getContext('2d');
    new Chart(productCtx, {
        type: 'bar',
        data: {
            labels: reportData.products.labels,
            datasets: [{
                label: 'Revenue ($)',
                data: reportData.products.data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe',
                    '#43e97b'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });

    // Margin Analysis Chart
    const marginCtx = document.getElementById('margin-chart').getContext('2d');
    new Chart(marginCtx, {
        type: 'line',
        data: {
            labels: reportData.margins.labels,
            datasets: [{
                label: 'Margin (%)',
                data: reportData.margins.data,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 20,
                    max: 25,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function populateTables() {
    // Top Products Table
    const topProductsTable = document.getElementById('top-products-table');
    topProductsTable.innerHTML = topProducts.map(product => `
        <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">
                <div style="font-weight: 600;">${product.name}</div>
                <div style="font-size: 0.8rem; color: #666;">${product.category}</div>
            </td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${product.revenue.toLocaleString()}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${product.margin}%</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${product.units.toLocaleString()}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6; color: #28a745;">+${product.growth}%</td>
        </tr>
    `).join('');

    // Client Segments Table
    const clientSegmentsTable = document.getElementById('client-segments-table');
    clientSegmentsTable.innerHTML = clientSegments.map(segment => `
        <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6; font-weight: 600;">${segment.segment}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${segment.clients}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${segment.revenue.toLocaleString()}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${segment.avgOrder.toLocaleString()}</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${segment.retention}%</td>
            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6; color: #28a745;">+${segment.growth}%</td>
        </tr>
    `).join('');
}

function generateReport() {
    const reportTypeValue = reportType.value;
    const dateRangeValue = dateRange.value;
    const clientSegmentValue = clientSegment.value;

    // Show loading state
    generateReportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateReportBtn.disabled = true;

    // Simulate report generation
    setTimeout(() => {
        generateReportBtn.innerHTML = '<i class="fas fa-chart-bar"></i> Generate Report';
        generateReportBtn.disabled = false;
        
        alert(`Report generated successfully!\n\nReport Type: ${reportTypeValue}\nDate Range: ${dateRangeValue} days\nClient Segment: ${clientSegmentValue}`);
    }, 2000);
}

function updateReportDisplay() {
    // This function would update the charts and tables based on the selected filters
    // For now, we'll just show a simple notification
    console.log('Report filters updated:', {
        type: reportType.value,
        dateRange: dateRange.value,
        segment: clientSegment.value
    });
}

// Mock Chart.js for demonstration
// In a real application, you would include Chart.js library
class Chart {
    constructor(ctx, config) {
        this.ctx = ctx;
        this.config = config;
        this.drawMockChart();
    }

    drawMockChart() {
        const canvas = this.ctx.canvas;
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw mock chart based on type
        if (this.config.type === 'line') {
            this.drawLineChart();
        } else if (this.config.type === 'bar') {
            this.drawBarChart();
        } else if (this.config.type === 'doughnut') {
            this.drawDoughnutChart();
        }
    }

    drawLineChart() {
        const ctx = this.ctx;
        const data = this.config.data.datasets[0].data;
        const labels = this.config.data.labels;
        
        ctx.strokeStyle = this.config.data.datasets[0].borderColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / maxValue) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }

    drawBarChart() {
        const ctx = this.ctx;
        const data = this.config.data.datasets[0].data;
        const labels = this.config.data.labels;
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const maxValue = Math.max(...data);
        const barWidth = width / data.length * 0.8;
        const barSpacing = width / data.length * 0.2;
        
        data.forEach((value, index) => {
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const barHeight = (value / maxValue) * height;
            const y = height - barHeight;
            
            ctx.fillStyle = this.config.data.datasets[0].backgroundColor[index] || '#667eea';
            ctx.fillRect(x, y, barWidth, barHeight);
        });
    }

    drawDoughnutChart() {
        const ctx = this.ctx;
        const data = this.config.data.datasets[0].data;
        const labels = this.config.data.labels;
        
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6;
        const innerRadius = radius * 0.5;
        
        const total = data.reduce((sum, value) => sum + value, 0);
        let currentAngle = 0;
        
        data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.fillStyle = this.config.data.datasets[0].backgroundColor[index] || '#667eea';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }
} 