// models/Artifact.js
const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subDescription: String,
    description: String,
    information: String,
    avis: String,
    design: String,

    // store relative paths like "uploads/1234-file.jpg"
    banner: { type: String, default: "" },
    pictures: { type: [String], default: [] }, // max 4 assumed in UI
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artifact", artifactSchema);
