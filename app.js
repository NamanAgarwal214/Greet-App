require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongo');
const passport = require('passport');
const app = express();

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const googleAuthRouter = require('./routes/googleAuthRoutes');
const globalErrorHandler = require('./controllers/errorController');

require('./config/passport')(passport);
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/home', (req, res) => {
  res.send('You are on the home page');
})
app.get('/error', (req, res) => {
  res.send('You are on the error page');
})
app.use('/', googleAuthRouter);
app.use('/', viewRouter);
app.use('/api/user', userRouter);

//Error Handler
app.use(globalErrorHandler);

module.exports = app;