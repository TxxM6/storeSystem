import React, { useState, useEffect ,useMemo} from 'react';
import io from 'socket.io-client';

import {useSelector, useDispatch } from 'react-redux'
import {addPL,scanPL} from '../reducks/slices/PL_Slice'
import {setM,closeM,change_numM,addM,decM} from '../reducks/slices/M_Slice'
import {addCL} from '../reducks/slices/CL_Slice'



const SOCKET_URL="http://localhost:8080/ec_path"
const socket = io(SOCKET_URL);

let RECENT_M_LIST=[]
let RECENT_PL_LIST=[]

//グローバル関数を作らないとsocketio内に共有できない。
//constでプッシュか、letで代入か

function SocketProvider() {
  //selectorそのままを操作することはできないため用意

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const dispatch=useDispatch()


  RECENT_PL_LIST=useSelector(state => state.PL)
  RECENT_M_LIST=useSelector(state => state.M)
 

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected')
      socket.emit('req_DB')
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    //(商品リストの読み込み(push))
    socket.on('recieve_DB', (getInf) => {
      const my_query=JSON.parse(getInf)
      //console.log(my_query)
      dispatch(scanPL(my_query))
    });

    //======(MODAL)===============================================
    //(商品選択(ModalSet))
    socket.on('ECsetM', (pname) => {
      var m_i={name:'NOITEM'}//modal_item


      console.log('before',RECENT_M_LIST)
      RECENT_PL_LIST.forEach(p=>{
        if (p.name===pname  || p.hname===pname){
            m_i.id=p.id
            m_i.name=p.name
            m_i.image=p.image
            m_i.price=p.price
            m_i.stock=p.stock
            m_i.category=p.category
            m_i.amount=1
          }
      })
      console.log('after',RECENT_M_LIST)

      //console.log('m_i=>',m_i)
        if (m_i.name!=='NOITEM'){
          dispatch(setM(m_i))
          console.log('enterMM',RECENT_M_LIST)
        }});

    
    //(商品確定)================================
    socket.on('ECyesM',() => {
      console.log('MM:',RECENT_M_LIST)
      dispatch(addCL(RECENT_M_LIST))
      dispatch(closeM())
    })
    
    //(個数変更)================================
    socket.on('ECnumM',(num) => dispatch(change_numM(num)))

    //(+1)================================
    socket.on('ECplusM',(num) => dispatch(addM()))

    //(-1)================================
    socket.on('ECminusM',(num) => dispatch(decM()))


    //(商品キャンセル)================================
    socket.on('ECnoM',() => {dispatch(closeM())})



    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

}

export default SocketProvider;