import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'https://my-assignment-12-server-theta.vercel.app',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(token)
        return config;
      },
      (error) => Promise.reject(error)
    );

  
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401) {
          navigate('/unauthorized');
        } else if (status === 403) {
       
          navigate('/forbidden');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
