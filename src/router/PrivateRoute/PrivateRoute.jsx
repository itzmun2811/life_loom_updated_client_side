import React, { use, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../shared/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
  const {user,loading}=useContext(AuthContext)
   const location=useLocation();
  console.log("PrivateRoute:", { user, loading });

 if(loading) return <Loading></Loading>;
 
   if(!user){
   return <Navigate to="/login" state={{ from: location }} replace />
   }
  
   
  
   
   
   
    return children;
};

export default PrivateRoute;