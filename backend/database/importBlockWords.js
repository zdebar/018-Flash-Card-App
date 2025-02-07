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

// Function to insert block_words
const insertBlockWords = (data) => {
    const stmt = db.prepare('INSERT INTO block_words (block_id, word_id) VALUES (?, ?)');

    data.forEach(row => {
        // Ensure that both block_id and word_id exist in their respective tables
        const blockId = row.block_id;
        const wordId = row.word_id;

        // Check if block_id exists in the blocks table
        db.get('SELECT id FROM blocks WHERE id = ?', [blockId], (err, block) => {
            if (err) {
                console.error('Error checking block_id:', err.message);
                return;
            }

            // Check if word_id exists in the words table
            db.get('SELECT id FROM words WHERE id = ?', [wordId], (err, word) => {
                if (err) {
                    console.error('Error checking word_id:', err.message);
                    return;
                }

                if (block && word) {
                    // Insert into block_words if both block_id and word_id exist
                    stmt.run(blockId, wordId, (err) => {
                        if (err) {
                            console.error('Error inserting block_word:', err.message);
                        } else {
                            console.log(`Inserted block_word: block_id = ${blockId}, word_id = ${wordId}`);
                        }
                    });
                } else {
                    console.log(`Skipping: block_id = ${blockId} or word_id = ${wordId} does not exist.`);
                }
            });
        });
    });

    stmt.finalize();
};

// Call to process CSV files
readCSV('../data/block_words.csv', insertBlockWords);

// Close the database connection after the operation
db.close((err) => {
    if (err) {
        console.error("Error closing database", err.message);
    } else {
        console.log("Database connection closed");
    }
});
