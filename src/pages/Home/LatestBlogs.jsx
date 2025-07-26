import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import BlogModal from '../BlogModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../hooks/useAxios';

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

  if (isLoading) return <p className="text-center py-10">Loading latest blogs...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading blogs.</p>;

  return (
    <div className="w-11/12 mx-auto my-12">
    
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs & Articles</h2>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {blogs.map((blog) => (
      <SwiperSlide key={blog._id}>
  <div className="w-full mx-auto max-w-3xl  
  p-6 bg-gradient-to-tl from-sky-600 to-gray-200 
  rounded-2xl shadow-md overflow-hidden">
    {/* Image */}
    <div className="w-full">
      <img
        className="w-full h-56  md:h-64 lg:h-64  object-cover object-center p-4 sm:p-6"
        src={blog.image}
        alt={blog.title}
      />
    </div>

    {/* Content */}
    <div className="p-4 sm:p-6 md:p-8 bg-white flex flex-col space-y-4">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">{blog.title}</h3>

      <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
        {blog.content.split(' ').slice(0, 50).join(' ')}...
      </p>

      {/* Author + Stats */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div className="flex items-center space-x-3">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2"
          />
          <div>
            <p className="text-sm md:text-base font-medium text-sky-800 flex gap-1 items-center">
              {blog.author}
              <span className="bg-sky-200 text-sky-800 text-xs px-2 py-0.5 rounded-full">
                Author
              </span>
            </p>
            <p className="text-xs md:text-sm text-slate-600">
              {new Date(blog.publishDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 font-semibold">
          👁️ {blog.totalVisitCount}
        </p>
      </div>

      {/* Button */}
      <div className="text-right">
        <button
          onClick={() => setSelectedBlog(blog)}
          className="px-4 py-2 text-sm sm:text-base bg-sky-600 text-white rounded hover:bg-sky-700 transition"
        >
          Read More →
        </button>
      </div>
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>

      {/* View All Blogs Button */}
      <div className="text-center mt-10">
        <Link
          to="/blogs"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          View All Blogs
        </Link>
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          closeModal={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
};

export default LatestBlogs;
