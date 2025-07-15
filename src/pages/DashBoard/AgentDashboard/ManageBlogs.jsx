import React, { useContext, useState } from 'react';
import BlogPost from "../AgentDashboard/BlogPost"
import moment from 'moment';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';

  const ManageBlogs = () => {
         const { user } = useContext(AuthContext);
          const {role}= useRole();
         const axiosSecure = useAxiosSecure();
         const [showModal, setShowModal] = useState(false);

    const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blogs', user?.email, role],
    enabled: !!user?.email && !!role,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?email=${user.email}&role=${role}`);
      return res.data;
    },

  });

//   const handleDelete = async (id) => {

//   };

  return (
    <div>
      <div className='flex justify-between'>
<h2 className="text-2xl font-bold mb-4 text-center">Manage Blogs</h2>
      <button onClick={() => setShowModal(true)} 
      className="btn btn-primary mb-4 text-center">
        ➕ Add New Blog
      </button>
      </div>

      {/* Table */}
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Content</th>
            <th scope="col" className="px-6 py-3">Author</th>
            <th scope="col" className="px-6 py-3">Publish Date</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
         
            <tr
              
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
            
              
              
            </tr>
        
        </tbody>
      </table>
    </div>

      {/* Modal */}
      {showModal && <BlogPost setShowModal={setShowModal} refetch={refetch} />}
    </div>
  );
};

export default ManageBlogs;
