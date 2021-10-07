const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');
const connectDB = require('./utils/mongo');
const app = express();
require('dotenv').config()

const User = require('./models/userModel');
const userRouter = require('./routes/userRoutes');
require('./utils/passport')(passport);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession)({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
});

app.use(passport.initialize());
app.use(passport.session());

connectDB();

userSchema.plugin(passportLocalMongoose);


app.use(userRouter);

module.exports = app;
