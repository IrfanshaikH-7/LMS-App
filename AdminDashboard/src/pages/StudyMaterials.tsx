import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/apis';

type Props = {};

const StudyMaterials = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);

  const uploadstudymaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('uploading study material');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('course', course);
      
      if (file) {
        formData.append('file', file);
      }

      // const response = await axios.post(`${BASE_URL}/api/v1/study/uploadStudyMaterials`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      console.log('formData', formData);
      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading study material', error);
    }
  };

  useEffect(() => {
    // Fetch courses if needed
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='flex flex-row justify-center text-richblack-50 text-xl mb-20'>
        Upload your study material and set the price
      </h1>
      <div>
        <form onSubmit={uploadstudymaterial}>
          <div className='flex flex-col space-y-2'>
            <label className='text-richblack-5'>Title</label>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='p-2 border border-yellow-25 rounded-md'
              required
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-richblack-5'>Description</label>
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='p-2 border border-yellow-25 rounded-md'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-richblack-5'>Course ID</label>
            <input
              type='text'
              placeholder='Course ID'
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className='p-2 border border-yellow-25 rounded-md'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-richblack-5'>File</label>
            <input
  title='Upload File'
  type='file'
  onChange={(e) => setFile(e.target.files ? e.target.files[0] : console.log('No file selected'))}
  className='p-2 border border-yellow-25 rounded-md'
  required
/>
          </div>
          <button
            type='submit'
            className='mt-4 p-2 bg-yellow-25 text-pure-greys-700 rounded-md'
          >
            Upload Study Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudyMaterials;