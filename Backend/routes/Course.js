// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,

  getAllCoursesData
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

const {
  updateCourseProgress
} = require("../controllers/courseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")



const multer = require('multer');
const AWS = require('aws-sdk');

// Configure AWS S3 with credentials (replace with your actual values)
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION' // Replace with your S3 bucket's region
});

const s3 = new AWS.S3();

// Configure Multer for video uploads
const upload = multer({
  dest: 'uploads/' // Temporary directory for uploads (optional, can be removed)
});


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse",   createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.get("/get-all-courses", getAllCoursesData)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)



const uploadVideo = upload.single('video'); // Name of the video field in the request body

const testVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      // Handle no video uploaded case
      return res.status(400).json({ message: 'No video uploaded' });
    }

    const file = req.file;

    // Get file name and extension
    const fileName = file.originalname;
    const fileExtension = fileName.split('.').pop();

    // Generate a unique filename with timestamp
    const newFileName = `${Date.now()}.${fileExtension}`;

    // Create upload parameters for S3
    const params = {
      Bucket: 'YOUR_BUCKET_NAME', // Replace with your S3 bucket name
      Key: newFileName,
      Body: file.buffer,
      ContentType: `video/${fileExtension}` // Set appropriate content type
    };

    // Upload the video to S3
    await s3.upload(params).promise();

    // Store the uploaded video URL in a property accessible to the next middleware
    req.uploadedVideoUrl = newFileName; // Modify property name as needed
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video' });
  }
};




router.post("/testVideo", testVideo)




module.exports = router