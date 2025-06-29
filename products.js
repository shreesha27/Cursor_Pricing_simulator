// Product data
const products = [
    {
        id: 1,
        name: "Premium Copy Paper",
        category: "Paper & Printing",
        icon: "fas fa-file-alt",
        basePrice: 8.99,
        margin: 25.5,
        description: "High-quality 20lb white copy paper, 500 sheets per ream. Perfect for everyday printing needs.",
        volumeDiscounts: {
            1000: 0.05,
            5000: 0.10,
            10000: 0.15,
            25000: 0.20
        },
        features: ["20lb weight", "Bright white", "500 sheets", "Compatible with all printers"],
        stock: 1500,
        supplier: "PaperCo Industries"
    },
    {
        id: 2,
        name: "Executive Pens",
        category: "Writing Supplies",
        icon: "fas fa-pen",
        basePrice: 12.50,
        margin: 32.0,
        description: "Premium ballpoint pens with ergonomic grip. Available in black, blue, and red ink.",
        volumeDiscounts: {
            500: 0.08,
            2000: 0.12,
            5000: 0.18,
            10000: 0.25
        },
        features: ["Ergonomic grip", "Smooth writing", "Multiple colors", "Long-lasting ink"],
        stock: 800,
        supplier: "WriteRight Corp"
    },
    {
        id: 3,
        name: "Ergonomic Chairs",
        category: "Furniture",
        icon: "fas fa-chair",
        basePrice: 299.99,
        margin: 18.5,
        description: "Adjustable office chair with lumbar support and breathable mesh back.",
        volumeDiscounts: {
            10: 0.10,
            25: 0.15,
            50: 0.20,
            100: 0.25
        },
        features: ["Adjustable height", "Lumbar support", "Breathable mesh", "5-year warranty"],
        stock: 45,
        supplier: "ComfortSeat Inc"
    },
    {
        id: 4,
        name: "Standing Desks",
        category: "Furniture",
        icon: "fas fa-desktop",
        basePrice: 599.99,
        margin: 22.0,
        description: "Electric standing desk with memory presets and cable management.",
        volumeDiscounts: {
            5: 0.12,
            15: 0.18,
            30: 0.25,
            50: 0.30
        },
        features: ["Electric lift", "Memory presets", "Cable management", "Anti-collision"],
        stock: 25,
        supplier: "StandUp Solutions"
    },
    {
        id: 5,
        name: "Coffee & Tea Supplies",
        category: "Break Room",
        icon: "fas fa-coffee",
        basePrice: 45.00,
        margin: 28.5,
        description: "Premium coffee beans and tea selection for office break rooms.",
        volumeDiscounts: {
            200: 0.06,
            500: 0.10,
            1000: 0.15,
            2000: 0.20
        },
        features: ["Premium beans", "Organic options", "Tea variety", "Monthly delivery"],
        stock: 300,
        supplier: "BrewMaster Co"
    },
    {
        id: 6,
        name: "Cleaning Supplies Kit",
        category: "Janitorial",
        icon: "fas fa-broom",
        basePrice: 89.99,
        margin: 35.0,
        description: "Complete cleaning kit with eco-friendly products for office maintenance.",
        volumeDiscounts: {
            100: 0.08,
            300: 0.12,
            600: 0.18,
            1000: 0.25
        },
        features: ["Eco-friendly", "Complete kit", "Refillable bottles", "Training included"],
        stock: 120,
        supplier: "CleanGreen Solutions"
    }
];

// Global variables
let filteredProducts = [...products];
let currentView = 'grid';

// DOM elements
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const marginFilter = document.getElementById('margin-filter');
const searchInput = document.getElementById('search-products');
const productsCatalog = document.getElementById('products-catalog');
const viewControls = document.querySelectorAll('.view-controls button');
const productModal = document.getElementById('product-modal');
const modalProductName = document.getElementById('modal-product-name');
const modalProductContent = document.getElementById('modal-product-content');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateProductStats();
    renderProducts();
});

function setupEventListeners() {
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    marginFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    
    viewControls.forEach(button => {
        button.addEventListener('click', function() {
            currentView = this.dataset.view;
            updateViewControls();
            renderProducts();
        });
    });
}

