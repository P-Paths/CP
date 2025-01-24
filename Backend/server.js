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

// Route to simulate back connection health check
app.get('/check-bank', (req,res) => {
    // Simulate a bank connection health check
    const result = {
       message: 'Bank connection is healthy!',
       status: 'Succes',
       timestamp: new Date(),
       details: 'All bank APIs are resopnding as expected'

    };

   console.log('Bank connection checked:', result); //Log the result to the terminal
   res.json(result); // Send the result as a JSON response

});

// Route to simulate multiple bank connection health checks
app.get('/check-bank-multiple', (req, res) => {
         // Define possible statuses
    const statuses = ['Healthy', 'Under Maintenance', 'Disconnected', 'Updates']

     //Simulate response for multiple banks
//Generate random statuses for each bank using MATH functions
    const bankStatuses = [
         { bank: 'Bank of America', status: statuses[Math.floor(Math.random() * statuses.length)],  lastChecked: new Date() },
         { bank: 'Chase', status: statuses[Math.floor(Math.random() * statuses.length)],  lastChecked: new Date() },
         { bank: 'Wells Fargo', status: statuses[Math.floor(Math.random() * statuses.length)],  lastChecked: new Date() },
         { bank: 'Navy Federal', status: statuses[Math.floor(Math.random() * statuses.length)], 	
 lastChecked: new Date() },

    ];


    console.log('Bank connection status checked', bankStatuses); // This the log details
    res.json({
        message: 'Bank connection statuses retrieved successfully',
        banks: bankStatuses,

    });

});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


