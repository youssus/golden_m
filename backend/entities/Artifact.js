const mongoose = require("mongoose");

const artifact = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  avis: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },

  // Up to 4 main pictures
  pictures: {
    type: [String], // Array of URLs or file paths
    validate: {
      validator: function (arr) {
        return arr.length <= 4; // Max 4
      },
      message: "You can upload a maximum of 4 pictures.",
    },
    default: [],
  },

  // Separate banner image
  banner: {
    type: String, // Single image URL or file path
    required: true, // Optional, but you can set to true if you want to make it mandatory
  },
});

module.exports = mongoose.model("artifact", artifact);
