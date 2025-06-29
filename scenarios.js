// Import shared data and functions from main script
const products = [
    {
        id: 1,
        name: "Premium Copy Paper",
        category: "Paper & Printing",
        icon: "fas fa-file-alt",
        basePrice: 8.99,
        margin: 25.5,
        volumeDiscounts: {
            1000: 0.05,
            5000: 0.10,
            10000: 0.15,
            25000: 0.20
        }
    },
    {
        id: 2,
        name: "Executive Pens",
        category: "Writing Supplies",
        icon: "fas fa-pen",
        basePrice: 12.50,
        margin: 32.0,
        volumeDiscounts: {
            500: 0.08,
            2000: 0.12,
            5000: 0.18,
            10000: 0.25
        }
    },
    {
        id: 3,
        name: "Ergonomic Chairs",
        category: "Furniture",
        icon: "fas fa-chair",
        basePrice: 299.99,
        margin: 18.5,
        volumeDiscounts: {
            10: 0.10,
            25: 0.15,
            50: 0.20,
            100: 0.25
        }
    },
    {
        id: 4,
        name: "Standing Desks",
        category: "Furniture",
        icon: "fas fa-desktop",
        basePrice: 599.99,
        margin: 22.0,
        volumeDiscounts: {
            5: 0.12,
            15: 0.18,
            30: 0.25,
            50: 0.30
        }
    },
    {
        id: 5,
        name: "Coffee & Tea Supplies",
        category: "Break Room",
        icon: "fas fa-coffee",
        basePrice: 45.00,
        margin: 28.5,
        volumeDiscounts: {
            200: 0.06,
            500: 0.10,
            1000: 0.15,
            2000: 0.20
        }
    },
    {
        id: 6,
        name: "Cleaning Supplies Kit",
        category: "Janitorial",
        icon: "fas fa-broom",
        basePrice: 89.99,
        margin: 35.0,
        volumeDiscounts: {
            100: 0.08,
            300: 0.12,
            600: 0.18,
            1000: 0.25
        }
    }
];

const clientMultipliers = {
    startup: { discount: 0.05, margin: 1.1 },
    sme: { discount: 0.08, margin: 1.05 },
    enterprise: { discount: 0.12, margin: 1.0 },
    government: { discount: 0.15, margin: 0.95 },
    education: { discount: 0.10, margin: 0.98 }
};

const contractBonuses = {
    12: { discount: 0.02, margin: 1.02 },
    24: { discount: 0.05, margin: 1.05 },
    36: { discount: 0.08, margin: 1.08 },
    48: { discount: 0.12, margin: 1.12 }
};

const paymentTerms = {
    net30: { discount: 0.0, margin: 1.0 },
    net60: { discount: 0.02, margin: 1.02 },
    net90: { discount: 0.05, margin: 1.05 }
};

// Global variables
let scenarios = [];
let selectedScenarios = [];

// DOM elements
const createScenarioBtn = document.getElementById('create-scenario-btn');
const quickCalculateBtn = document.getElementById('quick-calculate-btn');
const compareSelectedBtn = document.getElementById('compare-selected-btn');
const exportScenariosBtn = document.getElementById('export-scenarios-btn');
const scenariosGrid = document.getElementById('scenarios-grid');
const scenarioPreview = document.getElementById('scenario-preview');
const previewContent = document.getElementById('preview-content');
const comparisonModal = document.getElementById('comparison-modal');
const comparisonContent = document.getElementById('comparison-content');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSampleScenarios();
    updateScenariosGrid();
});

function setupEventListeners() {
    createScenarioBtn.addEventListener('click', createScenario);
    quickCalculateBtn.addEventListener('click', previewScenario);
    compareSelectedBtn.addEventListener('click', compareSelectedScenarios);
    exportScenariosBtn.addEventListener('click', exportScenarios);
}

