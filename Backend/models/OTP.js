const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    phoneNumber:{
        type:Number,

    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});


// FUNCTION FOR SENDING... EMAILS
// async function sendVerificationEmail(email, otp) {
//     try{
//         const mailResponse = await mailSender(email,
//              "Verification EMAIL from Kirshna Academy ",
//              emailTemplate(otp));
//         console.log("Email sended Successfully!! => ", mailResponse);
//     } catch(error) {
//         // console.error(error);
//         console.log("error while SENDING.. EMAIL", error);
//         throw error;
//     }
// }

// OTPSchema.pre("save", async function(next) {
//     // Only send an email when a new document is created
// 	if (this.isNew) {
// 		await sendVerificationEmail(this.email, this.otp);
// 	}
// 	next();
// } )

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;