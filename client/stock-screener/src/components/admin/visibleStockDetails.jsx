import { useEffect, useState } from "react"
import { getAdminStockAttributes, updateStockAttributes } from "../../services/screen";
import { log } from "../../utils/logger";
import { toast } from "react-toastify";

function VisibleStockDetails() {
    const [attributes, setAttributes] = useState([])
    useEffect(()=>{
        const fetchScreens = async () => {
            let response = await getAdminStockAttributes();
            log(response);
            if (response && response.status === 200) {
                if (response.data.length === 0) {
                    toast.info("No Attributes available yet!")
                }
                setAttributes(response.data);
            }
        };
        fetchScreens();
    }, []) 

    const updateAttributes = async()=>{
        log(attributes)
        let response = updateStockAttributes(attributes)
        if(response['status']===200){
            log(response.data)
            setAttributes(response.data)
        }
    }

    const changeVisible = (id)=>{
        let newAttrs = []
        newAttrs = attributes.map((attr)=>{
            if(attr.id===id){
                attr.visible = !attr.visible
            }
            return attr
        });
        setAttributes(newAttrs)
    }

    return (<div className="container mt-4">
        <h3 className="">Manage Stock Details</h3>
        <hr className="mb-5" />
        <div className="container mt-4 px-5">
            <div className="row mt-3" >

                <div className="overflow-y-auto row" style={{ maxHeight: "calc(68vh)" }}>
                    {attributes.map((attribute) => {
                        return <div className="col-sm-6 col-md-4 col-md-3 mb-4 my-auto" key={attribute.id}>
                            <div class="form-check fs-3">
                                <input class="form-check-input" type="checkbox" value={attribute.id} id="flexCheckDefault"
                                 checked={attribute.visible===true} onChange={()=>changeVisible(attribute.id)}/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    <h5>{attribute.displayName}</h5>
                                </label>
                            </div>
                        </div>
                    })}</div>
            </div>
            <div className="m-2 text-center mt-4">
                <button className="btn btn-secondary btn-lg me-3">Cancel</button>
                <button className="btn btn-primary btn-lg" onClick={updateAttributes}>Save</button>
            </div>
        </div>
    </div>
    )
}

export default VisibleStockDetails
