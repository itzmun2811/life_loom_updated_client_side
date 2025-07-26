import React, { use, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthContext';
import ReviewCard from './ReviewCard';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PolicyPDF from './PolicyPDF';
import { Helmet } from 'react-helmet-async';

const MyPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [viewedPolicy, setViewedPolicy] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async ({ rating, message }) => {
    const newReviews = {
      name: user?.displayName,
      image: user?.photoURL,
      rating,
      message,
    };
    const res = await axiosSecure.post('/reviews', newReviews);
    closeModal();
  };

  const { data: myPolicies = [], isLoading } = useQuery({
    queryKey: ['myPolicies'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/myPolicies?email=${user?.email}`);
      return res.data;
    },
  });
 console.log(myPolicies)
  return (
    <div className="w-11/12 mx-auto my-12 py-8">
       <Helmet>
              <title>My Policy</title>
              <meta name="description" content="This is my page description" />
            </Helmet>
      <h1 className="text-2xl font-bold mb-6">My Policy</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Policy-Name</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Coverage (Lakhs)</th>
              <th className="px-6 py-3">Duration (years)</th>
              <th className="px-6 py-3 bg-gray-50 d-gray-800">
                Premium (Annual)</th>
              <th className="px-6 py-3 bg-gray-50 d-gray-800">
                Premium (Monthly)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
        
           <tbody>
  {myPolicies.map(policy => (
    <tr key={policy._id} className="border-b border-gray-200 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800">{policy.name}</td>
      <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800">{policy.coverage}</td>
      <td className="px-6 py-4">{policy.duration}</td>
      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{policy.annualPremium}</td>
      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
        {policy.monthlyPremium}</td>
      <td className="px-6 py-4">
        {policy.status}

        {/* Show rejection feedback if rejected */}
        {policy.status === 'Rejected' && policy.rejectionFeedback && (
          <p className="mt-2 text-sm text-red-600 italic">
            <strong>Reason:</strong> {policy.rejectionFeedback}
          </p>
        )}
      </td>
      <td className="px-6 py-4 space-x-2 flex">
        <button
          onClick={() => setViewedPolicy(policy)}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
        >
          View Details
        </button>
        <button
          onClick={toggleModal}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Review
        </button>
      </td>
    </tr>
  ))}
</tbody>

        
        </table>
      </div>

      {isOpen && (
        <ReviewCard handleSubmit={handleSubmit} closeModal={closeModal} />
      )}

      {/* Modal to show policy details and download option */}
      {viewedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4">Policy Details</h2>
            <p><strong>Name:</strong> {viewedPolicy.name}</p>
            <p><strong>Coverage:</strong> ৳{viewedPolicy.coverage}</p>
            <p><strong>Duration:</strong> {viewedPolicy.duration} years</p>
            <p><strong>Annual Premium:</strong> ৳{viewedPolicy.annualPremium}</p>
            <p><strong>Status:</strong> {viewedPolicy.status}</p>

            {viewedPolicy.status === 'Approved' && (
              <div className="mt-4">
                <PDFDownloadLink
                  document={<PolicyPDF user={user} policy={viewedPolicy} />}
                  fileName={`Policy_${viewedPolicy._id}.pdf`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {({ loading }) => loading ? 'Preparing PDF...' : 'Download Policy'}
                </PDFDownloadLink>
              </div>
            )}

            <button
              onClick={() => setViewedPolicy(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPolicies;
