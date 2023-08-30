import { useState } from "react"
import { deleteUserAccount, saveFeedback } from "../services/user"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import { log } from "../utils/logger"

function Support() {
    const [buttonClass, setButtonClass] = useState("Feedback")
    const [review, setReview] = useState("")
    const [reason, setReason] = useState("")
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendFeedback = async () => {
        let response = await saveFeedback({ 'review': review })
        if (response['status'] === 200) {
            toast.success(response.data)
            setReview('')
        }
    }

    const deleteAccount = async () => {
        log({ reason, password })
        let response = await deleteUserAccount({ "reason": reason, "password": password })
        if (response['status'] === 200) {
            toast.success(response.data)
            setReason('')
            setPassword('')
            sessionStorage.clear()
            dispatch(logout())
            navigate("/")
        }
    }

    return (<div className="container mt-3">
        <button class="btn btn-primary pb-3" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"
            style={{ borderRadius: 30, width: 80, height: 30, position: "absolute", top: 72, left: 15 }}
        ><h5 style={{ position: "relative", top: -4, left: -2 }}>Menu</h5></button>

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Stock Screener</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                
                
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <div className={buttonClass === "Feedback" ? "nav-link active" : "nav-link link-dark"} >
                                <button className="nav-link link-body-emphasis" onClick={() => setButtonClass("Feedback")}>Feedback</button>
                            </div>
                        </li>
                        <li>
                            <div className={buttonClass === "Delete Account" ? "nav-link active" : "nav-link link-dark"}>
                                <button className="nav-link link-body-emphasis" onClick={() => setButtonClass("Delete Account")}>Delete Account</button></div>
                        </li>
                    </ul>
            </div>
        </div>
        <h3 className="">{buttonClass}</h3>
        <hr className="mb-5" />
        {buttonClass === "Feedback" &&
            <div className="container mt-4 px-5">

                <div class="mb-3">
                    <textarea type="text" rows={6} value={review}
                        class="form-control" name="review" id="review" placeholder="Write your views to us!" onChange={(e) => setReview(e.target.value)} />
                </div>
                <div className="m-2 text-center mt-4">
                    <button className="btn btn-danger btn-lg me-3" onClick={() => setReview('')} >Clear</button>
                    <button className="btn btn-primary btn-lg" onClick={sendFeedback}>Submit</button>
                </div>
            </div>
        }
        {buttonClass === "Delete Account" &&
            <div className="container m-auto mt-4 px-5">
                <div class="mb-3">
                    <div class="mb-3">
                        <label for="" class="form-label">Reason</label>
                        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)}
                            class="form-control" name="reason" placeholder="Why do you wish to delete this account?" />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            class="form-control" name="password" placeholder="Enter your current Password" />
                    </div>
                </div>
                <div className="m-2 text-center mt-4">
                    <button className="btn btn-danger btn-lg me-3" onClick={() => { setReason(''); setPassword('') }} >Cancel</button>
                    <button className="btn btn-primary btn-lg" onClick={deleteAccount}>Delete</button>
                </div>
            </div>

        }
    </div>)
}

export default Support