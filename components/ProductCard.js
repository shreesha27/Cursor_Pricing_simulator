const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
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
    );
}; 