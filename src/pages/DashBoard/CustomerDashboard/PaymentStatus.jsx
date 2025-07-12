import React, { use } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router';

const PaymentStatus = () => {
    const {user}=use(AuthContext);
     const axiosSecure =useAxiosSecure();
      const {data:paymentData=[],isloading}=useQuery({
        queryKey:['paymentdata'],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure(`/myPolicies?email=${user?.email}`)
            return res.data;
        }
      })

      {
        isloading && <p>loading.....</p>
      }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="dark:bg-gray-300">
				<tr className="text-left">
					<th className="p-3">Invoice #</th>
					<th className="p-3">Payment Amount</th>
					<th className="p-3">Payment Frequency</th>
					<th className="p-3">Status</th>
					<th className="p-3">Action</th>
				</tr>
			</thead>
			<tbody>
				{paymentData.map(payment=>(
                    <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
					<td className="p-3">
						<p>97412378923</p>
					</td>
					<td className="p-3">
						<p>{payment.annualPremium}</p>
					</td>
					<td className="p-3">
						<p>14 Jan 2022</p>
						<p className="dark:text-gray-600">{payment.frequency}</p>
					</td>
					
					
 <td className="px-6 py-4">
                  {payment.status === 'pending' && (
                
      <NavLink to={`/payment/${payment.id}`}>
        <button className="btn btn-primary">Pay Now</button>
      </NavLink>
    )}
                  
                  {payment.status === 'Paid' && (
                    <span className="text-sm text-gray-400">✔ Already Paid</span>
                  )}
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

export default PaymentStatus;