const express = require('express');
const viewController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).render('base');
})

router.get('/login', viewController.getLoginForm);

router.get('/register', (req, res) => {
    res.status(200).render('register');
})

module.exports = router;