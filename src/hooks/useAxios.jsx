import axios from "axios";

const axiosInstance = axios.create({
   baseURL:`https://my-assignment-12-server-theta.vercel.app`
 })

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;