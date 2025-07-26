import React from 'react';
import img from "../assets/401-error-unauthorized-concept-illustration_114360-1922.avif"
const UnAuthorized = () => {
    return (
        
        
  <div className="text-center mt-20">
    <h1 className="text-3xl font-bold text-red-600">401 - Unauthorized</h1>
     <img src={img} alt="" />
    <p className="text-gray-600 mt-2">You are not logged in or
         your session has expired.</p>
  </div>


    );
};

export default UnAuthorized;