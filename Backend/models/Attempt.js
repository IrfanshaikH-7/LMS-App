const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    attemptDate: {
        type: Date,
        default: Date.now,
    },
    questions: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
            userAnswer: {
                type: String, // Assuming answers are strings, adjust if necessary
                required: true,
            },
            correctAnswer: {
                type: String, // Assuming correct answers are strings, adjust if necessary
                required: true,
            },
            isCorrect: {
                type: Boolean,
                default: false,
            }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("QuizAttempt", attemptSchema);
