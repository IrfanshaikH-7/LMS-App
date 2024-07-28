import axios from "axios";
import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { BASE_URL } from "../services/apis";

type Props = {};

const AddQuiz = (props: Props) => {
  const [loading, setisLoading] = useState(false);

  const [quiz, setQuiz] = useState({
    name: "",
    shortDescription: "",
    category: "",
    image: "",
    isPaid: false,
    price: 0,
    questions: [
      {
        question: { en: "", hin: "" },
        options: {
          optionA: { en: "", hin: "" },
          optionB: { en: "", hin: "" },
          optionC: { en: "", hin: "" },
          optionD: { en: "", hin: "" },
        },
        correctAnswer: { en: "", hin: "" },
      },
    ],
  });
  const handleChangeQues = (e, field, index, lang) => {
    const newQuestions = [...quiz.questions];
    if (field === "question") {
      newQuestions[index].question[lang] = e.target.value;
    } else if (field === "price") {
      setQuiz({ ...quiz, price: e.target.value });
    }
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const addQuestion = () => {
    const newQuestion = {
      question: { en: "", hin: "" },
      options: {
        optionA: { en: "", hin: "" },
        optionB: { en: "", hin: "" },
        optionC: { en: "", hin: "" },
        optionD: { en: "", hin: "" },
      },
      correctAnswer: { en: "", hin: "" },
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const SubmitQuiz = async () => {
    setisLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/quiz/createQuiz`,
        quiz
      );
      console.log(response.data);

      toast.success("Quiz Added ");
    } catch (error) {
      toast.error("Please  resbmit quiz and check the value");
    }
    setisLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index?: number,
    subField?: string,
    lang?: string
  ) => {
    if (index !== undefined && subField && lang) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[index][field][subField][lang] = e.target.value;
      setQuiz({ ...quiz, questions: updatedQuestions });
    } else {
      setQuiz({ ...quiz, [field]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(quiz);
  };

  return (
    <div className="flex flex-col overflow-auto justify-center">
      <div className="flex flex-row space-x-10 justify-center items-center">
        <h1 className="text-richblack-25 p-10">
          Add Quiz in both English and Hindi
        </h1>
      </div>
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 p-6 bg-gray-100 rounded-md shadow-md justify-center items-center  "
        >
          <div className="flex flex-row justify-center items-center bg-pure-greys-800 gap-5 rounded-md ">


          <div className="">
          <div className="flex  flex-row justify-center items-center gap-10 space-y-2">
            <label className="text-richblack-5">Enter the quiz name</label>
            <input
              type="text"
              placeholder="Quiz Name"
              value={quiz.name}
              onChange={(e) => handleChange(e, "name")}
              className="p-2 border border-yellow-25 rounded-md"
            />
          </div>

          <div className="flex  flex-row justify-center items-center gap-10 space-y-2">
            <label className="text-richblack-5">Add short Description</label>
            <textarea
              placeholder="Short Description"
              value={quiz.shortDescription}
              onChange={(e) => handleChange(e, "shortDescription")}
              className="p-2 border border-yellow-25 rounded-md"
            />
          </div>
          </div>
          <div>
          <div className="flex  flex-row justify-center items-center gap-5  space-y-2">
            <label className="text-richblack-5">Select the Category</label>
            <input
              type="text"
              placeholder="Category"
              value={quiz.category}
              onChange={(e) => handleChange(e, "category")}
              className="p-2 border border-yellow-25 rounded-md"
            />
          </div>

          <div className="flex  flex-row justify-center items-center gap-10 space-y-2">
            <label className="text-richblack-5">Image URL</label>
            <input
              type="text"
              placeholder="Image URL"
              value={quiz.image}
              onChange={(e) => handleChange(e, "image")}
              className="p-2 border border-yellow-25 rounded-md"
            />
          </div>

          <div className="flex  flex-row justify-center items-center gap-10 space-x-5 mt-5">
            <label className="text-richblack-5 flex items-center">
              Paid:
              <input
                type="checkbox"
                checked={quiz.isPaid}
                onChange={(e) => setQuiz({ ...quiz, isPaid: e.target.checked })}
                className="ml-2"
              />
            </label>
          </div>
          </div>
          </div>
      

        

          {quiz.isPaid && (
            <div className="flex flex-col space-y-2">
              <label className="text-richblack-5">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={quiz.price}
                onChange={(e) => handleChange(e, "price")}
                className="p-2 border border-yellow-25 rounded-md"
              />
            </div>
          )}

          {quiz.questions.map((question, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 p-4 bg-richblack-400 rounded-md shadow-sm w-[80%]"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-richblack-5">Question (English)</label>
                <input
                  type="text"
                  placeholder="Question (English)"
                  value={question.question.en}
                  onChange={(e) => handleChangeQues(e, "question", index, "en")}
                  className="p-2 border border-yellow-25 rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-richblack-5">Question (Hindi)</label>
                <input
                  type="text"
                  placeholder="Question (Hindi)"
                  value={question.question.hin}
                  onChange={(e) =>
                    handleChangeQues(e, "question", index, "hin")
                  }
                  className="p-2 border border-yellow-25 rounded-md"
                />
              </div>

              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="flex flex-col space-y-2">
                  <label className="text-richblack-5">
                    Option {option} (English)
                  </label>
                  <input
                    type="text"
                    placeholder={`Option ${option} (English)`}
                    value={question.options[`option${option}`].en}
                    onChange={(e) =>
                      handleChange(e, "options", index, `option${option}`, "en")
                    }
                    className="p-2 border border-yellow-25 rounded-md"
                  />
                  <label className="text-richblack-5">
                    Option {option} (Hindi)
                  </label>
                  <input
                    type="text"
                    placeholder={`Option ${option} (Hindi)`}
                    value={question.options[`option${option}`].hin}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "options",
                        index,
                        `option${option}`,
                        "hin"
                      )
                    }
                    className="p-2 border border-yellow-25 rounded-md"
                  />
                </div>
              ))}

              <div className="flex flex-col space-y-2">
                <label className="text-richblack-5">
                  Correct Answer (English)
                </label>
                <input
                  type="text"
                  placeholder="Correct Answer (English)"
                  value={question.correctAnswer.en}
                  onChange={(e) =>
                    handleChangeQues(e, "correctAnswer", index, "en")
                  }
                  className="p-2 border border-yellow-25 rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-richblack-5">
                  Correct Answer (Hindi)
                </label>
                <input
                  type="text"
                  placeholder="Correct Answer (Hindi)"
                  value={question.correctAnswer.hin}
                  onChange={(e) =>
                    handleChangeQues(e, "correctAnswer", index, "hin")
                  }
                  className="p-2 border border-yellow-25 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addQuestion}
            className="mt-4 p-2 bg-caribbeangreen-400 text-richblack-5 rounded-md"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => SubmitQuiz()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