function performPricingCalculation(clientType, annualVolume, contractLength, paymentTerm) {
    const clientMultiplier = clientMultipliers[clientType];
    const contractBonus = contractBonuses[contractLength];
    const paymentAdjustment = paymentTerms[paymentTerm];

    let totalBasePrice = 0;
    let totalDiscountedPrice = 0;
    let totalMargin = 0;

    products.forEach(product => {
        const quantity = Math.floor(annualVolume / (products.length * product.basePrice));
        const basePrice = product.basePrice * quantity;
        
        let volumeDiscount = 0;
        const volumeTiers = Object.keys(product.volumeDiscounts).map(Number).sort((a, b) => b - a);
        for (const tier of volumeTiers) {
            if (quantity >= tier) {
                volumeDiscount = product.volumeDiscounts[tier];
                break;
            }
        }

        const clientDiscount = clientMultiplier.discount;
        const contractDiscount = contractBonus.discount;
        const paymentDiscount = paymentAdjustment.discount;
        
        const totalDiscount = volumeDiscount + clientDiscount + contractDiscount + paymentDiscount;
        const discountedPrice = basePrice * (1 - totalDiscount);
        
        const adjustedMargin = product.margin * clientMultiplier.margin * contractBonus.margin * paymentAdjustment.margin;
        const marginAmount = discountedPrice * (adjustedMargin / 100);

        totalBasePrice += basePrice;
        totalDiscountedPrice += discountedPrice;
        totalMargin += marginAmount;
    });

    const totalSavings = totalBasePrice - totalDiscountedPrice;
    const savingsPercentage = (totalSavings / totalBasePrice) * 100;
    const effectiveMargin = (totalMargin / totalDiscountedPrice) * 100;
    const monthlyPayment = totalDiscountedPrice / 12;
    const quarterlyPayment = totalDiscountedPrice / 4;

    return {
        clientType,
        annualVolume,
        contractLength,
        paymentTerm,
        totalBasePrice,
        totalDiscountedPrice,
        totalSavings,
        savingsPercentage,
        totalMargin,
        effectiveMargin,
        monthlyPayment,
        quarterlyPayment,
        timestamp: new Date().toISOString()
    };
}

function createScenario() {
    const scenarioName = document.getElementById('scenario-name').value;
    const clientType = document.getElementById('scenario-client-type').value;
    const annualVolume = parseFloat(document.getElementById('scenario-volume').value);
    const contractLength = parseInt(document.getElementById('scenario-contract').value);
    const paymentTerm = document.getElementById('scenario-payment').value;

    if (!scenarioName.trim()) {
        alert('Please enter a scenario name');
        return;
    }

    if (!annualVolume || annualVolume <= 0) {
        alert('Please enter a valid annual volume');
        return;
    }

    const results = performPricingCalculation(clientType, annualVolume, contractLength, paymentTerm);
    
    const scenario = {
        id: Date.now(),
        name: scenarioName,
        ...results
    };

    scenarios.push(scenario);
    updateScenariosGrid();
    
    // Clear form
    document.getElementById('scenario-name').value = '';
    document.getElementById('scenario-volume').value = '100000';
    
    alert(`Scenario "${scenarioName}" created successfully!`);
}

function previewScenario() {
    const clientType = document.getElementById('scenario-client-type').value;
    const annualVolume = parseFloat(document.getElementById('scenario-volume').value);
    const contractLength = parseInt(document.getElementById('scenario-contract').value);
    const paymentTerm = document.getElementById('scenario-payment').value;

    if (!annualVolume || annualVolume <= 0) {
        alert('Please enter a valid annual volume');
        return;
    }

    const results = performPricingCalculation(clientType, annualVolume, contractLength, paymentTerm);
    displayPreview(results);
}

function displayPreview(results) {
    const previewHTML = `
        <div class="pricing-results fade-in">
            <div class="result-item">
                <h4>Total Base Price</h4>
                <div class="value">$${results.totalBasePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="result-item">
                <h4>Discounted Price</h4>
                <div class="value">$${results.totalDiscountedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="result-item">
                <h4>Total Savings</h4>
                <div class="value" style="color: #28a745;">$${results.totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="result-item">
                <h4>Savings %</h4>
                <div class="value" style="color: #28a745;">${results.savingsPercentage.toFixed(1)}%</div>
            </div>
            <div class="result-item">
                <h4>Total Margin</h4>
                <div class="value">$${results.totalMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="result-item">
                <h4>Effective Margin %</h4>
                <div class="value">${results.effectiveMargin.toFixed(1)}%</div>
            </div>
        </div>
    `;

    previewContent.innerHTML = previewHTML;
    scenarioPreview.style.display = 'block';
}

function loadSampleScenarios() {
    const sampleScenarios = [
        {
            id: 1,
            name: "Tech Startup Package",
            clientType: "startup",
            annualVolume: 75000,
            contractLength: 24,
            paymentTerm: "net60",
            totalBasePrice: 125000,
            totalDiscountedPrice: 105000,
            totalSavings: 20000,
            savingsPercentage: 16.0,
            totalMargin: 24500,
            effectiveMargin: 23.3,
            monthlyPayment: 8750,
            quarterlyPayment: 26250,
            timestamp: new Date().toISOString()
        },
        {
            id: 2,
            name: "Enterprise Solution",
            clientType: "enterprise",
            annualVolume: 250000,
            contractLength: 36,
            paymentTerm: "net90",
            totalBasePrice: 400000,
            totalDiscountedPrice: 320000,
            totalSavings: 80000,
            savingsPercentage: 20.0,
            totalMargin: 70400,
            effectiveMargin: 22.0,
            monthlyPayment: 8889,
            quarterlyPayment: 26667,
            timestamp: new Date().toISOString()
        },
        {
            id: 3,
            name: "Government Contract",
            clientType: "government",
            annualVolume: 500000,
            contractLength: 48,
            paymentTerm: "net90",
            totalBasePrice: 800000,
            totalDiscountedPrice: 600000,
            totalSavings: 200000,
            savingsPercentage: 25.0,
            totalMargin: 114000,
            effectiveMargin: 19.0,
            monthlyPayment: 12500,
            quarterlyPayment: 37500,
            timestamp: new Date().toISOString()
        }
    ];

    scenarios = sampleScenarios;
}

function updateScenariosGrid() {
    scenariosGrid.innerHTML = scenarios.map(scenario => `
        <div class="scenario-card fade-in">
            <div class="scenario-header">
                <div class="scenario-checkbox">
                    <input type="checkbox" id="scenario-${scenario.id}" onchange="toggleScenarioSelection(${scenario.id})">
                    <label for="scenario-${scenario.id}"></label>
                </div>
                <h3>${scenario.name}</h3>
                <div class="scenario-actions">
                    <button class="btn btn-small btn-secondary" onclick="editScenario(${scenario.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-secondary" onclick="deleteScenario(${scenario.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="scenario-details">
                <div class="detail-row">
                    <span class="detail-label">Client Type:</span>
                    <span class="detail-value">${scenario.clientType}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Annual Volume:</span>
                    <span class="detail-value">$${scenario.annualVolume.toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contract Length:</span>
                    <span class="detail-value">${scenario.contractLength} months</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Terms:</span>
                    <span class="detail-value">${scenario.paymentTerm}</span>
                </div>
            </div>
            <div class="scenario-metrics">
                <div class="metric">
                    <span class="metric-label">Total Price</span>
                    <span class="metric-value">$${scenario.totalDiscountedPrice.toLocaleString()}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Savings</span>
                    <span class="metric-value savings">$${scenario.totalSavings.toLocaleString()}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Margin</span>
                    <span class="metric-value">${scenario.effectiveMargin.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleScenarioSelection(scenarioId) {
    const index = selectedScenarios.indexOf(scenarioId);
    if (index > -1) {
        selectedScenarios.splice(index, 1);
    } else {
        selectedScenarios.push(scenarioId);
    }
    
    compareSelectedBtn.disabled = selectedScenarios.length < 2;
}

function compareSelectedScenarios() {
    if (selectedScenarios.length < 2) {
        alert('Please select at least 2 scenarios to compare');
        return;
    }

    const selectedScenariosData = scenarios.filter(s => selectedScenarios.includes(s.id));
    
    const comparisonHTML = `
        <div class="comparison-table">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Scenario</th>
                        <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Total Price</th>
                        <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Savings</th>
                        <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Margin %</th>
                        <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Monthly Payment</th>
                    </tr>
                </thead>
                <tbody>
                    ${selectedScenariosData.map(scenario => `
                        <tr>
                            <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6; font-weight: 600;">${scenario.name}</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${scenario.totalDiscountedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6; color: #28a745;">$${scenario.totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${scenario.effectiveMargin.toFixed(1)}%</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${scenario.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    comparisonContent.innerHTML = comparisonHTML;
    comparisonModal.style.display = 'block';
}

function closeComparisonModal() {
    comparisonModal.style.display = 'none';
}

function editScenario(scenarioId) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Populate form with scenario data
    document.getElementById('scenario-name').value = scenario.name;
    document.getElementById('scenario-client-type').value = scenario.clientType;
    document.getElementById('scenario-volume').value = scenario.annualVolume;
    document.getElementById('scenario-contract').value = scenario.contractLength;
    document.getElementById('scenario-payment').value = scenario.paymentTerm;

    // Show preview
    displayPreview(scenario);
}

function deleteScenario(scenarioId) {
    if (confirm('Are you sure you want to delete this scenario?')) {
        scenarios = scenarios.filter(s => s.id !== scenarioId);
        selectedScenarios = selectedScenarios.filter(id => id !== scenarioId);
        updateScenariosGrid();
        compareSelectedBtn.disabled = selectedScenarios.length < 2;
    }
}

function exportScenarios() {
    if (scenarios.length === 0) {
        alert('No scenarios to export');
        return;
    }

    const csvContent = generateCSV(scenarios);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-scenarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function generateCSV(scenarios) {
    const headers = ['Name', 'Client Type', 'Annual Volume', 'Contract Length', 'Payment Terms', 'Total Price', 'Savings', 'Margin %', 'Monthly Payment'];
    const rows = scenarios.map(s => [
        s.name,
        s.clientType,
        s.annualVolume,
        s.contractLength,
        s.paymentTerm,
        s.totalDiscountedPrice,
        s.totalSavings,
        s.effectiveMargin,
        s.monthlyPayment
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === comparisonModal) {
        closeComparisonModal();
    }
} 