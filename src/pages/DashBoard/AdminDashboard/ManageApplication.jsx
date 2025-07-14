import React, { use } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../hooks/useRole';

const ManageApplication = () => {
    const {role}=useRole();
    const axiosSecure=useAxiosSecure();
    const {data:allApplications=[],isLoading,refetch}=useQuery({
    queryKey:['allApplications',role],
   enabled:!!role ,
    queryFn:async()=>{
        if (role === 'admin') {
                const res = await axiosSecure(`/allApplication?role=${role}`);
                return res.data;
            }
  
    }
})
console.log(allApplications)

const handleAssignAgent=()=>{

}


    return (
        <div>
            Manage Application
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Contacts</h2>
	<div className="overflow-x-auto">
		<table className="w-full p-6 text-xs text-left whitespace-nowrap">
			
			
				<thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3">Applicant</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Policy</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Agent</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
			
			<tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
				
                {allApplications.map(application=>(

 <tr>
					<td className="px-3 py-2
                    ">{application.applicantName}
                    
                    </td>
					<td className="px-3 py-2">
						<p>{application.email}</p>
					</td>
					<td className="px-3 py-2">
						<p>{application.name}</p>
					</td>
					<td className="px-3 py-2">
						<p>{application.created_at}</p>
					</td>
					<td className="px-3 py-2">
						  <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            application.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : application.status === 'Approved'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {application.status}
        </span>
					</td>
					<td className="px-3 py-2">
						
					</td>
					<td className="px-3 py-2">
                        <div className='flex gap-3 space-x-2 items-center justify-center'>
						 <button
            onClick={handleAssignAgent}
            className="px-2 py-1 text-white bg-green-900"
          >
            ✅ Assign
          </button>
    
        <button
        //   onClick={handleReject}
        className="px-2 py-1 text-white bg-red-700 "
        >
         Reject
        </button>
        <button
        //   onClick={handleView}
          className="px-2 py-1 text-white bg-blue-800"
        >
          🔍 View Details
        </button>
        </div>
					</td>
				</tr>
				
                ))}
                
               
			</tbody>
			
			
		</table>
	</div>
</div>







        </div>
    );
};

export default ManageApplication;