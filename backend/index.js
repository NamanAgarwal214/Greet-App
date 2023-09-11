require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const connectDB = require("./config/mongo");
const passport = require("passport");
const cors = require("cors");
const cron = require("node-cron");
const app = express();
// const sendEmails = require("./controllers/emailsController");
const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const { sendEmails } = require("./controllers/emailsController");
require("./config/passport");

// mongo connect
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.KEY_1, process.env.KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cookieParser());
sendEmails();
// cron.schedule("0 0 * * *", function () {
//   // console.log("Hello");
//   sendEmails();
// });

//Routes
app.use("/api", googleAuthRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friend", friendRoutes);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! SHUTTING DOWN...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
