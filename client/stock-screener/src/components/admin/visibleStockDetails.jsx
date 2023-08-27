import { useState } from "react"

function VisibleStockDetails() {
    const [stocks, setStocks] = useState(['NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG', 'NGBH', 'JGVHBJ', 'GVS', 'JHVJBJ', 'JGVHG'])

    return (<div className="container mt-4">
        <h3 className="">Manage Stock Details</h3>
        <hr className="mb-5" />
        <div className="container mt-4 px-5">
            <div className="row mt-3" >

                <div className="overflow-y-auto row" style={{ maxHeight: "calc(68vh)" }}>
                    {stocks.map((stock) => {
                        return <div className="col-sm-6 col-md-4 col-md-3 mb-4 my-auto">
                            <div class="form-check fs-3">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    <h5>{stock} Stock Detail</h5>
                                </label>
                            </div>
                        </div>
                    })}</div>
            </div>
            <div className="m-2 text-center mt-4">
                <button className="btn btn-secondary btn-lg me-3">Cancel</button>
                <button className="btn btn-primary btn-lg" >Save</button>
            </div>
        </div>
    </div>
    )
}

export default VisibleStockDetails
