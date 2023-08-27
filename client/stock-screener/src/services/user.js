import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function signinUserApi(data){
    try{
        let response = await axiosCall.post("/auth/signin", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.response.data.message)
        return ex.response.data;
    }
}

export async function registerUserApi(data){
    try{
        let response = await axiosCall.post("/auth/signup", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.response.data.message)
        return ex.response.data;

    }
}

export async function getUserProfile(){
    try{
        let response = await axiosCall.get(`/users/profile`);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function saveUserProfile(uri, data){
    try{
        let response = await axiosCall.put(uri, data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function updatePasswordApi(data){
    try{
        let response = await axiosCall.put("/users/password", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function getLimitedUserDetails(role){
    try{
        let response = await axiosCall.get("/users/short?role="+ role);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

