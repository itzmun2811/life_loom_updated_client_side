import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../shared/socialLogin/SocialLogin';
import axios from 'axios';
import { useState } from 'react';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
    const {createNewUser,updateUserProfile }=useContext(AuthContext);
    const [profilePicture,setProfilePicture]=useState('');
    const axiosInstance= useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';



    const {register,handleSubmit,formState:{errors}} =useForm();
   
   const onSubmit =data=>{
        console.log(data);
        createNewUser(data.email,data.password)
        .then(async(res)=>{
            console.log(res.user);

            const userInfo ={
                email:data.email,
                role:'customer',
                name:data.name,
                created_at:new Date().toISOString(),
                last_log_in:new Date().toISOString()
            }
           
         const users = await axiosInstance.post('users',userInfo)
        console.log('user created', users.data)
         

            
            const profileInfo={
                displayName:data.name,
                photoURL:profilePicture
            }

       // update profile
       updateUserProfile(profileInfo)
       .then(()=>{
        console.log('profile updated')
    
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Successfully registered!!",
  showConfirmButton: false,
  timer: 1500
    });

      navigate(from, { replace: true });
      
       })
       .catch((error)=>{
        console.log(error)
       })
  
     
      })
        .catch((error)=>{
            console.log(error)

        })
    }
   const handleImageUpload=async(e)=>{
    const image =e.target.files[0];
     const formData =new FormData();
     formData.append('image',image)
     const imageUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
     const res=await axios.post(imageUrl,formData);
     setProfilePicture(res.data.data.url)


   }
    return (
        <div className=' bg-base-100 mx-auto max-w-7xl shadow-2xl'>

<div className='bg-gradient-to-tl from-[#29819c] to-[#6e82b9] mb-12 p-12  mt-12 flex-1'>

<form onSubmit={handleSubmit(onSubmit)} className=" mt-12 p-8">
 <h1 className="text-5xl text-white font-bold text-center">Let's Create An Account!</h1>

  <div className="mb-5">

<label
      htmlFor="name"
      className="block mb-2 text-sm font-medium text-white dark:text-white"
    >
      Your Name
    </label>
    <input
      type="text"
      id="name"
     placeholder="name"
      {...register('name',{required:true})} 


className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     
  
    />




         {/* photo */}
          {/* <label className="label">Photo</label>
          <input type="file" className="input" onChange={handleImageUpload}
          placeholder="Photo URL"/>
          <span><img src={profilePicture} alt="" /></span> */}


    <label
      htmlFor="photo"
      className="block mb-2 text-sm font-medium text-white dark:text-white"
    >
      Your Photo
    </label>
    <input
      type="file"
      id="email"
    onChange={handleImageUpload}
     placeholder="Photo URL"
    


className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     
  
    />




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
     {...register('password', {required: 'Password is required',
  minLength: {value: 6,message: 'Password must be at least 6 characters',},
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    message: 'Must include uppercase and lowercase letters',
  },
})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 
    />
    {errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password.message}
  </p>
)}

  </div>


  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
    focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
    text-sm w-full sm:w-auto px-5 py-2.5 text-center 
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Register
  </button>
 <div className='flex items-center'>      <p className='text-white'>Already Have an account? </p>
    <button type="button" className="text-white ml-2 bg-blue-700
     focus:outline-none focus:ring-4
      focus:ring-blue-300 font-medium rounded-full text-sm 
      px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600
       dark:hover:bg-blue-700 dark:focus:ring-blue-800">

    <Link to='/login'>Login</Link></button> </div>

</form>
  <div className='w-11/12 mx-auto max-w-7xl '>
    <SocialLogin></SocialLogin>
  </div>
</div>





  </div>

    );
};

export default Register;