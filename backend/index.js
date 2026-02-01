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
app.use(express.json()); // Allows backend to read the form data
app.use(express.static('../frontend')); // Serves your HTML file

app.post('/api/jobs', async (req, res) => {
  const { customer_name, service_type } = req.body;
  await pool.query('INSERT INTO jobs (customer_name, service_type) VALUES ($1, $2)', [customer_name, service_type]);
  res.sendStatus(200);
});

app.listen(10000);
