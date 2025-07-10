import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Profile = () => {
    const {user} =use(AuthContext);
    const {updateUserProfile }=use(AuthContext);
    const [profilePicture,setProfilePicture]=useState('');
    const {register,handleSubmit} =useForm();
   
   const onSubmit =data=>{
           const profileInfo={
                displayName:data.name,
                photoURL:profilePicture
            }
       updateUserProfile(profileInfo)
       .then(()=>{
        console.log('profile updated')
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
        <div className='text-gray-600 w-11/12 mx-auto my-12 p-12'>
            profile
{
    user && <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div className="flex justify-end px-4 pt-4">
    
      
    <form onSubmit={handleSubmit(onSubmit)}>

    {/* Dropdown menu */}
   

  <div className="flex flex-col items-center pb-10">
    <img
      className="w-42 h-42 mb-3 rounded-full shadow-lg"
        src={ profilePicture || user?.photoURL}
      alt="Bonnie image"
    />

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
      defaultValue={user?.email}
     placeholder="Email"
readOnly


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
      type="text"
      id="name"
      defaultValue={user?.displayName}
     placeholder="Name"


className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     
  
    />
</div>
  </form>
     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
  {user?.displayName}
    </h5>
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
  {user?.role}
    </h5>
   
    <div className="flex mt-4 md:mt-6">
    <button type='submit'>Update</button>
    </div>
  </div>
 
</div>
}






        </div>
    );
};

export default Profile;