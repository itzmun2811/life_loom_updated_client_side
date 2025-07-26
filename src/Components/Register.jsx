import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../shared/socialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const { createNewUser, updateUserProfile } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState('');
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    createNewUser(data.email, data.password)
      .then(async (res) => {
        const userInfo = {
          email: data.email,
          role: 'customer',
          name: data.name,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };
        await axiosInstance.post('users', userInfo);

        const profileInfo = {
          displayName: data.name,
          photoURL: profilePicture
        };

        updateUserProfile(profileInfo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully registered!!",
              showConfirmButton: false,
              timer: 1500
            });
            navigate(from, { replace: true });
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imageUrl, formData);
    setProfilePicture(res.data.data.url);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-tl from-[#29819c] to-[#6e82b9] rounded-xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl text-white font-bold text-center mb-6">Let's Create an Account!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-white">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Full name"
              {...register('name', { required: true })}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="photo" className="block mb-1 text-sm font-medium text-white">Your Photo</label>
            <input
              type="file"
              id="photo"
              onChange={handleImageUpload}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: 'Must include uppercase and lowercase letters',
                },
              })}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center text-white text-sm">
          <p>Already have an account?</p>
          <Link to="/login">
            <button className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full text-sm">
              Login
            </button>
          </Link>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
