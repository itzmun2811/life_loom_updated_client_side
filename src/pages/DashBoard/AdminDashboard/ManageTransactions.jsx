import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/transactions');
      return res.data;
    },
  });

  const totalIncome = transactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  );

  return (
    <div className="p-6 space-y-8">
         <Helmet>
                <title>Manage Transactions</title>
                <meta name="description" content="This is my page description" />
              </Helmet>
      <div className="bg-white p-6 rounded shadow-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">💳 Manage Transactions</h2>

          <div className="space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Filter by Date Range
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Filter by User
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Filter by Policy
            </button>
          </div>
        </div>

        {/* Total Income */}
        <div className="text-right text-green-700 font-medium text-lg mb-4">
          Total Income: ৳{totalIncome.toFixed(2)}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Customer Email</th>
                <th className="p-3 border">Policy Name</th>
                <th className="p-3 border">Paid Amount (৳)</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    Loading transactions...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, index) => (
                  <tr key={tx._id || index} className="border-t hover:bg-gray-50">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{tx.transactionId}</td>
                    <td className="p-3 border">{tx.customerEmail}</td>
                    <td className="p-3 border">{tx.policyName}</td>
                    <td className="p-3 border">৳{parseFloat(tx.amount).toFixed(2)}</td>
                    <td className="p-3 border">
                      {new Date(tx.date).toLocaleString('en-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;
