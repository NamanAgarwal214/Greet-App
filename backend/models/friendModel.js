const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  dateOfEvent: {
    type: Date,
    required: [true, "Please provide a date of event"],
  },
  event: {
    type: String,
    required: [true, "Please provide an event name"],
  },
  photo: {
    type: Number,
  },
  phone: {
    type: String,
    // required: [true, "Please provide your phone number"],
  },
  description: {
    type: String,
    maxlength: 100,
  },
});

const Friend =
  mongoose.models.Friend || new mongoose.model("Friend", friendSchema);

module.exports = Friend;
