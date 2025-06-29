// Sample data for office supplies products
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

// Client type multipliers
const clientMultipliers = {
    startup: { discount: 0.05, margin: 1.1 },
    sme: { discount: 0.08, margin: 1.05 },
    enterprise: { discount: 0.12, margin: 1.0 },
    government: { discount: 0.15, margin: 0.95 },
    education: { discount: 0.10, margin: 0.98 }
};

// Contract length bonuses
const contractBonuses = {
    12: { discount: 0.02, margin: 1.02 },
    24: { discount: 0.05, margin: 1.05 },
    36: { discount: 0.08, margin: 1.08 },
    48: { discount: 0.12, margin: 1.12 }
};

// Payment terms adjustments
const paymentTerms = {
    net30: { discount: 0.0, margin: 1.0 },
    net60: { discount: 0.02, margin: 1.02 },
    net90: { discount: 0.05, margin: 1.05 }
};

// Global variables
let scenarios = [];
let currentScenario = null;

// DOM elements
const calculateBtn = document.getElementById('calculate-btn');
const resultsContent = document.getElementById('results-content');
const addScenarioBtn = document.getElementById('add-scenario');
const compareScenariosBtn = document.getElementById('compare-scenarios');
const scenariosList = document.getElementById('scenarios-list');
const productsGrid = document.getElementById('products-grid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    setupEventListeners();
    loadSampleData();
});

function setupEventListeners() {
    calculateBtn.addEventListener('click', calculatePricing);
    addScenarioBtn.addEventListener('click', addScenario);
    compareScenariosBtn.addEventListener('click', compareScenarios);
}

function initializeProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <div class="product-header">
                <div class="product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                </div>
            </div>
            <div class="product-price">$${product.basePrice.toFixed(2)}</div>
            <div class="product-margin">${product.margin}% margin</div>
        </div>
    `).join('');
}

function calculatePricing() {
    const clientType = document.getElementById('client-type').value;
    const annualVolume = parseFloat(document.getElementById('annual-volume').value);
    const contractLength = parseInt(document.getElementById('contract-length').value);
    const paymentTerm = document.getElementById('payment-terms').value;

    if (!annualVolume || annualVolume <= 0) {
        alert('Please enter a valid annual volume');
        return;
    }

    // Show loading state
    resultsContent.innerHTML = '<div class="loading"></div>';

    // Simulate calculation delay
    setTimeout(() => {
        const results = performPricingCalculation(clientType, annualVolume, contractLength, paymentTerm);
        displayResults(results);
    }, 1000);
}

function performPricingCalculation(clientType, annualVolume, contractLength, paymentTerm) {
    const clientMultiplier = clientMultipliers[clientType];
    const contractBonus = contractBonuses[contractLength];
    const paymentAdjustment = paymentTerms[paymentTerm];

    // Calculate base pricing
    let totalBasePrice = 0;
    let totalDiscountedPrice = 0;
    let totalMargin = 0;

    products.forEach(product => {
        const quantity = Math.floor(annualVolume / (products.length * product.basePrice));
        const basePrice = product.basePrice * quantity;
        
        // Apply volume discounts
        let volumeDiscount = 0;
        const volumeTiers = Object.keys(product.volumeDiscounts).map(Number).sort((a, b) => b - a);
        for (const tier of volumeTiers) {
            if (quantity >= tier) {
                volumeDiscount = product.volumeDiscounts[tier];
                break;
            }
        }

        // Calculate final price with all adjustments
        const clientDiscount = clientMultiplier.discount;
        const contractDiscount = contractBonus.discount;
        const paymentDiscount = paymentAdjustment.discount;
        
        const totalDiscount = volumeDiscount + clientDiscount + contractDiscount + paymentDiscount;
        const discountedPrice = basePrice * (1 - totalDiscount);
        
        // Calculate margin
        const adjustedMargin = product.margin * clientMultiplier.margin * contractBonus.margin * paymentAdjustment.margin;
        const marginAmount = discountedPrice * (adjustedMargin / 100);

        totalBasePrice += basePrice;
        totalDiscountedPrice += discountedPrice;
        totalMargin += marginAmount;
    });

    // Calculate additional metrics
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

function displayResults(results) {
    const resultsHTML = `
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
        
        <div class="payment-breakdown fade-in">
            <h3>Payment Breakdown</h3>
            <div class="pricing-results">
                <div class="result-item">
                    <h4>Monthly Payment</h4>
                    <div class="value">$${results.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div class="result-item">
                    <h4>Quarterly Payment</h4>
                    <div class="value">$${results.quarterlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            </div>
        </div>

        <div class="scenario-actions fade-in">
            <button class="btn btn-secondary" onclick="saveAsScenario()">
                <i class="fas fa-save"></i> Save as Scenario
            </button>
            <button class="btn btn-primary" onclick="generateProposal()">
                <i class="fas fa-file-pdf"></i> Generate Proposal
            </button>
        </div>
    `;

    resultsContent.innerHTML = resultsHTML;
    currentScenario = results;
}

function addScenario() {
    if (!currentScenario) {
        alert('Please calculate pricing first before adding a scenario');
        return;
    }

    const scenarioName = prompt('Enter a name for this scenario:');
    if (!scenarioName) return;

    const scenario = {
        id: Date.now(),
        name: scenarioName,
        ...currentScenario
    };

    scenarios.push(scenario);
    updateScenariosList();
    alert(`Scenario "${scenarioName}" added successfully!`);
}

function updateScenariosList() {
    scenariosList.innerHTML = scenarios.map(scenario => `
        <div class="scenario-item fade-in">
            <div class="scenario-info">
                <h4>${scenario.name}</h4>
                <p>${scenario.clientType} • $${scenario.annualVolume.toLocaleString()} • ${scenario.contractLength} months</p>
            </div>
            <div class="scenario-actions">
                <button class="btn btn-small btn-secondary" onclick="loadScenario(${scenario.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-small btn-secondary" onclick="deleteScenario(${scenario.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function loadScenario(scenarioId) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Populate form with scenario data
    document.getElementById('client-type').value = scenario.clientType;
    document.getElementById('annual-volume').value = scenario.annualVolume;
    document.getElementById('contract-length').value = scenario.contractLength;
    document.getElementById('payment-terms').value = scenario.paymentTerm;

    // Display results
    displayResults(scenario);
    currentScenario = scenario;
}

function deleteScenario(scenarioId) {
    if (confirm('Are you sure you want to delete this scenario?')) {
        scenarios = scenarios.filter(s => s.id !== scenarioId);
        updateScenariosList();
    }
}

function compareScenarios() {
    if (scenarios.length < 2) {
        alert('Please add at least 2 scenarios to compare');
        return;
    }

    const comparisonHTML = `
        <div class="scenario-comparison fade-in">
            <h3>Scenario Comparison</h3>
            <div class="comparison-table">
                <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Scenario</th>
                            <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Total Price</th>
                            <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Savings</th>
                            <th style="padding: 0.75rem; text-align: right; border-bottom: 2px solid #dee2e6;">Margin %</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scenarios.map(scenario => `
                            <tr>
                                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6; font-weight: 600;">${scenario.name}</td>
                                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">$${scenario.totalDiscountedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6; color: #28a745;">$${scenario.totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #dee2e6;">${scenario.effectiveMargin.toFixed(1)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    resultsContent.innerHTML = comparisonHTML;
}

function saveAsScenario() {
    addScenario();
}

function generateProposal() {
    if (!currentScenario) {
        alert('Please calculate pricing first');
        return;
    }

    // Simulate proposal generation
    alert('Proposal generation feature would create a PDF with the current pricing scenario. This is a mockup.');
}

function loadSampleData() {
    // Add some sample scenarios
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
        }
    ];

    scenarios = sampleScenarios;
    updateScenariosList();
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Export functions for potential external use
window.PricingSimulator = {
    calculatePricing,
    addScenario,
    compareScenarios,
    loadScenario,
    deleteScenario,
    generateProposal
}; 