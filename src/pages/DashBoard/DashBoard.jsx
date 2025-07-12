import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import CustomerMenu from './DashBoardMenu/CustomerMenu';
import MyPolicies from './CustomerDashboard/MyPolicies';
import PaymentStatus from './CustomerDashboard/PaymentStatus';

const DashBoard = () => {
    const {user}= use(AuthContext)
    console.log(user?.role)
  return (
    <div className='my-12'>
    <MyPolicies></MyPolicies>
    <PaymentStatus></PaymentStatus>
     <h1 className='text-4xl text-blue-700 text-center'>My Dashboard</h1>
    {user?.role === "customer" && <CustomerMenu></CustomerMenu>}
    </div>
    
);}

export default DashBoard;
