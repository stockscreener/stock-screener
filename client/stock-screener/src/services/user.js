import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

export async function signinUserApi(data){
    try{
        let response = await axiosCall.post("/auth/signin", data);
        return response
    }catch(ex){
        log(ex.response.data)
        toast.error(ex.response.data)
        return null;
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
        return null;
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

export async function getVerificationProfile(id){
    try{
        let response = await axiosCall.get(`/users/profile/verify?advisorId=` + id);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function sendVerification(data){
    try{
        let response = await axiosCall.put(`/users/verify`,data);
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

export async function getLimitedUserDetailsApi(role){
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

export async function changeUserStatusApi(data){
    try{
        let response = await axiosCall.put("/users/disable", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function saveFeedback(data){
    try{
        let response = await axiosCall.put("/users/feedback", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function deleteUserAccount(data){
    try{
        log(data)
        let response = await axiosCall.put("/users/delete", data);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}