const router = require("express").Router();
const passport = require("passport");
const { issueJWT } = require("../controllers/authController");
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.DEV_REDIRECT_URL,
    failureMessage: true,
  }),
  function (req, res) {
    // console.log(req);
    issueJWT(res, req.user);
    res.redirect(process.env.DEV_REDIRECT_URL);
  }
);

module.exports = router;
