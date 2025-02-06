import initSqlJs from "wa-sqlite";
import { createDbWorker } from "wa-sqlite";

// Initialize SQLite database and worker
export async function setupDatabase() {
    // Initialize SQLite WASM
    const SQL = await initSqlJs({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@1.6.1/dist/${file}`, 
    });

    // Create a Web Worker for background processing
    const worker = await createDbWorker(SQL);

    // Initialize the database within the worker
    await worker.exec("CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, term TEXT, definition TEXT);");

    return worker;
}

// Insert words into the database via the worker
export async function insertWords(worker, words) {
    for (const word of words) {
        await worker.exec({
            sql: "INSERT INTO words (term, definition) VALUES (?, ?);",
            bind: [word.term, word.definition],
        });
    }
}

// Fetch words from the database via the worker
export async function fetchWords(worker) {
    const result = await worker.exec({
        sql: "SELECT * FROM words;",
        returnValue: "resultRows",
    });
    return result;
}


