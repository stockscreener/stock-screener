import { useEffect, useState } from "react";
import { getUserProfile, saveUserProfile } from "../services/user";
import { log } from "../utils/logger";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authName } from "../features/authSlice";
import { Link } from "react-router-dom";

function UserProfile() {
    const [profileDetails, setProfileDetails] = useState({})
    const [tempDetails, setTempDetails] = useState({})
    useEffect(() => {
        log("use effect of profile")
        async function getProfile() {
            let response = await getUserProfile()
            setProfileDetails(response.data)
            setTempDetails(response.data)
        }
        getProfile()
    }, [])
    const dispatch = useDispatch()
    const occupations = ['BUSINESS', 'SERVICE', 'GOVT_EMPLOYEE', 'PROFESSIONAL', 'HOMEMAKER', 'STUDENT', 'RETIRED', 'OTHERS']
    const industries = ['AUTO_AND_AUTO_ANCILLARY', 'BANKING_AND_FINANCIAL_SERVICES', 'FMCG', 'INFORMATION_TECHNOLOGY',
        'MEDIA_AND_ENTERTAINMENT', 'PHARMA_AND_HEALTHCARE', 'RETAIL', 'REAL_ESTATE', 'TELECOM', 'TRAVEL_AND_TOURISM', 'OTHERS']
    const annualIncomes = ['LESS_THAN_5_LAKHS', 'BETWEEN_5_LAKHS_TO_10_LAKHS', 'BETWEEN_10_LAKHS_TO_15_LAKHS', 'BETWEEN_15_LAKHS_TO_20_LAKHS', 'MORE_THAN_20_LAKHS']
    const genders = ['MALE', 'FEMALE', 'OTHER']
    const getDisplayName = (nameValue) => {
        let displayName = ""
        nameValue.split("_").forEach(name => { displayName = displayName.concat(name.charAt(0) + name.slice(1).toLowerCase() + " ") })
        return displayName
    }

    const saveProfile = async () => {
        log(profileDetails)
        let uri = profileDetails.hasOwnProperty('verificationStatus') ? "/users/advisor/profile" : profileDetails.hasOwnProperty('industry') ? "/users/investor/profile" : "/users/admin/profile"
        const response = await saveUserProfile(uri, profileDetails);
        log(response);
        if (response['status'] === 200) {
            toast.success('Profile Updated !');
            setProfileDetails(response.data)
            setTempDetails(response.data)
            if (profileDetails['name'] !== null && profileDetails['name'].length !== 0) {
                dispatch(authName(profileDetails['name']))
            }
        }
    }

    const onInputChange = (e) => {
        let copyOfState = { ...profileDetails };
        copyOfState[e.target.name] = e.target.value;
        setProfileDetails(copyOfState);
    }

    const clearChanges = () => {
        setProfileDetails(tempDetails);
    }

    const generateSelectOptions = (selectKey, listOptions) => {
        return <select class="form-select" name={selectKey} id={selectKey} value={profileDetails[selectKey]} onChange={onInputChange}>
            <option value="" selected={profileDetails[selectKey] === ""}>Select</option>
            {listOptions.map((optionName) =>
            (<option value={optionName} selected={profileDetails[selectKey] === optionName}>
                {getDisplayName(optionName)}
            </option>)
            )}
        </select>
    }

    const generateRadioButtons = (selectKey, radioNames) => {
        return <div className="row p-1">
            {
                radioNames.map((radioName) => (
                    <div className="col">
                        <input className="form-check-input" type="radio" value={radioName}
                            name={selectKey} id={selectKey} checked={profileDetails[selectKey] === radioName}
                            onChange={onInputChange} />
                        <label className="form-check-label ms-1" htmlFor={selectKey}>{getDisplayName(radioName)}</label>
                    </div>))
            }
        </div>
    }

    return (<div className="container mt-5">
        <div className="row">
            <button class="btn btn-primary pb-3" type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"
            style={{borderRadius:30, width:80, height:30, position:"absolute", top:72, left:15}}
            ><h5 style={{position:"relative", top:-4, left:-2}}>Menu</h5></button>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Stock Screener</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
               
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page">Profile</div>
                        </li>
                        <li>
                            <div className="nav-link link-dark"><Link className="nav-link link-body-emphasis" to={"/profile/password"}>Update Password</Link></div>
                        </li>
                    </ul>
               
                </div>
            </div>
            
            <div className="col">
                {Object.keys(profileDetails).map((key, index) => (
                    <div className="row mb-3" key={key}>
                        <div className="col-md-3 col-lg-2" id={key + '-label'}>
                            <label htmlFor="name" className="form-label">{`${key.at(0).toUpperCase()}${key.slice(1)}`}</label>
                        </div>
                        <div className="col-sm-9 col-md-5 col-lg" id={key + '-input'}>
                            {key === 'email' || key === 'verificationStatus' || key === 'verificationRemark'
                                ? (<div className="form-control bg-secondary-subtle " id={key} name={key}>{profileDetails[key] ? profileDetails[key] : "No Remarks!"}</div>)
                                : key === 'gender' ? generateRadioButtons(key, genders)
                                    : key === 'occupation' ? generateSelectOptions(key, occupations)
                                        : key === 'industry' ? generateSelectOptions(key, industries)
                                            : key === 'annualIncome' ? generateSelectOptions(key, annualIncomes)
                                                : (<input
                                                    type={key === 'dob' || key === 'validTill' ? 'date' : key === 'pincode' ? 'number' : 'text'}
                                                    min={key === 'pincode' ? 0 : ''}
                                                    className="form-control" id={key} name={key} required="required"
                                                    value={profileDetails[key] ? profileDetails[key] : ""} onChange={onInputChange} />)
                            }
                        </div>
                        <div className="col-sm-0 col-md-2 col-lg" id={key + '-side'}></div>
                    </div>
                ))}
            </div>
            <div className="m-2 text-center">
                <button className="btn btn-secondary btn-lg me-3" onClick={() => clearChanges()}>Cancel</button>
                <button className="btn btn-primary btn-lg" onClick={saveProfile}>Save</button>
            </div>
        </div>
    </div>
    )
}

export default UserProfile;