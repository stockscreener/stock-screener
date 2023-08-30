import { useEffect, useState } from 'react'
import { blogList, createBlog, editBlog, deleteBlog } from "../services/blog"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { log } from "../utils/logger"
import { FaCrown } from 'react-icons/fa';

function Blog() {
    const [buttonClass, setButtonClass] = useState("Blog")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        log("in use effect of blog")
        const fetchBlogs = async () => {
            try {
                const response = await blogList('/blogs');
                log(response);
                if (response && response.status === 200) {
                    if (response.data.length === 0) {
                        toast.info('No blogs Available Yet!');
                    }
                    setBlogs(response.data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    const createBlog = async () => {
        let response = await createBlog({ 'content': content })
        if (response['status'] === 200) {
            toast.success(response.data)
            setContent('')
        }
    }

    const editBlog = async () => {
        let response = await editBlog({ 'content': content })
        if (response['status'] === 200) {
            toast.success(response.data)
            setContent('')
        }
    }

    const deleteBlog = async () => {
        let response = await deleteBlog()
        if (response['status'] === 200) {
            toast.success(response.data)
            navigate("/blogs")
        }
    }

    return (<div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='float-end mt-3'><button className='btn btn-primary' onClick={() => navigate("/blogs/create")}>Create Blog</button></div>
                <div className='row mt-5'>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <div className={buttonClass === "Blogs" ? "nav-link active" : "nav-link link-dark"} >
                                <button className="nav-link link-body-emphasis" onClick={() => setButtonClass("Blogs")}>Blogs</button>
                            </div>
                        </li>
                    </ul>
                </div>
                {blogs.map((blog) => {
                    return <div className='card py-2 my-3 ps-5 rounded-4 ' id={"#blog-" + blog.id}>
                        <div className='col'>
                            <div className='float-end me-3'>
                                {blog.premium && <FaCrown className='fs-2' style={{ color: "gold" }}></FaCrown>}
                            </div>
                            <div>
                                <h3 className='mt-2'>{blog.title}</h3>
                                <p> - by {blog.username ? blog.username : "unknown"}</p>
                                <p className='text-secondary'>{blog.content}</p>
                            </div>
                        </div>
                    </div>
                })}
                <hr className="mb-5" />
            </div>
        </div>
    </div>)
}

export default Blog