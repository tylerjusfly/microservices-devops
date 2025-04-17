const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {

    if(!email || !password){
        return res.status(401).json({ error: 'Email and password is required.' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    return res.json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

async function ensureUsersTableExists() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Checked/created users table.');
  }

async function insertTestUser() {
    const email = 'test@example.com';
    const plainPassword = 'test123';
  
    // Check if the user already exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('Test user already exists.');
      return;
    }
  
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
  
    console.log('Test user inserted.');
  }

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
      await ensureUsersTableExists();
      await insertTestUser();
  
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('❌ Error during startup:', err);
      process.exit(1);
    }
  }
  
  startServer();

