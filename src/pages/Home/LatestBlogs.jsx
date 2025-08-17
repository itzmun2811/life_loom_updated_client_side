import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import BlogModal from '../BlogModal';

const LatestBlogs = () => {
  const axiosInstance = useAxios();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosInstance('/latestBlogs?limit=4&sort=latest');
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading latest blogs...</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Error loading blogs.</p>;
  }

  return (
    <div className="w-11/12 mx-auto my-12">
      <Helmet>
        <title>Latest Blogs</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-10">Latest Blogs & Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
         <div
  key={blog._id}
  className="bg-[#D2C1B6] border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300"
>
  {/* Image Section */}
  <img
    src={blog.image || 'https://via.placeholder.com/400'}
    alt={blog.title}
    className="rounded-t-xl w-full h-48 object-cover p-6"
  />

  {/* Content Section */}
  <div className="p-10 bg-white">
    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-sky-600 transition line-clamp-2">
      {blog.title}
    </h3>

    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
      {blog.content?.split(' ').slice(0, 25).join(' ')}...
    </p>

    <div className="flex justify-between items-center">
      <button
        onClick={() => setSelectedBlog(blog)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 rounded-full transition duration-300 shadow-md hover:shadow-lg"
      >
        Read More →
      </button>

      <span className="text-xs text-gray-500">
        {new Date(blog.publishDate).toLocaleDateString()}
      </span>
    </div>
  </div>
</div>

        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blogs"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          View All Blogs
        </Link>
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} closeModal={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default LatestBlogs;
