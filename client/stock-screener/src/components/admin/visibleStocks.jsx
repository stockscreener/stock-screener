import { useEffect, useState } from "react"
import { getStocksShort, saveVisibleStocks } from "../../services/stock";
import { log } from "../../utils/logger";
import { toast } from "react-toastify";

function VisibleStocks() {
    const [stocks, setStocks] = useState([]);
    useEffect(() => {        
        getStocks()
    }, [])

    const getStocks = async () => {
        let response = await getStocksShort()
        log(response)
        if (response && response['status'] === 200) {
            setStocks(response.data)
            log(response.data)
        }
    }
    const changeVisibility = (id)=>{
        let newStocks = stocks.map((stock)=>{
            if(stock['stockId']===id){
                stock.visible = !stock.visible
            }
            return stock
        })
        setStocks(newStocks)
    }

    const saveChanges = async ()=>{
        let response = await saveVisibleStocks(stocks)
        if(response && response['status']===200){
            toast.success("Changes Saved!")
        }
    }

    return (<div className="container mt-4">
        <h3 className="mt-3">Manage Visible Stocks</h3>
        <hr className="mb-5" />
        <div className="container mt-4 px-5">
            <div className="row mt-3" >

                <div className="overflow-y-auto row" style={{ maxHeight: "calc(68vh)" }}>
                    {stocks.map((stock) => {
                        return <div className="col-sm-6 col-md-4 col-md-3 mb-4 my-auto">
                            <div className="form-check fs-3">
                                <input className="form-check-input" type="checkbox" value={stock.stockId} id="flexCheckDefault" 
                                onChange={()=>changeVisibility(stock.stockId)} checked={stock.visible}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    <h5>{stock.name}</h5>
                                </label>
                            </div>
                        </div>
                    })}</div>
            </div>
            <div className="m-2 text-center mt-4">
                <button className="btn btn-secondary btn-lg me-3" onClick={getStocks}>Cancel</button>
                <button className="btn btn-primary btn-lg" onClick={saveChanges}>Save</button>
            </div>
        </div>
    </div>)
}

export default VisibleStocks
