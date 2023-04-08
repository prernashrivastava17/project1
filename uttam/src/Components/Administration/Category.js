import { useStyles } from "./CategoryCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useState } from "react";
import { postData } from "../Services/NodeServices";

import { useNavigate } from "react-router-dom"; 

export default function Category(props) { 

    var classes = useStyles()
    const [categoryName, setCategoryName] = useState('')
    const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })
    var navigate = useNavigate()

    const handleIcon=(event)=>{
        setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

    }
    const handleSubmit=async()=>{

          
        var formDate=new FormData()
        formDate.append('categoryname',categoryName)
        formDate.append('picture',picture.bytes)
        var result = await postData('category/add_new_category',formDate,true)
        alert(result.status)
        
    }

    return (  
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid className={classes.gridStyle} container spacing={2}>
                    <Grid className={classes.heading} item xs={12}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <span >
                                Category Interfare
                            </span>
                            <span >
                                <img src="/images/edit.gif" alt="logo" width="40px" style={{cursor:'pointer'}} onClick={(event)=>navigate('/dashboard/displayallcategories') } />
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setCategoryName(event.target.value)} variant="outlined" fullWidth label="Category name" />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button onChange={handleIcon} fullWidth variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="Remy Sharp"
                            src={picture.url}
                            sx={{ width: 60, height: 60 }}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button onClick={handleSubmit} variant="contained" >Submit</Button>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button variant="contained" >Reset</Button>
                    </Grid>
                </Grid>


            </div>
        </div>
    )
}