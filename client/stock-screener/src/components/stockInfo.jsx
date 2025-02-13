import React, { useEffect, useState } from "react";
import { getStockInfo, getStockMetricsInfo } from "../services/stock";
import { toast } from "react-toastify";
import { log } from "../utils/logger";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function StockInfo() {
    const id = useSelector(state => state.stockData.id)
    const [stock, setStock] = useState([]);
    const [columns, setColumns] = useState([]);
    const [financialMetrics, setFinancialMetrics] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        if (id === 0) {
            toast.warn("Please select a stock first!")
            navigate("/")
        } else {
            getData();
        }
    }, [id]);

    const getData = async () => {
        const response = await getStockInfo(id);
        if (response && response.status === 200) {
            setStock(response.data);

            getMetrics(id);
        }
    };

    const getMetrics = async (id) => {
        toast.info("Loading data please wait!")
        let response = await getStockMetricsInfo(id)
        log(response)
        if (response && response['status'] === 200) {
            setFinancialMetrics(response.data)

            const responseFields = Object.keys(response.data[0]);
            const dynamicColumns = responseFields.filter((data) => data !== "stockId").map((field) => ({
                field,
                headerName: `${field.charAt(0).toUpperCase() + field.slice(1)}`,
                width: 120,
            }));
            setColumns(dynamicColumns);
        }
    }

    return (<div className="container mt-5">
        <div className="card p-3 mb-4">
            {stock && (
                <>
                    <h3 className="p-3">{stock.name} - {stock.symbol}</h3>
                    <div className="px-4" key={stock.id}>
                        <div className="row">
                            <div className="col-12 mb-3"><tab />{stock.description}</div>
                            <div className="col-12 mb-3"><b>Address: </b>{stock.address}</div>
                            <div className="col-12 col-md-4 mb-3"><b>CIK:</b> {stock.cik}</div>
                            <div className="col-12 col-md-4 mb-3"><b>Asset Type:</b> {stock.assetType}</div>
                            <div className="col-12 col-md-4 mb-3"> <b>Fiscal Year End: </b>{stock.fiscalYearEnd}</div>
                            <div className="col-12 col-md-4 mb-3"><b>Currency: </b> {stock.currency}</div>
                            <div className="col-12 col-md-4 mb-3"><b>Country: </b> {stock.country}</div>
                            <div className="col-12 col-md-4 mb-3"> <b>Exchange: </b>{stock.exchange}</div>
                            <div className="col-12 col-md-4 mb-3"><b>Sector: </b> {stock.sector}</div>
                            <div className="col-12 col-md-4 mb-3"><b>Industry: </b> {stock.industry}</div>
                            <div className="col-12 col-md-4 mb-3"></div>
                        </div>

                    </div>
                </>
            )}
        </div>

        <h4>Financial Metrics</h4>
        <div className="card">
            <div className="data-grid-container">
                <DataGrid rows={financialMetrics} columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 30]} />
            </div>
        </div>
    </div>
    );
}

export default StockInfo;
