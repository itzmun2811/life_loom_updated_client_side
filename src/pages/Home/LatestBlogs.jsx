import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import BlogModal from "../BlogModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LatestBlogs = () => {
  const axiosInstance = useAxios();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance("/latestBlogs?limit=4&sort=latest");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading latest blogs...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading blogs.</p>;

  return (
    <div className="w-11/12 mx-auto mt-12">

      <Helmet>
        <title>Latest Blogs & Articles | LifeLoom Insurance</title>
        <meta
          name="description"
          content="Stay updated with our latest blogs and articles on insurance, finance, and more."
        />
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs & Articles</h2>

      {/* ✅ Swiper Slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="flex flex-col md:flex-row p-10 bg-[#dce6e8b7]
             rounded-xl shadow-lg overflow-hidden">
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:w-2/3 h-64 object-cover"
              />

              {/* Blog Content */}
              <div className="p-6 flex flex-col justify-between md:w-1/3">
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-5">
                    {blog.content.split(" ").slice(0, 50).join(" ")}...
                  </p>
                </div>

                {/* Author + Stats */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <p className="text-sm font-medium text-blue-700">
                        {blog.author}
                        <span className="badge badge-info ml-1">Author</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">👁️ {blog.totalVisitCount}</p>
                </div>

                {/* Read More Button */}
                <div className="text-right mt-2">
                  <button
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setSelectedBlog(blog)}
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
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full"
        >
          View All Blogs
        </Link>
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} closeModal={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default LatestBlogs;
