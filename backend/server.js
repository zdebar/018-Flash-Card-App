import express from 'express';
import sqlite3 from "sqlite3";

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database("./data/cz-esp-01.db");

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get('/library', (req, res) => {
  res.send('Library route');
});

app.get('/user', (req, res) => {
  res.send('User route');
});

// API Endpoint
app.get("/api/lectures", (req, res) => {
  db.all("SELECT id, name FROM lectures", (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(rows);
  });
});

app.get("/api/blocks", (req, res) => {
  db.all("SELECT id, name FROM blocks", (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(rows);
  });
});

app.get("/api/lecture/:lectureId/blocks", (req, res) => {
  const { lectureId } = req.params;

  db.all(
    `SELECT blocks.id, blocks.name
      FROM blocks
      JOIN lecture_blocks ON blocks.id = lecture_blocks.block_id
      WHERE lecture_blocks.lecture_id = ?`,
    [lectureId],
    (err, rows) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(rows);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});