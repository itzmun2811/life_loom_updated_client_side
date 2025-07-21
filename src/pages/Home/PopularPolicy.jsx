import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PopularPolicy = () => {
  const axiosSecure = useAxiosSecure();


  const { data, isLoading, isError } = useQuery(
    {
     queryKey:['popularPolicies'],
     queryFn:async () => {
    const res = await axiosSecure.get('/popularPolicies');
    return res.data}
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading policies.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Popular Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(policy => (
          <div key={policy._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/policies/${policy._id}`}>
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={policy.image || 'https://via.placeholder.com/400x300?text=Life+Plan'}
                alt={policy.title}
              />
            </Link>
            <div className="p-5">
              <Link to={`/policies/${policy._id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {policy.title}
                </h5>
              </Link>
              <p className="mb-1 font-normal text-gray-700
               dark:text-gray-400">
   <div className="mb-2 flex">
  <div className="font-semibold">Coverage Amount:</div>
  <div className="flex flex-col items-center space-x-2 ml-2">
    <span className="text-green-700 font-medium">Min:
    ৳{policy.minCoverage?.toLocaleString()}</span>
   
    <span className="text-red-700 font-medium">
        Max:৳{policy.maxCoverage?.toLocaleString()}</span>
  </div>
</div>

              </p>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                <strong>Term:</strong> {policy.duration} years
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <strong>Purchased:</strong> {policy.purchaseCount} times
              </p>
              <Link
                to={`/allPolicies/${policy._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Details
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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
