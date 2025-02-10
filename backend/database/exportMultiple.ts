import fs from "fs";
import Papa from "papaparse";
import sqlite3, { Database } from "sqlite3";

// Initialize DB
const db: Database = new sqlite3.Database("../data/cz-esp-01.db");

// Define a type for the rows returned from the database
interface Row {
  [key: string]: string | number; // Rows are dynamic, but can contain string or number values
}

// Function to export table to CSV
const exportTableToCSV = (tableName: string, filePath: string, query: string): void => {
  db.all(query, (err: Error | null, rows: Row[]) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err.message);
      return;
    }

    const csv: string = Papa.unparse(rows);

    fs.writeFile(filePath, csv, (err: NodeJS.ErrnoException | null) => {
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
db.close((err: Error | null) => {
  if (err) {
    console.error("Error closing database:", err.message);
  } else {
    console.log("Database connection closed");
  }
});
