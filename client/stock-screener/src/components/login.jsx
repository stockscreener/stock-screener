import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signinUserApi } from '../services/user';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { log } from '../utils/logger';
import axiosCall from '../utils/axios-call';
import { showNavbar } from '../features/navbarSlice';

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const signinUser = async()=>{

        if(email.length === 0){
            toast.error("Enter Email address!")
        }else if(password.length === 0){
            toast.error("Enter Password!")
        }else{
            const response = await signinUserApi({email, password})

            if(response && response['status'] === 200){
                if(response.data.status === 'ACTIVE'){
                    toast.success("Login Success")
                    sessionStorage.setItem("id", response.data.id)
                    sessionStorage.setItem("name",response.data.name)
                    sessionStorage.setItem("username",response.data.username)
                    sessionStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("role", response.data.role)
                    dispatch(login())
                    dispatch(showNavbar())
                    axiosCall.defaults.headers.Authorization = 'Bearer '+response.data.token
                    navigate("/")
                }else{
                    toast.error("You have been Blocked by the Admin!")
                }

            }
        }
    }
    return <div className='container p-5 mt-5 col-md-5'>
        <div className='col'><Link to={"/"} onClick={()=>dispatch(showNavbar())}>Home</Link></div>
        <div className='col'>
            <div className='card shadow text-dark p-5'>
            <h2 className='text-center'>Sign in</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required="required" autoFocus
                    autoComplete='email'
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required="required"
                    autoComplete='current-password'
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="btn btn-primary mb-3" onClick={signinUser}>Sign in</button>
                <p className="text-center">Don't have an Account? <Link to={"/register"}>Sign up</Link></p>
            </div>
        </div>
        <div className='col'></div>
    </div>
}


export default Login;