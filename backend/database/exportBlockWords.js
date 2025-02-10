"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const papaparse_1 = __importDefault(require("papaparse"));
// Path to the database
const dbPath = "../data/cz-esp-01.db";
// Open the database
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }
    console.log("Database connected successfully");
    // Query to select all rows from the block_words table
    const query = "SELECT * FROM block_words";
    db.all(query, (err, rows) => {
        if (err) {
            console.error("Error querying block_words table:", err.message);
            return;
        }
        // Convert the rows to CSV format using PapaParse
        const csv = papaparse_1.default.unparse(rows);
        // Write the CSV data to a file
        fs_1.default.writeFile("../data/block_words_export.csv", csv, (err) => {
            if (err) {
                console.error("Error writing CSV to file:", err.message);
            }
            else {
                console.log("block_words table exported to block_words_export.csv");
            }
        });
    });
    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error("Error closing database:", err.message);
        }
        else {
            console.log("Database connection closed");
        }
    });
});
