import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const LatestBlogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: latestBlogs = [], isLoading, isError } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/latestBlogs?limit=4&sort=latest');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading latest blogs...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading blogs.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center mb-10">Latest Blogs & Articles</h2>

      <div className="flex justify-center">
        <Swiper
         onAutoplay={true}
          grabCursor={true}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
            },
            next: {
              shadow: true,
              translate: ['120%', 0, -500],
            },
          }}
          modules={[EffectCreative]}
          className="w-full max-w-md md:max-w-2xl lg:max-w-3xl"
        >  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
          {latestBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-medium">{blog.author}</p>
                      <p className="text-gray-500">{blog.authorEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          </div>
        </Swiper>
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-3">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              Published: {new Date(selectedBlog.publishDate).toLocaleDateString()} | Views: {selectedBlog.totalVisitCount}
            </p>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-800 mb-6">{selectedBlog.content}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/blogs/${selectedBlog._id}`}
                className="text-blue-600 hover:underline"
              >
                Go to Full Blog →
              </Link>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-red-500 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/blogs"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          View All Blogs / Articles
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
