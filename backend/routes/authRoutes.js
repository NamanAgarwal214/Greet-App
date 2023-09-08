const router = require("express").Router();
const authController = require("./../controllers/authController");

// Authentication
router.post("/register", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.protect, authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);

module.exports = router;
