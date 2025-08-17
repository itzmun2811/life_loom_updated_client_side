import React from 'react';
import { NavLink, Outlet } from 'react-router';
import AdminMenu from '../DashBoardMenu/AdminMenu';
import AgentMenu from '../DashBoardMenu/AgentMenu';
import CustomerMenu from '../DashBoardMenu/CustomerMenu';
import useRole from '../../../hooks/useRole';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Loading from '../../../shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import DashBoardOverView from '../DashBoardOverView';
import DashboardHome from '../DashBoardMenu/DashboardHome';

const Dashboard = () => {
  const { role, loading } = useRole();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      
  
       <Helmet>
              <title>DashBoard</title>
              <meta name="description" content="This is my page description" />
            </Helmet>

      <div className="flex flex-col lg:flex-row gap-4 my-6 
      max-w-[1600px] mx-auto px-4 lg:px-8">
      
       
     
        <aside className="w-full lg:w-60 bg-gray-100 p-4 rounded-lg
         shadow-md">
     
          {role === 'admin' && <AdminMenu />}
          {role === 'agent' && <AgentMenu />}
          {role === 'customer' && <CustomerMenu />}
         
        </aside>

        <main className="flex-1 w-full bg-white p-4 lg:p-8 rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center capitalize">
         Dashboard -Home
          </h2>
       
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>

   
    </>
  );
};

export default Dashboard;
