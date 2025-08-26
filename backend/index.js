require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS config
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// serve uploaded files at /uploads/filename
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const ArtifactRoutes = require("./routes/ArtifactRoutes");
const ContactRoutes = require("./routes/ContactRoutes");

// Use routes
app.use("/api/artifacts", ArtifactRoutes);
app.use("/api/contact", ContactRoutes);
// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });
