const express = require('express')
const emailsController = require('./../controllers/emailsController')

const router = express.Router()
router.route('/').get(emailsController.sendEmails)

module.exports = router
