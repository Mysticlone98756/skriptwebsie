const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the directory where your Skript files are stored
const scriptDirectory = path.join(__dirname, 'all-skripts');

// API to get the folder structure
app.get('/api/folders', (req, res) => {
    const folderStructure = {};

    // Read the scripts directory
    fs.readdir(scriptDirectory, (err, folders) => {
        if (err) {
            return res.status(500).send('Error reading folders');
        }

        // For each folder, read the files inside
        folders.forEach(folder => {
            const folderPath = path.join(scriptDirectory, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                folderStructure[folder] = fs.readdirSync(folderPath).filter(file => path.extname(file) === '.sk');
            }
        });

        res.json(folderStructure);
    });
});

// Serve the frontend HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'code-looker.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
