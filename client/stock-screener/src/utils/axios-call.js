import axios from 'axios';
import { baseURL } from '../app-config';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage['token'] ? 'Bearer '+ sessionStorage['token'] : "",
  },
});

export default axiosInstance