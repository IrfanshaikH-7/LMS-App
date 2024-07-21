const mongoose = require("mongoose");

const Questions = new mongoose.Schema({
  question: {
    type: String,
    // required: true,
  },
  optionA: {
    type: String,
  },
  optionB: {
    type: String,
  },
  optionC: {
    type: String,
  },
  optionD: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
});

module.exports = mongoose.model("Questions", Questions);