import { useEffect, useState } from "react"
import { addNewWatchlist, getAllWatchlist } from "../services/watchlist"
import { log } from "../utils/logger"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

function Watchlist() {
    const loginStatus = useSelector((state)=>state.auth.status)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stockAttributes, setStockAttributes] = useState([])
    // {
    //     "stockAttributeId": 0,
    //     "filterConstraint": "EQUAL",
    //     "value": 0,
    //     "columnPosition": 0
    //   }
    const id = sessionStorage['id']

    useEffect(() => {
        log("in use effect of new screen")
        const fetchWatchlist = async () => {
            let response = await getAllWatchlist();
            log(response);
            if (response && response.status === 200) {
                if (response.data.length === 0) {
                    toast.info("No Attributes available yet!")
                }
                setStockAttributes(response.data);
            }
        };
        fetchWatchlist();
    }, [])


    const saveWatchlist= async ()=>{
        if(!loginStatus){
            toast.warn("Login first to use this functionality!")
        }else if(name.length === 0 ){
            toast.error("Enter a watchlist name!")
        }else if(description.length === 0){
            toast.error("Enter some companies!")
        }else{
        let response = await addNewWatchlist({
            'userId':id,
            name,
            description,
            
        });
            log(response);
            if (response && response.status === 200) {
                toast(response.data.message)
            }
        }
    }

    return (<div className="container mt-2">
        <h4 className="text-center mb-3">Create New watchlist</h4>
        <div className="col-12">
            <div className="row mb-3">
                <div className="col-md-3 col-lg-2">
                    <label htmlFor="name" className="form-label">Name</label>
                </div>
                <div className="col-sm-9 col-md-5 col-lg">
                    <input type="text" className="form-control" id="name" required="required" autoFocus
                        autoComplete='screen-name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-sm-0 col-md-2 col-lg"></div>
            </div>
        </div>
        <div className="col-12">
            <div className="row mb-3">
                <div className="col-md-3 col-lg-2">
                    <label htmlFor="description" className="form-label">Add companies</label>
                </div>
                <div className="col-sm-12 col-md-8">
                    <textarea className="form-control col p-2" id="description" required="required"
                        autoComplete='screen-description' rows="3" maxLength={255}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
        </div>
     
        <div className="m-2 text-center">
            {/* <button className="btn btn-secondary btn-lg me-3">Cancel</button> */}
            <button className="btn btn-warning btn-lg me-3">
                <Link to="/">Cancel</Link>
            </button>
            <button className="btn btn-primary btn-lg" onClick={()=>saveWatchlist()}>Save</button>
        </div>
    </div>)
}

export default Watchlist;