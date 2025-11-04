const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  const superAdmin = "kashish.agrahari@masaischool.com";

  const mailOptions = {
    from: '"AutoCare Service Center" <no-reply@autocare.com>',
    to: [to, superAdmin],
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
