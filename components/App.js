const { useState, useEffect } = React;

const App = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [scenarios, setScenarios] = useState([
        {
            id: 1,
            name: "Enterprise Contract A",
            clientType: "enterprise",
            annualVolume: 150000,
            contractLength: 36,
            paymentTerms: "net60",
            finalPrice: 132000,
            savings: 18000,
            timestamp: "2024-01-15T10:30:00Z"
        },
        {
            id: 2,
            name: "SME Startup Deal",
            clientType: "sme",
            annualVolume: 75000,
            contractLength: 24,
            paymentTerms: "net30",
            finalPrice: 69000,
            savings: 6000,
            timestamp: "2024-01-20T14:15:00Z"
        },
        {
            id: 3,
            name: "Government Project",
            clientType: "government",
            annualVolume: 200000,
            contractLength: 48,
            paymentTerms: "net90",
            finalPrice: 170000,
            savings: 30000,
            timestamp: "2024-01-25T09:45:00Z"
        },
        {
            id: 4,
            name: "Education Campus",
            clientType: "education",
            annualVolume: 95000,
            contractLength: 24,
            paymentTerms: "net60",
            finalPrice: 85500,
            savings: 9500,
            timestamp: "2024-01-28T16:20:00Z"
        }
    ]);
    const [products] = useState([
        {
            id: 1,
            name: "Premium Office Chair",
            category: "Furniture",
            basePrice: 299.99,
            margin: 0.25,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DaGFpcjwvdGV4dD48L3N2Zz4=",
            description: "Ergonomic office chair with lumbar support and adjustable features"
        },
        {
            id: 2,
            name: "Wireless Mouse",
            category: "Electronics",
            basePrice: 45.99,
            margin: 0.30,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNzY0YmEyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Nb3VzZTwvdGV4dD48L3N2Zz4=",
            description: "High-precision wireless optical mouse with ergonomic design"
        },
        {
            id: 3,
            name: "Desk Organizer",
            category: "Storage",
            basePrice: 29.99,
            margin: 0.35,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjhhNzQ1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Pcmdhbml6ZXI8L3RleHQ+PC9zdmc+",
            description: "Multi-compartment desk organizer for pens, paper clips, and small items"
        },
        {
            id: 4,
            name: "LED Desk Lamp",
            category: "Lighting",
            basePrice: 89.99,
            margin: 0.28,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MYW1wPC90ZXh0Pjwvc3ZnPg==",
            description: "Adjustable LED desk lamp with USB port and touch controls"
        },
        {
            id: 5,
            name: "Standing Desk",
            category: "Furniture",
            basePrice: 599.99,
            margin: 0.22,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTk3NmQyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZXNrPC90ZXh0Pjwvc3ZnPg==",
            description: "Electric standing desk with memory presets and cable management"
        },
        {
            id: 6,
            name: "Wireless Keyboard",
            category: "Electronics",
            basePrice: 79.99,
            margin: 0.32,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGMzNTQ1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5LZXlib2FyZDwvdGV4dD48L3N2Zz4=",
            description: "Mechanical wireless keyboard with backlit keys and ergonomic design"
        },
        {
            id: 7,
            name: "File Cabinet",
            category: "Storage",
            basePrice: 199.99,
            margin: 0.20,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmY3NTczIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GaWxlPC90ZXh0Pjwvc3ZnPg==",
            description: "4-drawer lateral file cabinet with lock and fire-resistant construction"
        },
        {
            id: 8,
            name: "Monitor Stand",
            category: "Electronics",
            basePrice: 129.99,
            margin: 0.25,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY5ODAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Nb25pdG9yPC90ZXh0Pjwvc3ZnPg==",
            description: "Dual monitor stand with adjustable height and cable management"
        },
        {
            id: 9,
            name: "Coffee Maker",
            category: "Break Room",
            basePrice: 149.99,
            margin: 0.18,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1YzEzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db2ZmZWU8L3RleHQ+PC9zdmc+",
            description: "Commercial coffee maker with programmable settings and thermal carafe"
        },
        {
            id: 10,
            name: "Printer",
            category: "Electronics",
            basePrice: 399.99,
            margin: 0.15,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQzYTQwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QcmludGVyPC90ZXh0Pjwvc3ZnPg==",
            description: "All-in-one laser printer with scanning, copying, and fax capabilities"
        },
        {
            id: 11,
            name: "Whiteboard",
            category: "Office Supplies",
            basePrice: 89.99,
            margin: 0.30,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iYmxhY2siIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Cb2FyZDwvdGV4dD48L3N2Zz4=",
            description: "Magnetic whiteboard with aluminum frame and marker tray"
        },
        {
            id: 12,
            name: "Paper Shredder",
            category: "Office Supplies",
            basePrice: 179.99,
            margin: 0.25,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2YzZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaHJlZGRlcjwvdGV4dD48L3N2Zz4=",
            description: "Cross-cut paper shredder with 12-sheet capacity and safety features"
        }
    ]);

    const [stats] = useState({
        totalRevenue: 2400000,
        activeClients: 247,
        avgMargin: 23.4,
        ordersPerMonth: 1234
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const addScenario = (scenario) => {
        setScenarios([...scenarios, { ...scenario, id: Date.now() }]);
    };

    const deleteScenario = (id) => {
        setScenarios(scenarios.filter(s => s.id !== id));
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard 
                    stats={stats} 
                    products={products}
                    scenarios={scenarios}
                    addScenario={addScenario}
                />;
            case 'scenarios':
                return <Scenarios 
                    scenarios={scenarios}
                    deleteScenario={deleteScenario}
                />;
            case 'products':
                return <Products products={products} />;
            case 'reports':
                return <Reports stats={stats} scenarios={scenarios} />;
            default:
                return <Dashboard 
                    stats={stats} 
                    products={products}
                    scenarios={scenarios}
                    addScenario={addScenario}
                />;
        }
    };

    return (
        <div className="app">
            <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
            <main className="main-content">
                {renderPage()}
            </main>
        </div>
    );
}; 