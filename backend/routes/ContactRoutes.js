// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controller/ContactController");

// small rate limiter to protect the endpoint from abuse
const rateLimit = require("express-rate-limit");
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // limit each IP to 6 requests per windowMs
  message: { message: "Too many contact requests, please try again later." },
});

router.post("/send", contactLimiter, ctrl.sendContact);

module.exports = router;