function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const marginRange = marginFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    filteredProducts = products.filter(product => {
        // Category filter
        if (category && product.category !== category) return false;
        
        // Price filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max && (product.basePrice < min || product.basePrice > max)) return false;
            if (!max && product.basePrice < min) return false;
        }
        
        // Margin filter
        if (marginRange) {
            const [min, max] = marginRange.split('-').map(Number);
            if (max && (product.margin < min || product.margin > max)) return false;
            if (!max && product.margin < min) return false;
        }
        
        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
            !product.category.toLowerCase().includes(searchTerm)) return false;
        
        return true;
    });

    updateProductStats();
    renderProducts();
}

function updateProductStats() {
    const totalProducts = filteredProducts.length;
    const categories = new Set(filteredProducts.map(p => p.category)).size;
    const avgMargin = filteredProducts.length > 0 ? 
        (filteredProducts.reduce((sum, p) => sum + p.margin, 0) / filteredProducts.length).toFixed(1) : 0;
    const totalValue = filteredProducts.reduce((sum, p) => sum + p.basePrice, 0);

    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-categories').textContent = categories;
    document.getElementById('avg-margin').textContent = avgMargin + '%';
    document.getElementById('total-value').textContent = '$' + totalValue.toFixed(2);
}

function renderProducts() {
    if (currentView === 'grid') {
        renderGridView();
    } else {
        renderListView();
    }
}

function renderGridView() {
    productsCatalog.innerHTML = filteredProducts.map(product => `
        <div class="product-card fade-in" onclick="showProductDetails(${product.id})">
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
            <div class="product-stock">Stock: ${product.stock} units</div>
            <div class="product-description">${product.description.substring(0, 80)}...</div>
        </div>
    `).join('');
}

function renderListView() {
    productsCatalog.innerHTML = `
        <div class="products-list">
            ${filteredProducts.map(product => `
                <div class="product-list-item fade-in" onclick="showProductDetails(${product.id})">
                    <div class="product-list-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <div class="product-list-info">
                        <div class="product-list-name">${product.name}</div>
                        <div class="product-list-category">${product.category}</div>
                        <div class="product-list-description">${product.description}</div>
                    </div>
                    <div class="product-list-price">
                        <div class="price">$${product.basePrice.toFixed(2)}</div>
                        <div class="margin">${product.margin}% margin</div>
                        <div class="stock">Stock: ${product.stock}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function updateViewControls() {
    viewControls.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.view === currentView) {
            button.classList.add('active');
        }
    });
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalProductName.innerHTML = `<i class="${product.icon}"></i> ${product.name}`;
    
    const volumeDiscountsHTML = Object.entries(product.volumeDiscounts)
        .map(([quantity, discount]) => `
            <div class="discount-tier">
                <span class="quantity">${quantity}+ units</span>
                <span class="discount">${(discount * 100).toFixed(0)}% off</span>
            </div>
        `).join('');

    const featuresHTML = product.features.map(feature => `
        <li><i class="fas fa-check"></i> ${feature}</li>
    `).join('');

    modalProductContent.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <div class="product-icon large">
                    <i class="${product.icon}"></i>
                </div>
            </div>
            <div class="product-detail-info">
                <div class="detail-section">
                    <h4>Description</h4>
                    <p>${product.description}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Pricing</h4>
                    <div class="pricing-info">
                        <div class="price-item">
                            <span class="label">Base Price:</span>
                            <span class="value">$${product.basePrice.toFixed(2)}</span>
                        </div>
                        <div class="price-item">
                            <span class="label">Margin:</span>
                            <span class="value">${product.margin}%</span>
                        </div>
                        <div class="price-item">
                            <span class="label">Stock:</span>
                            <span class="value">${product.stock} units</span>
                        </div>
                        <div class="price-item">
                            <span class="label">Supplier:</span>
                            <span class="value">${product.supplier}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Volume Discounts</h4>
                    <div class="volume-discounts">
                        ${volumeDiscountsHTML}
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Features</h4>
                    <ul class="features-list">
                        ${featuresHTML}
                    </ul>
                </div>

                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToQuote(${product.id})">
                        <i class="fas fa-plus"></i> Add to Quote
                    </button>
                    <button class="btn btn-secondary" onclick="calculatePricing(${product.id})">
                        <i class="fas fa-calculator"></i> Calculate Pricing
                    </button>
                </div>
            </div>
        </div>
    `;

    productModal.style.display = 'block';
}

function closeProductModal() {
    productModal.style.display = 'none';
}

function addToQuote(productId) {
    alert(`Product added to quote! (This would integrate with a quote system)`);
}

function calculatePricing(productId) {
    alert(`Redirecting to pricing calculator for this product...`);
    // In a real application, this would redirect to the pricing calculator with the product pre-selected
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === productModal) {
        closeProductModal();
    }
} 