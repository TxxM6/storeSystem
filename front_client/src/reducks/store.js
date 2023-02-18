import { configureStore } from '@reduxjs/toolkit'
import PL_Reducer from './slices/PL_Slice'
import M_Reducer from './slices/M_Slice'
import CL_Reducer from './slices/CL_Slice'
import React from 'react';

export const store = configureStore({
    reducer: {
      PL:PL_Reducer,
      M:M_Reducer,
      CL:CL_Reducer
    },
  })