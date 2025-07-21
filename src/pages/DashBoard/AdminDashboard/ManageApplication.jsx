import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import Swal from 'sweetalert2';
import RejectionModal from './RejectionModal';

const ManageApplication = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [agentSelections, setAgentSelections] = useState({});
  const [showRejectModal, setShowRejectModal] = useState(false);
   const [selectedAppId, setSelectedAppId] = useState(null);

const openRejectModal = (id) => {
  setSelectedAppId(id);
  setShowRejectModal(true);
};

const closeRejectModal = () => {
  setSelectedAppId(null);
  setShowRejectModal(false);
};

const submitRejection = (feedback) => {
  handleReject(selectedAppId, feedback);
};





  const { data: allApplications = [], refetch } = useQuery({
    queryKey: ['allApplications', role],
    enabled: !!role,
    queryFn: async () => {
      if (role === 'admin') {
        const res = await axiosSecure(`/allApplication?role=${role}`);
        return res.data;
      }
    },
  });

  const { data: allAgents = [] } = useQuery({
    queryKey: ['agents', role],
    enabled: !!role,
    queryFn: async () => {
      if (role === 'admin') {
        const res = await axiosSecure(`/agents?role=${role}`);
        return res.data;
      }
    },
  });


  const assignedAgentEmails = allApplications
    .map(app => app.agentEmail)
    .filter(Boolean);

  // Filter available agents excluding assigned ones
  const availableAgents = allAgents.filter(
    agent => !assignedAgentEmails.includes(agent.email)
  );

  const handleAssign = async (applicationId) => {
    const selectedAgent = agentSelections[applicationId];
    if (!selectedAgent) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select an agent.',
      });
      return;
    }

    try {
      const res = await axiosSecure.patch(`/assign-agent/${applicationId}`, {
        agentEmail: selectedAgent,
      });

      Swal.fire({
        icon: 'success',
        title: 'Agent Assigned',
        text: 'The agent has been successfully assigned.',
        timer: 2000,
        showConfirmButton: false,
      });

      console.log(res.data);
      setAgentSelections(prev => ({
        ...prev,
        [applicationId]: '', // Clear selection after assign
      }));

      refetch();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to assign',
        text: 'Something went wrong.',
      });
    }
  };

  const handleReject = async (applicationId, feedback) =>{
  const res = await axiosSecure.patch(`/reject-application/${applicationId}`
      ,{feedback});
    console.log(res.data);
    refetch();
    Swal.fire('Rejected!', 'Application has been rejected with feedback.', 
      'success'); 
};


  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Manage Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border p-6 text-xs text-left whitespace-nowrap">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Applicant</th>
                <th className="p-3">Email</th>
                <th className="p-3">Policy</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
           <tbody className="border-b">
  {allApplications
    .filter(application => application.status !== 'Rejected')  // <-- filter out rejected here
    .map((application) => (
      <tr key={application._id}>
        <td className="px-3 py-2">{application.applicantName}</td>
        <td className="px-3 py-2">{application.email}</td>
        <td className="px-3 py-2">{application.name}</td>
        <td className="px-3 py-2">{application.created_at}</td>
        <td className="px-3 py-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              application.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : application.status === 'Approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {application.status}
          </span>
        </td>
        <td className="px-3 py-2">
          {application.agentEmail ? (
            <span>{application.agentEmail}</span>
          ) : (
            <select
              value={agentSelections[application._id] || ''}
              onChange={(e) =>
                setAgentSelections({
                  ...agentSelections,
                  [application._id]: e.target.value,
                })
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Select Agent</option>
              {availableAgents.map((agent) => (
                <option key={agent._id} value={agent.email}>
                  {agent.email}
                </option>
              ))}
            </select>
          )}
        </td>
        <td className="px-3 py-2">
          <div className="flex gap-2">
            {!application.agentEmail && (
              <button
                onClick={() => handleAssign(application._id)}
                className="px-3 py-1 bg-green-700 text-white rounded text-sm hover:bg-green-800"
              >
                ✅ Assign
              </button>
            )}
            <button
              onClick={() => openRejectModal(application._id)}
              className="px-3 py-1 bg-red-700 text-white rounded text-sm hover:bg-red-800"
            >
              ❌ Reject
            </button>
          </div>
        </td>
      </tr>
    ))}
</tbody>

          </table>
        </div>
      </div>
      {showRejectModal && (
  <RejectionModal
    onClose={closeRejectModal}
    onSubmit={submitRejection}
  />
)}

    </div>
    
  );
};

export default ManageApplication;
