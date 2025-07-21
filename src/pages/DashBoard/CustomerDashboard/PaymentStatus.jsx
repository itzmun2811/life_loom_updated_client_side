import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentStatus = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure();

  const { data: policies = [], isLoading ,isError} = useQuery({
	 queryKey: ['myPolicies'],
	 enabled: !!user?.email,
	 queryFn: async () => {
	   const res = await axiosSecure(`/myPolicies?email=${user?.email}`);

      return res.data.filter((policy) => policy.status === 'Approved');
    }
	   
	
   });
   console.log(policies)

  const handlePay = (policyId) => {
navigate(`/dashboard/payment/${policyId}`);
  };

  if (isLoading) return <p className="text-center my-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 my-10">Error fetching policies</p>;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">💳 Payment Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">Premium Amount</th>
              <th className="py-3 px-6 text-left">Frequency</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No approved policies found.
                </td>
              </tr>
            ) : (
              policies.map((policy) => (
                <tr key={policy._id} className="border-b">
                  <td className="py-4 px-6">${policy.annualPremium}</td>
                  <td className="py-4 px-6 capitalize">Yearly</td>
                  <td className="py-4 px-6 capitalize font-medium text-sm">
                    {policy.paymentStatus === 'paid' ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-red-600">Due</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {policy.paymentStatus === 'due' && (
                      <button
                        onClick={() => handlePay(policy._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStatus;
