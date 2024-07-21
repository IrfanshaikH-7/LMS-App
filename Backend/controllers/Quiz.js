const Quiz = require("../models/Quiz");
const Questions = require("../models/Questions");


exports.createQuiz = async (req, res) => { 

    const {
        name,
        shortDescription,
        category,
        quizData,
     } = req.body;
     console.log('first :', name, category, quizData, shortDescription)
     if (!name || !shortDescription || !quizData || !category) {
        return res.status(400).json({
          success: false,
          message: "All fields are required !!",
        });
      }
    

      try {
        const questionData = quizData.map(question => ({
          question: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correctAnswer,
        }));
        console.log('second :', questionData);
    
       var createdQuestions = await Questions.insertMany(questionData);
        console.log('third :', createdQuestions);
    
        // Extract question IDs for efficient quiz creation
        var questionIds = createdQuestions.map(question => question._id);
    
        // Return or process createdQuestions or questionIds as needed
      } catch (error) {
        console.error("Error creating questions:", error);
        return res.status(500).json({
          success: false,
          message: "Cannot create questions, try again!",
        });
      }
      console.log('Forth :', questionIds);
    // Create the quiz with references to created questions
    const newQuiz = new Quiz({
      name: name,
      shortDescription: shortDescription,
      category,
      questions: questionIds,
    });
  
    try {
      const savedQuiz = (await newQuiz.save());
    //   return savedQuiz;
    return res.status(200).json({
        success:true,
        message:"worked",
        data: savedQuiz
    }) 
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Canno create Quiz in, try again ",
        }) 
    }
  }
  











  

exports.getQuizbyId = async (req, res) => {
    try{
        const { } = req.body;
            return res.status(401).json({
                success:false,
                message:"password doesnt matched !!",
            });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
} 
exports.getAllQuiz = async (req, res) => {
    try{
        const { } = req.body;
            return res.status(401).json({
                success:false,
                message:"password doesnt matched !!",
            });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
} 
exports.editQuizbyId = async (req, res) => {
    try{
        const { } = req.body;
            return res.status(401).json({
                success:false,
                message:"password doesnt matched !!",
            });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
} 


