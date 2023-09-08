const router = require("express").Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const ensureAuth = require("../middleware/auth");

router.get("/", authController.protect, ensureAuth, userController.getAllUsers);
router.get("/:id", authController.protect, ensureAuth, userController.getUser);
router.delete(
  "/deleteUser",
  authController.protect,
  ensureAuth,
  userController.deleteUser
);

module.exports = router;
