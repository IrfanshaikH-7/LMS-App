// Import the required modules
const express = require("express")
const { createQuiz, getQuizbyId, getAllQuiz, editQuizbyId, ping, updateQuestionOptions } = require("../controllers/Quiz")
const router = express.Router()
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


// Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: '682682682682682',
//   api_secret: Sx6t5hAG6ynwO6mr8GN-L55A7MI,
// });

cloudinary.config({
  cloud_name: 'dgheyg3iv', 
        api_key: '224393467977991',
  api_secret: "Sf7dFDdjNQcO_EnRZ3cvlOK74mM",
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-images",
    resource_type: "auto",
  },
});

// Multer configuration
const upload = multer({
  storage: storage,

});

// Define the routes with the upload middleware and controllers
router.post("/createQuiz",upload.single('image'), createQuiz);
router.get("/getAllQuiz", getAllQuiz)
router.post("/getQuizById/:id",getQuizbyId )
router.post("/editQuiz/:id",editQuizbyId )
router.get("/ping", ping)
router.get("/update", updateQuestionOptions)


module.exports = router 