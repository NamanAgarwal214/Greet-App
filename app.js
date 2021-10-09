require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongo');
const app = express();

const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', userRouter);

app.use(globalErrorHandler);
module.exports = app;
