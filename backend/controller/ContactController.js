// controllers/contactController.js
const nodemailer = require("nodemailer");

exports.sendContact = async (req, res) => {
  try {
    const { nom = "", prenom = "", email = "", message = "" } = req.body || {};

    // Basic validation
    if (!email || !message) {
      return res
        .status(400)
        .json({ message: "Email and message are required." });
    }
    // simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Check SMTP config presence
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.error("SMTP not configured in env");
      return res.status(500).json({
        message:
          "Server email not configured. Please set SMTP_HOST and SMTP_USER in environment variables.",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const receiver = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject = `Nouveau message de contact golden madina— ${nom} ${prenom}`.trim();
    const text = `Message:
${message}

De: ${nom} ${prenom}
Email: ${email}
`;

    const html = `
      <h3>Nouveau message depuis le formulaire de contact</h3>
      <p><strong>De:</strong> ${nom} ${prenom}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    // Send mail. Use replyTo so that owner can reply to user address.
    const info = await transporter.sendMail({
      from: `"Contact Form" <${fromAddress}>`,
      to: receiver,
      replyTo: email,
      subject,
      text,
      html,
    });

    // success
    return res.json({ message: "Message envoyé", messageId: info.messageId });
  } catch (err) {
    console.error("Contact send error:", err);
    return res
      .status(500)
      .json({ message: "Impossible d'envoyer le message." });
  }
};
