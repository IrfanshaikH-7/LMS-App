// Import the required modules
const express = require("express")
const { createQuiz, getQuizbyId, getAllQuiz, editQuizbyId, ping, updateQuestionOptions } = require("../controllers/Quiz")
const router = express.Router()
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dzwvmqbv0",
    api_key: 572782272174972,
    api_secret: "Sx6t5hAG6ynwO6mr8GN-L55A7MI",
  });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "profile-images",
      resource_type: "auto",
    },
  });

  const upload = multer({
    storage: multer.memoryStorage(),
  });



router.post("/createQuiz",upload.single('image'),   createQuiz)
router.get("/getAllQuiz", getAllQuiz)
router.post("/getQuizById/:id",getQuizbyId )
router.post("/editQuiz/:id",editQuizbyId )
router.get("/ping", ping)
router.get("/update", updateQuestionOptions)


module.exports = router 