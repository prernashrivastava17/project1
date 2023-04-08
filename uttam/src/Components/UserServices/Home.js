import { useStyles } from "../Administration/DisplayAllProductsCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import WebAppBar from "./UserComponents/WebAppBar";
import { useState } from "react";
import { postData } from "../Services/NodeServices";

import { useNavigate } from "react-router-dom"; 

export default function Home(props) { 

    var classes = useStyles()
    const [categoryName, setCategoryName] = useState('')
    const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })
    var navigate = useNavigate()


    return (  
        <div >
            <WebAppBar/>
            <div >
                <Grid container spacing={2}>
                    
                </Grid>


            </div>
        </div>
    )
}