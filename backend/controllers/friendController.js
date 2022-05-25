const Friend = require('./../models/friendModel');
const email = require('../utils/email');

exports.getAllFriends = async (req, res, next) => {
	try {
		const friends = req.user.friends;

		res.status(200).json({
			status: 'success',
			length: friends.length,
			friends,
		});
	} catch (error) {
		res.json(error);
	}
};

exports.addFriend = async (req, res, next) => {
	try {
		const { name, dateOfEvent, event } = req.body;
		// res.send('Add Friend');
		const user = req.user;
		const newFriend = new Friend({
			name,
			dateOfEvent,
			event,
			photo: Math.floor(Math.random() * 5 + 1),
		});
		await newFriend.save();

		await user.friends.push(newFriend);
		await user.save();

    const date = new Date(newFriend.dateOfEvent);
		const curr = new Date();
		const currDate = curr.getDate();
		const currMonth = curr.getMonth();
		if (date.getDate() === currDate && date.getMonth() === currMonth) {
			console.log(`Today is the ${newFriend.event} of the friend ${newFriend.name}.`)
			await email('Wish', user, { title: `Friend's ${newFriend.event}`, friend: newFriend });
			console.log('email sent');
		}

		res.status(200).json({
			status: 'success',
			friend: newFriend,
		});
	} catch (error) {
		res.json(error.message);
	}
};

exports.updateFriend = async (req, res, next) => {
	try {
		const friend = await Friend.findByIdAndUpdate(req.params.id, {
			$set: req.body,
		});
		res.status(200).json({
			status: 'success',
			friend,
		});
	} catch (error) {
		res.json(error.message);
	}
};

exports.deleteFriend = async (req, res, next) => {
	try {
		req.user.friends = req.user.friends.filter(el => el != req.params.id);
		await Friend.findByIdAndDelete(req.params.id);
		res.status(200).json({
			status: 'success',
			data: 'deleted successfully.',
		});
	} catch (error) {
		res.json(false);
	}
};
