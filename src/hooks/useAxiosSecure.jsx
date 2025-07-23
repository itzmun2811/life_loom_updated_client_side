import axios from 'axios';



const axiosSecure=axios.create({
    baseURL:`http://localhost:3000`
})
const useAxiosSecure = () => {
//     const token=localStorage.getItem('token');
//    axiosSecure.interceptors.request.use(config=>{
//     config.headers.Authorization=`Bearer ${token}`
//     return config;
//    })
    return axiosSecure;
};

export default useAxiosSecure;