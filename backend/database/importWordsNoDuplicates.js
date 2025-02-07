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
    // Prepare statement for checking if word exists
    const checkStmt = db.prepare('SELECT id FROM words WHERE src = ?');
    
    // Prepare statement for inserting a word
    const insertStmt = db.prepare('INSERT INTO words (src, trg, prn) VALUES (?, ?, ?)');

    // Use a callback to handle finalization after all operations
    let completed = 0;
    data.forEach(row => {
        // Check if the word already exists in the database
        checkStmt.get(row.src, (err, existingWord) => {
            if (err) {
                console.error('Error checking if word exists:', err.message);
                return;
            }

            // If the word does not exist, insert it
            if (!existingWord) {
                insertStmt.run(row.src, row.trg, row.prn, (err) => {
                    if (err) {
                        console.error('Error inserting word:', err.message);
                    } else {
                        console.log(`Inserted: ${row.src}`);
                    }

                    // Count completed insertions
                    completed += 1;
                    if (completed === data.length) {
                        // Finalize statements only after all insertions
                        checkStmt.finalize();
                        insertStmt.finalize();
                    }
                });
            } else {
                console.log(`Word '${row.src}' already exists with ID ${existingWord.id}`);

                // Count completed checks
                completed += 1;
                if (completed === data.length) {
                    // Finalize statements only after all checks and insertions
                    checkStmt.finalize();
                    insertStmt.finalize();
                }
            }
        });
    });
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
