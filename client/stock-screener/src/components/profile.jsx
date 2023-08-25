import { useEffect, useState } from "react";
import { getUserProfile, saveUserProfile } from "../services/user";
import { log } from "../utils/logger";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authName } from "../features/authSlice";

function UserProfile() {
    const [profileDetails, setProfileDetails] = useState({})
    useEffect(() => {
        log("use effect of profile")
        async function getProfile() {
            let response = await getUserProfile()
            setProfileDetails(response.data)
        }
        getProfile()
    }, [])
    const dispatch = useDispatch()

    const saveProfile = async () => {
        log(profileDetails)
        let uri = profileDetails.hasOwnProperty('verificationStatus') ? "/users/advisor/profile" : profileDetails.hasOwnProperty('industry') ? "/users/investor/profile" : "/users/admin/profile"
        const response = await saveUserProfile(uri, profileDetails);
        log(response);
        if (response['status'] === 200) {
            toast.success('Profile Updated !');
            setProfileDetails(response.data)
            if(profileDetails['name'] !== null && profileDetails['name'].length !== 0){
                dispatch(authName(profileDetails['name']))
            }
        }
    }

    const onInputChange = (e) => {
        let copyOfState = { ...profileDetails };
        copyOfState[e.target.name] = e.target.value;
        setProfileDetails(copyOfState);
    }

    return (<div className="container mt-5 row">
        <div className="col-3" id="side">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light position-absolute" id="sidebar" style={{ width: 280, height: "100%", top: 70, left: 0 }}>
                <hr className="mt-5" />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <div className="nav-link active" aria-current="page">Profile</div>
                    </li>
                    <li>
                        <div className="nav-link link-dark">Update Password</div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col">
            {Object.keys(profileDetails).map((key, index) => (
                <div className="row mb-3" key={key}>
                    <div className="col-md-3 col-lg-2 " id={key + '-label'}>
                        <label htmlFor="name" className="form-label">{`${key.at(0).toUpperCase()}${key.slice(1)}`} :</label>
                    </div>
                    <div className="col-sm-9 col-md-5 col-lg" id={key + '-input'}>
                        {key === 'email' ?
                            (<div className="form-control" id={key} name={key}>
                                {profileDetails[key]}
                            </div>)
                            :
                            key === 'gender' ?
                                (<div className="row p-1">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="MALE"
                                            name={key} id={key} checked={profileDetails[key] === 'MALE'}
                                            onChange={onInputChange} />
                                        <label className="form-check-label ms-1" htmlFor={key} >Male</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="FEMALE"
                                            name={key} id={key} checked={profileDetails[key] === 'FEMALE'}
                                            onChange={onInputChange} />
                                        <label className="form-check-label ms-1" htmlFor={key} >Female</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="OTHER"
                                            name={key} id={key} checked={profileDetails[key] === 'OTHER'}
                                            onChange={onInputChange} />
                                        <label className="form-check-label ms-1" htmlFor={key} >Other</label>
                                    </div>
                                </div>
                                )
                                :
                                (<input
                                    type={key==='dob'?'date':key==='pincode'?'number':'text'}
                                    min={key==='pincode'?0:''}
                                    className="form-control" id={key} name={key} required="required"
                                    value={profileDetails[key] ? profileDetails[key] : ""} onChange={onInputChange} />
                                )}
                    </div>
                    <div className="col-sm-0 col-md-2 col-lg" id={key + '-side'}></div>
                </div>
            ))}
        </div>
        <div className="m-2 text-center">
            <button className="btn btn-secondary btn-lg me-3">Cancel</button>
            <button className="btn btn-primary btn-lg" onClick={saveProfile}>Save</button>
        </div>
    </div>
    )
}

export default UserProfile;