import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {

const {user,loading}=use(AuthContext);
const axiosSecure=useAxiosSecure();
const {data:role='',isloading:roleLoading,refetch}=useQuery({
    queryKey:['userRole',user?.email],
    enabled:!loading && !!user?.email,
    queryFn:async()=>{
   const res =await axiosSecure(`/users/${user?.email}/role`)
   return res.data.role;
    }
})

    return {role,loading:roleLoading || loading,refetch};
};

export default useRole;