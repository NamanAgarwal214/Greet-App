const mongoose = require('mongoose');
const validator = require('validator');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    minlength: 8
    // select: false
  },
  salt: String,
  hash: String,
  photo: {
    type: String,
    default: ''
  },
  passwordChangedAt: Date,
  googleId: String
},
{
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.passwordChangedAfter = async function (JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTtimeStamp < changedAt;
  }

  return false;
};

userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

module.exports = User;
