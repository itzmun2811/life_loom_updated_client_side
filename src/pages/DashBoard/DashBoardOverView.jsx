import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar,
    
    XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashBoardOverView = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPolicies: 0,
    totalClaims: 0,
    totalAgents: 0
  });
  const [policyData, setPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/dashboard-overview");
        setStats(res.data.stats);
        setPolicyData(res.data.policyDistribution);
        setClaimsData(res.data.claimsPerMonth);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="w-11/12 mx-auto my-12">
      <Helmet>
        <title>Dashboard Overview</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-8 text-center">Dashboard Overview</h2>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded shadow text-center" data-aos="fade-up">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-lg font-medium">Total Policies</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.totalPolicies}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-lg font-medium">Total Claims</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.totalClaims}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-medium">Total Agents</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.totalAgents}</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded shadow" data-aos="fade-right">
          <h3 className="text-xl font-semibold mb-4">Policy Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={policyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {policyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

    
        <div className="bg-white p-6 rounded shadow" data-aos="fade-left">
          <h3 className="text-xl font-semibold mb-4">Claims Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={claimsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="claims" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOverView;
