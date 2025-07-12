import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const PolicyDetails = () => {
    const {id} =useParams();
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
		<div className="space-y-2">
			
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Title: {policyDetails.title}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Category: {policyDetails.category}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Short Details: {policyDetails.shortDetails}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Eligibility: {policyDetails.eligibility}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Benefits: {policyDetails.benefits}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Premium Calculation: {policyDetails.premiumCalculation}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Term Length: {policyDetails.termLength}
    </h3>
	<h3 className="text-xl font-semibold dark:text-violet-600">
       Coverage Amount: {policyDetails.coverageAmount}
    </h3>
			<div className='flex'>
 <button type="button" class="text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                
                <NavLink to={'/quote'} state={policyDetails} >Get Quote</NavLink>
                </button>
 <button type="button" class="text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                
                <NavLink>Book Agent Consultation</NavLink>
                </button>
	
            </div>
           
       
		</div>
	</div>
</div>







        </div>
    );
};

export default PolicyDetails;