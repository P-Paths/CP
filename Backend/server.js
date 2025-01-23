const express = require('express');
const QuickBooks = require('node-quickbooks');
const app = express();

const PORT = 3000;

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to ClearPath SaaS!');
});

// Route to simulate clearing cache and cookies
app.get('/clear-cache', (req, res) => {
    // Simulate clearing browser cache and cookies
    const result = {
        message: 'Cache and cookies cleared successfully!',
        timestamp: new Date(),
    };

    console.log('Cache clearing simulated:', result);
    res.json(result);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


