const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

//  Authorization
router.patch(
  "/updateProfile",
  authController.protect,
  userController.upload.single("photo"),
  userController.updateProfile
);

router.get("/getUser", authController.protect, userController.getUser);
router.get("/getFriends", authController.protect, userController.getFriends);
router.get("/unsubscribe", authController.protect, userController.unsubscribe);

module.exports = router;
