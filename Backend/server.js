const express = require('express');
const app = express();

const PORT = 3000;

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to ClearPath API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

