const User = require('./../models/userModel')

//Update User
exports.updateMe = async (req, res, next) => {
	try {
    const user = req.body.user
		if (req.body && req.body.password) {
			throw new Error('You cannot update password here.')
		}
		const newObj = {}
		Object.keys(req.body).forEach(el => {
			if (el != 'password' && el != 'user') {
				newObj[el] = req.body[el]
			}
		})

		const updatedUser = await User.findByIdAndUpdate(user._id, newObj, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: 'success',
			data: {
				user: updatedUser
			}
		})
	} catch (error) {
		res.json(error.message)
	}
}

/** Admin Routes */
exports.getAllUsers = async (rea, res, next) => {
	try {
		const users = await User.find()

		res.status(200).json({
			status: 'success',
			results: users.length,
			data: users
		})
	} catch (error) {
		res.json(error)
	}
}

exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)

		if (!user) {
			throw new Error('There is no user with that id!')
		}

		res.status(200).json({
			status: 'success',
			user
		})
	} catch (error) {
		res.json(error.message)
	}
}

exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		res.status(204).json({
			status: 'success'
		})
	} catch (error) {
		res.json(error)
	}
}
