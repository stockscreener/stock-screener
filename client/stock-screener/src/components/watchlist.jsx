import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { log } from '../utils/logger'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getAllWatchlist } from '../services/watchlist'

function Watchlist() {
    const [watchlist, setWatchlist] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        log("in use effect of screen")
        const fetchWatchlist = async () => {
            let response = await getAllWatchlist("/watchlist");
            log(response);
            if (response && response.status === 200) {
                if (response.data.length === 0) {
                    toast.info("No Watchlist Available Yet!")
                }
                setWatchlist(response.data);
            }
        };
        fetchWatchlist();
    }, [])

    return (<div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='float-end mt-3'><button className='btn btn-primary' onClick={() => navigate("/watchlist/create_new_watchlist")}>Add New Watchlist </button></div>
                <div className='row mt-5'>
                    {watchlist.map((watchlist) => {
                        return <div className='card py-2 my-3 ps-5 rounded-4 ' id={"#watchlist-" + watchlist.id}>
                            <div className='col'>
                               
                                <div>
                                    <h3 className='mt-2'>{watchlist.name}</h3>
                                    <p> - by {watchlist.username ? watchlist.username : "unknown"}</p>
                                    <p className='text-secondary'>{watchlist.description}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>)
}

export default Watchlist