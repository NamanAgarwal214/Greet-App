const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/register', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);
router.get('/protected_Route', authController.protect, authController.protected_route);

module.exports = router;