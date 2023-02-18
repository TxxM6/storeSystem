
import React, {useEffect,useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';//makestyleの代わり




const Item_P= styled(ListItem)(({theme})=>({height: 100,width: 300}));
const Item_Img= styled('img')(({theme})=>({
    objectFit: 'cover',
    margin: 16,
    height: 80,
    width: 80
}));
const ItemText_P=styled('div')(({theme})=>({
    width: '100%',
    display: 'flex',

}));

const Item_Amount=styled(ListItemText)(({theme})=>({
    textAlign: 'center',

}));







const CartCard = (props) => {
    return(
        <>
        <Item_P>
            <ListItemAvatar>
                <Item_Img src={props.image} alt="商品のTOP画像" />
            </ListItemAvatar>
            <ItemText_P>
                <div>
                <ListItemText primary={props.name}  />
                <ListItemText primary={"¥"+props.price}  />
                </div>
                <Item_Amount edge="end" secondary={"個数:" + props.amount} />
            </ItemText_P>
        </Item_P>
        <Divider/>
        </>
        )
}


export default CartCard


