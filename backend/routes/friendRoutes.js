const express = require('express')
const friendController = require('./../controllers/friendController')
const { protect } = require('./../controllers/authController')

const router = express.Router()

router.use(protect)
router.route('/').get(friendController.getAllFriends).post(friendController.addFriend)

router.route('/:id').put(friendController.updateFriend).delete(friendController.deleteFriend)

module.exports = router
