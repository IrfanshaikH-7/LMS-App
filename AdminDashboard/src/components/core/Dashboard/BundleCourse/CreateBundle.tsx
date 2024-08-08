import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
// import IconBtn from "../../../../common/IconBtn";
// import Upload from "../Upload";
// import { createCourseBundle } from "../../../../../services/operations/courseBundleAPI";
// import { setCourseBundle } from "../../../../../slices/courseBundleSlice";

const Step1 = ({ register, errors, setValue }) => (
  <div>
    <h2>Step 1: Initial Data Collection</h2>
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="bundleName">
        Bundle Name <sup className="text-pink-200">*</sup>
      </label>
      <input
        id="bundleName"
        placeholder="Enter Bundle Name"
        {...register("bundleName", { required: true })}
        className="form-style w-full"
      />
      {errors.bundleName && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Bundle name is required
        </span>
      )}
    </div>
    {/* <Upload
      name="bundleImage"
      label="Bundle Image"
      register={register}
      setValue={setValue}
      errors={errors}
      video={false}
    /> */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="price">
        Price <sup className="text-pink-200">*</sup>
      </label>
      <input
        id="price"
        placeholder="Enter Price"
        {...register("price", { required: true })}
        className="form-style w-full"
      />
      {errors.price && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Price is required
        </span>
      )}
    </div>
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="aboutDescription">
        Description <sup className="text-pink-200">*</sup>
      </label>
      <textarea
        id="aboutDescription"
        placeholder="Enter Description"
        {...register("aboutDescription", { required: true })}
        className="form-style resize-x-none min-h-[130px] w-full"
      />
      {errors.aboutDescription && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Description is required
        </span>
      )}
    </div>
  </div>
);

const Step2 = ({ register, errors }) => (
  <div>
    <h2>Step 2: Add Quizzes and Study Material</h2>
    {/* Add form fields for quizzes and study materials */}
  </div>
);

const Step3 = ({ register, errors }) => (
  <div>
    <h2>Step 3: Publish and Set Time</h2>
    {/* Add form fields for publishing and setting time */}
  </div>
);

export default function CourseBundleForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Final submission
      const formData = new FormData();
      formData.append("bundleName", data.bundleName);
      formData.append("image", data.bundleImage[0]);
      formData.append("price", data.price);
      formData.append("aboutDescription", data.aboutDescription);
      // Add other fields as needed

    //   const result = await createCourseBundle(formData, token);
    //   if (result) {
    //     // dispatch(setCourseBundle(result));
    //     toast.success("Course bundle created successfully");
    //   } else {
    //     toast.error("Failed to create course bundle");
    //   }
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
          {step === 1 && <Step1 register={register} errors={errors} setValue={setValue} />}
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