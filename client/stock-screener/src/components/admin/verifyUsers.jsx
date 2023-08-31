import { useEffect, useState } from "react"
import { getVerificationProfile, sendVerification } from "../../services/user"
import { log } from "../../utils/logger"
import { useNavigate } from "react-router-dom"

function VerifyUsers(props) {
    const navigate = useNavigate()
    const id = props.id
    const [profileDetails, setProfileDetails] = useState({})
    const [remark, setRemark] = useState('')

    useEffect(() => {
        log("use effect of profile")
        async function getProfile() {
            let response = await getVerificationProfile(id)
            if(response && response['status']===200){
                setProfileDetails(response.data)
                setRemark(response.data.verificationRemark)
        }
        }
        getProfile()
    }, [])

    const clearChanges = () => {
        let details = { ...profileDetails }
        details['verificationRemark'] = remark
        setProfileDetails(details)
    }

    const verifyUser = async (status) => {
        let response = await sendVerification({ 'id': id, 'verificationStatus': status, 'verificationRemark': profileDetails.verificationRemark })
        if (response && response['status'] === 200) {
            let details = { ...profileDetails }
            details['verificationStatus'] = response.data.verificationStatus
            details['verificationRemark'] = response.data.verificationRemark
            setRemark(response.data.verificationRemark)
            setProfileDetails(details)
        }
    }

    const onInputChange = (e) => {
        let copyOfState = { ...profileDetails };
        copyOfState[e.target.name] = e.target.value;
        setProfileDetails(copyOfState);
    }

    return (<div className="container mt-5 row">
        <div className="col"></div>
        <div className="col-10 col-md-8 col-lg-8">
            {Object.keys(profileDetails).map((key, index) => (
                <div className="row mb-3" key={key}>
                    <div className="col-md-3 col-lg-3" id={key + '-label'}>
                        <label htmlFor="name" className="form-label">{`${key.at(0).toUpperCase()}${key.slice(1)}`}</label>
                    </div>
                    <div className="col-sm-9 col-md-5 col-lg" id={key + '-input'}>
                        {key === "verificationRemark" ?
                            (<input
                                type='text' className="form-control" id={key} name={key} required="required"
                                value={profileDetails[key] ? profileDetails[key] : ""} onChange={onInputChange} />)
                            : (<div className="form-control bg-secondary-subtle " id={key} name={key}>{profileDetails[key] ? profileDetails[key] : " -"}</div>)}
                    </div>
                </div>
            ))}

            <div className="m-2 text-center">
                <button className="btn btn-secondary btn-lg me-3" onClick={() => clearChanges()}>Clear Changes</button>
                <button className="btn btn-danger btn-lg me-3" onClick={() => { verifyUser('REJECTED'); navigate("/admin/users") }}>Reject</button>
                <button className="btn btn-primary btn-lg" onClick={() => { verifyUser('VERIFIED'); navigate("/admin/users") }}>Verify</button>
            </div>
        </div>
        <div className="col"></div>
    </div>
    
    )
}
export default VerifyUsers