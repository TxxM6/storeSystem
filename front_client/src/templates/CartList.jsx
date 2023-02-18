
import React, {useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';//makestyleの代わり
import List from '@mui/material/List';
import {CartCard} from '../components'

import { useSelector, useDispatch } from 'react-redux'
import {addCL} from '../reducks/slices/CL_Slice'


//合計計算
const getSumP=(p_list)=>{
    var sum=0
    
    if (p_list.length>0){
        p_list.map(product =>sum+=product.price*product.amount)
    }
    return sum
}

const SideBarParent = styled('div')(({theme})=>({
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    margin: '24px auto 80px auto',
    padding: 16,
    height: '80%',
    width: '340px',

}));


const SB_Headline= styled('h2')(({theme})=>({

    color: '#4dd0e1',
    fontSize: '1.563rem',
    margin: '0 auto 1rem auto',
    //width:300
}));



//=====================(ここからコンポーネント)============================

const CartList = () => {

    //const dispatch=useDispatch()
    const selector = useSelector(state => state.CL);
    const productsInCart=selector


    return(
    <SideBarParent >
    <SB_Headline>注文の確認</SB_Headline>
        <List>
            {productsInCart.length > 0 && (
              productsInCart.map(product => <CartCard 
                key={product.id} id={product.id} image={product.image}
                price={product.price} name={product.name} stock={product.stock}
                amount={product.amount}
                />)
            )}
        </List>
        {productsInCart.length > 0 ?(<h2>合計: {getSumP(productsInCart)}円</h2>):(<h2>カートに商品はありません</h2>)}
    </SideBarParent>




    )
}

export default CartList
