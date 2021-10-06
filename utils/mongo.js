const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/userDB', {
            useNewUrlParser: true
          });
    } catch (err){
        if(err){
            console.log(err);
            process.exit(1);
        }
    }
}

module.exports = connectDB;