require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/mongo");
const passport = require("passport");
const cors = require("cors");
const cron = require("node-cron");
const app = express();
const sendEmails = require("./controllers/emailsController");
const userRouter = require("./routes/userRoutes");
const friendRouter = require("./routes/friendRoutes");
const googleAuthRouter = require("./routes/googleAuthRoutes");

require("./config/passport")(passport);
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(passport.initialize());
app.use(cors());

app.use('/public' ,express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cron.schedule("* */23 * * *", function () {
  // sendEmails();
  console.log("Hello");
});

//Routes
app.use("/", googleAuthRouter);
app.use("/api/user", userRouter);
app.use("/api/friend", friendRouter);

module.exports = app;
