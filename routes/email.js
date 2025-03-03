// // const express = require("express");
// // const router = express.Router();
// // const nodemailer = require("nodemailer");

// // // Check if environment variables are set
// // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
// //   console.error(
// //     "ERROR: EMAIL_USER or EMAIL_PASS is not set in the environment variables."
// //   );
// //   process.exit(1); // Stop the server if credentials are missing
// // }

// // // Create a transporter object using the default SMTP transport
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// //   tls: {
// //     rejectUnauthorized: false, // Needed to avoid issues with self-signed certificates
// //   },
// // });

// // // Log the credentials for debugging purposes (make sure to remove this before going live)
// // console.log("EMAIL_USER:", process.env.EMAIL_USER);
// // console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// // router.post("/send-email", async (req, res) => {
// //   const { email, message } = req.body;

// //   // Basic validation for email and message fields
// //   if (!email || !message || !email.includes("@")) {
// //     return res.status(400).json({
// //       isSuccess: false,
// //       errorMessage: "Invalid email or message.",
// //       errorCode: 400,
// //     });
// //   }

// //   // Setup email options
// //   const mailOptions = {
// //     from: process.env.EMAIL_USER, // Sender address
// //     to: "kaifeeeminence@gmail.com", // Replace with the target email
// //     subject: "Contact Form Submission", // Subject of the email
// //     text: `You have received a new message from ${email}:\n\n${message}`, // Body of the email
// //   };

// //   try {
// //     // Send the email
// //     const info = await transporter.sendMail(mailOptions);
// //     res.status(200).json({
// //       isSuccess: true,
// //       data: info,
// //       errorMessage: "",
// //       errorCode: 0,
// //     });
// //   } catch (error) {
// //     console.error("Nodemailer error:", error);
// //     res.status(500).json({
// //       isSuccess: false,
// //       data: {},
// //       errorMessage: error.message,
// //       errorCode: 500,
// //     });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// // Create a transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',  // This automatically uses Gmail's SMTP server
//   auth: {
//     user: process.env.EMAIL_USER,  // Your email from .env file (sender's email)
//     pass: process.env.EMAIL_PASS,  // App password from .env file
//   },
//   tls: {
//     rejectUnauthorized: false,  // Needed to avoid certificate issues
//   },
// });

// router.post('/send-email', async (req, res) => {
//   const { email, message } = req.body;  // Extract user's email and message from the request body

//   // Set the mail options
//   const mailOptions = {
//     from: email,  // Use the user's email address as the sender
//     to: process.env.EMAIL_USER,  // Always send the message to your email address (from .env)
//     subject: 'Contact Form Submission',
//     text: `You have received a new message from ${email}:\n\nMessage: ${message}\n\nReply to: ${email}`,  // Include user's email in the body
//   };

//   try {
//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     res.status(200).json({
//       isSuccess: true,
//       data: info,
//       errorMessage: '',
//       errorCode: 0,
//     });
//   } catch (error) {
//     console.error('Nodemailer error:', error);
//     res.status(500).json({
//       isSuccess: false,
//       data: {},
//       errorMessage: error.message,
//       errorCode: 500,
//     });
//   }
// });

// module.exports = router;
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
