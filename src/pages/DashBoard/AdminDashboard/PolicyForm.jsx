import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const PolicyForm = ({ setShowModal, refetch }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imageURL, setImageURL] = useState('');
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const policy = { ...data, 
        image: imageURL ,
        purchaseCount:0,
        premiumLogic:"baseRate × ageFactor × smokerFactor × genderFactor × (coverage / 100,000)",

    };
    const res = await axiosInstance.post('/allPolicies', policy);

     if (res.data.insertedId) {
           Swal.fire({
           icon: 'success',
           title: 'Policy Added Successfully!',
           toast: true,
           position: 'top-end',
           showConfirmButton: false,
           timer: 2000,
           timerProgressBar: true,
    })};
    

    console.log(res.data);
    reset();
    setImageURL('');
    setShowModal(false);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(uploadURL, formData);
    setImageURL(res.data.data.url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-opacity-40 overflow-y-auto pt-10">
      <div className="max-w-xl w-full mx-4 p-6 bg-white rounded shadow-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Policy</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-medium block mb-1">Policy Title</label>
            <input {...register('title', { required: true })} placeholder="Policy Title" className="w-full border p-2 rounded" />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Category</label>
            <input {...register('category', { required: true })} placeholder="e.g. Term Life" className="w-full border p-2 rounded" />
            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Description</label>
            <textarea {...register('description', { required: true })} placeholder="Policy Description" rows="4" className="w-full border p-2 rounded" />
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Eligibility Requirements</label>
            <textarea {...register('eligibility', { required: true })} placeholder="Eligibility Requirements" rows="2" className="w-full border p-2 rounded" />
            {errors.eligibility && <p className="text-red-500 text-sm">Eligibility is required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Policy Benefits</label>
            <textarea {...register('benefits', { required: true })} placeholder="Benefits" rows="2" className="w-full border p-2 rounded" />
            {errors.benefits && <p className="text-red-500 text-sm">Benefits are required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Term Length</label>
            <input {...register('termLength', { required: true })} placeholder="e.g. 10, 15, 20 years" className="w-full border p-2 rounded" />
            {errors.termLength && <p className="text-red-500 text-sm">Term length is required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-1">Minimum Age</label>
              <input type="number" {...register('minAge', { required: true, min: 18 })} placeholder="Min Age" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="font-medium block mb-1">Maximum Age</label>
              <input type="number" {...register('maxAge', { required: true, max: 80 })} placeholder="Max Age" className="w-full border p-2 rounded" />
            </div>
          </div>
          {(errors.minAge || errors.maxAge) && (
            <p className="text-red-500 text-sm">Age limits are required</p>
          )}
<div>
  <label className="font-medium block mb-3">Select Coverage Amount</label>
  
  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="font-medium block mb-1">Minimum Coverage</label>
      <input
        type="number"
        {...register('minCoverage', { required: true, min:5000})}
        placeholder="min coverage"
        className="w-full border p-2 rounded"
      />
    </div>
    <div>
      <label className="font-medium block mb-1">Maximum Coverage</label>
      <input
        type="number"
        {...register('maxCoverage', {
          required: true,
        })}
        placeholder="max coverage"
        className="w-full border p-2 rounded"
      />
    </div>
  </div>

  {(errors.minCoverage || errors.maxCoverage) && (
    <p className="text-red-500 text-sm mt-1">
      {errors.maxCoverage?.message || "Coverage limits are required"}
    </p>
  )}
</div>

  {errors.coverage && (
    <p className="text-red-500 text-sm">Coverage is required</p>
  )}

          

          <div>
            <label className="font-medium block mb-1">Duration</label>
            <input {...register('duration', { required: true })} placeholder="e.g. 10, 20, 30 years or Lifetime" className="w-full border p-2 rounded" />
            {errors.duration && <p className="text-red-500 text-sm">Duration is required</p>}
          </div>

          <div>
            <label className="font-medium block mb-1">Base Premium Rate (BDT)</label>
            <input type="number" {...register('premiumRate', { required: true })} placeholder="৳ per 1 Lakh coverage" className="w-full border p-2 rounded" />
            {errors.premiumRate && <p className="text-red-500 text-sm">Premium rate is required</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Policy Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" required />
            {imageURL && (
              <img src={imageURL} alt="Uploaded Policy" className="mt-4 w-full h-64 object-cover rounded" />
            )}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setShowModal(false)} className="w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyForm;
