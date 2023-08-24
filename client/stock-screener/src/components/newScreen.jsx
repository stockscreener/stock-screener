import { useEffect, useState } from "react"
import { getStockAttributes } from "../services/screen"
import { log } from "../utils/logger"
import { toast } from "react-toastify"

function NewScreen() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stockAttributes, setStockAttributes] = useState([])

    useEffect(() => {
        log("in use effect of new screen")
        debugger
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

    return (<div className="container mt-5">
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
    </div>)
}

export default NewScreen