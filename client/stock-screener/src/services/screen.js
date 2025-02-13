import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

async function handleRequest(requestFunction) {
    try {
        const response = await requestFunction();
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

export async function getAllScreensApi(){
    return await handleRequest(()=>axiosCall.get("/screens"))
}

export async function getMyScreensApi(){
    return await handleRequest(()=>axiosCall.get("/screens/myscreens"))
}

export async function getStockAttributes(){
    return await handleRequest(()=>axiosCall.get("/screens/attributes"))
}

export async function getAdminStockAttributes(){
    return await axiosCall.get("/admin/attributes");;
}

export async function addNewScreen(data){
    return await axiosCall.post("/screens", data);
}

export async function updateStockAttributes(data){
    return await axiosCall.put("/admin/attributes", data);
}