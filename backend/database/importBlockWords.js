"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = __importDefault(require("papaparse"));
const sqlite3_1 = __importDefault(require("sqlite3"));
// Path to the database
const dbPath = "../data/cz-esp-01.db";
// Check if the database file exists
if (!fs_1.default.existsSync(dbPath)) {
    console.error("Database does not exist. Stopping execution.");
    process.exit(1);
}
// Initialize DB
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        process.exit(1);
    }
    else {
        console.log("Database connected successfully");
    }
});
// Function to read and parse CSV
const readCSV = (filePath, callback) => {
    const file = fs_1.default.readFileSync(filePath, "utf-8");
    papaparse_1.default.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
            callback(result.data);
        },
        error: (err) => {
            console.error("Error parsing CSV:", err.message);
        },
    });
};
// Function to insert block_words
const insertBlockWords = (data) => {
    const stmt = db.prepare("INSERT INTO block_words (block_id, word_id) VALUES (?, ?)");
    data.forEach((row) => {
        const { block_id, word_id } = row;
        // Insert data into the block_words table
        stmt.run(block_id, word_id, (err) => {
            if (err) {
                console.error(`Error inserting block_word: block_id = ${block_id}, word_id = ${word_id}:`, err.message);
            }
            else {
                console.log(`Inserted block_word: block_id = ${block_id}, word_id = ${word_id}`);
            }
        });
    });
    // Finalize the statement after all insertions
    stmt.finalize((err) => {
        if (err) {
            console.error("Error finalizing statement:", err.message);
        }
        else {
            console.log("Statement finalized successfully");
        }
    });
};
// Call to process CSV files
readCSV("../data/block_words.csv", insertBlockWords);
// Close the database connection after the operation
db.close((err) => {
    if (err) {
        console.error("Error closing database", err.message);
    }
    else {
        console.log("Database connection closed");
    }
});
