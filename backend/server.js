import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Open SQLite database
const db = new sqlite3.Database('./database.db');

// Base Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Route to create a new word
app.post('/words', (req, res) => {
  const { term, definition } = req.body;

  db.run(
    "INSERT INTO words (term, definition) VALUES (?, ?)",
    [term, definition],
    function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, term, definition });
    }
  );
});

// Route to get all words
app.get('/words', (req, res) => {
  db.all("SELECT * FROM words", (err, rows) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.json(rows);
    });
});

// Route to get a word by ID
app.get('/words/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM words WHERE id = ?", [id], (err, row) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    if (!row) {
        return res.status(404).json({ message: 'Word not found' });
    }
    res.json(row);
    });
});

// Route to update a word
app.put('/words/:id', (req, res) => {
  const { id } = req.params;
  const { term, definition } = req.body;

  db.run(
    "UPDATE words SET term = ?, definition = ? WHERE id = ?",
    [term, definition, id],
    function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json({ id, term, definition });
    }
    );
});

// Route to delete a word
app.delete('/words/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    "DELETE FROM words WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Word not found' });
      }
      res.status(204).send();
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
