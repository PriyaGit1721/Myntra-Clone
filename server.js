const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // If your HTML/CSS is in public folder

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Priya@112sql',
  database: 'myntra_clone'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Route: Signup
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists.' });
      }
      return res.status(500).json({ message: 'Error inserting user.' });
    }
    res.status(201).json({ message: 'User registered successfully.' });
  });
});

// Route: Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    if (results.length > 0) {
      res.json({ message: 'Login successful.' });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
