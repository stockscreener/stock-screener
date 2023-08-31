import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
    name: 'stockData',
    initialState:{
        id:0
    },
    reducers:{
        stockInfo:(state, action)=>{
            state.id = action.payload
        },
    },
})

export const { stockInfo } = stockSlice.actions
export default stockSlice.reducer