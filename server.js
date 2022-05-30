const express = require('express');
const db = require('./db/connection');
const startPrompt = require('./index.js');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => {
    res.status(404).end();
});
db.connect(err => {
    if (err => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}~`);
        });
    });
});

startPrompt();