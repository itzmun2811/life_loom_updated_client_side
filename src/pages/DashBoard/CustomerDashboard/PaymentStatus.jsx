import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PaymentStatus = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [selectedPolicy, setSelectedPolicy] = useState(null); // for modal

  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ['myPolicies'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/myPolicies?email=${user?.email}`);
      return res.data.filter((p) => p.status === 'Approved');
    },
  });

  const handlePay = (policy) => {
    setSelectedPolicy(policy);
  };

  const proceedToPayment = (frequency) => {
    navigate(`/dashboard/payment/${selectedPolicy._id}?frequency=${frequency}`);
    setSelectedPolicy(null);
  };

  if (isLoading) return <p className="text-center my-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 my-10">Error loading policies</p>;

  return (
    <div className="w-11/12 mx-auto my-10">
		 <Helmet>
				<title>Payment Status</title>
				<meta name="description" content="This is my page description" />
			  </Helmet>
      <h2 className="text-2xl font-bold mb-6">💳 Payment Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">Policy</th>
              <th className="py-3 px-6 text-left">Premium</th>
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
                  <td className="py-4 px-6">{policy.name}</td>
                  <td className="py-4 px-6">
                    <div>
                      <span>Annual: ৳{policy.annualPremium}</span><br />
                      <span>Monthly: ৳{policy.monthlyPremium}</span>
                    </div>
                  </td>
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
                        onClick={() => handlePay(policy)}
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

      {/* Modal to choose payment frequency */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Choose Payment Frequency</h2>
            <p className="mb-4">
              For <strong>{selectedPolicy.name}</strong>
            </p>
            <div className="flex flex-col gap-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={() => proceedToPayment('annually')}
              >
                Annually - ৳{selectedPolicy.annualPremium}
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => proceedToPayment('monthly')}
              >
                Monthly - ৳{selectedPolicy.monthlyPremium}
              </button>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-sm text-gray-600 underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
