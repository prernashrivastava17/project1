import React, { useState } from "react";
import Divider from '@mui/material/Divider';
import { TextField, Button } from "@mui/material";
import { useStyles } from "./FooterCss";
import { useDispatch } from "react-redux";
import PlusMinusComponent from "./PlusMinusComponent";
import { ServerURL } from "../../Services/NodeServices";


export default function CartProductDetails(props) {

    // alert(props.values)

    var qtyRemove = 0

    // var dispatch = useDispatch()

    const [refresh, setRefresh] = useState(false)

    const handleQtyChange = (value, product) => {


        if (value == 0) {
            // dispatch({ type: 'DELETE_CART', payload: [product.productid, product] })
        }
        else {
            product['qty'] = value
            // dispatch({ type: 'ADD_CART', payload: [product.productid, product] })

        }
        setRefresh(!refresh)
        props.updateCart()


    }

    const handleRemove=(qty,product)=>{

        // dispatch({ type: 'DELETE_CART', payload: [product.productid, product] })
        setRefresh(!refresh)
        props.updateCart()
    }
    return (
        <div style={{width:'100%',padding:'15px'}}  >
            {props.values.length == 0 ? <>
                <div style={{display:'flex',justifyContent:'center',margin:'11% 0% 0% 0%'}} >
                    <img src='images/empty_box.gif' alt='empty' style={{width:'400px'}} />
                </div>
            </> : props.values.map((item) => {
                return (

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border:'1px solid #ddd', padding:'20px 0px' }}>

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <div style={{ display: 'flex', margin: '5px', flexDirection: 'column', width: '37%' }}>
                                {/* img and text field */}
                                <img src={`${ServerURL}/images/${item.picture}`} alt="product" width="110px" style={{ margin: '5px 11px' }} />

                                <PlusMinusComponent value={item.qty} onChange={(value) => handleQtyChange(value, item)} />

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px', margin: '5px', width: '80%' }}>
                                {/* product name amount */}
                                <div style={{ fontSize: '18px', fontWeight: '400' }}>{item.productname}</div>
                                <div style={{ display: 'flex', alignItems: 'center', lineHeight: '20px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: '700', padding: '2px 3px' }}>
                                        {/* <CurrencyRupeeIcon /> */}
                                        &#8377;{item.offerprice}
                                    </span>
                                    <span style={{ fontSize: '16px', fontWeight: '500', padding: '2px 3px', color: '#8b8b8b' }}>
                                        {/* <CurrencyRupeeIcon  /> */}
                                        &#8377;{item.price}
                                    </span>

                                    <span style={{ color: '#2ecc71', fontSize: '13px', fontWeight: '700', padding: '2px 3px' }}>
                                        &#8377;{item.price - item.offerprice}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', padding: '10px 0px' }}>
                                    {/* quantity */}
                                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#8b8b8b' }} >Size:</span>
                                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}> {item.size}</span>
                                </div>
                                <div style={{ display: 'flex', padding: '10px 0px' }}>
                                    {/* quantity */}
                                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#8b8b8b' }} >Color:</span>
                                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}> {item.color}</span>
                                </div>
                            </div>



                        </div>
                        <Divider style={{ margin: '4px', color: '1px solid #ddd' }} />

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ display: 'flex', width: '20%', justifyContent: 'center', textTransform: 'capitalize' }}>
                                <Button onClick={(qty) => handleRemove(qty, item)} qty={qtyRemove} size="small" fullWidth style={{ textTransform: 'capitalize', color: '#8B8B8B' }} >Remove</Button>
                            </div>
                            <div style={{ display: 'flex', width: '80%', justifyContent: 'center' }}>
                                <Button size="small" fullWidth style={{ textTransform: 'capitalize', color: '#8B8B8B' }}>Move To Wishlist</Button>
                            </div>
                        </div>
                        <Divider style={{ margin: '8px', color: '1px solid #ddd' }} />
                    </div>


                )
            })}
        </div>
    )


}