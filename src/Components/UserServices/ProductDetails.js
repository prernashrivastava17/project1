import React,{createRef, useState} from "react";
import { Grid } from "@mui/material";
import WebAppBar from "./UserComponents/WebAppBar"
import MainBar from "./UserComponents/MainBar";
import ProductImageSlider from "./UserComponents/ProductImageSlider";

import ProductDetailsFilling from "./UserComponents/ProductDetailsFilling";
// import ProductDetailsSubComponent from "./UserComponents/ProductDetailsSubComponent";
// import RatingAndReviews from "./UserComponents/RatingAndReviews";
import Footer from "./UserComponents/Footer";
import { useLocation,useNavigate } from "react-router-dom";


export default function ProductDetails(props) {

    const [refresh, setRefresh]= useState(false)
    

    var location=useLocation()
    var product = location.state.product
    var productid=JSON.parse(product).productid
    
    const updateCart=()=>{
        setRefresh(!refresh)
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <WebAppBar />
                    <MainBar />
                </Grid>

                <Grid item xs={6}>
                    <ProductImageSlider productid={productid} />
                </Grid>
                <Grid item xs={6} style={{padding:0,margin:0}}>
                    <ProductDetailsFilling updateCart={updateCart} productInfo={product} />
                </Grid>
                {/* <Grid item xs={12} style={{marginLeft:'70px'}} >
                   <ProductDetailsSubComponent/>
                </Grid>
                <Grid item xs={12} style={{marginLeft:'70px'}} >
                   <RatingAndReviews/>
                </Grid> */}
                <Grid item xs={12} >
                    <Footer/>
                </Grid>
            </Grid>

        </div>
    )
}