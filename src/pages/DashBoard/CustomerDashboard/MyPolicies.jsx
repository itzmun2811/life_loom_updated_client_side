import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';
import ReviewCard from './ReviewCard';

const MyPolicies = () => {

   const axiosSecure=useAxiosSecure();
   const {user} =use(AuthContext);
   const [isOpen, setIsOpen] = useState(false);


   
    const toggleModal = () => setIsOpen(!isOpen);
   const closeModal = () => setIsOpen(false);
   
     const handleSubmit = async({rating,message})=> {
     
       const newReviews={rating,message};
       console.log(newReviews)
        // const res= await axiosSecure.post('/reviews',newReviews)
        // console.log(res.data)
      
       closeModal();
     };



  console.log(user?.email)

   const {data:myPolicies=[],isLoading} =useQuery({
    queryKey:['myPolicies'],
    enabled: !!user?.email,
    queryFn: async()=>{
        const res =await axiosSecure(`/myPolicies?email=${user?.email}`)
        return(res.data)
    }
   })
  

// console.log(myPolicies)
   

    return (
        <div className='w-11/12 mx-auto my-12 py-8'>
            <h1>My Policy</h1>
       
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Policy-Name
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Coverage(Lakhs)
            </th>
            <th scope="col" className="px-6 py-3">
             Duration(years)
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
               Premium(Annual)
            </th>
            <th scope="col" className="px-6 py-3">
           Status
            </th>
            <th scope="col" className="px-6 py-3">
           Review
            </th>
          </tr>
        </thead>
        <tbody>
        {myPolicies.map(policy=>(
<tr className="border-b border-gray-200 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
            >
             {policy.name}
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
            >
             {policy.coverage}
            </th>
            <td className="px-6 py-4">{policy.duration}</td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
  {policy.annualPremium}
</td>
            <td className="px-6 py-4">{policy.status}</td>
            <td className="px-6 py-4">
              
    <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Review
      </button>
              </td>
          </tr>
        ))}

         {isOpen && (
      <ReviewCard handleSubmit={handleSubmit} closeModal={closeModal}></ReviewCard>
  

      )}

          

         

        

        
        </tbody>
      </table>
    </div>
    
    
    
    
    
   
        </div>
    );
};

export default MyPolicies;