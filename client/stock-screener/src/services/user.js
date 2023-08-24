import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function signinUserApi(uri, data){
    var response = null
    try{
        response = await axiosCall.post(uri, data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.response.data.message)
        return ex.response.data;

    }
}