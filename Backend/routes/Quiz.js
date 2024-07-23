// Import the required modules
const express = require("express")
const { createQuiz, getQuizbyId, getAllQuiz, editQuizbyId, ping } = require("../controllers/Quiz")
const router = express.Router()





router.post("/createQuiz", createQuiz)
router.get("/getAllQuiz", getAllQuiz)
router.post("/getQuizById/:id",getQuizbyId )
router.post("/editQuiz/:id",editQuizbyId )
router.get("/ping", ping)


module.exports = router 