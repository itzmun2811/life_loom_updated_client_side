import React, { use } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';



const ApplicationForm = () => {
    const {register,handleSubmit,control} =useForm();
    const {user}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
     const location = useLocation();
    const  { policyDetails = {}, estimatedPremium = null } = location.state ;
    console.log(policyDetails)

const options = [
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'High Blood Pressure', label: 'High Blood Pressure' },
  { value: 'Smoking', label: 'Smoking' },
  { value: 'Heart Disease', label: 'Heart Disease' },
  { value: 'Asthma', label: 'Asthma' },
  { value: 'Cancer', label: 'Cancer' },
  { value: 'None', label: 'None' },
];


const onSubmit=async(data)=>{
  console.log(data)
  const newData={
    ...data,
    applicantName:user?.displayName,
    name:policyDetails.title,
    coverage:estimatedPremium.coverage,
    duration:estimatedPremium.duration,
    status: 'pending',
    mothlyPremium:estimatedPremium.mothly,
    annualPremium:estimatedPremium.annual,
    created_at:new Date().toISOString(),
  }


console.log(newData)

  try{
      const res =await axiosSecure.post('/allApplication',newData);
      console.log(res.data)
    
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Application submitted successfully",
  showConfirmButton: false,
  timer: 1500
});
  }
  catch(error){
    console.log(error)
  }

}



    return (
        <div>
         
        <h1 data-aos='zoom-in' className='text-2xl text-center font-bold text-blue-950 mt-6 pt-6'>Apply for Policy</h1>    
        <h1 data-aos='zoom-out' className='text-xl text-center font-bold text-blue-950 mt-3 pt-3'>Policy Name :{policyDetails.title}</h1>    

<section data-aos='zoom-in-down' className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
       Application Form
    </h2>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* PERSONAL */}
        <div className="sm:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
    Personal Info
    </h2>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
       Name
          </label>
          <input
            type="text"
           {...register('name',{required:true})}
            defaultValue={user?.displayName}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            defaultValue={user?.email}
           {...register('email',{required:true})}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Address
          </label>
          <input
            type="text"
     {...register('address',{required:true})}
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Address"
            required
          />
        </div>
       
        <div>
          <label
            htmlFor="NID"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           NID/SSN
          </label>
          <input
            type="number"
       {...register('nid',{required:true})}
            id="nid"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="NID/SSN"
            required
          />
        </div>
       
      </div>


      {/* NOMINEE */}
      

 <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
  
        <div className="sm:col-span-2">
            <h2 className=" mb-4 text-xl font-bold text-gray-900 dark:text-white">
    Nominee Info
    </h2>
          <label
            htmlFor="name1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
             {...register('name1',{required:true})}
            id="name1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your Name"
            required
          />
  
     
          <label
            htmlFor="relation"
            className="block mt-2 pt-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Relationship
          </label>
          <input
            type="text"
          {...register('relation',{required:true})}
            id="relation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Relationship"
            required
          />
        </div>
     
       
       
       </div>


{/*  */}
<div>
 <h2 className=" mb-4 mt-4 text-xl font-bold text-gray-900 dark:text-white">
    Health Disclousures
    </h2>

<Controller
  name="health"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select
      {...field}
      options={options}
      isMulti
       className="basic-multi-select"
  classNamePrefix="select"
    />
  )}
/>



     
</div>

 <button
        type="submit"
        className="p-3 bg-gray-600 m-3 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 "
      >
     Submit
      </button>

    </form>
  </div>
  
</section>


            
        </div>
    );
};

export default ApplicationForm;