const multer = require('multer')
const User = require('./../models/userModel')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.body.user.id}-${Date.now()}.${ext}`);
  },
});

exports.upload = multer({
  storage: multerStorage
});

//Update User
exports.updateMe = async (req, res, next) => {
	try {
    console.log(req.file);
		if (req.body && req.body.password) {
			throw new Error('You cannot update password here.')
		}
		const newObj = {}
		Object.keys(req.body).forEach(el => {
			if (el != 'password' && el != 'user') {
				newObj[el] = req.body[el]
			}
		})

    if(req.file) newObj.photo = req.file.filename;

		const updatedUser = await User.findByIdAndUpdate(req.user._id, newObj, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			photo: updatedUser.photo
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
