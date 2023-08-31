import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { getMyScreensApi } from '../services/screen'
import { log } from '../utils/logger'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaCrown } from 'react-icons/fa';

function MyScreens() {
    const [screens, setScreens] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        log("in use effect of screen")
        const fetchScreens = async () => {
            let response = await getMyScreensApi("/screens/myscreens");
            log(response);
            if (response && response.status === 200) {
                if (response.data.length === 0) {
                    toast.info("No Screens Available Yet!")
                }
                setScreens(response.data);
            }
        };
        fetchScreens();
    }, [])

    return (<div className='container'>
        <h4 className='mt-4'>Screens {">"} My Screens
        <button className='btn btn-primary float-end ' onClick={() => navigate("/screens/new")}>New Screen</button>
        </h4>
        <div className='row'>
            <div className='col'>
                <div className='row mt-2'>
                    {screens.map((screen) => {
                        return <div className='card py-2 my-3 ps-5 rounded-4 ' id={"#screen-" + screen.id}>
                            <div className='col'>
                                <div className='float-end me-3'>
                                   {screen.premium && <FaCrown className='fs-2' style={{color:"gold"}}></FaCrown>}
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

export default MyScreens