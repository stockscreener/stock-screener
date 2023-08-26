import { useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { updatePasswordApi } from "../services/user";


function UpdatePassword() {

    const [passwordDetails, setPasswordDetails] = useState({"currentPassword":"", "newPassword":"", "confirmPassword":""})

    const changePassword = async ()=>{
        if(passwordDetails.currentPassword.length===0){
            toast.error("Enter Current Password!")
        }else if(passwordDetails.newPassword.length === 0){
            toast.error("Enter a new Password")
        }else if(passwordDetails.newPassword !== passwordDetails.confirmPassword){
            toast.error("New Password does not match!")
        }else{
            // change password api
            let response = await updatePasswordApi(passwordDetails)
            if(response['status']===200){
                if(response.data.status==="error"){
                    toast.error(response.data.message)
                }else {
                    clearDetails()
                    toast.success(response.data.message)
                }
            }
        }
    }

    const onInputChange = (e) => {
        let copyOfState = { ...passwordDetails };
        copyOfState[e.target.name] = e.target.value;
        setPasswordDetails(copyOfState);
    }

    const clearDetails = (e) => {
        setPasswordDetails({"currentPassword":"", "newPassword":"", "confirmPassword":""})
    }

    return (<div className="container mt-5 row">
        <div className="col-3" id="side">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light position-absolute" id="sidebar" style={{ width: 280, height: "100%", top: 70, left: 0 }}>
                <hr className="mt-5" />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <div className="nav-link link-dark" aria-current="page">
                            <Link className="nav-link link-body-emphasis" to={"/profile"}>Profile</Link></div>
                    </li>
                    <li>
                        <div className="nav-link active">Update Password</div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col">
            <h3>Change Password</h3>
            <div className="row mb-3 mt-4 p-2" >
                <div className="col-md-3 col-lg-2" >
                    <label htmlFor="name" className="form-label">Current Password</label>
                </div>
                <div className="col-sm-9 col-md-5 col-lg" >
                    <input type="password" name="currentPassword"
                        className="form-control" required="required"
                        onChange={onInputChange} value={passwordDetails.currentPassword} />

                </div>
                <div className="col-sm-0 col-md-2 col-lg"></div>
            </div>
            <div className="row mb-3 p-2" >
                <div className="col-md-3 col-lg-2" >
                    <label htmlFor="name" className="form-label">New Password</label>
                </div>
                <div className="col-sm-9 col-md-5 col-lg" >
                    <input type="password" pattern="[0-9]{1,}[a-z]{1,}[A-Z]{1,}" 
                        name = "newPassword" value={passwordDetails.newPassword}
                        className="form-control" required="required"
                        onChange={onInputChange} />

                </div>
                <div className="col-sm-0 col-md-2 col-lg"></div>
            </div>
            <div className="row mb-3 p-2" >
                <div className="col-md-3 col-lg-2" >
                    <label htmlFor="name" className="form-label">Confirm Password</label>
                </div>
                <div className="col-sm-9 col-md-5 col-lg" >
                    <input type="password" pattern="[0-9]{1,}[a-z]{1,}[A-Z]{1,}" 
                        name="confirmPassword" value={passwordDetails.confirmPassword}
                        className="form-control" required="required"
                        onChange={onInputChange} />

                </div>
                <div className="col-sm-0 col-md-2 col-lg"></div>
            </div>
        </div>
        <div className="m-2 text-center">
            <button className="btn btn-secondary btn-lg me-3" onClick={clearDetails}>Clear</button>
            <button className="btn btn-primary btn-lg" onClick={changePassword}>Update</button>
        </div>
    </div>)
}

export default UpdatePassword