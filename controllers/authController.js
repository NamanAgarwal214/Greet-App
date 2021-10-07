const User = require('./../models/userModel');
const authUtils = require('./../utils/authentication');

exports.signup = async (req, res, next) => {
  try {
    const salthash = authUtils.genHashSalt(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: salthash.hash,
      salt: salthash.salt
    });
    await user.save();
    console.log(user);
    res.status(200).json({
        status: 'success',
        user
    })
  } catch (err) {
    console.log(err);
  }
};
