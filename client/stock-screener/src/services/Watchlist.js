import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function getAllWatchlistApi(uri){
    var response = null
    try{
        response = await axiosCall.get(uri);
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(`from screen:${ex}`)
        toast.error(ex.message)
        return null;
    }
}

export async function getStockwatchlist(){
    var response = null
    try{
        response = await axiosCall.get("/watchlist/attributes");
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(`from screen:${ex}`)
        toast.error(ex.message)
        return null;
    }
}

// export async function getAdminStockAttributes(){
//     var response = null
//     try{
//         response = await axiosCall.get("/admin/attributes");
//         log(`from screen:${response.data}`);
//         return response
//     }catch(ex){
//         log(`from screen:${ex}`)
//         toast.error(ex.message)
//         return null;
//     }
// }

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