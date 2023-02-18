
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

const M_Slice = createSlice({
  name: 'M_S',
  initialState,
  reducers: {
        closeM:(state) =>{
            state.show=false
            console.log('close')
        },
        
        setM(state,action) {
            
            const p=action.payload

            state.show=true
            state.amount=1
            state.key='modal'
            state.id=p.id
            state.name=p.name
            state.image=p.image
            state.price=p.price
            state.stock=p.stock
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