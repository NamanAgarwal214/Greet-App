const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/practicum', {
      useNewUrlParser: true
    });
    console.log('Database connected...');
  } catch (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
