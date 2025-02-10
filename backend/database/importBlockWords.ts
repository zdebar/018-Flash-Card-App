import fs from "fs";
import Papa from "papaparse";
import sqlite3, { Database, Statement } from "sqlite3";

// Path to the database
const dbPath: string = "../data/cz-esp-01.db";

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
  console.error("Database does not exist. Stopping execution.");
  process.exit(1);
}

// Initialize DB
const db: Database = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  } else {
    console.log("Database connected successfully");
  }
});

// Define type for CSV row data
interface BlockWordRow {
  block_id: number;
  word_id: number;
}

// Function to read and parse CSV
const readCSV = (filePath: string, callback: (data: BlockWordRow[]) => void): void => {
  const file: string = fs.readFileSync(filePath, "utf-8");
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      callback(result.data as BlockWordRow[]);
    },
    error: (err) => {
      console.error("Error parsing CSV:", err.message);
    },
  });
};

// Function to insert block_words
const insertBlockWords = (data: BlockWordRow[]): void => {
  const stmt: Statement = db.prepare(
    "INSERT INTO block_words (block_id, word_id) VALUES (?, ?)"
  );

  data.forEach((row) => {
    const { block_id, word_id } = row;

    // Insert data into the block_words table
    stmt.run(block_id, word_id, (err: Error | null) => {
      if (err) {
        console.error(
          `Error inserting block_word: block_id = ${block_id}, word_id = ${word_id}:`,
          err.message
        );
      } else {
        console.log(`Inserted block_word: block_id = ${block_id}, word_id = ${word_id}`);
      }
    });
  });

  // Finalize the statement after all insertions
  stmt.finalize((err: Error | null) => {
    if (err) {
      console.error("Error finalizing statement:", err.message);
    } else {
      console.log("Statement finalized successfully");
    }
  });
};

// Call to process CSV files
readCSV("../data/block_words.csv", insertBlockWords);

// Close the database connection after the operation
db.close((err: Error | null) => {
  if (err) {
    console.error("Error closing database", err.message);
  } else {
    console.log("Database connection closed");
  }
});
