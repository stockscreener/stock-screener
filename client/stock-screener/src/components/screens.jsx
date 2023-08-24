import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { getAllScreensApi } from '../services/screen'
import { log } from '../utils/logger'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Screens(){
    const [screens, setScreens] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        log("in use effect of screen")
        const fetchScreens = async () => {
            let response = await getAllScreensApi("/screens");
            log(response);
            if (response && response.status === 200) {
                if(response.data.length === 0){
                    toast.info("No Screens Available Yet!")
                }
                setScreens(response.data);
            }
        };
        fetchScreens();
    },[])

    return (<div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='float-end mt-3'><button className='btn btn-primary' onClick={()=>navigate("/screens/new")}>New Screen</button></div>
                <div className='row mt-5'>
                    {screens.map((screen)=>{
                        return <div className='card my-3 ps-3 rounded-4 ' id={"#screen-"+screen.id}>
                                    <h3 className='mt-2'>{screen.name}</h3>
                                    <p> - by {screen.username ? screen.username : "unknown"}</p>
                                    <p className='text-secondary'>{screen.description}</p>
                                   
                                    {screen.isPremium}
                                </div>})}
                </div>
            </div>
        </div>
    </div>)
}

export default Screens