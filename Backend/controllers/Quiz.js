const Quiz = require("../models/Quiz");
const Questions = require("../models/Questions");
const User = require("../models/User");


exports.createQuiz = async (req, res) => { 

  const image = req.file.path;
  console.log(image)

    const {
        name,
        shortDescription,
        category,
        isPaid,
        price,
        quizData,
     } = req.body;
     console.log('first :', name, category, shortDescription)
     if (!name || !shortDescription || !quizData || !category) {
        return res.status(400).json({
          success: false,
          message: "All fields are required !!",
        });
      }
    

      try {
        const questionData = JSON.parse(quizData).map(question => ({
          question: {
            en: question.question.en,
            hin: question.question.hin,
          },
          options: {
            optionA: {
              en: question.options.optionA.en,
              hin: question.options.optionA.hin,
            },
            optionB: {
              en: question.options.optionB.en,
              hin: question.options.optionB.hin,
            },
            optionC: {
              en: question.options.optionC.en,
              hin: question.options.optionC.hin,
            },
            optionD: {
              en: question.options.optionD.en,
              hin: question.options.optionD.hin,
            },
          },
          correctAnswer: {
            en: question.correctAnswer.en,
            hin: question.correctAnswer.hin,
          },
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
      isPaid,
      price,
      image,
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
        const { id } = req.params;


        const quiz = await Quiz.findById({_id:id}).populate("questions");



            return res.status(201).json({
                success:true,
                data: quiz,
                message:"Quiz is here"
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
        const quiz = await Quiz.find();
            return res.status(201).json({
                success:true,
                message:"All quizz are here!!",
                
                data: quiz,
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
        const { id} = req.params;

        const Quiz = await Quiz.findById({_id:id });

        if(Quiz){
            return res.status(201).json({
                success:true,
                message:"Quiz is here!!",
                data: Quiz,
            });
        }else{

            
            
            return res.status(401).json({
                success:false,
                message:"Not found Quiz !!",
            });
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
} 


//totest
exports.buyQuizbyId = async (req, res) => {
  try{
      const { userId ,quizId} = req.body;
      if(!userId && !id){
        return res.status(403).json({
          success:false,
          message:"all fields are required",
      });
      }
      
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { quizes: quizId } },
        { new: true }
      );

      
      if(user){
          return res.status(201).json({
              success:true,
              message:"Quiz added in user ",
              data: user,
          });
      }else{

          return res.status(401).json({
              success:false,
              message:"Not found Quiz !!",
          });
      }

  } catch(error){
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"user cannot LOGGED in, try again ",
      }) 
  }
} 

//to test
exports.getAllBoughtQuiz = async (req, res) => {

  try{
      const { userId } = req.body;
      if(!userId){
        return res.status(403).json({
          success:false,
          message:"all fields are required",
      });
      }
      
      const user = await User.findById({_id:userId}).populate("quizes");
      if(!user){
        return res.status(403).json({
          success:false,
          message:"user not found",
      });
      }
      return res.status(200).json({
          success:true,
          message:"All quizz are here!!",
          
          data: user.quizes,

      })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
}

exports.ping = async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"Ping is working",
    }) 
}


exports.updateQuestionOptions = async (req, res)=> {
    try {
        // Fetch all quizzes
        const quizzes = await Quiz.find().populate('questions'); // Ensure you have a Questions model referenced in Quiz
    
        for (let quiz of quizzes) {
            for (let question of quiz.questions) {
              // Update the question document directly in the database
              await Questions.findByIdAndUpdate(question._id, {
                $set: {
                  options: {
                    optionA: question.optionA,
                    optionB: question.optionB,
                    optionC: question.optionC,
                    optionD: question.optionD,
                  }
                },
                $unset: {
                  optionA: "",
                  optionB: "",
                  optionC: "",
                  optionD: "",
                }
              });
            }
          }
    
        console.log('All questions within quizzes have been updated.');
      } catch (error) {
        console.error('Failed to update questions:', error);
      }
  }