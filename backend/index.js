require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { createClient } = require("redis");
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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://letusgreet.netlify.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

let redisClient;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.KEY_1, process.env.KEY_2],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(path.join(__dirname, "public")));

// cron jobs
cron.schedule("*/5 * * * *", async function () {
  let directory = "./public/img/users";
  const files = await fs.readdir(directory);
  if (files.length)
    for (const file of files) {
      await fs.unlink(path.join(directory, file));
    }
});
cron.schedule("0 0 * * *", async function () {
  // console.log("Hello");
  await sendEmails();
});

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

module.exports = redisClient;
