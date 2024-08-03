
const Order = require("../models/order");
const User = require("../models/User");
const StudyMaterial = require("../models/material");
const Quiz = require("../models/Quiz");

exports.buyMaterials = async (req, res) => {
    try {
      const {userId, materialId} = req.body
  
  
      
 const studyMaterial = await StudyMaterial.findById(materialId);
    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found',
      });
    }




    // Check if the user has already bought the study material
    const userI = await User.findById(userId);
    if (userI.studyMaterials.includes(materialId)) {
      return res.status(401).json({
        success: false,
        message: 'You have already bought this study material',
      });
    }


    
    // logic for payment


    const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { studyMaterials: materialId } },
        { new: true }
      ).exec()

    //   user.studyMaterials.push(materialId);
      await user.save();

      if(!user){
        return res.status(401).json({
            success: false,
            message: 'failed to bought this study material',
          });
      }
    // Create an order
    const order = new Order({
      user: userId,
      items: [{
        itemType: 'StudyMaterial',
        item: materialId,
        price: studyMaterial.price
      }],
      totalAmount: studyMaterial.price
    });

      await order.save();   
      
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }


  exports.buyQuiz = async (req, res) => {
    try {
      const { userId, quizId } = req.body;
  
      // Fetch the quiz to get its price
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({
          success: false,
          message: 'Quiz not found',
        });
      }
  
      // Check if the user has already bought the quiz
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      if (user.quizzes.includes(quizId)) {
        return res.status(401).json({
          success: false,
          message: 'You have already bought this quiz',
        });
      }
  
      // logic for payment
  
      // Update user's bought quizzes
      user.quizzes.push(quizId);
      await user.save();
  
      // Create an order
      const order = new Order({
        user: userId,
        items: [{
          itemType: 'Quiz',
          item: quizId,
          price: quiz.price
        }],
        totalAmount: quiz.price
      });
  
      await order.save();
  
      return res.status(200).json({
        success: true,
        data: user.quizzes,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };