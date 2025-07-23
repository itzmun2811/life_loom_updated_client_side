import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PolicyForm from "./PolicyForm";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePolicies = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);

  const { data: policies = [], refetch } = useQuery({
    queryKey: ['policies', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allPOlicyByAdmin?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user && role === 'admin',
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/policy/${id}`);
        Swal.fire('Deleted!', 'Policy has been deleted.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete policy.', 'error');
      }
    }
  };

  const handleEdit = (policy) => {
    setEditPolicy(policy);
    setShowModal(true);
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Policies</h2>
        <button
          onClick={() => {
            setEditPolicy(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add New Policy
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Min Age</th>
              <th className="px-4 py-2">Max Age</th>
              <th className="px-4 py-2">Coverage</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Premium</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id} className="border-t">
                <td className="px-4 py-2">{policy.title}</td>
                <td className="px-4 py-2">{policy.category}</td>
                <td className="px-4 py-2 line-clamp-2">{policy.description}</td>
                <td className="px-4 py-2">{policy.minAge}</td>
                <td className="px-4 py-2">{policy.maxAge}</td>
                <td className="px-4 py-2">{policy.coverage}</td>
                <td className="px-4 py-2">{policy.duration}</td>
                <td className="px-4 py-2">{policy.basePremium || policy.premiumRate}</td>
                <td className="px-4 py-2">
                  <img src={policy.image} alt="Policy" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(policy._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {policies.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-400">No policies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <PolicyForm
          existingPolicy={editPolicy}
          setShowModal={setShowModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManagePolicies;
