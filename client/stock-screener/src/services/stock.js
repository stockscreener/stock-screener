import { toast } from "react-toastify";
import { log } from "../utils/logger";
import axios from "axios";

const stockAxios = axios.create({
    baseURL: "https://localhost:9999",
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

export async function getStocksShort(){
  try{
      let response = await stockAxios.get(`/api/stocks/short`);
      return response
  }catch(ex){
      log(ex.response.data)
      toast.error(ex.response.data)
      return null;
  }
}

export async function saveVisibleStocks(data){
  try{
      let response = await stockAxios.post(`/api/admin/changeVisibility`, data);
      return response
  }catch(ex){
      log(ex.response.data)
      toast.error(ex.response.data)
      return null;
  }
}

export async function getStockDetails(){
  try{
      let response = await stockAxios.get(`/api/stocks`);
      return response
  }catch(ex){
      log(ex.response.data)
      toast.error(ex.response.data)
      return null;
  }
}