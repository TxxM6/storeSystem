import {createSlice} from '@reduxjs/toolkit'
import React from 'react';



const PL_Slice = createSlice({
  name: 'PL_S',
  initialState:[],
  reducers: {
    addPL(state,action) {
      action.payload.map(p=>(
        state.push(p)
      ))
    },

    scanPL(state,action) {
      state.length=0//サーバーが更新の時に商品が二倍になっていたので追加。stateをリセット
      action.payload.forEach(p=>{
        const n_p={}
        n_p.id=p.id
        n_p.name=p.name
        n_p.hname=p.hname
        n_p.image=process.env.PUBLIC_URL+'/images/'+p.image1
        n_p.price=p.price
        n_p.stock=p.stock
        n_p.category=p.category
        state.push(n_p)
    })
    },

  },
})

export const {addPL,scanPL} = PL_Slice.actions
export default PL_Slice.reducer

