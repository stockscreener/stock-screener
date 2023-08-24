import axios from 'axios';
import { baseURL } from '../app-config';

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage['token']? 'Bearer '+ sessionStorage['token'] : "",
  },
});