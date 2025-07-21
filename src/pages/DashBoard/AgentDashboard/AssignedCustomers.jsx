import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';

const AssignedCustomers = () => {
  const axiosSecure = useAxiosSecure();
 const {user}=useContext(AuthContext)
  const [selectedStatus, setSelectedStatus] = useState({});
  const [viewedApp, setViewedApp] = useState(null);
//   console.log(user?.email)


  const { data: assignedApps = [], refetch } = useQuery({
    queryKey: ['assignedApplications', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/assigned/${user.email}`);
      return res.data;
    },
  });
  console.log(assignedApps)
  const updateStatusMutation = useMutation({
  mutationFn: async ({ appId, status, policyId }) => {
 
    await axiosSecure.patch(`/applications/status/${appId}`, { status });

    if (status === 'Approved') {
       
      await axiosSecure.patch(`/policies/increase/${policyId}`);
    }
  },
  onSuccess: () => {
    refetch(); 
  },
});


const handleStatusChange = (appId, newStatus, policyId) => {
    console.log(policyId)
  setSelectedStatus(prev => ({ ...prev, [appId]: newStatus }));

  updateStatusMutation.mutate({ appId, status: newStatus, policyId });
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Applications Assigned to Me</h2>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2">Customer</th>
            <th className="p-2">Email</th>
            <th className="p-2">Policy</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignedApps.map(app => (
            <tr key={app._id} className="border-b">
              <td className="p-2">{app.applicantName}</td>
              <td className="p-2">{app.email}</td>
              <td className="p-2">{app.name}</td>
              <td className="p-2">
                <select
                  value={selectedStatus[app._id] || app.status}
                  onChange={(e) =>
                    handleStatusChange(app._id, e.target.value, app.policyId)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => setViewedApp(app)}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Viewing Details */}
      {viewedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Applicant Details</h3>
            <p><strong>Name:</strong> {viewedApp.applicantName}</p>
            <p><strong>Email:</strong> {viewedApp.email}</p>
            <p><strong>Policy:</strong> {viewedApp.policyName}</p>
            <p><strong>Message:</strong> {viewedApp.inquiry || 'N/A'}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewedApp(null)}
                className="px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedCustomers;
