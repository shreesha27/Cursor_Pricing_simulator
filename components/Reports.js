const Reports = ({ stats, scenarios }) => {
    const [reportType, setReportType] = useState('overview');

    const exportReport = () => {
        const reportData = {
            type: reportType,
            stats: stats,
            scenarios: scenarios,
            generatedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `b2b_report_${reportType}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const renderOverviewReport = () => (
        <div className="report-section">
            <h3>Business Overview</h3>
            <div className="metrics-grid">
                <div className="metric-card">
                    <h4>Revenue Performance</h4>
                    <div className="metric-value">${(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                    <div className="metric-change positive">+12.5% vs last year</div>
                </div>
                <div className="metric-card">
                    <h4>Client Growth</h4>
                    <div className="metric-value">{stats.activeClients}</div>
                    <div className="metric-change positive">+8.2% vs last quarter</div>
                </div>
                <div className="metric-card">
                    <h4>Average Margin</h4>
                    <div className="metric-value">{stats.avgMargin}%</div>
                    <div className="metric-change negative">-2.1% vs last month</div>
                </div>
                <div className="metric-card">
                    <h4>Order Volume</h4>
                    <div className="metric-value">{stats.ordersPerMonth.toLocaleString()}</div>
                    <div className="metric-change positive">+15.3% vs last month</div>
                </div>
            </div>
        </div>
    );

    const renderScenariosReport = () => (
        <div className="report-section">
            <h3>Pricing Scenarios Analysis</h3>
            {scenarios.length === 0 ? (
                <div className="empty-state">
                    <p>No scenarios available for analysis</p>
                </div>
            ) : (
                <div className="scenarios-analysis">
                    <div className="analysis-summary">
                        <div className="summary-item">
                            <span>Total Scenarios:</span>
                            <strong>{scenarios.length}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Average Savings:</span>
                            <strong>${(scenarios.reduce((sum, s) => sum + s.savings, 0) / scenarios.length).toLocaleString()}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Total Value:</span>
                            <strong>${scenarios.reduce((sum, s) => sum + s.finalPrice, 0).toLocaleString()}</strong>
                        </div>
                    </div>
                    <div className="scenarios-chart">
                        <h4>Savings by Client Type</h4>
                        <div className="chart-container">
                            {Object.entries(scenarios.reduce((acc, s) => {
                                acc[s.clientType] = (acc[s.clientType] || 0) + s.savings;
                                return acc;
                            }, {})).map(([type, savings]) => (
                                <div key={type} className="chart-bar">
                                    <span>{type}</span>
                                    <div className="bar" style={{width: `${(savings / 10000)}%`}}></div>
                                    <span>${savings.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderMarketReport = () => (
        <div className="report-section">
            <h3>Market Analysis</h3>
            <div className="market-analysis">
                <div className="competitor-analysis">
                    <h4>Competitive Positioning</h4>
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
                <div className="trend-analysis">
                    <h4>Market Trends</h4>
                    <div className="trend-item">
                        <span>Office Furniture Demand:</span>
                        <strong className="positive">+18%</strong>
                    </div>
                    <div className="trend-item">
                        <span>Electronics Growth:</span>
                        <strong className="positive">+25%</strong>
                    </div>
                    <div className="trend-item">
                        <span>Supply Chain Costs:</span>
                        <strong className="negative">+12%</strong>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="reports-container">
            <header className="page-header">
                <h1>Analytics & Reports</h1>
                <p>Comprehensive business intelligence and performance metrics</p>
            </header>

            <div className="reports-controls">
                <div className="report-type-selector">
                    <button 
                        className={`btn ${reportType === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setReportType('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`btn ${reportType === 'scenarios' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setReportType('scenarios')}
                    >
                        Scenarios
                    </button>
                    <button 
                        className={`btn ${reportType === 'market' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setReportType('market')}
                    >
                        Market
                    </button>
                </div>
                <button className="btn btn-secondary" onClick={exportReport}>
                    <i className="fas fa-download"></i> Export Report
                </button>
            </div>

            <div className="reports-content">
                {reportType === 'overview' && renderOverviewReport()}
                {reportType === 'scenarios' && renderScenariosReport()}
                {reportType === 'market' && renderMarketReport()}
            </div>
        </div>
    );
}; 