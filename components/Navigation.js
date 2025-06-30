const Navigation = ({ currentPage, onPageChange }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'scenarios', label: 'Scenarios', icon: 'fas fa-balance-scale' },
        { id: 'products', label: 'Products', icon: 'fas fa-box' },
        { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' }
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <i className="fas fa-boxes"></i>
                    <span>OfficeSupplies Pro</span>
                </div>
                <div className="nav-menu">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => onPageChange(item.id)}
                        >
                            <i className={item.icon}></i>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}; 