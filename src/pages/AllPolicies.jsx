import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Fetch filtered & paginated policies
  const {
    data: policyData = { policies: [], total: 0 },
    isLoading,
  } = useQuery({
    queryKey: ['allPolicies', selectedCategory, currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/allPolicies?category=${selectedCategory}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  // Fetch all policies just for extracting categories (once)
  const { data: allCategories = [] } = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const res = await axiosInstance.get('/allPolicies');
      const all = res.data.policies || res.data;
      const unique = [...new Set(all.map((p) => p.category))];
      return unique;
    },
  });

  const { policies, total } = policyData;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10 shadow-md p-4 rounded-2xl">
        Check Out Our All Policies
      </h1>

      {/* Category Filter */}
      <div className="mb-6 text-center">
        <select
          onChange={(e) => {
            setSelectedCategory(e.target.value === 'All' ? '' : e.target.value);
            setCurrentPage(1);
          }}
          value={selectedCategory || 'All'}
          className="p-2 rounded-md border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading policies...
        </p>
      ) : policies.length === 0 ? (
        <p className="text-center text-lg font-medium text-red-500">
          No policies found for selected category.
        </p>
      ) : (
        <>
          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy) => (
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
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {policy.description}
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-auto">
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Category:</span>{' '}
                      {policy.category}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPolicies;
