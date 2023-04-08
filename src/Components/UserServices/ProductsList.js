import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postData } from "../Services/NodeServices";
import { ServerURL } from "../Services/NodeServices";
import LocationComponent from "./UserComponents/LocationComponent";
import MainBar from "./UserComponents/MainBar";
import Footer from "./UserComponents/Footer";
import { Grid } from "@mui/material";
import FilterComponent from "./UserComponents/FilterComponent";
import WebAppBar from "./UserComponents/WebAppBar";
import ProductsListComponent from "./UserComponents/ProductsListComponent";

export default function ProductsList() {

    const { id, picture } = useParams()
    const [productList, setProductList] = useState([])

    const fetchProductsBySubcategory = async () => {
        var body = { subcategoryid: id }
        var result = await postData("userinterface/display_all_products_by_subcategory", body)
        //alert(JSON.stringify(result.data))
        setProductList(result.data)
    }

    useEffect(function () {
        fetchProductsBySubcategory() 
    }, [])

    return (
        <div style={{background:'#121212'}} >
            <WebAppBar/>
            <MainBar />
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center'}} >
            
            <Grid item xs={12} >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 100,
                paddingRight: 100,
            }}
            >
                <div style={{ width: '100%', height: 'auto', marginBottom: 20, marginTop: 0 }}>
                    <img src={`${ServerURL}/images/${picture}`} style={{ width: '100%', height: 250 }} />
                </div>

            </div>
            </Grid>
            


                <Grid item xs={3}  >
                    <div
                        style={{
                            display: "flex", 
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <FilterComponent />
                    </div>
                </Grid>

                <Grid item xs={9}   >
                    <div
                        style={{
                            display: "flex", 
                            flexWrap: "wrap",
                            justifyContent: "left",
                            alignItems: "center",
                        }}
                    >
                        <ProductsListComponent data={productList} />
                    </div>
                </Grid>
            </Grid>
            <Footer />

        </div>
    )
}