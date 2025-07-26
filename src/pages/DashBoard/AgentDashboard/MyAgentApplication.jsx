import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

const MyAgentApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: application, isLoading } = useQuery({
    queryKey: ['agentApplication', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentRequestByEmail/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (!application) {
    return <p className="text-center mt-10">You haven’t applied to become an agent yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
         <Helmet>
                <title>My Application</title>
                <meta name="description" content="This is my page description" />
              </Helmet>
      <h2 className="text-2xl font-bold mb-4">Your Agent Application</h2>
      
      <div className="flex gap-4 mb-4 items-center">
        <img
          src={application.photo}
          alt="Agent"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Email:</strong> {application.email}</p>
        </div>
      </div>
      <p><strong>Experience:</strong> {application.experience} years</p>
      <p><strong>Specialties:</strong> {application.specialties}</p>
      <p><strong>Message:</strong> {application.message}</p>
      <p><strong>Status:</strong>
        <span className='ml-2 font-semibold'>
          {application.status ==="Rejected" ? "Rejected" :"Approved "}  
        </span>
      </p>

      {application.status === 'Rejected' && application.rejectionFeedback && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          <strong>Admin Feedback:</strong>
          <p>{application.rejectionFeedback}</p>
        </div>
      )}
    </div>
  );
};

export default MyAgentApplication;
