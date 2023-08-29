import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function getAllWatchlist(uri, data){
    var response = null
    try{
        response = await axiosCall.get(uri, data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.response.data.message)
        return ex.response.data;

    }
}



export async function addNewWatchlist(data){
    var response = null
    try{
        response = await axiosCall.post("/watchlist", data);
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return null;
    }
}

export async function updateStockAttributes(data){
    var response = null
    try{
        response = await axiosCall.put("/admin/attributes", data);
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(`from screen:${ex}`)
        toast.error(ex.message)
        return null;
    }
}