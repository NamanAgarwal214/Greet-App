const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");
const jsonwebtoken = require("jsonwebtoken");
const User = require("./../models/userModel");
const sendEmail = require("./../utils/email");

function issueJWT(res, user) {
  const id = user._id;

  const expiresIn = process.env.JWTEXPIRESIN;

  const signedToken = jsonwebtoken.sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  res.cookie("jwt", signedToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "None",
    domain: ".netlify.app",
  });
  // const newUser = {
  //   username: user.name,
  //   email: user.email,
  //   photo: user.photo,
  // };
  // res.cookie("user", newUser, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  // });
  // console.log(signedToken);
  return signedToken;
}

exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  // console.log(req.body);
  if (!name || !email || !password) {
    throw new Error("Missing Credentials");
  }
  try {
    const user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();
    const token = issueJWT(res, user);

    await sendEmail("welcome", user, { title: "Welcome to the family!" });
    return res.status(200).json({
      status: "success",
      token,
      user: {
        username: user.name,
        photo: user.photo,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Missing Credentials");
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    const token = issueJWT(res, user);
    return res.status(200).json({
      status: "success",
      token,
      user: {
        username: user.name,
        photo: user.photo,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please Log in again!");
    }

    // Verifying the token and decrypting it with the public key
    //will return the payload associated with the JWT
    const decodedUser = await promisify(jsonwebtoken.verify)(
      token,
      process.env.JWT_SECRET
    );
    // console.log(decodedUser);

    // finding user from the database with the decoded id
    const user = await User.findOne({ _id: decodedUser.sub });
    // console.log(user)
    if (!user) {
      throw new Error("The user belonging to this token does no longer exist.");
    }

    //adding the user to the request
    req.user = user;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "logged out", {
      expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
      httpOnly: true,
    });

    req.cookies["google-auth-session"] = null;
    // console.log("req", req, "request");

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("Missing Credentials");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("There is no user with that email. Please signup.");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      await email("resetPassword", user, {
        title: "Reset Password",
        resetToken,
      });

      res.status(200).json({
        status: "success",
        user,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the email. Try again later!");
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      throw new Error("Token is invalid or has expired");
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = issueJWT(res, user);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports.issueJWT = issueJWT;
