import { useEffect, useState } from "react"
import { addNewScreen, getStockAttributes } from "../services/screen"
import { log } from "../utils/logger"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function NewScreen() {
    const navigate = useNavigate()
    const loginStatus = useSelector((state) => state.auth.status)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stockAttributes, setStockAttributes] = useState([])
    const initialFilterMap = new Map(stockAttributes.map(attr => [attr.id, { stockAttributeId:attr.id, filterConstraint: "EQUAL", value: "" }]));
    const [screenFilterMap, setScreenFilterMap] = useState(initialFilterMap);

    // {
    //     "stockAttributeId": 0,
    //     "filterConstraint": "EQUAL",
    //     "value": 0,
    //     "columnPosition": 0
    //   }
    const id = sessionStorage['id']

    const handleFilterChange = (stockAttributeId, field, value) => {
        if (field === "value" && value === 0) {
            const updatedMap = new Map(screenFilterMap);
            updatedMap.delete(stockAttributeId);
            setScreenFilterMap(updatedMap);
        } else {
            const updatedFilter = { ...screenFilterMap.get(stockAttributeId), [field]: value };
            const updatedMap = new Map(screenFilterMap);
            updatedMap.set(stockAttributeId, updatedFilter);
            setScreenFilterMap(updatedMap);
        }
    };

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
                log(stockAttributes)
            }
        };
        fetchScreens();
    }, [])


    const saveScreen = async () => {
        if (!loginStatus) {
            toast.warn("Login first to use this functionality!");
        } else if (name.length === 0) {
            toast.error("Enter a Screen Name!");
        } else if (description.length === 0) {
            toast.error("Enter some Description!");
        } else {
            const filteredScreenFilters = Array.from(screenFilterMap, ([stockAttributeId, filter]) => (
                {
                    stockAttributeId,
                    filterConstraint: filter.filterConstraint || "EQUAL",
                    value: filter.value || 0
                }
            )).filter(filter=>filter.value !== 0);
    
            
            log(filteredScreenFilters)
            let response = await addNewScreen({
                userId: id,
                name,
                description,
                screenFilters: filteredScreenFilters
            });

            log(response);
            if (response && response.status === 200) {
                toast(response.data.message);
                navigate("/screens")
            }
        }
    };


    return (<div className="container mt-2">
        <h4 className="">Create New Screen</h4><hr></hr>
        <div className="col-12">
            <div className="row mb-2">
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
            <div className="row mb-2">
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
            <h5>Select Filters: </h5>
            <hr />
            <div className="overflow-y-auto row" style={{ height: "calc(46vh)" }}>
                {stockAttributes.map((attribute) => (
                    <div className="col-sm-12 col-md-6 mb-4" key={attribute.id}>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-control form-control-lg">
                                    {attribute.displayName}
                                </div>
                            </div>
                            <div className="col-4">
                                <select
                                    className="form-select form-select-lg"
                                    value={screenFilterMap.get(attribute.id)?.filterConstraint || "EQUAL"}
                                    onChange={(e) => handleFilterChange(attribute.id, "filterConstraint", e.target.value)}
                                >
                                    <option value="EQUAL">EQUAL</option>
                                    <option value="BELOW">BELOW</option>
                                    <option value="ABOVE">ABOVE</option>
                                    <option value="BELOW_OR_EQUAL">BELOW OR EQUAL</option>
                                    <option value="ABOVE_OR_EQUAL">ABOVE OR EQUAL</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    value={screenFilterMap.get(attribute.id)?.value || ""}
                                    onChange={(e) => handleFilterChange(attribute.id, "value", e.target.value)}
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="m-2 text-center">
            <button className="btn btn-secondary btn-lg me-3">Cancel</button>
            <button className="btn btn-primary btn-lg" onClick={() => saveScreen()}>Save</button>
        </div>
    </div>)
}

export default NewScreen