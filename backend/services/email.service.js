//https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee

require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("../logger");

const sender = process.env.EMAIL;
const password = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  host: "mail.wecare-insurance.com", // SMTP host
  port: 587, // Port (587 for TLS, 465 for SSL)
  auth: {
    user: sender,
    pass: password,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: sender,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

module.exports = {
  sendEmail,
};
