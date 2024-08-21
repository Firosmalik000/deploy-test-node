const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoute = require('./routes/itemRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const Mongostore = require('connect-mongo');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://erp-frontend-react.vercel.app'],
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true, // Ubah menjadi true
    saveUninitialized: false, // Ubah menjadi false
    store: Mongostore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: 'sessions',
    }),
    cookie: {
      path: '/',
      _expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      originalMaxAge: 86400000,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
  })
);

app.use((req, res, next) => {
  console.log('Request Cookies:', req.cookies);
  next();
});

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
