const express = require('express');
const mongoose = require('mongoose');
const itemRoute = require('./routes/itemRoute');

const app = express();
app.use(express.json());

// Route untuk API items
app.use('/api/items', itemRoute);

// Route sambutan dipindahkan ke bawah agar tidak menghalangi route lainnya
app.use('/', (req, res) => {
  return res.status(200).send('Welcome to Node.js programs');
});

// Koneksi ke MongoDB
mongoose
  .connect(
    'mongodb://root:root123@ac-ufjoenx-shard-00-00.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-01.wv5qisj.mongodb.net:27017,ac-ufjoenx-shard-00-02.wv5qisj.mongodb.net:27017/test-deploy?ssl=true&replicaSet=atlas-xeklsr-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
app.listen(5000, () => {
  console.log('listening on port 5000');
});
