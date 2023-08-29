import { useEffect, useState } from "react"
import { changeUserStatusApi, getLimitedUserDetailsApi } from "../../services/user"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { log } from "../../utils/logger";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import VerifyUsers from "./verifyUsers";


function ManageUsers() {
    const [users, setUsers] = useState([])
    const navigate =useNavigate()
    var selectedUsers = []
    var updatedUsers = new Map([])
    const [advisorId, setAdvisorId] = useState()
    const [ showVerification, setShowVerification] = useState(false)
    var role = 'Investor'
    var uriRole = "ROLE_INVESTOR"
    const [buttonClass, setButtonClass] = useState(role)
    var [columns, setColumns]= useState([
        { field: 'id', headerName: 'ID', flex: 1 ,},
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'name', headerName: 'Name' , flex: 1},
        { field: 'status', headerName: 'Status', flex: 1 },
    ]);
    
    const changeRole = (newRole)=>{
        setShowVerification(false)
        setAdvisorId(0)
        setButtonClass(newRole)
        if(newRole==="Investor"){
            uriRole="ROLE_INVESTOR"
            setColumns([
                { field: 'id', headerName: 'ID', flex: 1 },
                { field: 'username', headerName: 'Username', flex: 1 },
                { field: 'name', headerName: 'Name' , flex: 1},
                { field: 'status', headerName: 'Status', flex: 1 },
            ])
            setButtonClass(newRole)
        }else{
            uriRole="ROLE_ADVISOR"
            let newColumns = [...columns]
            if(columns.length===4){
            newColumns.push({field: 'verificationStatus', headerName:'Verification Status', flex: 1,
                        renderCell:(params)=>(
                            <button className={params.value==="NOT_VERIFIED"?"btn btn-primary" : params.value==="VERIFIED" ? "btn btn-success":"btn btn-danger"} 
                                onClick={()=>{setShowVerification(true); setAdvisorId(params.row.id)}}>
                                {params.value==="NOT_VERIFIED"?"Verify":params.value}
                            </button>)
                         })}
            setColumns(newColumns)
        }
        role=newRole
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        log(role)
        let response = await getLimitedUserDetailsApi(uriRole)
        if (response['status'] === 200) {
            setUsers(response.data)
        }
    }

    const handleUserSelect = (currentRowsSelected) => {
        selectedUsers = currentRowsSelected
        log(selectedUsers)
    }

    const sendUserStatusUpdate = async () => {
        log("send")
        log(role)
        let data = {}
        updatedUsers.forEach((value, key) => {
            data[key] = value
        });
        log(data)
        log(role)
        let response = await changeUserStatusApi(data)
        if (response['status'] === 200) {
            changeRole(buttonClass)
        }
    }

    const blockUsers = () => {
        if (selectedUsers && selectedUsers.length === 0) {
            toast.error("Please Select again!")
        } else {
            selectedUsers.map((id) => {
                updatedUsers.set(id, "BLOCKED")
            })
            log(updatedUsers)
            sendUserStatusUpdate()
        }
    }

    const unblockUsers = () => {
        if (selectedUsers && selectedUsers.length === 0) {
            toast.error("Please Select again!!")
        } else {
            selectedUsers.map((id) => {
                updatedUsers.set(id, "ACTIVE")
            })
            log(updatedUsers)
            sendUserStatusUpdate()
        }
    }

    return (<div className="container mt-3">
        
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light position-absolute" id="sidebar" style={{ width: 280, height: "100%", top: 70, left: 0 }}>
                <hr className="mt-5" />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <div className={buttonClass==="Investor"?"nav-link active":"nav-link link-dark"} >
                        <button className="nav-link link-body-emphasis" onClick={()=>changeRole("Investor")}>Manage Investors</button>
                        </div>
                    </li>
                    <li>
                        <div className={buttonClass==="Advisor"?"nav-link active":"nav-link link-dark"}>
                            <button className="nav-link link-body-emphasis" onClick={()=>changeRole("Advisor")}>Manage Advisors</button></div>
                    </li>
                </ul>
            </div>
        
        {!showVerification && 
        <div className="col-9 m-auto px-5">
            <h3 className="">Manage {buttonClass}s</h3>
            <hr className="mb-5" />
                <div>
                    <DataGrid rows={users} columns={columns} pageSizeOptions={[5, 10, 20]}
                        checkboxSelection
                        onRowSelectionModelChange={handleUserSelect}
                    />
                </div>
                <div className="m-2 text-center mt-4">
                    <button className="btn btn-danger btn-lg me-3" onClick={blockUsers} >Block</button>
                    <button className="btn btn-primary btn-lg" onClick={unblockUsers}>Unblock</button>
                </div>
            </div>
        }
        {showVerification &&
         <div className="container m-auto mt-4 px-5">
            <VerifyUsers className="text-center" id={advisorId}/>
         </div>

        }
    </div>
    )
}

export default ManageUsers
