const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create the Nodemailer transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,  // This is your Gmail (configured in .env)
    pass: process.env.EMAIL_PASS,  // App password (configured in .env)
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post('/send-email', async (req, res) => {
  const { email, message } = req.body;  // Get the user's email and message from the frontend
  
  // Define the mail options
  const mailOptions = {
    from: email,  // The email entered by the user in the form
    to: 'mdkaifee8298@gmail.com',  // The fixed email where you want to receive the messages
    subject: 'Contact Form Submission',
    text: `You have received a new message from ${email}:\n\nMessage: ${message}\n\nReply to: ${email}`,  // Body of the email
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({
      isSuccess: true,
      data: info,
      errorMessage: '',
      errorCode: 0,
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({
      isSuccess: false,
      data: {},
      errorMessage: error.message,
      errorCode: 500,
    });
  }
});

module.exports = router;
