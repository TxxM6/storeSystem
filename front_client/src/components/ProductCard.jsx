import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';//makestyleの代わり

import { setM } from '../reducks/slices/M_Slice'
import { useSelector, useDispatch } from 'react-redux'


//-----------------(MUI)----------------------



const CardRoot2= styled(Card)(({theme})=>({
    width:'200px',
    margin: 16,

}));

const Card_Media = styled(CardMedia)(({theme})=>({
    height: 0,
    paddingTop: '100%'
}));

const Card_Content = styled(CardContent)(({theme})=>({
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
        paddingBottom: 16
    }
}));



const Card_ProductName = styled(Typography)(({theme})=>({
    boxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: '18px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        height: 36,
        lineClamp: 2,
    },
    [theme.breakpoints.up('md')]: {
        height: 18,
        lineClamp: 1,
    }
}));

const Card_Price = styled(Typography)(({theme})=>({
    color: theme.palette.secondary.dark,
    fontSize: 16
}));

const Card_Stock = styled(Typography)(({theme})=>({
    fontSize: 12,
    marginRight: 0,
    marginLeft: 'auto'
}));

//-----------------(MUI)----------------------

const ProductCard = (props) => {

    const dispatch = useDispatch()//onclickでsetMを利用
    


    const price = props.price.toLocaleString();
    const image = props.image
    const stock = props.stock
    
    


    return (
          <CardRoot2>
            <Card_Media
                image={image} onClick={()=>dispatch(setM(props))}/>
            <Card_Content>
                <div>
                    <Card_ProductName color="textSecondary" component="p">{props.name}</Card_ProductName>
                    <Card_Price component="p">¥{price}</Card_Price>
                    <Card_Stock component="p">残:{stock}</Card_Stock>
                </div>
            </Card_Content>
        </CardRoot2>

        );
    }
    
export default ProductCard

