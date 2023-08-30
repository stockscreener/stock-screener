import { toast } from "react-toastify";
import axiosCall from "../utils/axios-call";
import { log } from "../utils/logger";

// export async function getAllBlogsApi(uri){
//     var response = null
//     try{
//         response = await axiosCall.get(uri);
//         log(`from blog:${response.data}`);
//         return response
//     }catch(ex){
//         log(`from blog:${ex}`)
//         toast.error(ex.message)
//         return null;
//     }
// }

export async function blogList(){
    try{
        let response = await axiosCall.get(`/bloglist`);
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function createBlog(data){
    try{
        let response = await axiosCall.post("/users/createblog", data); //only for Advisors //put
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

// export async function createBlog(data){
//     var response = null
//     try{
//         response = await axiosCall.post("/users/createblog", data);
//         log(`from blog:${response.data}`);
//         return response
//     }catch(ex){
//         log(ex)
//         toast.error(ex.message)
//         return null;
//     }
// }

export async function editBlog(data){
    try{
        let response = await axiosCall.put("/users/editblog", data); //only for Advisors
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}

export async function deleteBlog(data){
    try{
        log(data)
        let response = await axiosCall.put("/users/deleteblog", data); //only for Advisors
        log(response.data);
        return response
    }catch(ex){
        log(ex)
        toast.error(ex.message)
        return ex.response;

    }
}