const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please provide your name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide your email'],
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      minlength: 8
      // select: false
    },
    photo: {
      type: String,
      default: ''
    },
    passwordChangedAt: Date,
    googleId: String
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.passwordChangedAfter = async function (JWTtimeStamp) {
//   if (this.passwordChangedAt) {
//     const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

//     return JWTtimeStamp < changedAt;
//   }

//   return false;
// };


const User = new mongoose.model('User', userSchema);

module.exports = User;
