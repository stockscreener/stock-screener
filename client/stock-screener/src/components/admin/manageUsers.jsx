import { useEffect, useState } from "react"
import { getLimitedUserDetails } from "../../services/user"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { log } from "../../utils/logger";


function ManageUsers() {
    const [users, setUsers] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username'},
        { field: 'name', headerName: 'Name'},
        {
          field: 'status',
          headerName: 'Status',
          type: 'number'
        },
      ];
    useEffect(()=>{
        async function getData(){
            let response =  await getLimitedUserDetails("ROLE_INVESTOR")
            if(response['status'] ===200){
                setUsers(response.data)
            }
        }
        getData()

    },[])

    return (<div className="container mt-4">
        <h3 className="">Manage Investors</h3>
        <hr className="mb-5" />
        <div className="container mt-4 px-5">
            <div className="row mt-3" >

                <div className="overflow-y-auto row" style={{ maxHeight: "calc(68vh)" }}>
                    {users.map((user) => (
                        <div className="">

                        </div>
                    ))}</div>
            </div>
            <div>
                <DataGrid rows={users} columns={columns} pageSizeOptions={[5, 10]}
                    checkboxSelection onRowSelectionModelChange={(data)=>log(data)}/>
            </div>
            <div className="m-2 text-center mt-4">
                <button className="btn btn-secondary btn-lg me-3">Cancel</button>
                <button className="btn btn-primary btn-lg" >Save</button>
            </div>
        </div>
    </div>
    )
}

export default ManageUsers
