
//import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react';


import {C_Master} from "./C_Master"
import {SocketProvider} from "./templates"



const ENDPOINT = "http://127.0.0.1:8080";


function App() {

    return (
      <div className="container">
      <SocketProvider/>
      <C_Master/>
      </div>
    );
  };
  
  export default App;

