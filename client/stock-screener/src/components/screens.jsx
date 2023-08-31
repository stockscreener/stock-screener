import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { getAllScreensApi } from '../services/screen'
import { log } from '../utils/logger'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaCrown } from 'react-icons/fa';
import { checkIfPremium } from '../services/user'
import { useSelector } from 'react-redux'

function Screens() {
    const [screens, setScreens] = useState([])
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.auth.status)
    useEffect(() => {
        const fetchScreens = async () => {
            let response = await getAllScreensApi();
            log(response);
            if (response && response['status'] === 200) {
                if (response.data.length === 0) {
                    toast.info("No Screens Available Yet!")
                }
                setScreens(response.data);
            }
        };
        fetchScreens();
    }, [])

    const showScreenDetails = async (premium) => {

        log(isLoggedIn)
        if (premium && !isLoggedIn) {
            toast.error("Please Login to see this screen!")
        }
        else if (!premium) {
            navigate("/")
        } else {
            let response = await checkIfPremium()
            if (response && response.data) {
                navigate("/")
            } else {
                toast.error("You must be a Premium User to view this screen!")
            }
        }
    }

    return (<div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='float-end mt-3'><button className='btn btn-primary' onClick={() => navigate("/screens/new")}>New Screen</button></div>
                <div className='row mt-5'>
                    {screens.map((screen) => {
                        return <div className='card py-2 my-3 ps-5 rounded-4'
                            id={"#screen-" + screen.id}
                            onClick={() => showScreenDetails(screen.premium)}
                        >
                            <div className='col'>
                                <div className='float-end me-3'>
                                    {screen.premium && <FaCrown className='fs-2' style={{ color: "gold" }}></FaCrown>}
                                </div>
                                <div>
                                    <h3 className='mt-2'>{screen.name}</h3>
                                    <p> - by {screen.username ? screen.username : "unknown"}</p>
                                    <p className='text-secondary'>{screen.description}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>)
}

export default Screens