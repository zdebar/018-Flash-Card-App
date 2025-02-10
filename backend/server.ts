import express, { Request, Response } from 'express';
import sqlite3, { Database, RunResult } from 'sqlite3';
import cors from 'cors';

const app = express();
const db: Database = new sqlite3.Database("./data/cz-esp-01.db");

const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

app.get('/library', (req: Request, res: Response) => {
  res.send('Library route');
});

app.get('/user', (req: Request, res: Response) => {
  res.send('User route');
});

// API Endpoints

// Lectures lists
app.get("/api/lectures", (req: Request, res: Response) => {
  db.all("SELECT id, name FROM lectures", (err: Error | null, rows: any[]) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(rows);
  });
});

// All Blocks lists
app.get("/api/blocks", (req: Request, res: Response) => {
  db.all("SELECT id, name FROM blocks", (err: Error | null, rows: any[]) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(rows);
  });
});

// Blocks in given lecture
app.get("/api/lecture/:lectureId/blocks", (req: Request, res: Response) => {
  const { lectureId } = req.params;

  db.all(
    `SELECT blocks.id, blocks.name
      FROM blocks
      JOIN lecture_blocks ON blocks.id = lecture_blocks.block_id
      WHERE lecture_blocks.lecture_id = ?`,
    [lectureId],
    (err: Error | null, rows: any[]) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(rows);
    }
  );
});

// Words in given block
app.get("/api/block/:blockId/words", (req: Request, res: Response) => {
  const { blockId } = req.params;

  db.all(
    `SELECT words.id, words.src, words.trg, words.prn
       FROM words
       JOIN block_words ON words.id = block_words.word_id
       WHERE block_words.block_id = ?`,
    [blockId],
    (err: Error | null, rows: any[]) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(rows);
    }
  );
});

// Blocks and Words in given lecture
app.get("/api/lecture/:lectureId", (req: Request, res: Response) => {
  const { lectureId } = req.params;

  // Query to get lecture details
  db.get("SELECT id, name FROM lectures WHERE id = ?", [lectureId], (err: Error | null, lecture: any) => {
    if (err) {
      console.error("Error fetching lecture:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Query to get all blocks in the lecture
    db.all(
      `SELECT blocks.id, blocks.name 
        FROM blocks 
        JOIN lecture_blocks ON blocks.id = lecture_blocks.block_id 
        WHERE lecture_blocks.lecture_id = ?`,
      [lectureId],
      (err: Error | null, blocks: any[]) => {
        if (err) {
          console.error("Error fetching blocks:", err);
          return res.status(500).json({ error: "Database query failed" });
        }

        // Fetch words for each block
        const blockIds: number[] = blocks.map(b => b.id);
        if (blockIds.length === 0) {
          return res.json({ ...lecture, blocks: [] }); // Return if no blocks
        }

        db.all(
          `SELECT words.id, words.src, words.trg, words.prn, block_words.block_id 
            FROM words 
            JOIN block_words ON words.id = block_words.word_id 
            WHERE block_words.block_id IN (${blockIds.map(() => "?").join(",")})`,
          blockIds,
          (err: Error | null, words: any[]) => {
            if (err) {
              console.error("Error fetching words:", err);
              return res.status(500).json({ error: "Database query failed" });
            }

            // Nest words inside their corresponding blocks
            const blockMap: { [key: number]: any } = {};
            blocks.forEach(block => {
              blockMap[block.id] = { ...block, words: [] };
            });

            words.forEach(word => {
              blockMap[word.block_id].words.push({
                id: word.id,
                src: word.src,
                trg: word.trg,
                prn: word.prn
              });
            });

            // Convert block map back to array
            const structuredBlocks = Object.values(blockMap);

            res.json({ ...lecture, blocks: structuredBlocks });
          }
        );
      }
    );
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
