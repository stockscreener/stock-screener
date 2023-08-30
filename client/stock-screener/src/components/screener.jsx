import { useEffect, useState } from "react";
import { getStockDetails } from "../services/stock";
import { DataGrid } from "@mui/x-data-grid";
import { log } from "../utils/logger";
import { getStockAttributes } from "../services/screen";
import { toast } from "react-toastify";

function Screener() {
    const [stocks, setStocks] = useState([])
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        getStocks()
    }, [])
    const getStocks = async () => {
        let response = await getStockDetails()
        log(response)
        if (response['status'] === 200) {
            setStocks(response.data)

            const responseFields = Object.keys(response.data[0]);
            const dynamicColumns = responseFields.map((field) => ({
                field,
                headerName: `${field.charAt(0).toUpperCase() + field.slice(1)}`,
                width: 100,
            }));
            setColumns(dynamicColumns);
        }
    }

    const handleStockClick = (params) => {
        // toast(params.id)

    }

    return (
        <div className="container mt-5">
            <h4>Screener</h4>
            <div className="border">
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