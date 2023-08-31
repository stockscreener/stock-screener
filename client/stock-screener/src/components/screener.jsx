import { useEffect, useState } from "react";
import { getStockDetails } from "../services/stock";
import { DataGrid } from "@mui/x-data-grid";
import { log } from "../utils/logger";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { stockInfo } from "../features/stockSlice";

function Screener() {
    const [stocks, setStocks] = useState([])
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getStocks()
    }, [])
    const getStocks = async () => {
        toast.info("Loading data please wait!")
        let response = await getStockDetails()
        log(response)
        if (response && response['status'] === 200) {
            setStocks(response.data)

            const responseFields = Object.keys(response.data[0]);
            const dynamicColumns = responseFields.map((field) => ({
                field,
                headerName: `${field.charAt(0).toUpperCase() + field.slice(1)}`,
                width: 120,
            }));
            setColumns(dynamicColumns);
        }
    }

    const handleStockClick = (params) => {
        dispatch(stockInfo(params.id))
        navigate(`/stock-info/`)
    }


    return (
        <div className="container mt-5">
            <h4>Screener</h4>
            <div className="card">
                <DataGrid rows={stocks} columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    onRowClick={handleStockClick} />
            </div>
        </div>)
}

export default Screener;