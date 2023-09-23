const Friend = require("../models/friendModel");
const User = require("./../models/userModel");
const SendEmail = require("./../utils/email");

const sendEmails = async () => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      if (user.friends.length > 0) {
        const friends = user.friends;
        friends.map(async (friend) => {
          // console.log(friend);
          const date = new Date(friend.dateOfEvent);
          const curr = new Date();
          const currDate = curr.getDate();
          const currMonth = curr.getMonth();

          if (date.getDate() === currDate && date.getMonth() === currMonth) {
            console.log(
              `Today is the ${friend.event} of the friend ${friend.name}.`
            );
            if (user.emailSubscribed) {
              await SendEmail("Wish", user, {
                title: `Friend's ${friend.event}`,
                friend,
              });
              console.log("email sent");
            }
          } else if (curr > date) {
            date.setFullYear(date.getFullYear() + 1);
            friend.dateOfEvent = date;
            await friend.save();
          }
        });
      } else {
        console.log("No friends");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const checkForEmail = async (user, id) => {
  try {
    const friend = await Friend.findById(id);
    const date = new Date(friend.dateOfEvent);
    const curr = new Date();
    const currDate = curr.getDate();
    const currMonth = curr.getMonth();

    if (date.getDate() === currDate && date.getMonth() === currMonth) {
      console.log(`Today is the ${friend.event} of the friend ${friend.name}.`);
      if (user.emailSubscribed) {
        await SendEmail("Wish", user, {
          title: `Friend's ${friend.event}`,
          friend,
        });
        // sendSMS(friend.phone, user.phone, "Happy birthday");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendEmails, checkForEmail };
