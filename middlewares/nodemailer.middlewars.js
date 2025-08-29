const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: '${process.env.GMAIL_APP_USER}',
    pass: '${process.env.GMAIL_APP_USER}',
  },
});

module.exports = transporter;