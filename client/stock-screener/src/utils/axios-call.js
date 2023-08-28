import axios from 'axios';
import { baseURL } from '../app-config';
import { toast } from 'react-toastify';
import { log } from './logger';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage['token'] ? 'Bearer '+ sessionStorage['token'] : "",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>{
    log(error)
    toast.error(error.response['status'] === 400?"Invalid Credentials!":error.response.message)
  }
)

export default axiosInstance