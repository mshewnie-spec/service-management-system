const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('HVAC System Online'));
app.listen(10000);
Create backend
