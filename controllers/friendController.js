const Friend = require('./../models/friendModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllFriends = catchAsync(async (req, res, next) => {
  const friends = req.user.friends;

  res.status(200).json({
    status: 'success',
    length: friends.length, 
    friends
  })
})

exports.addFriend = catchAsync(async (req, res, next) => {
  const {name, dateOfEvent, event} = req.body
  // res.send('Add Friend');
  const user = req.user;
  const newFriend = new Friend({
    name,
    dateOfEvent,
    event 
  });
  await newFriend.save();

  await user.friends.push(newFriend)
  await user.save()
  // console.log(newFriend);
  // console.log(user);
  res.status(200).json({
    status: 'success',
    friend: newFriend
  })
})

exports.updateFriend = catchAsync(async (req, res, next) => {
  const friend = await Friend.findByIdAndUpdate(req.params.id, {
    $set: req.body
  })
  res.status(200).json({
    status: 'success',
    friend
  })
})

exports.deleteFriend = catchAsync(async (req, res, next) => {
  req.user.friends = req.user.friends.filter((el) => el != req.params.id)
  await Friend.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status: 'success',
    data: "deleted successfully."
  })
})