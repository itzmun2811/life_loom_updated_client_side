import React from 'react';
import { NavLink } from 'react-router';

const CustomerMenu = () => {
    return (
        <div className='py-12 my-12'>
             <nav className="space-y-8 text-sm">
                
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold 
                        tracking-widest uppercase border-b-2 pb-4 dark:text-gray-600">
                            My Dashboard</h2>
                        <div className="flex flex-col pt-6 space-y-7">
                        <NavLink to='customerStats'>Dashboard Overview</NavLink>
                        <NavLink to='myPolicy'>My Policy</NavLink>
                        <NavLink to='paymentStatus'>Payment Status</NavLink>
                        <NavLink to='payment/:id'>Payment Page</NavLink>
                        <NavLink to='claimPolicy'>Claim Policy</NavLink>
                        <NavLink to='rejection'>Agent Request Feedback</NavLink>
                         <NavLink to='profile'> My Profile</NavLink>
                          <NavLink to='/'>Home</NavLink>

                        
                    
                        </div>
                    </div>
                
                </nav>
        </div>
    );
};

export default CustomerMenu;