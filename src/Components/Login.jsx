import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Link, replace, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../shared/socialLogin/SocialLogin';
import lifeimg from '../../src/assets/life.jpg'

const Login = () => {
    const {logInUser} =use(AuthContext);
    const location =useLocation();
    const navigate=useNavigate();
    const from =location?.state?.from?.pathname || '/';
 

    const {register,handleSubmit,formState:{errors}} =useForm();

    const onSubmit =data=>{
        console.log(data);
        logInUser(data.email,data.password)
         .then(res=>{
            
            console.log(res.user);
             navigate( from,{ replace: true })
        })
        .catch((error)=>{
            console.log(error)

        })
    }
    return (
<div className='flex w-11/12 mx-auto'>

<div className='bg-gradient-to-tl from-[#29819c] to-[#6e82b9] mb-12 p-12  mt-12 flex-1'>

<form onSubmit={handleSubmit(onSubmit)} className=" mt-12 p-8">
 <h1 className="text-5xl text-white font-bold text-center">Login now!</h1>

  <div className="mb-5">
    <label
      htmlFor="email"
      className="block mb-2 text-sm font-medium text-white dark:text-white"
    >
      Your email
    </label>
    <input
      type="email"
      id="email"
     placeholder="Email"
      {...register('email',{required:true})} 


className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     
  
    />
 {errors?.email?.type === "required" && <p> email is required</p>}
  </div>

  <div className="mb-5">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-white dark:text-white"
    >
      Your password
    </label>
    <input
      type="password"
      id="password"
     placeholder="Password" 
     {...register('password',{required:true,minLength:6},)}

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 
    />
     {errors.password?.type === 'required' && <p className='text-red-500'>
    password is required</p>}
       {errors.password?.type === 'minLength' && <p className='text-red-400'>           password must be 6 characters</p>}
  </div>


  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
    focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
    text-sm w-full sm:w-auto px-5 py-2.5 text-center 
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Login
  </button>
 <div className='flex items-center'>      <p className='text-white'>Don't You Have an account? </p>
    <button type="button" className="text-white ml-2 bg-blue-700
     focus:outline-none focus:ring-4
      focus:ring-blue-300 font-medium rounded-full text-sm 
      px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600
       dark:hover:bg-blue-700 dark:focus:ring-blue-800">

    <Link to='/register'>Register </Link></button> </div>

</form>
  <div className='w-11/12 mx-auto max-w-7xl '>
    <SocialLogin></SocialLogin>
  </div>
</div>

{/*  */}

   <div className='flex-1 transform-3d'>
      <img src={lifeimg} alt="Life" className="w-full h-auto object-contain" />
    </div>

</div>






    );
};

export default Login;