const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoute = require('./routes/itemRoute');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/items', itemRoute);

app.use('/', (req, res) => {
  return res.status(200).send('Welcome to Node.js programs');
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
app.listen(process.env.PORT, () => {
  console.log('listening on port 5000');
});
