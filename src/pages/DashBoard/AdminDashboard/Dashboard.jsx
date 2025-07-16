import React from 'react';
import { Outlet } from 'react-router';
import AdminMenu from '../DashBoardMenu/AdminMenu';
import AgentMenu from '../DashBoardMenu/AgentMenu';
import CustomerMenu from '../DashBoardMenu/CustomerMenu';
import useRole from '../../../hooks/useRole';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Loading from '../../../shared/Loading/Loading';

const Dashboard = () => {
    const { role, loading } = useRole();

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <>
    <Header></Header>
        
        <div className="flex my-12  h-screen w-full max-w-[1600px]
         mx-auto overflow-hidden">
          
        
            {/* Sidebar */}
            <aside className="w-60 bg-gray-100 dark:bg-gray-50 dark:text-gray-800 p-4 flex flex-col h-full">
                {role === 'admin' && <AdminMenu />}
                {role === 'agent' && <AgentMenu />}
                {role === 'customer' && <CustomerMenu />}
            </aside>

            {/* Main content */}
            <main className="flex-1 h-full overflow-y-auto p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">{role}-DASHBOARD</h2>
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            
        </div>

        <Footer></Footer>
        </>
    
    );
};

export default Dashboard;
