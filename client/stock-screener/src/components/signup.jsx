import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserApi } from '../services/user'; // Assuming you have a registerUserApi function
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { log } from '../utils/logger';

function Signup() {
    const loginStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdvisor, setIsAdvisor] = useState(false);

    if(loginStatus){
        navigate("/")
        return null
    }

    const registerUser = async () => {
        if (email.length === 0) {
            toast.error('Enter Email address!');
        } else if (password.length === 0) {
            toast.error('Enter Password!');
        } else if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
        } else {
            const response = await registerUserApi({
                email,
                password,
                'advisor':isAdvisor,
            });
            log(response);
            if (response['status'] === 201) {
                toast.success('Registration Successful');
                navigate('/login');
            }
        }
    };

    return (<div className="container p-5 mt-5 col-md-5">
            <div className="col"></div>
            <div className="col">
                <div className="card shadow text-dark p-5">
                    <h2 className="text-center">Sign up</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            autoFocus
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            required
                            autoComplete="new-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isAdvisor"
                            checked={isAdvisor}
                            onChange={() => setIsAdvisor(!isAdvisor)}
                        />
                        <label className="form-check-label" htmlFor="isAdvisor">
                            Register as advisor
                        </label>
                    </div>
                    <button className="btn btn-primary mb-3" onClick={registerUser}>
                        Sign up
                    </button>
                    <p className="text-center">
                        Already have an account? <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default Signup;
