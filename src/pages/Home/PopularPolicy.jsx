import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PopularPolicy = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['popularPolicies'],
    queryFn: async () => {
      const res = await axiosSecure.get('/popularPolicies');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-12 text-lg">Loading...</div>;
  if (isError) return <div className="text-center py-12 text-red-500">Error loading policies.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-sky-700" data-aos="fade-down">🔥 Popular Policies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((policy, index) => (
          <div
            key={policy._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-gradient-to-tr from-sky-600 to-gray-200 border p-4 border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <Link to={`/policies/${policy._id}`}>
              <img
                src={policy.image}
                alt={policy.title}
                className="rounded-t-xl w-full h-48 p-10 object-cover"
              />
            </Link>
            <div className="p-10 bg-white">
              <Link to={`/policies/${policy._id}`}>
                <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-sky-600 transition">
                  {policy.title}
                </h5>
              </Link>

              <div className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="font-semibold">Coverage Amount:</div>
                <div className="ml-2">
                  <p className="text-green-600">Min: ৳{policy.minCoverage?.toLocaleString()}</p>
                  <p className="text-red-600">Max: ৳{policy.maxCoverage?.toLocaleString()}</p>
                </div>
              </div>

              <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
                <strong>Term:</strong> {policy.duration} years
              </p>
              <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                <strong>Purchased:</strong> {policy.purchaseCount} times
              </p>

              <Link
                to={`/allPolicies/${policy._id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 rounded-full transition duration-300 shadow-md hover:shadow-lg"
              >
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPolicy;
