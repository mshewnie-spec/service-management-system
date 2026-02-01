const { Pool } = require('pg');
const express = require('express');
const app = express();

// Use the environment variable Render will provide
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/db-test', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(`Database Connected: ${result.rows[0].now}`);
});

app.listen(10000);
