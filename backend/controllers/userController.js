const multer = require("multer");
const User = require("./../models/userModel");

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
exports.updateMe = async (req, res, next) => {
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

    const url = `${req.protocol}://${req.get("host")}/public/img/users/${
      req.file.filename
    }`;
    if (req.file) newObj.photo = url;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, newObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      username: updatedUser.name,
      photo: updatedUser.photo,
      email: updatedUser.email,
    });
  } catch (error) {
    res.json(error.message);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    // console.log(req.user)
    const user = req.user;
    res.status(200).json({
      username: user.name,
      photo: user.photo,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    // console.log(req.user)
    const user = req.user;
    res.status(200).json({
      friends: user.friends.length,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

/** Admin Routes */
exports.getAllUsers = async (rea, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.json(error);
  }
};
