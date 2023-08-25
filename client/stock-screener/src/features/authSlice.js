import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        id:null,
        name:"",
        username:"",
        role:"",
        token:"",
    },
    reducers: {
        login: (state) => {
            state.status =  true;
            state.id = sessionStorage['id'];
            state.name = sessionStorage['name'];
            state.username = sessionStorage['username'];
            state.role = sessionStorage['role'];
            state.token = sessionStorage['token'];
        },
        logout: (state) => {
            state.status = false;
            state.id = null;
            state.name = "";
            state.username = "";
            state.role = "";
            state.token = "";
        },
        authName:(state, action)=>{
            state.name = action.payload
        },
    },
})

export const {login, logout, authName} = authSlice.actions
export default authSlice.reducer