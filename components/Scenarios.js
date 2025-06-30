const Scenarios = ({ scenarios, deleteScenario }) => {
    console.log('Scenarios component received scenarios:', scenarios);
    const [selectedScenario, setSelectedScenario] = useState(null);

    if (!scenarios) {
        return <div style={{color: 'red', padding: '2rem'}}>No scenarios data received.</div>;
    }

    const exportScenario = (scenario) => {
        const dataStr = JSON.stringify(scenario, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${scenario.name.replace(/\s+/g, '_')}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="scenarios-container">
            <header className="page-header">
                <h1>Pricing Scenarios</h1>
                <p>Manage and compare your pricing scenarios</p>
            </header>

            <div className="scenarios-content">
                {scenarios.length === 0 ? (
                    <div className="empty-state">
                        <h3>No scenarios yet</h3>
                        <p>Create pricing scenarios from the dashboard to see them here</p>
                    </div>
                ) : (
                    <div className="scenarios-grid">
                        {scenarios.map(scenario => (
                            <div key={scenario.id} className="scenario-card">
                                <div className="scenario-header">
                                    <h3>{scenario.name}</h3>
                                    <div className="scenario-actions">
                                        <button className="btn-icon" onClick={() => setSelectedScenario(scenario)} title="View Details">
                                            👁️
                                        </button>
                                        <button className="btn-icon" onClick={() => exportScenario(scenario)} title="Export">
                                            📥
                                        </button>
                                        <button className="btn-icon" onClick={() => deleteScenario(scenario.id)} title="Delete">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <div className="scenario-content">
                                    <div className="scenario-info">
                                        <div className="info-item">
                                            <span>Client Type:</span>
                                            <strong>{scenario.clientType}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Volume:</span>
                                            <strong>${scenario.annualVolume.toLocaleString()}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Contract:</span>
                                            <strong>{scenario.contractLength} months</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Final Price:</span>
                                            <strong>${scenario.finalPrice.toLocaleString()}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Savings:</span>
                                            <strong className="savings">${scenario.savings.toLocaleString()}</strong>
                                        </div>
                                    </div>
                                    <div className="scenario-timestamp">
                                        <small>{new Date(scenario.timestamp).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedScenario && (
                    <div className="modal-overlay" onClick={() => setSelectedScenario(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedScenario(null)}>
                                ✕
                            </button>
                            <div className="scenario-detail">
                                <h2>{selectedScenario.name}</h2>
                                <div className="scenario-details">
                                    <div className="detail-item">
                                        <span>Client Type:</span>
                                        <strong>{selectedScenario.clientType}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Annual Volume:</span>
                                        <strong>${selectedScenario.annualVolume.toLocaleString()}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Contract Length:</span>
                                        <strong>{selectedScenario.contractLength} months</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Payment Terms:</span>
                                        <strong>{selectedScenario.paymentTerms}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Final Price:</span>
                                        <strong>${selectedScenario.finalPrice.toLocaleString()}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Total Savings:</span>
                                        <strong>${selectedScenario.savings.toLocaleString()}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Created:</span>
                                        <strong>{new Date(selectedScenario.timestamp).toLocaleDateString()}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 