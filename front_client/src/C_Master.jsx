import React, {useEffect,useState} from 'react';

import {Modal} from './components';
import {ProductList,CartList} from './templates';
import { styled } from '@mui/material/styles';//makestyleの代わり


const LIST_PARENT = styled('div')(({theme})=>({
    alignItems: 'center',
    display: 'flex',
    width: '100vw',
    height: '100vh'
    //flexFlow:'column'
}));


const LEFT_PL_LIST = styled(ProductList)(({theme})=>({
        width: 'calc(100% - 350px)',
        height: '100%',
        }));

const RIGHT_Cart_LIST = styled(CartList)(({theme})=>({
    width: '350px'
    }));

const Spacer = styled('div')(({theme})=>({width: '50px'}));



const C_Master = () => {

    return(
    <>
    <Modal/>
    <LIST_PARENT>
        <Spacer/>
        <LEFT_PL_LIST/>
        <RIGHT_Cart_LIST/>
        <Spacer/>
    </LIST_PARENT>

 

    </>
    )
    
}

export {C_Master}
