import React from 'react';
import { NavLink } from 'react-router';

const AdminMenu = () => {
    return (
        <div>
            <nav className="space-y-8 text-sm">
                
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Dashboard</h2>
                        <div className="flex flex-col space-y-1">
                        <NavLink to='manageApplication'>Manage Applications</NavLink>
                        <NavLink to='manageUsers'>Manage Users</NavLink>
                        <NavLink to='managePolicy'>Manage Policy</NavLink>
                        <NavLink to='manageTransactions'>Manage Transaction</NavLink>
                        <NavLink to='manageAgent'>Manage Agent</NavLink>
                    
                        </div>
                    </div>
                
                </nav>
        </div>
    );
};

export default AdminMenu;