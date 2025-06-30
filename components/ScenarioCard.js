const ScenarioCard = ({ scenario, onDelete, onExport, onSelect }) => {
    return (
        <div className="scenario-card">
            <div className="scenario-header">
                <h3>{scenario.name}</h3>
                <div className="scenario-actions">
                    <button className="btn-icon" onClick={onSelect} title="View Details">
                        <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-icon" onClick={onExport} title="Export">
                        <i className="fas fa-download"></i>
                    </button>
                    <button className="btn-icon" onClick={onDelete} title="Delete">
                        <i className="fas fa-trash"></i>
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
    );
}; 