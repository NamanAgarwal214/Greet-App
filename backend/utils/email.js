const nodemailer = require("nodemailer");
const pug = require("pug");

async function SendEmail(template, user, subject) {
  const to = user.email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
    firstName: user.name,
    subject: subject,
  });
  // Step 2
  let mailOptions = {
    from: `Greetings App <${process.env.USER_ADDRESS}>`,
    to: to,
    subject: subject.title,
    html,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent!!!");
  });
}

module.exports = SendEmail;
