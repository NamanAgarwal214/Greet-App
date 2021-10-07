require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/mongo');
const app = express();

const userRouter = require('./routes/userRoutes');

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);

module.exports = app;
