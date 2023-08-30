import { toast } from "react-toastify";
import { log } from "../utils/logger";
import axios from "axios";

const stockAxios = axios.create({
    baseURL: "https://192.168.1.2:9999",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export async function searchStocksShort(search){
    try{
        let response = await stockAxios.get(`/api/stocks/search?search=${search}`);
        return response
    }catch(ex){
        log(ex.response.data)
        toast.error(ex.response.data)
        return null;
    }
}