// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { uploadStudyMaterials,getAllStudyMaterials, getStudyMaterialById, buyStudyMaterial, getAllBoughtStudyMaterials } = require("../controllers/CourseMaterials")
const multer = require("multer");



const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/uploadStudyMaterials",upload.single('file'),  uploadStudyMaterials)
router.get("/getAllStudyMaterials",  getAllStudyMaterials)
router.get("/getStudyMaterialbyId/:id",  getStudyMaterialById)
router.post("/buyStudyMaterial", buyStudyMaterial);
router.post("/getAllBoughtStudyMaterials", getAllBoughtStudyMaterials);
// router.post("/verifyPayment", verifyPayment)
// router.post("/sendPaymentSuccessEmail",  sendPaymentSuccessEmail);

module.exports = router