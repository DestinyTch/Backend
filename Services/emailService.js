import nodemailer from 'nodemailer';

// Set up Nodemailer transport for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using the 'gmail' service for simplicity
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your app password from Google
  },
});

// Function to send welcome email
const sendWelcomeEmail = (email, name, callback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email
    to: email,                     // Recipient's email
    subject: 'Welcome to Our DestinyTch Ecommerce!', // Subject line
    html: `
      <h1>Welcome, ${name}!</h1>  <!-- Using name here -->
      <p>Thank you for signing up. We are excited to have you on board!</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,</p>
      <p>DestinyTch</p>
    `,
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      if (callback) callback(false, error);
      return;
    }
    console.log('Welcome email sent:', info.response);
    if (callback) callback(true, info.response);
  });
};

export default sendWelcomeEmail;
