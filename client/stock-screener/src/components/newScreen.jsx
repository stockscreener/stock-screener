import { useEffect, useState } from "react"
import { addNewScreen, getStockAttributes } from "../services/screen"
import { log } from "../utils/logger"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

function NewScreen() {
    const loginStatus = useSelector((state)=>state.auth.status)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stockAttributes, setStockAttributes] = useState([])
    const [screenFilters, setScreenFilters ] = useState([])
    // {
    //     "stockAttributeId": 0,
    //     "filterConstraint": "EQUAL",
    //     "value": 0,
    //     "columnPosition": 0
    //   }
    const id = sessionStorage['id']

    useEffect(() => {
        log("in use effect of new screen")
        const fetchScreens = async () => {
            let response = await getStockAttributes();
            log(response);
            if (response && response.status === 200) {
                if (response.data.length === 0) {
                    toast.info("No Attributes available yet!")
                }
                setStockAttributes(response.data);
            }
        };
        fetchScreens();
    }, [])


    const saveScreen = async ()=>{
        if(!loginStatus){
            toast.warn("Login first to use this functionality!")
        }else{
        let response = await addNewScreen({
            'userId':id,
            name,
            description,
            screenFilters
        });
            log(response);
            if (response && response.status === 200) {
                toast(response.data.message)
            }
        }
    }

    return (<div className="container mt-2">
        <h4 className="text-center mb-3">Create New Screen</h4>
        <div className="col-12">
            <div className="row mb-3">
                <div className="col-md-3 col-lg-2">
                    <label htmlFor="name" className="form-label">Screen Name :</label>
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
                    <label htmlFor="description" className="form-label">Description :</label>
                </div>
                <div className="col-sm-12 col-md-8">
                    <textarea className="form-control col p-2" id="description" required="required"
                        autoComplete='screen-description' rows="3" maxLength={255}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
        </div>
        <div className="row" >
            <h3>Select Filters: </h3>
            <hr/>
            <div className="overflow-y-auto row" style={{height:500}}>
                {stockAttributes.map((attribute) => {
                return <div className="col-sm-12 col-md-6 mb-4">
                    <div className="row">
                        <div class="col-4">
                            <div type="text"
                                class="form-control form-control-lg" name="" id="" aria-describedby="helpId">{attribute.displayName}</div>
                        </div>
                        <div class="col-4 ">
                            <select class="form-select form-select-lg" name="" id="">
                                <option selected value="EQUAL">EQUAL</option>
                                <option value="BELOW">BELOW</option>
                                <option value="ABOVE">ABOVE</option>
                                <option value="BELOW_OR_EQUAL">BELOW OR EQUAL</option>
                                <option value="ABOVE_OR_EQUAL">ABOVE OR EQUAL</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <input type="text"
                                class="form-control form-control-lg" name="" id="" aria-describedby="helpId" placeholder="" />
                        </div>
                    </div>
                </div>
            })}</div>
        </div>
        <div className="m-2 text-center">
            <button className="btn btn-secondary btn-lg me-3">Cancel</button>
            <button className="btn btn-primary btn-lg" onClick={()=>saveScreen()}>Save</button>
        </div>
    </div>)
}

export default NewScreen