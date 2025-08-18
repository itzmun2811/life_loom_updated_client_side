import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useRole from '../hooks/useRole';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext'; 
import { Helmet } from 'react-helmet-async';

const BeAgentForm = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); 
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const agentRequests = {
        ...data,
        email: user?.email,
         status: 'pending',
        submitted_At: new Date(),
       };

      const result = await axiosSecure.post('/agentRequest', agentRequests);
      console.log(result.data);

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted!',
        text: 'Your agent request has been submitted for admin review.',
        confirmButtonColor: '#3085d6',
      });

      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to submit request. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  if (role !== 'customer') return null;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-sm mt-8 mb-12">
       <Helmet>
              <title>Be Agent</title>
              <meta name="description" content="This is my page description" />
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">Apply to Become an Agent</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            {...register('name', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            type="text"
            defaultValue={user?.photoURL}
            {...register('photo', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Profile photo URL"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Years of Experience</label>
          <input
            type="text"
            {...register('experience', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 5 years"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Specialties</label>
          <input
            type="text"
            {...register('specialties', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Term Life, Senior Plan"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Why do you want to become an agent?</label>
          <textarea
            {...register('message', { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your motivation"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BeAgentForm;
