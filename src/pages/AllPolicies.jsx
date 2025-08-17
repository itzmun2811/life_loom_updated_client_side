import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';
import { Helmet } from 'react-helmet-async';

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(''); // 👈 New state for sorting

  const { data: categories = [] } = useQuery({
    queryKey: ['policyCategories'],
    queryFn: async () => {
      const res = await axiosInstance.get('/policy-categories');
      return res.data;
    },
  });

  const { data: { policies = [], totalPages = 1 } = {} } = useQuery({
    queryKey: ['allPolicies', searchTerm, category, page, sortOrder],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/getAllPolicy?search=${searchTerm}&category=${category}&page=${page}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <Helmet>
        <title>All Policies</title>
        <meta name="description" content="Browse all available insurance policies" />
      </Helmet>

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
        Check Out Our All Policies
      </h1>

      {/* 🔎 Filters + Sorting */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/3"
          placeholder="Search policies..."
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>

      {/* 📦 Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <NavLink to={`/allPolicies/${policy._id}`} key={policy._id}>
            <div className="bg-white border rounded-lg shadow hover:scale-105 transition-all flex flex-col h-full">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-48 object-contain p-4"
              />
              <div className="px-6 pb-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-2">{policy.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {policy.description}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold text-blue-600">Category:</span> {policy.category}
                </p>
                <p className="text-sm font-semibold text-green-700 mb-4">
                  ${policy.premiumRate}
                </p>
                <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  See More
                </button>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* 🔄 Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllPolicies;
