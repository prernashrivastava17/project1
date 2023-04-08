import { colors, Grid, TextField, Button } from "@mui/material"
import React, { useState, useEffect} from "react"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import DeliveryOptionBox from "./DeliveryOptionBox";
import { useLocation } from "react-router-dom";
import { postData } from "../../Services/NodeServices";
// import ProductPriceComponent from "./ProductPriceComponent";
import PlusMinusComponent from "./PlusMinusComponent";
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


export default function ProductDetailsFilling(props) {

    var navigate = useNavigate()

    var location = useLocation()

    var product = JSON.parse(props.productInfo)

    // var dispatch = useDispatch()

    const [size, setSize] = useState([]);
    const [colors, setColors] = useState(null) 
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [refresh, setRefresh] = useState('');
    

    // var cart = useSelector(state => state.cart)
    // var selectedProduct = cart[product.productid]
    // var keys = Object.keys(cart)
    // var selectedQty = null

    // if(keys?.length>0){
        
    //     selectedQty=selectedProduct?.qty
    //     product['size']=selectedProduct?.size
    //     product['color']=selectedProduct?.color
    //     product['qty']=selectedProduct?.qty
    // }

    
    // const [qty, setQty] = useState(selectedQty)

    var productStr=JSON.stringify(product)
    

    // const handleWishList=()=>{
        
    //     dispatch({type:'ADD_WISHLIST',payload: [product.productid, product]})
    //     setRefresh(!refresh)
    // }

    // const handleSize = (index) => {
    //     setSelectedColor(null)
    //     setQty(null)

    //     var temp = size.map((item) => {
    //         return { 'sizeid': item.sizeid, 'status': false }
    //     })


    //     temp[index].status = true
    //     setSelectedSize(temp[index].sizeid)

    //     console.log("TEMP", temp)
    //     setSize([...temp])
    //     fetchAllColors(temp[index].sizeid)
    //     // alert(temp[index].sizeid)
    //     product['size'] = temp[index].sizeid
    //     dispatch({ type: 'ADD_CART', payload: [product.productid, product] })
    // }


    const handleQtyChange = (value) => {
    //     if (selectedSize != null && selectedColor != null) {
    //         if (value == 0) {
    //             dispatch({ type: 'DELETE_CART', payload: [product.productid, product] })
    //         }
    //         else {
    //             product['qty'] = value
    //             product['size'] = selectedSize
    //             product['color'] = selectedColor
    //             dispatch({ type: 'ADD_CART', payload: [product.productid, product] })
    //             setQty(value)
    //         }
    //     }
    //     else {
    //         alert('Pls Select Size and Color both...')
    //         setQty(null)
    //     }
        props.updateCart()
    }

    return (<div>
        <Grid container spacing={2} >
            <Grid item xs={11} >
                {/* product name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', letterSpacing: '1px', fontSize: '20px', fontWeight: '600', marginTop: '20px' }} >
                    {product.productname}
                    
                </div>

                {/* price of product */}
                {/* <ProductPriceComponent productInfo={productP} /> */}
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    <div style={{ display: 'flex', color: '#388e3c', fontWeight: '500', fontSize: '13px' }} >
                        Special Price
                    </div>
                    <div style={{ display: 'flex', fontWeight: '600', fontSize: '20px', flexDirection: 'row' }} >
                        {/* {product.offerprice > 0 ? <> */}
                            <span>&#8377; {product.offerprice}</span><span style={{ display: 'flex', fontWeight: '500', fontSize: '16px', color: '#515151', margin: '0px 10px', alignItems: 'center' }}><s>&#8377; {product.price}</s></span>
                            {/* <span style={{ display: 'flex', color: 'green', fontWeight: '500', fontSize: '16px', margin: '0px 10px', alignItems: 'center' }}>Save &#8377;{product.price-product.offerprice}</span> */}
                        {/* </> :
                            <><span>&#8377; {product.price}</span><span>Fixed Price</span></>
                        } */}

                    </div>
                    <div style={{ display: 'flex', fontWeight: '400', fontSize: '16px' }} >
                        Inclusive of All Taxes +<span style={{ color: '#ffa502', fontWeight: '500', }} > Free Shipping</span>
                    </div>
                </div>


                {/* discount  */}
                <div style={{ display: 'flex', flexDirection: 'row', margin: '20px 0px' }} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <img src="images/Coupon-PNG.png" alt="coupon" width='45px' />
                    </div>
                    <div style={{ display: 'flex', fontSize: '13px', fontWeight: '600', alignItems: 'center', marginLeft: '2px' }} >
                        Extra ₹100 OFF on ₹999 (Code:GIZMO100)
                    </div>
                </div>


                {/* add to cart or buy now button */}
                <div style={{ display: 'flex', marginTop: '10px' }} >
                    <Grid item xs={6} style={{ margin: '0px 5px' }}  >
                        <PlusMinusComponent  onChange={handleQtyChange} />
                    </Grid>
                    <Grid item xs={6} style={{ margin: '0px 5px' }}>
                        <Button variant="contained" fullWidth style={{ background: '#ffb8b8' }}><ArrowCircleRightTwoToneIcon /> BUY NOW</Button>
                    </Grid>
                    
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}  >
                    <Grid item xs={12} style={{ margin: '0px 5px' }}>
                        <Button variant="contained" onClick={()=>navigate('/home')} fullWidth style={{ background: '#3498db' }}><ArrowCircleRightTwoToneIcon /> Continue Shopping</Button>
                    </Grid>
                    
                </div>
                <Grid item xs={12} style={{ display: 'flex', marginLeft: '10px', marginTop: '30px' }} >
                    {/* <DeliveryOptionBox /> */}
                </Grid>
            </Grid>

        </Grid>

    </div >)
}

