import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../services/apis";

const Step2 = ({ register, errors, setValue }) => {
    const [courses, setCourses] = useState([]);
    const [studyMaterials, setstudyMaterials] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                toast.loading("fetching data...")
                // const coursesRes = await axios.get(`${BASE_URL}/api/v1/courses`);
                const studyRes = await axios.get(`${BASE_URL}/api/v1/study/getAllStudyMaterials`);
                const quizzesRes = await axios.get(`${BASE_URL}/api/v1/quiz/getAllQuiz`);

                //TODO api to get only sBUndle quiz , study material , sort -1
                // setCourses(coursesRes.data);
                setQuizzes(quizzesRes.data.data);
                setstudyMaterials(studyRes.data.data);


                //TODO only which as isBundle

                toast.dismiss();

                console.log("🚀 ~ fetchData ~ studyRes:", studyRes)
                console.log("🚀 ~ fetchData ~ quizzesRes:", quizzesRes)
                
            } catch (error) {
                toast.dismiss();
                toast.error("Failed to fetch data");
                console.log(error);
            }
               
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        }
        setValue("selectedItems", selectedItems);
    };

    return (
        <div className="flex-1 h-full">
            <h2>Select Courses and Quizzes</h2>
        <div className="flex flex-col gap-20 justify-center items-center">
            <div>
                <h3>Courses</h3>

                {/* {courses.map(course => (
                    <div key={course.id}>
                        <input
                            type="checkbox"
                            id={`course-${course.id}`}
                            onChange={(e) => handleCheckboxChange(e, course)}
                        />
                        <label htmlFor={`course-${course.id}`}>{course.name}</label>
                    </div>
                ))} */}
            </div>

            <div>
                <h3>Courses</h3>

                {/* {courses.map(course => (
                    <div key={course.id}>
                        <input
                            type="checkbox"
                            id={`course-${course.id}`}
                            onChange={(e) => handleCheckboxChange(e, course)}
                        />
                        <label htmlFor={`course-${course.id}`}>{course.name}</label>
                    </div>
                ))} */}
            </div>

            <div>
                <h3>Quizzes</h3>
                {quizzes.length > 0  && quizzes?.map(quiz => (
                    <div key={quiz.id}>
                        <input
                            type="checkbox"
                            id={`quiz-${quiz.id}`}
                            onChange={(e) => handleCheckboxChange(e, quiz)}
                        />
                        <label htmlFor={`quiz-${quiz.id}`}>{quiz.name}</label>
                    </div>
                ))}
            </div>
            {errors.selectedItems && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please select at least one item
                </span>
            )}
        </div>
        </div>
    );
};

export default Step2;