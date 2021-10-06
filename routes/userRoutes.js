const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/register', (req, res) => {
  passport.authenticate('local', (req, res) => {
    
  })
  res.send('Hello there');
});
