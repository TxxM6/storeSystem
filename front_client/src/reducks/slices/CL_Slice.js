import {createSlice} from '@reduxjs/toolkit'
import React from 'react';

const initialState = (
    [
        {
        id:1,
        name:"りんご",
        price:200,
        image:"https://source.unsplash.com/gDPaDDy6_WE",
        stock:20,
        amount:2
        },
        {
        id:3,
        name:"みかん",
        price:150,
        image:"https://source.unsplash.com/bogrLtEaJ2Q",
        stock:20,
        amount:2
        }
    ])

const CL_Slice = createSlice({
  name: 'CL_S',
  initialState:[],//:[]を外したら上のデフォルトデータが入る
  reducers: {
        addCL:(state,action) =>{
            state.push(action.payload)
        },
    }
})


export const {addCL} = CL_Slice.actions
export default CL_Slice.reducer