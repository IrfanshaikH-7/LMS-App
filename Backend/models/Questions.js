const mongoose = require("mongoose");

const Questions = new mongoose.Schema({
  question: {
    en: { type: String },
    hin: { type: String },
    // required: true,
  },
  options: {
    optionA: {
      en: { type: String },
      hin: { type: String },
    },
    optionB: {
      en: { type: String },
      hin: { type: String },
    },
    optionC: {
      en: { type: String },
      hin: { type: String },
    },
    optionD: {
      en: { type: String },
      hin: { type: String },
    },
  },
  correctAnswer: {
    en: { type: String },
    hin: { type: String },
  },
});

module.exports = mongoose.model("Questions", Questions);