import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';

const ClaimPolicyPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [uploadedDocumentUrl, setUploadedDocumentUrl] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const { data: policies = [], refetch: refetchPolicies } = useQuery({
    enabled: !!user?.email,
    queryKey: ['claimPolicy', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claimPolicy?email=${user.email}`);
      return res.data;
    }
  });

  const { data: claimedPolicies = [], refetch: refetchClaims } = useQuery({
    enabled: !!user?.email,
    queryKey: ['policyClaimsByUser', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policyClaimsByUser?email=${user.email}`);
      return res.data;
    }
  });

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imageUrl, formData);
    setUploadedDocumentUrl(res.data.data.url);
  };

  const onSubmit = (data) => {
    if (!uploadedDocumentUrl) {
      return Swal.fire('Missing', 'Please upload the document first.', 'warning');
    }

    const claimRequest = {
      policyId: selectedPolicy._id,
      policyName: selectedPolicy.name,
      email: user.email,
      claimReason: data.claimReason,
      documentUrl: uploadedDocumentUrl,
      agentEmail: selectedPolicy.agentEmail,
      status: 'pending'
    };

    axiosSecure.post('/allPolicyClaim', claimRequest)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire('Success', 'Claim submitted successfully!', 'success');
          setSelectedPolicy(null);
          setUploadedDocumentUrl('');
          reset();
          refetchPolicies();
          refetchClaims();
        }
      })
      .catch(() => {
        Swal.fire('Error', 'Submission failed.', 'error');
      });
  };

  const handleApprovedAlert = () => {
    Swal.fire('✅ Approved', 'This claim has already been approved.', 'success');
  };

  const getClaimStatus = (policyId) => {
    const found = claimedPolicies.find((cp) => cp.policyId === policyId);
    return found ? found.status : null;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📃 Your Approved Policies</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Policy Name</th>
              <th className="p-2 border">Claim Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No approved policies found.
                </td>
              </tr>
            )}
            {policies.map((policy, idx) => {
              const status = getClaimStatus(policy._id);
              return (
                <tr key={policy._id}>
                  <td className="border p-2">{idx + 1}</td>
                  <td className="border p-2">{policy.name}</td>
                  <td className="border p-2 capitalize">{status || 'Not Claimed'}</td>
                  <td className="border p-2">
                    {status === 'approved' ? (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={handleApprovedAlert}
                      >
                        Approved
                      </button>
                    ) : status === 'pending' ? (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    ) : (
                      <button
                        onClick={() => setSelectedPolicy(policy)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Claim
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setSelectedPolicy(null)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Submit Claim for Policy</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Policy Name</label>
                <input
                  type="text"
                  value={selectedPolicy.name}
                  readOnly
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Reason for Claim</label>
                <textarea
                  {...register('claimReason', { required: true })}
                  rows={3}
                  className="w-full border p-2 rounded"
                  placeholder="Explain your reason for claim"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Upload Document (PDF/Image)</label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleDocumentUpload}
                  required
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Claim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimPolicyPage;
