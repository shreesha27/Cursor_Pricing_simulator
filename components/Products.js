const Products = ({ products }) => {
    console.log('Products component received products:', products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (!products || products.length === 0) {
        return <div style={{color: 'red', padding: '2rem'}}>No products data received.</div>;
    }

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-container">
            <header className="page-header">
                <h1>Product Catalog</h1>
                <p>Browse and analyze our complete product portfolio</p>
            </header>

            <div className="products-filters">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filter">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p className="product-category">{product.category}</p>
                            <p className="product-price">${product.basePrice}</p>
                            <div className="product-margin">
                                <span>Margin: {(product.margin * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <Modal onClose={() => setSelectedProduct(null)}>
                    <div className="product-detail">
                        <div className="product-detail-image">
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                        </div>
                        <div className="product-detail-info">
                            <h2>{selectedProduct.name}</h2>
                            <p className="product-detail-category">{selectedProduct.category}</p>
                            <p className="product-detail-description">{selectedProduct.description}</p>
                            <div className="product-detail-pricing">
                                <div className="price-item">
                                    <span>Base Price:</span>
                                    <strong>${selectedProduct.basePrice}</strong>
                                </div>
                                <div className="price-item">
                                    <span>Margin:</span>
                                    <strong>{(selectedProduct.margin * 100).toFixed(0)}%</strong>
                                </div>
                                <div className="price-item">
                                    <span>Profit per Unit:</span>
                                    <strong>${(selectedProduct.basePrice * selectedProduct.margin).toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}; 