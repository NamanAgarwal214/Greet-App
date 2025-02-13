const multer = require("multer");
const User = require("./../models/userModel");
const Friend = require("../models/friendModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

exports.upload = multer({
  storage: multerStorage,
});

//Update User
exports.updateProfile = async (req, res, next) => {
  try {
    if (req.body && req.body.password) {
      throw new Error("You cannot update password here.");
    }
    const newObj = {};
    Object.keys(req.body).forEach((el) => {
      if (el != "password" && el != "user") {
        newObj[el] = req.body[el];
      }
    });

    if (req.file) {
      const res = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.name}-${Date.now()}`,
        folder: "user",
        filename_override: req.body.name,
      });
      if (res.error) {
        throw new Error(res.error);
      }

      newObj.photo = res.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, newObj, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    res.status(200).json({
      status: "success",
      user: {
        username: updatedUser.name,
        photo: updatedUser.photo,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    // console.log(req.user)
    const user = req.user;
    res.status(200).json({
      status: "success",
      user: {
        username: user.name,
        photo: user.photo,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    // console.log(req.user)
    const user = req.user;
    res.status(200).json({
      status: "success",
      friends: user.friends.length,
      data: user.friends,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const user = req.user;
    user.emailSubscribed = false;
    await user.save();
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

/** Admin Routes */
exports.getAllUsers = async (rea, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friends = user.friends;
    friends.forEach(async (f) => {
      await Friend.findByIdAndDelete(f._id);
    });
    await User.findByIdAndDelete(req.user._id);

    res.status(202).json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
