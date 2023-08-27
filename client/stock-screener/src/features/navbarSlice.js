import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState:{
        visible: true,
        update:1,
    },
    reducers:{
        showNavbar: (state)=>{
            state.visible = true;
            state.update += 1;
        },
        hideNavbar: (state)=>{
            state.visible = false;
            state.update += 1;
        },
    },
})

export const {showNavbar, hideNavbar} = navbarSlice.actions
export default navbarSlice.reducer