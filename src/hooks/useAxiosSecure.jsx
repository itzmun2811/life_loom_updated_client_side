import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'; // use 'react-router-dom' not 'react-router'

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Attach token before every request
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

    // ✅ Handle 401 / 403
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

    // ✅ Clean up interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
