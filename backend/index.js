app.use(express.json()); // Essential: reads form data
app.use(express.static('../frontend')); // Essential: shows your HTML page

// Saves a job
app.post('/api/jobs', async (req, res) => {
  const { customer_name, service_type } = req.body;
  await pool.query('INSERT INTO jobs (customer_name, service_type) VALUES ($1, $2)', [customer_name, service_type]);
  res.sendStatus(200);
});

// Gets all jobs
app.get('/api/jobs', async (req, res) => {
  const result = await pool.query('SELECT * FROM jobs ORDER BY id DESC');
  res.json(result.rows);
});
