import React, {useEffect} from 'react';

import {Modal,ProductCard} from '../components';

import { styled } from '@mui/material/styles';//makestyleの代わり

import { useSelector, useDispatch } from 'react-redux'
import {addPL} from '../reducks/slices/PL_Slice'


const ProductList= () => {

    const dispatch=useDispatch()
    const PList=useSelector(state=>state.PL)


//-----------------(MUI)----------------------
    const Product_Parent = styled('div')(({theme})=>({
        display:'flex',
        flexFlow:'row wrap',
        width: '100%',
        hight: '100%',
  
    }));
    
//-------------------------------------

    return(
            <Product_Parent>
                {PList.length>0 && (
                    PList.map(product => (
                        <ProductCard
                        key={product.id} id={product.id} image={product.image}
                        price={product.price} name={product.name} stock={product.stock}
                        />
                    ))
                )}
            </Product_Parent>
        
    )
}

export default ProductList


