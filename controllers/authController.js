const mongoose = require('mongoose');
const path = require('path');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const authUtils = require('./../utils/authentication');
const AppError = require('./../utils/appError');

exports.signup = async (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    // console.log(user);
    authUtils.issueJWT(req, res, user);
    res.status(200).json({
      status: 'success',
      user
    });
    // console.log(req.cookies);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email });

    if (!user || !await user.verifyPassword(password, user.password)) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    user.password = undefined;

    const token = authUtils.issueJWT(req, res, user);
    res.status(200).json({
      status: 'success',
      user,
      token
    });
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // Extract token from the headers
    if (
      req.cookies && req.cookies.jwt
    ) {
      token = req.cookies.jwt;
    }

    if(!token){
      return next(new AppError('You are not logged in! Please Log in again!', 401));
    }

    // Verifying the token and decrypting it with the public key
    //will return the payload associated with the JWT
    const decodedUser = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // finding user from the database with the decoded id
    const user = await User.findOne({_id: decodedUser.sub});
    if(!user){
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    
    // Checking if the user changed password after jwt was issued
    // if(user.passwordChangedAfter(decodedUser.iat)){
    //   return next(new AppError('The user recently changed their password! Please login again.', 401));
    // }

    //adding the user to the request
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.protected_route = async(req, res, next) => {
  try {
    res.send(`<h1>Hello ${req.user.name}</h1>`)
  } catch (err) {
    console.log(err);
  }
}

// exports.logout = (req, res) => {
//   res.cookie('jwt', 'logged out', {
//     expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
//     httpOnly: true
//   });

//   res.status(200).json({
//     status: 'success',
//   });
// }
