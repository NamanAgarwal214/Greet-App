const Friend = require("./../models/friendModel");
const { checkForEmail } = require("./emailsController");

exports.getAllFriends = async (req, res, next) => {
  try {
    const friends = req.user.friends;

    res.status(200).json({
      status: "success",
      length: friends.length,
      friends,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const { name, dateOfEvent, event } = req.body;
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

    await checkForEmail(user, newFriend._id);

    res.status(200).json({
      status: "success",
      friend: newFriend,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateFriend = async (req, res) => {
  try {
    const friend = await Friend.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    await checkForEmail(req.user, friend._id);

    res.status(200).json({
      status: "success",
      friend,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const user = req.user;
    user.friends = user.friends.filter((el) => el._id != req.params.id);
    await Friend.findByIdAndDelete(req.params.id);
    await user.save();

    res.status(200).json({
      status: "success",
      data: "deleted successfully.",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
