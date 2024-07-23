const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum : ["Admin", "Student"],
        required:true,
    },
    phoneNumber: {
        type: Number,
        required:true,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    image:{
        type:String,
    },
    otp: {
        type:String,
    },
    token: {
        type: String
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ]
},
// Add timestamps for when the document is created and last modified
{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"

module.exports = mongoose.model("User", userSchema);