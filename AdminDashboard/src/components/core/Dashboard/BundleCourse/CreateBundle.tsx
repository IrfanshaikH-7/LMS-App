import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import axios from "axios";
import { BASE_URL } from "../../../../services/apis";
import Step1 from "./Stepone";
import Step2 from "./Steptwo";




const Step3 = ({ register, errors }) => (
    <div>
        <h2>Step 3: Publish and Set Time</h2>
        {/* Add form fields for publishing and setting time */}
    </div>
);

export default function CourseBundleForm() {


    const [step, setStep] = useState(2);
    const [bundleImage, setBundleImage] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    //   const { token } = useSelector((state) => state.auth);


    const handleImageChange = (e) => {
        setBundleImage(e.target.files[0]);
    };

    const handleStep1Submit = async (data) => {
        const formData = new FormData();
        formData.append("bundleName", data.bundleName);
        formData.append("image", bundleImage);
        formData.append("price", data.price);
        formData.append("aboutDescription", data.aboutDescription);

        try {


            toast.loading("Please wait...")
            const res = await axios.post(`${BASE_URL}/api/v1/bundle/course-bundle`, formData)
            console.log(res);


            toast.dismiss();
            toast.success("Step 1 completed successfully")

            setStep(2);

        } catch (error) {
            toast.error("Failed to complete Step 1", {
                duration: 2000,
            });
            console.log(error);

        }
    };

    const handleStep2Submit = async (data) => {
        const formData = new FormData();
        // Add quizzes and study materials to formData
        // const result = await addQuizzesAndMaterials(formData, token);
        // if (result) {
        //   dispatch(setCourseBundle(result));
        //   toast.success("Step 2 completed successfully");
        //   setStep(3);
        // } else {
        //   toast.error("Failed to complete Step 2");
    }


    const handleStep3Submit = async (data) => {
        const formData = new FormData();
        // Add publish and set time data to formData
        // const result = await publishCourseBundle(formData, token);
        // if (result) {
        // //   dispatch(setCourseBundle(result));
        //   toast.success("Course bundle published successfully");
        // } else {
        //   toast.error("Failed to publish course bundle");
        // }
    };

    const onSubmit = (data) => {
        if (step === 1) {
            handleStep1Submit(data);
        } else if (step === 2) {
            handleStep2Submit(data);
        } else if (step === 3) {
            handleStep3Submit(data);
        }
    };

    return (
        // <div className=" inset-0  !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 ">
        <div className="flex w-full gap-x-6 justify-center items-center h-full">


            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {step === 1 && "Step 1: Initial Data Collection"}
                        {step === 2 && "Step 2: Add Quizzes and Study Material"}
                        {step === 3 && "Step 3: Publish and Set Time"}
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                    {step === 1 && <Step1 register={register} errors={errors} setValue={setValue} handleImageChange={handleImageChange} />}
                    {step === 2 && <Step2 register={register} errors={errors} />}
                    {step === 3 && <Step3 register={register} errors={errors} />}
                    <div className="flex justify-end">
                        <IconBtn text={step === 3 ? "Submit" : "Next"} />
                    </div>
                </form>
            </div>
        </div>
    );
}