const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoute = require('./routes/itemRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const Mongostore = require('connect-mongo');
const session = require('express-session');

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: Mongostore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: 'sessions',
    }),
    cookie: { secure: 'auto' },
  })
);

app.use('/api/items', itemRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

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
