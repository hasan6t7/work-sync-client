import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://work-sync-server-omega.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;  