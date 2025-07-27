import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxios from '../hooks/useAxios';

const BlogModal = ({blog,closeModal}) => {
     const navigate=useNavigate();
     const axiosInstance =useAxios();

    const handleDetails=async(id)=>{
    try {
    const visitedCount = await axiosInstance.patch(`/blogs/${id}`);
    console.log(visitedCount.data);
    navigate(`/blogs/${id}`);
  } catch (error) {
    console.error('Error updating visit count:', error);
  }
    
    }
    return (
           <div className="fixed inset-0 z-50  bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        <img src={blog.image} alt={blog.title} className="w-2/5 md:w-3/4 lg:w-full mb-4" />
        <p className="text-gray-700">{blog.content}</p>

        <div className="text-right mt-4 flex gap-7">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={()=>handleDetails(blog._id)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Go to details
          </button>
        </div>
      </div>
    </div>

    );
};

export default BlogModal;