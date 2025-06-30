const Dashboard = ({ stats, products, scenarios, addScenario }) => {
    const [pricingData, setPricingData] = useState({
        clientType: 'sme',
        annualVolume: 50000,
        contractLength: 24,
        paymentTerms: 'net60'
    });

    const [results, setResults] = useState(null);

    const calculatePricing = () => {
        const baseDiscount = {
            startup: 0.05,
            sme: 0.08,
            enterprise: 0.12,
            government: 0.15,
            education: 0.10
        };

        const contractDiscount = {
            12: 0.02,
            24: 0.05,
            36: 0.08,
            48: 0.12
        };

        const paymentDiscount = {
            net30: 0.02,
            net60: 0.00,
            net90: -0.03
        };

        const volumeDiscount = pricingData.annualVolume > 100000 ? 0.05 : 
                             pricingData.annualVolume > 50000 ? 0.03 : 0.00;

        const totalDiscount = baseDiscount[pricingData.clientType] + 
                            contractDiscount[pricingData.contractLength] + 
                            paymentDiscount[pricingData.paymentTerms] + 
                            volumeDiscount;

        const finalPrice = pricingData.annualVolume * (1 - totalDiscount);
        const savings = pricingData.annualVolume - finalPrice;

        setResults({
            originalPrice: pricingData.annualVolume,
            finalPrice: finalPrice,
            totalDiscount: totalDiscount * 100,
            savings: savings,
            monthlyPayment: finalPrice / 12
        });
    };

    const handleInputChange = (field, value) => {
        setPricingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addCurrentScenario = () => {
        if (results) {
            addScenario({
                name: `Scenario ${scenarios.length + 1}`,
                clientType: pricingData.clientType,
                annualVolume: pricingData.annualVolume,
                contractLength: pricingData.contractLength,
                paymentTerms: pricingData.paymentTerms,
                finalPrice: results.finalPrice,
                savings: results.savings,
                timestamp: new Date().toISOString()
            });
        }
    };

    return (
        <div className="dashboard-container">
            <header className="page-header">
                <h1>B2B Pricing Scenario Simulator</h1>
                <p>Optimize your office supplies contracts with data-driven pricing strategies</p>
            </header>

            <div className="dashboard-grid">
                {/* Quick Stats */}
                <div className="stats-section">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Total Revenue</h3>
                            <p className="stat-value">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                            <span className="stat-change positive">+12.5%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Active Clients</h3>
                            <p className="stat-value">{stats.activeClients}</p>
                            <span className="stat-change positive">+8.2%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-percentage"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Avg. Margin</h3>
                            <p className="stat-value">{stats.avgMargin}%</p>
                            <span className="stat-change negative">-2.1%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Orders/Month</h3>
                            <p className="stat-value">{stats.ordersPerMonth.toLocaleString()}</p>
                            <span className="stat-change positive">+15.3%</span>
                        </div>
                    </div>
                </div>

                {/* Pricing Calculator */}
                <div className="calculator-section">
                    <div className="calculator-card">
                        <h2><i className="fas fa-calculator"></i> Pricing Calculator</h2>
                        <div className="calculator-form">
                            <div className="form-group">
                                <label>Client Type</label>
                                <select 
                                    className="form-control"
                                    value={pricingData.clientType}
                                    onChange={(e) => handleInputChange('clientType', e.target.value)}
                                >
                                    <option value="startup">Startup (1-50 employees)</option>
                                    <option value="sme">SME (51-200 employees)</option>
                                    <option value="enterprise">Enterprise (200+ employees)</option>
                                    <option value="government">Government</option>
                                    <option value="education">Education</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Annual Volume ($)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="50000" 
                                    value={pricingData.annualVolume}
                                    onChange={(e) => handleInputChange('annualVolume', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Contract Length (months)</label>
                                <select 
                                    className="form-control"
                                    value={pricingData.contractLength}
                                    onChange={(e) => handleInputChange('contractLength', parseInt(e.target.value))}
                                >
                                    <option value={12}>12 months</option>
                                    <option value={24}>24 months</option>
                                    <option value={36}>36 months</option>
                                    <option value={48}>48 months</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Payment Terms</label>
                                <select 
                                    className="form-control"
                                    value={pricingData.paymentTerms}
                                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                                >
                                    <option value="net30">Net 30</option>
                                    <option value="net60">Net 60</option>
                                    <option value="net90">Net 90</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" onClick={calculatePricing}>
                                <i className="fas fa-calculator"></i> Calculate Pricing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Display */}
                <div className="results-section">
                    <div className="results-card">
                        <h2><i className="fas fa-chart-bar"></i> Pricing Results</h2>
                        <div className="results-content">
                            {results ? (
                                <div className="results-data">
                                    <div className="result-item">
                                        <span>Original Price:</span>
                                        <strong>${results.originalPrice.toLocaleString()}</strong>
                                    </div>
                                    <div className="result-item">
                                        <span>Final Price:</span>
                                        <strong>${results.finalPrice.toLocaleString()}</strong>
                                    </div>
                                    <div className="result-item">
                                        <span>Total Discount:</span>
                                        <strong>{results.totalDiscount.toFixed(1)}%</strong>
                                    </div>
                                    <div className="result-item">
                                        <span>Total Savings:</span>
                                        <strong>${results.savings.toLocaleString()}</strong>
                                    </div>
                                    <div className="result-item">
                                        <span>Monthly Payment:</span>
                                        <strong>${results.monthlyPayment.toLocaleString()}</strong>
                                    </div>
                                    <button className="btn btn-secondary" onClick={addCurrentScenario}>
                                        <i className="fas fa-plus"></i> Save as Scenario
                                    </button>
                                </div>
                            ) : (
                                <div className="placeholder-message">
                                    <i className="fas fa-chart-line"></i>
                                    <p>Enter your parameters and click "Calculate Pricing" to see results</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Catalog */}
                <div className="products-section">
                    <div className="products-card">
                        <h2><i className="fas fa-box"></i> Popular Products</h2>
                        <div className="products-grid">
                            {products.slice(0, 4).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Market Analysis */}
                <div className="market-section">
                    <div className="market-card">
                        <h2><i className="fas fa-globe"></i> Market Analysis</h2>
                        <div className="market-metrics">
                            <div className="metric-item">
                                <h4>Competitor Pricing</h4>
                                <div className="competitor-chart">
                                    <div className="competitor-bar">
                                        <span>OfficeMax</span>
                                        <div className="bar" style={{width: '85%'}}></div>
                                        <span>85%</span>
                                    </div>
                                    <div className="competitor-bar">
                                        <span>Staples</span>
                                        <div className="bar" style={{width: '92%'}}></div>
                                        <span>92%</span>
                                    </div>
                                    <div className="competitor-bar">
                                        <span>Amazon</span>
                                        <div className="bar" style={{width: '78%'}}></div>
                                        <span>78%</span>
                                    </div>
                                    <div className="competitor-bar our-price">
                                        <span>Our Price</span>
                                        <div className="bar" style={{width: '100%'}}></div>
                                        <span>100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 