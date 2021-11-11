const router = require('express').Router()
const passport = require('passport')
const { issueJWT } = require('../controllers/authController')

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/auth/google/greetings', passport.authenticate('google', { failureRedirect: '/error' }), function (req, res) {
	// Successful authentication, redirect home.
	issueJWT(res, req.user)
	res.redirect('/home')
})

module.exports = router
