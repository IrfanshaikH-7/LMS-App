const User = require("../models/User");

const StudyMaterial = require("../models/material"); // Import the StudyMaterial model

require("dotenv").config();

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { adminId } = require("../utils/env");


const s3 = new AWS.S3();
const cloudFrontUrl = process.env.CLOUDFRONT_URL;

const uploadFile = async (file) => {



  const fileKey = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer ,
    ContentType: file.mimetype,
  };
  console.log(fileKey);

  await s3.upload(params).promise();
  return `${cloudFrontUrl}/${fileKey}`;
};

exports.uploadStudyMaterials = async (req, res) => {
  const { title, description, course, isPaid, price,isPartOfBundle, isListed  } = req.body;
  const file = req.file; // Assuming you're using multer for file uploads

  try {
 
    const fileUrl = await uploadFile(file);

    // Upload file to S3 and get the CloudFront URL
    const fileType = file.mimetype;

    // Create a new StudyMaterial document
    const newMaterial = new StudyMaterial({
      title,
      description,
      fileType,
      fileUrl,
      course,
      isPaid, price,
      isListed,
      isPartOfBundle

    });

    await newMaterial.save();

    // user.studyMaterials.push(newMaterial._id);
    // await user.save();

    return res.json({
      success: true,
      message: "Study material uploaded successfully",
      data: newMaterial,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllStudyMaterials = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.find({isPartOfBundle: false});
    if (studyMaterials.length === 0) {
      return res.status(200).json({
        success: false,
        data:[],
        message: "No study materials found",
      });
    }
    return res.json({
      success: true,
      data: studyMaterials,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllBundleMaterial= async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.find({isPartOfBundle: true}).sort({createdAt: -1});
    if (studyMaterials.length === 0) {
      return res.json({
        success: false,
        message: 'No study materials found',
        data: []
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getStudyMaterialById = async (req, res) => {
  const { id } = req.params;

  try {
    const studyMaterial = await StudyMaterial.findById(id);

    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }

    return res.json({
      success: true,
      data: studyMaterial,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//to test
exports.buyStudyMaterial = async (req, res) => {
  const { userId, materialId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the course exists
    const course = await StudyMaterial.findById(materialId);

    if (!course) {
      throw new Error("Course not found");
    }

    // Add the course ID to the studyMaterials array
    user.studyMaterials.push(materialId);
    await user.save();

  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//to test
exports.getAllBoughtStudyMaterials = async (req, res) => {


  try {
    const { userId } = req.body;

    const user = await User.findById({ _id: userId }).populate("studyMaterials");
    
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All studyMaterials are here!!",
      data: user.studyMaterials,
    });
    
  } catch (error) {

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot LOGGED in, try again"
    
  })
 


}}

exports.getIsBundledMaterials = async (req, res) => {

  try {
    const studyMaterials = await StudyMaterial.find({isPartOfBundle: true}).sort({createdAt: -1});
    console.log("🚀 ~ exports.getIsBundledMaterials= ~ studyMaterials:", studyMaterials)

     
    if (studyMaterials.length === 0) {
      return res.json({
        success: false,
        message: 'No study materials found',
        data: []
      });
    }
    return res.json({
      success: true,
      data: studyMaterials,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

}