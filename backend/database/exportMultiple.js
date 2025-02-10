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
// Function to export table to CSV
const exportTableToCSV = (tableName, filePath, query) => {
    db.all(query, (err, rows) => {
        if (err) {
            console.error(`Error fetching data from ${tableName}:`, err.message);
            return;
        }
        const csv = papaparse_1.default.unparse(rows);
        fs_1.default.writeFile(filePath, csv, (err) => {
            if (err) {
                console.error(`Error writing ${tableName} CSV to file:`, err.message);
            }
            else {
                console.log(`CSV file has been saved successfully as ${filePath}`);
            }
        });
    });
};
// Export each table
exportTableToCSV("lectures", "../data/lectures-export.csv", "SELECT id, name FROM lectures");
exportTableToCSV("blocks", "../data/blocks-export.csv", "SELECT id, name FROM blocks");
exportTableToCSV("lecture_blocks", "../data/lecture_blocks-export.csv", "SELECT lecture_id, block_id FROM lecture_blocks");
// Close the database connection
db.close((err) => {
    if (err) {
        console.error("Error closing database:", err.message);
    }
    else {
        console.log("Database connection closed");
    }
});
