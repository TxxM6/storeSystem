import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';


import ReactDOM from 'react-dom';

import { Provider } from "react-redux"
import {store} from "./reducks/store";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
