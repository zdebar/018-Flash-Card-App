import fs from 'fs';
import Papa from 'papaparse';
import sqlite3 from 'sqlite3';

// Path to the database
const dbPath = '../data/cz-esp-01.db';

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
    console.error("Database does not exist. Stopping execution.");
    process.exit(1); 
}

// Initialize DB
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        process.exit(1); 
    } else {
        console.log("Database connected successfully");
    }
});

// Function to read and parse CSV
const readCSV = (filePath, callback) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
            callback(result.data); 
        },
        error: (err) => {
            console.error('Error parsing CSV:', err.message);
        }
    });
};

// Function to insert words
const insertWords = (data) => {
    const stmt = db.prepare('INSERT INTO words (src, trg, prn) VALUES (?, ?, ?)');
    data.forEach(row => {
        stmt.run(row.src, row.trg, row.prn);
    });
    stmt.finalize();
};

// Call to process CSV files
readCSV('../data/words.csv', insertWords);

// Close the database connection after the operation
db.close((err) => {
    if (err) {
        console.error("Error closing database", err.message);
    } else {
        console.log("Database connection closed");
    }
});
