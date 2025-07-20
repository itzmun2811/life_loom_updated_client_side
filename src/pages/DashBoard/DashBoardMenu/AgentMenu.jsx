import React from 'react';
import { NavLink } from 'react-router';

const AgentMenu = () => {
    return (
        <div>
             <nav className="space-y-8 text-sm">
                
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest 
                        uppercase dark:text-gray-600">My Dashboard</h2>
                        <div className="flex flex-col space-y-1">
                        <NavLink to='assignedCustomer'>Assigned Customers</NavLink>
                        <NavLink to='policyClearance'>Policy Clearance</NavLink>
                        <NavLink to='manageBlogs'>Manage Blogs</NavLink>
                        
                    
                        </div>
                    </div>
                
                </nav>
        </div>
    );
};

export default AgentMenu;