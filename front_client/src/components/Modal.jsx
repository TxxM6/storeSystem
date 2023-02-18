import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeM,addM,decM } from '../reducks/slices/M_Slice'
import { addCL} from '../reducks/slices/CL_Slice'

import i_done from '../icons/done.svg'
import i_close from '../icons/close.svg'
import i_add from '../icons/add.svg'
import i_remove from '../icons/remove.svg'

import { styled } from '@mui/material/styles';//makestyleの代わり

import Typography from '@mui/material/Typography';



const Modal = (props) => {


    const ModalStore = useSelector(state => state.M)
    const dispatch = useDispatch()
    function addCartfromModal(p){
        dispatch(addCL(
            {id:p.id,
            name:p.name,
            stock:p.stock,
            price:p.price,
            image:p.image,
            amount:p.amount
            }
        ))

        dispatch(closeM())
    }


    //-----------------(MUI)---------------------------------------
    const Modal_Parent= styled('div')(({theme})=>({
        /*画面全体を覆う設定*/
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
      
        /*画面の中央に要素を表示させる設定*/
        display: 'flex', //ないと左上に
        alignItems: 'center',  //高さが切り取られる
        justifyContent: 'center',  //横方向で中心になる

        zIndex:2,//重ね合わせ(レイヤー)大きいほど手前

        //textAlign:'center'
    }));

    const Modal_Back = styled('div')(({theme})=>({
        //zIndex:3,
        width:'40%',
        padding: '1em',
        background:'#fff',
        display: 'flex'
    }));


    const Modal_Img = styled('img')(({theme})=>({
        height: '300px',
        width: '300px',
        objectFit: 'cover',
        margin:20
        //display:'inline-block',
        //letterSpacing:'normal'
    }));

    const Spacer = styled('div')(({theme})=>({

        width: '50px',

    }));


    const Modal_Content = styled('div')(({theme})=>({
        margin:20,
        //textAlign:'center',
        //alignItems: 'center',

    }));


    const T_name=styled(Typography)(({theme})=>({
        //color: theme.palette.success.main,
        fontSize: 35,
        margin:10,
        
    }));


    const T_price=styled(Typography)(({theme})=>({
        color: theme.palette.secondary.main,
        fontSize: 35,
        margin:10,
        
    }));

    const Pair =styled('div')(({theme})=>({
        //textAlign:'center',
        alignItems: 'center',
        display:'flex'
    }));

    const T_amount=styled(Typography)(({theme})=>({
        //color: theme.palette.success.main,
        fontSize: 40,
        margin:10

    }));

    const T_stock=styled(Typography)(({theme})=>({
        //color: theme.palette.success.main,
        fontSize: 20,
        margin:10
    }));






    


    if (ModalStore.show){
    return (


                <Modal_Parent>
                    <Modal_Back >

                        <Modal_Img src={ModalStore.image}alt={ModalStore.name}/>
                        < Spacer/>
                        <Modal_Content>

                            <T_name>{ModalStore.name}</T_name>
                            <T_price>{ModalStore.price}円</T_price>
                            <Pair>
                            <T_amount>{ModalStore.amount}個 </T_amount><T_stock>残:{ModalStore.stock}</T_stock>
                            </Pair>
    
                            <button onClick={()=>dispatch(closeM())}><img src={i_close}/></button>
                            <button onClick={()=>addCartfromModal(ModalStore)}><img src={i_done}/></button>
                            <button onClick={()=>dispatch(addM())}><img src={i_add}/></button>
                            <button onClick={()=>dispatch(decM())}><img src={i_remove}/></button>



                        </Modal_Content>
                </Modal_Back >
            </Modal_Parent>



    

        );}
    }
    
export default Modal

