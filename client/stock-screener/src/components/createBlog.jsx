import { useEffect, useState } from 'react'
import { createBlog } from "../services/blog"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
//import { log } from "../utils/logger"

function CreateBlog() {
    const [buttonClass, setButtonClass] = useState("Blog")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])

    const createBlog = async () => {
        let response = await createBlog({ 'content': content })
        if (response['status'] === 200) {
            toast.success(response.data)
            setContent('')
            setTitle('')
        }
    }

    return (<div className='container'>
        <div className='row'>
            <div className='col'>
                {blogs.map((blog) => {
                    return <div className='card py-2 my-3 ps-5 rounded-4 ' id={"#blog-" + blog.id}>
                        <div className='col'>

                            <div>
                                <h3 className='mt-2'>{blog.title}</h3>
                                <p> - by {blog.username ? blog.username : "unknown"}</p>
                                <p className='text-secondary'>{blog.title}</p>
                                <p className='text-secondary'>{blog.content}</p>
                            </div>
                        </div>
                    </div>
                })}
                <hr className="mb-5" />
                {buttonClass === "Blog" &&
                    <div className="container mt-4 px-5">
                        <div class="mb-3">
                            <textarea type="text" rows={1} value={title}
                                class="form-control" name="title" id="title" placeholder="Blog Title" onChange={(e) => setContent(e.target.value)} />

                            <textarea type="text" rows={25} value={content}
                                class="form-control" name="content" id="content" placeholder="Write something here" onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div className="m-2 text-center mt-4">
                            <button className="btn btn-danger btn-lg me-3" onClick={() => setContent('')} >Clear</button>
                            <button className="btn btn-primary btn-lg" onClick={createBlog}>Create</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>)
}

export default CreateBlog