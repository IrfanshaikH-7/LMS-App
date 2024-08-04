const mongoose = require("mongoose");

const Quiz = new mongoose.Schema({
  name: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  timer:{
    type: Number,
  },
  isPaid: {
    type: Boolean,
  },
  price: {
    type:Number,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
  
});

module.exports = mongoose.model("Quiz", Quiz);
