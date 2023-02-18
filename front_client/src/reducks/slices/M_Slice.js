
import {createSlice} from '@reduxjs/toolkit'
import React from 'react';

const initialState = {
    show: false,
    amount:1,
    key:'modal',
    id:'',
    name:"",
    price:'',
    image:"",
    stock:""
  }

let M_Slice = createSlice({
  name: 'M_S',
  initialState,
  reducers: {
        closeM:(state) =>{
            state.show=false
            console.log('close')
        },
        
        setM(state,action) {
            const newM={...action.payload,show:true,amount:1,key:'modal'}
            return newM
            
        },
        change_numM(state,action) {
            state.amount=action.payload
        },
        addM(state) {
            state.amount+=1
        },
        decM(state) {
            state.amount>1?state.amount-=1:state.amount=1
        },

    }
})


export const {closeM,setM,change_numM,addM,decM} = M_Slice.actions
export default M_Slice.reducer