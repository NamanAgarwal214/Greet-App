const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Please provide an email address"],
    },
    password: {
      type: String,
      minlength: 8,
      select: "false",
      required: [true, "Please provide a Password"],
    },
    photo: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      // required: [true, "Please provide your phone number"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    emailSubscribed: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    googleId: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }],
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// userSchema.methods.passwordChangedAfter = async function (JWTtimeStamp) {
//   if (this.passwordChangedAt) {
//     const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

//     return JWTtimeStamp < changedAt;
//   }

//   return false;
// };

userSchema.pre(/^find/, function (next) {
  this.populate("friends");

  next();
});

const User = mongoose.models.User || new mongoose.model("User", userSchema);

module.exports = User;
