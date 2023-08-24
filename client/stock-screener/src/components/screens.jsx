import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { getAllScreensApi } from '../services/screen'
import { log } from '../utils/logger'
import { toast } from 'react-toastify'

function Screens(){

    const [screens, setScreens] = useState([])
    useEffect(()=>{
        log("in use effect of screen")
        debugger
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
            <div className='col-3'></div>

            <div className='col'>
                <div className='float-end mt-3'><button className='btn btn-primary '>New Screen</button></div>
                <div className='row'>
                    {screens.map((screen)=>{
                        return <div className='card col-6' id={"#screen-"+screen.id}>
                                    <h3>{screen.name}</h3>
                                    <p>{screen.description}</p>
                                    <p> - by {screen.username}</p>
                                    {screen.isPremium}
                                </div>})}
                </div>
            </div>
        </div>
    </div>)
}

export default Screens