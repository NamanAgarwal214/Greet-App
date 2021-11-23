const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfEvent: {
    type: Date,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

const friend = new mongoose.model("Friend", friendSchema);
module.exports = friend;
