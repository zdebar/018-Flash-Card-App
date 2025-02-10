// Export tables : lectures, blocks, lecture_blocks

import fs from "fs";
import Papa from "papaparse";
import sqlite3 from "sqlite3";

// Initialize DB
const db = new sqlite3.Database("../data/cz-esp-01.db");

// Function to export table to CSV
const exportTableToCSV = (tableName, filePath, query) => {
  db.all(query, (err, rows) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err.message);
      return;
    }

    const csv = Papa.unparse(rows);

    fs.writeFile(filePath, csv, (err) => {
      if (err) {
        console.error(`Error writing ${tableName} CSV to file:`, err.message);
      } else {
        console.log(`CSV file has been saved successfully as ${filePath}`);
      }
    });
  });
};

// Export each table
exportTableToCSV(
  "lectures",
  "../data/lectures-export.csv",
  "SELECT id, name FROM lectures"
);
exportTableToCSV(
  "blocks",
  "../data/blocks-export.csv",
  "SELECT id, name FROM blocks"
);
exportTableToCSV(
  "lecture_blocks",
  "../data/lecture_blocks-export.csv",
  "SELECT lecture_id, block_id FROM lecture_blocks"
);

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing database:", err.message);
  } else {
    console.log("Database connection closed");
  }
});
