require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/mongo')
const passport = require('passport')
const app = express()

const userRouter = require('./routes/userRoutes')
const friendRouter = require('./routes/friendRoutes')
const emailRouter = require('./routes/emailRoutes')
const googleAuthRouter = require('./routes/googleAuthRoutes')
const globalErrorHandler = require('./controllers/errorController')

require('./config/passport')(passport)
connectDB()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Routes
app.use('/', googleAuthRouter)
app.use('/api/user', userRouter)
app.use('/api/friend', friendRouter)
app.use('/api/email', emailRouter)

//Error Handler
app.use(globalErrorHandler)

module.exports = app
