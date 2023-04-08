import { useStyles } from "./SubCategoryCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getData, postData } from "../Services/NodeServices";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useNavigate } from "react-router-dom";

export default function SubCategory(props) {

    var classes = useStyles()
    const [subCategoryName,setSubCategoryName]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [categories,setCategories]=useState([])
    const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })

    var navigate = useNavigate()

    const handleSubmit = async () => {

        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryname', subCategoryName)
        formData.append('picture', picture.bytes)
        
        var result = await postData('subcategory/add_new_sub_category', formData)
        alert(result.status)

    }
    
    const handleIcon = (event) => {
        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    

    const handleChange=(event)=>{

        setCategoryId(event.target.value)
        
    }
    const fillCategories=()=>{
        return categories.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fetchAllCategories = async() =>{

        var response = await getData('category/display_all_category')
        setCategories(response.data)
    }
    useEffect( function() {
        fetchAllCategories()
    },[])

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid className={classes.gridStyle} container spacing={2}>
                    <Grid className={classes.heading} item xs={12}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <span >
                                Sub Category Interfare
                            </span>
                            <span >
                                <img src="/images/edit.gif" alt="logo" width="40px" style={{cursor:'pointer'}} onClick={(event)=>navigate('/dashboard/displayallsubcategories') } />
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="categories">Category</InputLabel>
                            <Select
                                labelId="categories"
                                id="categories"
                                value={categoryId}
                                label="Category"
                                onChange={handleChange}
                            >
                                {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setSubCategoryName(event.target.value)} variant="outlined" fullWidth label="Sub Category Name" />
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