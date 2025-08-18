import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const CustomerStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    myPolicies: 0,
    myClaims: 0,
  });
  const [policyData, setPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosSecure.get("/customer-dashboard");
        setStats({
          myPolicies: res.data.myPolicies,
          myClaims: res.data.myClaims,
        });
        setPolicyData(res.data.policyDistribution);
        setClaimsData(res.data.claimsPerMonth);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, [axiosSecure]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#8884D8"];

  return (
    <div className="w-11/12 mx-auto my-12">
      <Helmet>
        <title>Customer Dashboard</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-8 text-center">My Dashboard</h2>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-medium">My Policies</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.myPolicies}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-medium">My Claims</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.myClaims}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Policy Distribution */}
        <div className="bg-white p-6 rounded shadow">
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

        {/* Claims per Month */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Claims Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={claimsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(month) =>
                  new Date(0, month - 1).toLocaleString("default", { month: "short" })
                }
              />
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

export default CustomerStats;
