import React from 'react';
import img from "../assets/403-http-code.jpg"
const Forbidden = () => {
    return (
      <div className="text-center mt-20 my-6">
    <h1 className="text-3xl font-bold text-yellow-600">403 - Forbidden</h1>
   <p className=" font-bold text-red-600 mt-2">You don’t have permission
     to access this page.</p>
      <img src={img} className='mx-auto' alt="" />
  </div>
    );
};

export default Forbidden;