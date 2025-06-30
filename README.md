# React B2B Pricing Simulator

A modern React-based web application for B2B pricing scenario simulation for office supplies companies.

## Features

- **Dashboard**: Real-time business metrics and pricing calculator
- **Scenarios**: Create, manage, and compare pricing scenarios
- **Products**: Browse product catalog with filtering and search
- **Reports**: Analytics and business intelligence reports
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 (CDN-based)
- **Styling**: Custom CSS with modern design
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Quick Start

1. **Clone or download the project files**
2. **Start the local server**:
   ```bash
   python3 -m http.server 8000
   ```
3. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
react-b2b-simulator/
├── index.html              # Main HTML file with React CDN
├── styles.css              # All CSS styles
├── components/             # React components
│   ├── App.js             # Main app component
│   ├── Navigation.js      # Navigation component
│   ├── Dashboard.js       # Dashboard page
│   ├── Scenarios.js       # Scenarios page
│   ├── Products.js        # Products page
│   ├── Reports.js         # Reports page
│   ├── ProductCard.js     # Product card component
│   ├── ScenarioCard.js    # Scenario card component
│   └── Modal.js           # Modal component
├── data/                  # Data files (placeholder)
├── utils/                 # Utility functions (placeholder)
└── README.md             # This file
```

## Features Overview

### Dashboard
- Real-time business metrics (revenue, clients, margins, orders)
- Interactive pricing calculator with multiple parameters
- Live pricing results with savings calculations
- Popular products showcase
- Market analysis with competitor comparison

### Scenarios
- Create and save pricing scenarios
- Compare different pricing strategies
- Export scenarios as JSON files
- Detailed scenario analysis

### Products
- Browse complete product catalog
- Search and filter products by category
- Product details with pricing information
- Margin analysis

### Reports
- Business overview metrics
- Scenario analysis and comparisons
- Market trends and competitor analysis
- Export reports in JSON format

## Usage

1. **Navigate** between pages using the top navigation
2. **Calculate Pricing**: Use the dashboard calculator to create pricing scenarios
3. **Save Scenarios**: Click "Save as Scenario" to store your calculations
4. **Compare Scenarios**: View all scenarios in the Scenarios page
5. **Browse Products**: Explore the product catalog with search and filters
6. **View Reports**: Access analytics and business intelligence

## Customization

### Adding Products
Edit the products array in `components/App.js`:

```javascript
const [products] = useState([
    {
        id: 1,
        name: "Product Name",
        category: "Category",
        basePrice: 99.99,
        margin: 0.25,
        image: "image-url",
        description: "Product description"
    }
    // Add more products...
]);
```

### Modifying Pricing Logic
Update the pricing calculation in `components/Dashboard.js`:

```javascript
const calculatePricing = () => {
    // Customize your pricing logic here
    const baseDiscount = {
        startup: 0.05,
        sme: 0.08,
        // Add more client types...
    };
    // ... rest of calculation
};
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

This application uses CDN-based React for simplicity and immediate deployment. For production use, consider:

1. Setting up a proper React development environment with Create React App
2. Adding a build process with Webpack or Vite
3. Implementing proper state management (Redux, Context API)
4. Adding unit tests with Jest and React Testing Library
5. Setting up a backend API for data persistence

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
