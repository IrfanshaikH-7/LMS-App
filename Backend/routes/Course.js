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
const { isStudent, isAdmin } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/createCourse", upload.single("file"), createCourse);
//Add a Section to a Course 2
router.post("/addSection", createSection);
// Update a Section 3
router.post("/updateSection", updateSection);
// Delete a Section
router.post("/deleteSection", deleteSection);
// Edit Sub Section
router.post("/updateSubSection", updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", deleteSubSection);
// Add a Sub Section to a Section  4
// router.post("/addSubSection", upload.single("video"), createSubSection);
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

//
// async function putObject(filename, contentType) {
// 	const command = new PutObjectCommand({
// 			Bucket: "harshexpolms",
// 			Key: `/uploads/user-uploads/${filename}`,
//     ContentType:contentType,
// 		})

//     const url = await getSignedUrl(s3Client, command  );
//     return url;

// }
// router.post("/testupload", async (req, res) => {
//   const { filename, contentType } = req.body;
//   const url = await putObject(`fuke-${Date.now()}`, "video/*");
//   res.send(url);
// });

// IIFE function

const {
  S3Client,
  PutObjectCommand,

} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
async function uploadVideo(filename, contentType, file) {
  const s3Client = new S3Client({
    // Replace with your AWS credentials
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  // Generate a unique filename with timestamp to avoid conflicts
  const uniqueFilename = `user-uploads/${Date.now()}-${filename}`;

  const params = {
    Bucket: "harshexpolms",
    Key: uniqueFilename,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  const presignedUrl = await getSignedUrl(s3Client, command);

  // Upload the file using the presigned URL
  // You can use fetch, axios, or other libraries to make the PUT request
  // Example using fetch:
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
  });

  if (!response.ok) {
    throw new Error("Error uploading file");
  }

  // Construct public URL
  const publicUrl = `https://harshexpolms.s3.amazonaws.com/${uniqueFilename}`;
  console.log(publicUrl);
  return publicUrl;
}

async function generatePresignedUrlForStreaming(filename) {
  const params = {
    Bucket: "harshexpolms",
    Key: filename, // The key of the video file you want to stream
  };

  const command = new GetObjectCommand(params);

  // Generate the presigned URL for streaming the video
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour

  return presignedUrl;
}

router.post("/testupload", upload.single("video"), async (req, res) => {
  if (req.file) {
    const { originalname, mimetype, buffer } = req.file;
    console.log(originalname); // Log the original file name

    const resp = await uploadVideo(originalname, mimetype, req.file.video);
    res.send(resp);
  } else {
    res.send("No file uploaded");
  }
  // res.send("done")
});

router.get('/stream', async (req, res) => {
  const { filename } = req.query;
  const url = await generatePresignedUrlForStreaming('SampleVideo_1280x720_20mb.mp4');
  res.send(url);
})

module.exports = router;
