const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// ✅ Root route
app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Email App 📧</h2>
    <p>Go to <a href="/sendemail">/sendemail</a> to send a test email.</p>
  `);
});

// ✅ Send email route
app.get("/sendemail", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: ["ranga123@gmail.com", "venugopal.burli@masaischool.com"],
      subject: "Test Email from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    };

    await transporter.sendMail(mailOptions);
    res.send("<h3>✅ Email sent successfully!</h3>");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("<h3>❌ Failed to send email.</h3>");
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
