"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = __importDefault(require("papaparse"));
const sqlite3_1 = __importDefault(require("sqlite3"));
// Initialize DB
const db = new sqlite3_1.default.Database("../data/cz-esp-01.db");
// Function to export words table to CSV
const exportWordsToCSV = () => {
    // Query all data from the words table
    db.all("SELECT id, src, trg, prn FROM words", (err, rows) => {
        if (err) {
            console.error("Error fetching data from database:", err.message);
            return;
        }
        // Convert the rows to CSV format
        const csv = papaparse_1.default.unparse(rows);
        // Write the CSV data to a file
        fs_1.default.writeFile("../data/words-export.csv", csv, (err) => {
            if (err) {
                console.error("Error writing CSV to file:", err.message);
            }
            else {
                console.log("CSV file has been saved successfully as words-export.csv");
            }
        });
    });
};
// Call the function to export the data
exportWordsToCSV();
// Close the database connection
db.close((err) => {
    if (err) {
        console.error("Error closing database", err.message);
    }
    else {
        console.log("Database connection closed");
    }
});
