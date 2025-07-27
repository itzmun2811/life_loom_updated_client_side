import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageAgents = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState('pending');
  const [rejectEmail, setRejectEmail] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data: agentRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ['agentRequests', role],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure('/agentRequest?role=admin');
      return res.data;
    }
  });
  console.log(agentRequests)

  const { data: allAgents = [], refetch: refetchAgents } = useQuery({
    queryKey: ['agents'],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure('/agents');
      return res.data;
    }
  });

  const handleApprove = async (email) => {
    const res = await axiosSecure.patch(`/agentRequest/approve/${email}`);
    Swal.fire('Approved!', `${email} is now an agent.`, 'success');
    refetchRequests();
    refetchAgents();
  };

  const openRejectModal = (email) => {
    setRejectEmail(email);
    setShowModal(true);
  };

const handleRejectSubmit = async () => {
  if (!feedbackText.trim()) {
    return Swal.fire('Error', 'Feedback is required.', 'warning');
  }

  try {
    await axiosSecure.patch(`/agentRequest/reject/${rejectEmail}`, {
      status: "rejected",
      feedback: feedbackText
    });

    Swal.fire('Rejected!', `${rejectEmail}'s request was rejected.`, 'info');

    setFeedbackText('');
    setRejectEmail(null);
    setShowModal(false);

    // Give DB a moment to finish update before refetching
    await new Promise(resolve => setTimeout(resolve, 300));
    refetchRequests();
    refetchAgents();

  } catch (error) {
    Swal.fire('Error', 'Something went wrong.', 'error');
  }
};


  const handleDemote = async (email) => {
    const res = await axiosSecure.patch(`/agentRequest/demote/${email}`);
    Swal.fire('Demoted', `${email} is now a customer.`, 'warning');
    refetchAgents();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
        <Helmet>
        <title>Manage Agents</title>
        <meta name="description" content="This is my page description" />
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Manage Agents</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pending Applications
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded ${activeTab === 'agents' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All Current Agents
        </button>
      </div>

      {/* PENDING TAB */}
      {activeTab === 'pending' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Pending Agent Requests</h3>
          {agentRequests.length === 0 ? (
            <p>No pending requests found.</p>
          ) : (
            <table className="w-full  table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Experience</th>
                  <th className="px-4 py-2">Specialties</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
      <tbody>
  {agentRequests
    .filter((req) => req.status === 'pending')
    .map((req) => (
      <tr key={req._id} className="border-t text-center">
        <td>{req.name}</td>
        <td>{req.email}</td>
        <td>{req.experience}</td>
        <td className='p-3'>{req.specialties}</td>
     <td className="space-x-3 my-3 mx-3 flex flex-col gap-3 m">
  <button
    onClick={() => handleApprove(req.email)}
    className="bg-sky-800 hover:bg-sky-700 transition-colors duration-300 px-4 py-2 rounded-md text-white font-semibold shadow-sm"
  >
    Approve
  </button>
  <button
    onClick={() => openRejectModal(req.email)}
    className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded-md text-white font-semibold shadow-sm"
  >
    Reject
  </button>
</td>

      </tr>
    ))}
</tbody>

            </table>
          )}
        </div>
      )}

      {/* AGENTS TAB */}
      {activeTab === 'agents' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">All Current Agents</h3>
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th>Email</th>
                <th>Demote</th>
              </tr>
            </thead>
            <tbody>
              {allAgents.map((agent) => (
                <tr key={agent._id} className="border-t text-center">
                  <td>{agent.name || 'N/A'}</td>
                  <td>{agent.email}</td>
                  <td>
                    <button
                      onClick={() => handleDemote(agent.email)}
                      className="bg-yellow-500 px-3 py-1 text-white rounded"
                    >
                      Demote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* REJECTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Provide Rejection Feedback</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Enter feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFeedbackText('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAgents;
