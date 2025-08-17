import React from 'react';
import { NavLink } from 'react-router';

const DashboardHome = () => {
    return (
       
             <div>
            <nav className="space-y-1 text-sm">
                
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold
                         tracking-widest uppercase dark:text-gray-600">
                            Dashboard</h2>
                        <div className="flex flex-col space-y-1">
                        <NavLink to='dashBoardOverView'>Home</NavLink>
                      
                    
                        </div>
                    </div>
                
                </nav>
        </div>
       
    );
};

export default DashboardHome;