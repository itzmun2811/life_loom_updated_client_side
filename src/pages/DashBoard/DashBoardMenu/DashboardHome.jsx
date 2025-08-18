import React from 'react';
import { NavLink } from 'react-router';

const DashboardHome = () => {
    return (
       
             <div>
            <nav className="space-y-1 text-sm">
                
                    <div className="space-y-2">
                        
                        <div className="flex flex-col space-y-1">
                        <NavLink to='dashBoardOverView'>Dashboard Overview</NavLink>
                      
                    
                        </div>
                    </div>
                
                </nav>
        </div>
       
    );
};

export default DashboardHome;