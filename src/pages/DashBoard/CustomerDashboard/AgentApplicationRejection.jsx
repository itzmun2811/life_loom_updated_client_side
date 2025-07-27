import React, { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AgentApplicationRejection = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: application, isLoading } = useQuery({
    queryKey: ['rejectionFeedback', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rejectionFeedback/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <Helmet>
        <title>Reject Application</title>
        <meta name="description" content="Agent application status and feedback" />
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4">Agent Application Status</h2>

      {isLoading ? (
        <div className="text-gray-600">Loading your application status...</div>
      ) : !application ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p>You have not applied for an agent role yet.</p>
        </div>
      ) : application.status === 'rejected' ? (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          <h3 className="font-bold text-lg mb-2">Your application was rejected</h3>
          <p><strong>Feedback from Admin:</strong></p>
          <p className="italic">{application.rejectionFeedback}</p>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded">
          <p>Your application status is <strong>{application.status}</strong>.</p>
        </div>
      )}
    </div>
  );
};

export default AgentApplicationRejection;
