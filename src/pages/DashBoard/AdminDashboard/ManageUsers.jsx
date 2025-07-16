import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';



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

  const handlePromote = async (id) => {
   const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: "This user will be promoted to Agent.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, promote!',
  });

  if (confirm.isConfirmed) {
    
      const res = await axiosSecure.patch(`/users/promote/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'User has been promoted to Agent.', 'success');
        refetch();
      } else {
        Swal.fire('Oops!', 'Promotion did not complete.', 'info');
      }
    } 
  
  };
  const handleDemote = async (id) => {
   const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: "This user will be promoted to Customer Again.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, demote!',
  });

  if (confirm.isConfirmed) {
    
      const res = await axiosSecure.patch(`/users/demote/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Oops!', 'User has been demoted to Customer');
        refetch();
      } else {
        Swal.fire('Oops!', 'Promotion did not complete.', 'info');
      }
    } 
  
  };

 

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
                  {user.created_at}
                </td>
                <td className="p-2 border space-x-2">
                  {user.role === 'customer' && (
                    <button
                      onClick={() => handlePromote(user._id)}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Promote to Agent
                    </button>
                  )}
                  {user.role === 'agent' && (
                    <button
                      onClick={() => handleDemote(user._id)}
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
