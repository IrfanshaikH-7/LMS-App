// Import the required modules
const express = require("express");
const router = express.Router();
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

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,

  getAllCoursesData,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/courseProgress");

// Importing Middlewares
const {

  isStudent,
  isAdmin,
} = require("../middlewares/auth");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");


// Configure Multer for video uploads
// const upload = multer({ storage: storage }); //images

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }})






const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }, // for example, 10 MB limit
	dest: 'uploads/'
})

router.post("/createCourse", upload.single("file"), createCourse);
//Add a Section to a Course 2
router.post("/addSection",  createSection);
// Update a Section 3 
router.post("/updateSection", updateSection);
// Delete a Section
router.post("/deleteSection", deleteSection);
// Edit Sub Section
router.post("/updateSubSection", updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", deleteSubSection);
// Add a Sub Section to a Section  4
router.post("/addSubSection", upload.single('video') , createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", getFullCourseDetails);
// Edit Course routes
router.post("/editCourse", editCourse);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", isStudent, updateCourseProgress);

router.get("/get-all-courses", getAllCoursesData);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

router.post( "/testupload",

 )
async function putObject(filename, contentType) {
	const command = new PutObjectCommand({
			Bucket: "harshexpolms",
			Key: `/uploads/user-uploads/${filename}`,
    ContentType:contentType,
		})

    const url = await getSignedUrl(s3Client, command  );
    return url;
	

}
router.post("/testupload", async (req, res) => {
  const { filename, contentType } = req.body;
  const url = await putObject(`fuke-${Date.now()}`, "video/*");
  res.send(url);
});
// IIFE function
(function() {
  // Your code here
})();


module.exports = router;
