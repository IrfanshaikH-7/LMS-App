// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { uploadStudyMaterials,getAllStudyMaterials, getStudyMaterialById, buyStudyMaterial, getAllBoughtStudyMaterials, getIsBundledMaterials } = require("../controllers/CourseMaterials")
const multer = require("multer");



// Configure Multer storage

  const upload = multer({ storage: multer.memoryStorage() });


router.post("/uploadStudyMaterials",upload.single('file'),  uploadStudyMaterials)
router.get("/getAllStudyMaterials",  getAllStudyMaterials)
router.get("/getStudyMaterialbyId/:id",  getStudyMaterialById)
router.get("/getIsBundledMaterials",  getIsBundledMaterials)
router.post("/buyStudyMaterial", buyStudyMaterial);

router.post("/getAllBoughtStudyMaterials", getAllBoughtStudyMaterials);
router.get("/getIsBundledMaterials", getAllBundleMaterial)
// router.get("/getIsBundledMaterials", )
// router.post("/verifyPayment", verifyPayment)
// router.post("/sendPaymentSuccessEmail",  sendPaymentSuccessEmail);

module.exports = router