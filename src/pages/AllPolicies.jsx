import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';

const AllPolicies = () => {
     const axiosInstance =useAxios();

    const {data: allPolicies= []} =useQuery({
        queryKey:['allPolicies'],
        queryFn: async()=>{
            const res = await axiosInstance.get('/allPolicies');
            return res.data;
        }
    })
     
     console.log(allPolicies);         


    return (
        <div>
           <h1>ALL Policy </h1>

 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           {allPolicies.map(policy=>(


 <NavLink to={`/allPolicies/${policy._id}`}>
    <div className=" text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      
        <img className="rounded-t-lg w-46 h-46 object-contain mx-auto" src={policy.image} alt="" />
  
      <div className="p-5">
      
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           {policy.title}
          </h5>
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {policy.shortDetails}
        </p>
        <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
        {policy.category}
        </p>
       
          
      </div>
    </div>
 </NavLink>

 
           ))}
           </div>


        </div>
    );
};

export default AllPolicies;