import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";



const AssignedCustomers = () => {
  const axiosSecure = useAxiosSecure();
  const {user} =useContext(AuthContext)
  const {role}=useRole()
  const [selectedApp, setSelectedApp] = useState(null);
  const  agentId =user?.uid


  
console.log(agentId)
  const { data: applications = [], refetch } = useQuery({
    enabled: !!agentId, 
    queryKey: ['agentCustomers', agentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent-customers/${agentId}`);
      return res.data;
    },
  });
  console.log(applications)



//   const handleStatusChange = async (id, newStatus, policyId) => {
//     await axiosSecure.patch(`/update-status/${id}`, {
//       status: newStatus,
//       policyId,
//     });
//     refetch();
//   };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Policy</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.applicantName}</td>
              <td>{app.email}</td>
              <td>{app.name}</td>
              <td>
                <select
                  className="select select-bordered"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, 
                    e.target.value, app.policyId)}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => setSelectedApp(app)}
                  className="btn btn-sm btn-info"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Customer Info</h3>
            <p><strong>Name:</strong> {selectedApp.applicantName}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Address:</strong> {selectedApp.address}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Relation:</strong> {selectedApp.relation}</p>
            <p><strong>Coverage:</strong> {selectedApp.coverage} years</p>
            <p><strong>Duration:</strong> {selectedApp.duration}</p>
            <p><strong>Premium:</strong> {selectedApp.annualPremium}</p>
            <div className="modal-action">
              <button onClick={() => setSelectedApp(null)} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedCustomers;
