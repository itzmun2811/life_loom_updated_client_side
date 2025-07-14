import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageAgents = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState('pending');


  const { data: agentRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ['agentRequests', role],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/agentRequest?role=admin');
      return res.data;
    }
  });


  const { data: allAgents = [], refetch: refetchAgents } = useQuery({
    queryKey: ['agents'],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/agents');
      return res.data;
    }
  });

  const handleApprove = async (email) => {
    const res=await axiosSecure.patch(`/agentRequest/approve/${email}`);
    console.log(res.data);
    Swal.fire('Approved!', `${email} is now an agent.`, 'success');
    refetchRequests();
    refetchAgents();
  };

  const handleReject = async (email) => {
    const res=await axiosSecure.delete(`/agentRequest/${email}`);
    console.log(res.data);
    Swal.fire('Rejected!', `${email}'s request was removed.`, 'info');
    refetchRequests();
  };

  const handleDemote = async (email) => {
    const res=await axiosSecure.patch(`/agentRequest/demote/${email}`);
    console.log(res.data)
    Swal.fire('Demoted', `${email} is now a customer.`, 'warning');
    refetchAgents();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
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
            <table className="w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Specialties</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agentRequests.map((req) => (
                  <tr key={req._id} className="border-t text-center">
                    <td>{req.name}</td>
                    <td>{req.email}</td>
                    <td>{req.experience}</td>
                    <td>{req.specialties}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleApprove(req.email)}
                        className="bg-green-500 px-3 py-1 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.email)}
                        className="bg-red-500 px-3 py-1 text-white rounded"
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
                  <td>{agent.displayName || 'N/A'}</td>
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
    </div>
  );
};

export default ManageAgents;
