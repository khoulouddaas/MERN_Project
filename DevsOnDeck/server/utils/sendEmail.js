const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daaskhouloud1@gmail.com", // Your Gmail
    pass: "yfrytijmlrguwhcl" // Google App Password
  }
});

module.exports = async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: 'daaskhouloud1@gmail.com',
      to,
      subject,
      text
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};
