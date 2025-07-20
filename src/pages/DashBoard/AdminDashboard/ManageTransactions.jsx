import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();


  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/transactions');
      return res.data;
    }
  });



  return (
    <div className="p-6 space-y-8">
  
   
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">💳 Manage Transactions</h2>

          <div className="space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Filter by Date Range
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Filter by User
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Filter by Policy
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Customer Email</th>
                <th className="p-3 border">Policy Name</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && transactions.map((tx, index) => (
                <tr key={tx._id} className="border-t">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{tx.transactionId}</td>
                  <td className="p-3 border">{tx.customerEmail}</td>
                  <td className="p-3 border">{tx.policyName}</td>
                  <td className="p-3 border">{tx.amount} BDT</td>
                  <td className="p-3 border">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        tx.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;
