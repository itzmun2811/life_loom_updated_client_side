import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthContext';

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)
  const [selectedClaim, setSelectedClaim] = useState(null);

 const { data: claims = [], refetch } = useQuery({
  enabled: !!user?.email,
  queryKey: ['policyClaims', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/policyClaims?agentEmail=${user.email}`);
    return res.data;
  }
});

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/policyClaims/${id}`);
      Swal.fire('Approved!', 'This claim has been approved.', 'success');
      setSelectedClaim(null);
      refetch();
    } catch (err) {
      Swal.fire('Error', 'Something went wrong.', 'error',err);
    }
  };

  return (
    <div className="p-6">
       <Helmet>
              <title>Policy Clearance</title>
              <meta name="description" content="This is my page description" />
            </Helmet>
      <h2 className="text-2xl font-bold mb-6">Customer Claim Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Policy Name</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Claim Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={claim._id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{claim.policyName}</td>
                <td className="p-3">{claim.customerName}</td>
                <td className="p-3">{claim.claimAmount} BDT</td>
                <td className="p-3 capitalize">{claim.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedClaim(claim)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setSelectedClaim(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Policy Claim Details</h3>
            <p><strong>Policy Name:</strong> {selectedClaim.policyName}</p>
            <p><strong>Customer:</strong> {selectedClaim.customerName}</p>
            <p><strong>Claim Amount:</strong> {selectedClaim.claimAmount} BDT</p>
            <p><strong>Reason:</strong> {selectedClaim.claimReason || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedClaim.status}</p>

            <div className="mt-6 text-right">
              <button
                onClick={() => handleApprove(selectedClaim._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyClearance;
