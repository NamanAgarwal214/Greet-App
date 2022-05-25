require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongo');
const passport = require('passport');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const sendEmails = require('./controllers/emailsController');
const userRouter = require('./routes/userRoutes');
const friendRouter = require('./routes/friendRoutes');
const googleAuthRouter = require('./routes/googleAuthRoutes');
const port = process.env.PORT;

require('./config/passport')(passport);
connectDB();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(passport.initialize());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cron.schedule('* */23 * * *', function () {
	// console.log('Hello');
	sendEmails();
});

//Routes
// app.use("/", googleAuthRouter);
app.use('/api/user', userRouter);
app.use('/api/friend', friendRouter);

const server = app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
