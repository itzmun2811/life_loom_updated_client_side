import React, { use } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';

const PolicyDetails = () => {
    const {id} =useParams();
    const{user}=use(AuthContext);
     console.log(user?.role)
 const axiosInstance =useAxios();
 

    const {data: policyDetails={}} =useQuery({
        queryKey:['policyDetails',id],
        queryFn: async()=>{
            const res = await axiosInstance.get(`/allPolicies/${id}`);
            return res.data;
        }
    })
 console.log(policyDetails)

    return (
        <div>
          <h1 className='font-bold text-center shadow rounded-2xl p-4 text-4xl text-blue-900'>Policy Details Page</h1>

<div className="my-12 max-w-7xl mx-auto p-4 shadow-md dark:bg-gray-50 dark:text-gray-800" data-aos="fade-down-right">
	
	<div className="space-y-4">
		<div className="space-y-2">
			<img src={policyDetails.image} alt="" className="mx-auto rounded-md h-72 dark:bg-gray-500" />
			
		</div>
		{/* <div className="space-y-2">
			
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Title: {policyDetails.title}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Category: {policyDetails.category}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Short Details: {policyDetails.description}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Eligibility: {policyDetails.eligibility}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Benefits: {policyDetails.benefits}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Premium Calculation: {policyDetails.premiumLogic}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Term Length: {policyDetails.termLength}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Coverage Amount: {policyDetails.coverage}
    </h3>
			<div className='flex'>
 <button type="button" class="text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                
                <NavLink to={'/quote'} state={policyDetails} >Get Quote</NavLink>
                </button>
 <button type="button" class="text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                
                <NavLink>Book Agent Consultation</NavLink>
                </button>
	
            </div>
           
       
		</div> */}
        <div className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-violet-400">
        {policyDetails.title}
      </h2>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold">Category:</span> {policyDetails.category}
        </p>
        <p>
          <span className="font-semibold">Short Details:</span> {policyDetails.description}
        </p>
        <p>
          <span className="font-semibold">Eligibility:</span> {policyDetails.eligibility}
        </p>
        <p>
          <span className="font-semibold">Benefits:</span> {policyDetails.benefits}
        </p>
        <p>
          <span className="font-semibold">Premium Calculation:</span> {policyDetails.premiumLogic}
        </p>
        <p>
          <span className="font-semibold">Term Length:</span> {policyDetails.termLength}
        </p>
        <p className="text-sm">
  <span className="font-semibold">Coverage Amount:</span>{' '}
  <span className="ml-3">
    <span className="text-green-700 font-medium ">Min:</span> 
    ৳{policyDetails.minCoverage} &nbsp;|&nbsp;
    <span className="text-red-700 font-medium">Max:</span>
     ৳{policyDetails.maxCoverage}
  </span>
</p>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <NavLink
          to="/quote"
          state={policyDetails}
          className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-medium rounded-lg text-center hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          Get Quote
        </NavLink>

        <NavLink
          to="/consultation"
          className="inline-block px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg text-center hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
        >
          Book Agent Consultation
        </NavLink>
      </div>
    </div>
	</div>
</div>







        </div>
    );
};

export default PolicyDetails;