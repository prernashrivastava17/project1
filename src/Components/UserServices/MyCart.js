import React from "react";
import { Grid } from "@mui/material";
import WebAppBar from "./UserComponents/WebAppBar";
import MainBar from "./UserComponents/MainBar";
import CartProductDetails from "./UserComponents/CartProductDetails"
import { useSelector } from "react-redux";
import { useState } from "react";
import CouponComponent from "./UserComponents/CouponComponent";
import PriceDetails from "./UserComponents/PriceDetails";
import DiscountComponent from "./UserComponents/DiscountComponent";
import ProductStatusBar from "./UserComponents/ProductStatusBar";
import Footer from "./UserComponents/Footer";


export default function MyCart() {

    // var cart = useSelector(state => state.cart)
    // var values = Object.values(cart)
    // //alert(JSON.stringify(cart))
    const [refresh, setRefresh] = useState(false)
    const updateCart = () => {
        setRefresh(!refresh)
    }


    return (
        <div>
            <WebAppBar />
            <MainBar />
            <Grid container spacing={2} style={{ marginTop: '0px' }}  >
                {/* <div style={{ display: 'flex', background: "red" }} > */}
                <Grid item xs={12} style={{ display: 'flex', background: "#f4f4f6", justifyContent: 'center',flexDirection:'column',alignItems:'center' }} >
                    <Grid item xs={10} style={{ display: 'flex',  width:'100%', justifyContent:'center'}} >
                        <Grid item xs={7} style={{ display: 'flex' }}  >
                            <ProductStatusBar />
                        </Grid>
                    </Grid>
                    <Grid item xs={11} style={{ display: 'flex', background: "#fff" , width:'100%' }} >

                        <Grid item xs={7} style={{ display: 'flex' }}  >
                            <CartProductDetails 
                            //values={values} 
                            updateCart={updateCart} />
                        </Grid>
                        <Grid item xs={5} style={{ display: 'flex', flexDirection: 'column' }} >
                            <CouponComponent />
                            <DiscountComponent />
                            <PriceDetails 
                            // values={values} 
                            page={"MyCart"}  updateCart={updateCart} />
                        </Grid>
                    </Grid>
                </Grid>
                {/* </div> */}
                <Footer/>
            </Grid>


        </div>
    )
}