import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';



const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: allUsers = [], isLoading, refetch } = useQuery({
    queryKey: ['users', role],
    enabled: !!role,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=${role}`);
      return res.data;
    },
  });
  console.log(allUsers)

//   const handlePromote = async (id) => {
//     await axiosSecure.patch(`/users/promote/${id}`);
//     refetch();
//   };

//   const handleDemote = async (id) => {
//     await axiosSecure.patch(`/users/demote/${id}`);
//     refetch();
//   };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Registered</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
                <td className="p-2 border">
                  {user.created_At}
                </td>
                <td className="p-2 border space-x-2">
                  {user.role === 'customer' && (
                    <button
                    //   onClick={() => handlePromote(user._id)}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Promote to Agent
                    </button>
                  )}
                  {user.role === 'agent' && (
                    <button
                    //   onClick={() => handleDemote(user._id)}
                      className="px-2 py-1 bg-yellow-600 text-white rounded"
                    >
                      Demote to Customer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default ManageUsers;
