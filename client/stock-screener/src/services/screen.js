import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function getAllScreensApi(uri){
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

export async function getStockAttributes(){
    var response = null
    try{
        response = await axiosCall.get("/screens/attributes");
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(`from screen:${ex}`)
        toast.error(ex.message)
        return null;
    }
}

export async function getAdminStockAttributes(){
    var response = null
    try{
        response = await axiosCall.get("/admin/attributes");
        log(`from screen:${response.data}`);
        return response
    }catch(ex){
        log(`from screen:${ex}`)
        toast.error(ex.message)
        return null;
    }
}

export async function addNewScreen(data){
    var response = null
    try{
        response = await axiosCall.post("/screens", data);
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