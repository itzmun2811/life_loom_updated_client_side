import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../shared/socialLogin/SocialLogin';
import lifeimg from '../../src/assets/life.jpg';
import useAxios from '../hooks/useAxios';

const Login = () => {
  const { logInUser } = useContext(AuthContext);
  const location = useLocation();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await logInUser(data.email, data.password);
      console.log(res.user);

      const userInfo = { email: data.email };
      const users = await axiosInstance.post('users', userInfo);
      console.log('User login recorded:', users.data);

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-4 py-8">
      
      {/* Left Side - Login Form */}
      <div className="bg-gradient-to-tl from-[#29819c] to-[#6e82b9] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg p-6 sm:p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-3xl sm:text-4xl text-white font-bold text-center">Login Now</h1>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900"
            />
            {errors?.email?.type === "required" && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm text-gray-900"
            />
            {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-400 text-sm mt-1">Password must be at least 6 characters</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium"
          >
            Login
          </button>

          <div className="text-white text-center text-sm">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button
                type="button"
                className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full text-sm"
              >
                Register
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden lg:block lg:ml-10 lg:w-1/2 xl:w-2/5">
        <img src={lifeimg} alt="Life" className="w-full h-auto object-cover rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default Login;
