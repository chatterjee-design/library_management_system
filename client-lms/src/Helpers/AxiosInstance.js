import axios from 'axios'

const BASE_URL = 'https://readsphere-43ul.onrender.com/api/'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;