// Import the required modules
const express = require("express")
const { createQuiz, getQuizbyId, getAllQuiz, editQuizbyId } = require("../controllers/Quiz")
const router = express.Router()





router.post("/createQuiz", createQuiz)
router.post("/getQuizById/:id",getQuizbyId )
router.get("/getAllQuiz", getAllQuiz)
router.post("/editQuiz/:id",editQuizbyId )


module.exports = router 