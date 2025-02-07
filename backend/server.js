import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});