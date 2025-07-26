import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import BlogDetails from './BlogModal';
import BlogModal from './BlogModal';
import { Helmet } from 'react-helmet-async';
import useAxios from '../hooks/useAxios';

const Blogs = () => {
  const axiosInstance = useAxios();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [],refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosInstance('/blogs');
      return res.data;
    },
  });

 

  return (
    
    <div className="w-11/12 mx-auto my-12">
        <Helmet>
               <title>Blogs</title>
               <meta name="description" content="This is my page description" />
             </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">All Blogs</h2>
       
          

<div className="grid grid-cols-1 gap-8 justify-items-center">

  {blogs.map(blog=>(

    <div data-aos='fade-right' className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden"
>

  <div className="w-full">
    <img
      className="w-full p-10 h-80 object-cover object-center"
      src={blog.image}
      alt=""
    />
  </div>

  
  <div className="p-6 bg-gray-50 flex flex-col space-y-4">
   
    <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
    <p className="text-gray-600 text-sm">
      {blog.content.split(' ').slice(0, 30).join(' ')}...
    </p>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src={blog.authorImage}
          alt=""
          className="w-10 h-10 rounded-full border-2"
        />
        <div>
          <p className="text-sm font-medium text-gray-800 flex gap-1 items-center">
            {blog.author}
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
              Author
            </span>
          </p>
          <p className="text-xs text-gray-500">
            {new Date(blog.publishDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">Total Visit-👁️ {blog.totalVisitCount}</p>
    </div>

    {/* Read More Button */}
    <div className="text-right">
      <button
        onClick={() => setSelectedBlog(blog)}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Read More
      </button>
    </div>
  </div>
</div>

  ))}












</div>






    
      {/* Modal */}
      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          closeModal={() => setSelectedBlog(null)}
         
        />
      )}
      </div>

  );
};

export default Blogs;
