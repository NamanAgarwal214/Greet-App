// const cron = require('node-cron');
const User = require('./../models/userModel')
const email = require('./../utils/email')

exports.sendEmails = async (req, res, next) => {
	try {
		const users = await User.find()
		users.forEach(user => {
			if (user.friends) {
				const friends = user.friends
				friends.map(async friend => {
					// console.log(friend);
					const date = new Date(friend.dateOfEvent)
					const currDate = new Date().getDate()
					// console.log(date.getDate())
					// console.log(currDate)
					if (date.getDate() === currDate) {
						console.log(`Today is the ${friend.event} of the friend ${friend.name}.`)
						// await email(`${friend.event}`, friend, 'abcdefgh');
					}
				})
				// return res.json(friends);
			}
		})
	} catch (error) {
		console.log(error)
	}
}