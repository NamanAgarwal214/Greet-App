const crypto = require('crypto') 
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			validate: [validator.isEmail, 'Please provide a valid email']
		},
		password: {
			type: String,
			minlength: 8
		},
		photo: {
			type: String,
			default: ''
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		passwordChangedAt: Date,
		googleId: String,
		friends: [{ type: mongoose.Schema.ObjectId, ref: 'Friend' }],
    passwordResetToken: String,
    passwordResetExpires: Date,
	},
	{
		timestamps: true
	}
)

userSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next()

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12)

	next()
})

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next()

	this.passwordChangedAt = Date.now() - 1000
	next()
})

userSchema.methods.verifyPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

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
	this.populate('friends')

	next()
})

const User = new mongoose.model('User', userSchema)

module.exports = User
