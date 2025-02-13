import { toast } from "react-toastify";
import { log } from "../utils/logger";
import axios from "axios";
import { dotnetUrl } from "../app-config";

const stockAxios = axios.create({
    baseURL: dotnetUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

async function handleRequest(requestFunction) {
  try {
    const response = await requestFunction();
    log(response)
    return response;
  } catch (ex) {
    log(ex);
    if (ex.code && ex.code === "ERR_NETWORK") {
      toast.warning("Can't connect to server at the moment! Please try again later.");
    } else {
      toast.error("Some error occurred! Please try again.");
    }
    return null;
  }
}

export async function searchStocksShort(search) {
  return await handleRequest(() => stockAxios.get(`/api/stocks/search?search=${search}`));
}

export async function getStocksShort() {
  return await handleRequest(() => stockAxios.get(`/api/stocks/short`));
}

export async function saveVisibleStocks(data) {
  return await handleRequest(() => stockAxios.post(`/api/admin/changeVisibility`, data));
}

export async function getStockDetails() {
  return await handleRequest(() => stockAxios.get(`/api/stocks`));
}

export async function getStockInfo(id) {
  return await handleRequest(() => stockAxios.get(`/api/stocks/${id}`));
}

export async function getStockMetricsInfo(id) {
  return await handleRequest(() => stockAxios.get(`api/stocks/financial-metrics/${id}`));
}