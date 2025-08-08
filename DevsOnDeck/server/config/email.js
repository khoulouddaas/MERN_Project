// emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daaskhouloud1@gmail.com", // your Gmail
    pass: "yfrytijmlrguwhcl" // App Password from Google
  }
});

async function sendJobNotificationEmail(devEmail, positionTitle) {
  try {
    await transporter.sendMail({
      from: '"Job Alert" <yourgmail@gmail.com>',
      to: devEmail,
      subject: "Congrats! A Job Position is Available",
      text: `Hello, 

We found a job position that matches your skills: ${positionTitle}.

Congrats for joining us!`,
      html: `<h3>Congrats for joining us!</h3>
             <p>We found a job position that matches your skills: <b>${positionTitle}</b></p>`
    });

    console.log(`📧 Email sent to ${devEmail}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

module.exports = { sendJobNotificationEmail };
