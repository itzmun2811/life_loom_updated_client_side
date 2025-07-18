import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';

const AllPolicies = () => {
  const axiosInstance = useAxios();
  

  const { data: allPolicies = [] } = useQuery({
    queryKey: ['allPolicies'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getAllPolicy`);
      return res.data;
    },
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10 shadow-md p-4 rounded-2xl">
        Check Out Our All Policies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPolicies.map((policy) => (
          <NavLink to={`/allPolicies/${policy._id}`} key={policy._id}>
            <div
              data-aos="zoom-out-left"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col"
            >
              <div className="p-4">
                <img
                  src={policy.image}
                  alt={policy.title}
                  className="w-full h-48 object-contain rounded-xl mx-auto"
                />
              </div>
              <div className="px-6 pb-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {policy.title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                  {policy.description}
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-auto">
                  <span className="font-semibold text-blue-700 dark:text-blue-400">Category:</span> {policy.category}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AllPolicies;
