
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact")
const quizRoutes = require("./routes/Quiz")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const {
	S3Client,
	PutObjectCommand,
	CreateBucketCommand,
	DeleteObjectCommand,
	DeleteBucketCommand,
	paginateListObjectsV2,
	GetObjectCommand,
  } = require("@aws-sdk/client-s3");

  
const s3Client = new S3Client({ region: 'ap-south-1' });
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
// 	cors({
// 		origin:"http://localhost:3000",
// 		credentials:true,
// 	})
// )
app.use(
	cors({
	
	})
);



cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);

app.use("/api/v1/quiz", quizRoutes);
// app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// const upload = multer({ 
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 100 * 1024 * 1024 }, // for example, 10 MB limit
// 	dest: 'uploads/'
// })

// app.post('/upload',upload.single('file'), async (req, res) => {
//   try {
// 	const s3Client = new S3Client({
// 		region: 'ap-south-1',
// 		credentials: {
// 			accessKeyId: process.env.AWS_KEY,
// 			secretAccessKey: process.env.AWS_SECRET_KEY,
// 		}
// 	});
// 	const bucketName = `test-bucket-${Date.now()}`;
//     const file = req.file; // Get the uploaded file object
// 	console.log(file)
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: bucketName,
//       Body: file.buffer, // Assuming the file is in memory
// 	  ContentType: file.mimetype,
//     };

//     const command = new PutObjectCommand(uploadParams);

//     const resvideo = await s3Client.send(command);


// //@Harshksaw -  Generate a presigned URL for the uploaded file 
// 	   // Generate a presigned URL for the uploaded file
// 	const getUrlCommand = new GetObjectCommand({
// 		Bucket: bucketName,
// 		Key: fileKey,
// 	  });
// 	  const presignedUrl = await getSignedUrl(s3Client, getUrlCommand, { expiresIn: 3600 }); // URL expires in 1 hour
  

// 	res.json({ message: 'File uploaded successfully', data: resvideo });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Error uploading file');
//   }
// });

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

// D:\CODES-wev-Devolopment\mp-7\server\index.js