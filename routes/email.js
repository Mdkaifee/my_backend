// routes/email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending route
router.post('/send-email', async (req, res) => {
  const { email, message } = req.body; // Get the email and message from the request body

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'kaifeeeminence@gmail.com',
    subject: 'Contact Form Submission',
    text: `You have received a new message from ${email}:\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ isSuccess: true, data: info, errorMessage: '', errorCode: 0 });
  } catch (error) {
    res.status(500).json({ isSuccess: false, data: {}, errorMessage: error.message, errorCode: 500 });
  }
});

module.exports = router;
