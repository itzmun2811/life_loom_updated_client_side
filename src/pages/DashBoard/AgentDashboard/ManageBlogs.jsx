import React, { useContext, useState } from 'react';
import BlogPost from "../AgentDashboard/BlogPost"
import moment from 'moment';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import EditBlogModal from './EditBlogModal';
import { Helmet } from 'react-helmet-async';

  const ManageBlogs = () => {
         const { user } = useContext(AuthContext);
          const {role}= useRole();
         const axiosSecure = useAxiosSecure();
         const [showModal, setShowModal] = useState(false);
         const [editBlog, setEditBlog] = useState(null);

    const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blogs', user?.email, role],
    enabled: !!user?.email && !!role,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogsByEmail?email=${user.email}&role=${role}`);
      return res.data;
    },

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
      await axiosSecure.delete(`/blogs/${id}`);
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  refetch()
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete blog.', 'error',error.message);
    }
  }
  }


  const handleEdit = (blog) => {
  setEditBlog(blog); // this opens the modal with that blog
};

  return (
    <div>
         <Helmet>
                <title>Manage Blogs</title>
                <meta name="description" content="This is my page description" />
              </Helmet>
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
    {blogs.map((singleBlog) => (
      <tr
        key={singleBlog._id}
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
      >
        {/* Title */}
        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
          {singleBlog.title}
        </td>

        {/* Content preview (first 20-30 words) */}
        <td className="px-6 py-4">
          {singleBlog.content.split(' ').slice(0, 25).join(' ')}...
        </td>

        {/* Author */}
        <td className="px-6 py-4">{singleBlog.author}</td>

        {/* Publish Date */}
        <td className="px-6 py-4">
          {new Date(singleBlog.publishDate).toLocaleDateString()}
        </td>

        {/* Action */}
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <button
               onClick={() => handleEdit(singleBlog)}
              
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
            onClick={() => handleDelete(singleBlog._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
           
          </div>
        </td>
      </tr>
    ))}
  </tbody>
      </table>
    </div>

      {/* Modal */}
      {showModal && <BlogPost setShowModal={setShowModal} refetch={refetch} />}
      {editBlog && (
        <EditBlogModal
        blog={editBlog}
        closeModal={() => setEditBlog(null)}
        refetch={refetch}
  />
)}
    </div>
  );
};

export default ManageBlogs;
