import { useStyles } from "./ProductCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getData, postData } from "../Services/NodeServices";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { useNavigate } from "react-router-dom";

// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function Product(props) {

    var classes = useStyles()
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])

    const [subCategories, setSubCategories] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')

    const [productName, setProductName] = useState('')
    const [processor, setProcessor] = useState('')
    const [memory, setMemory] = useState('')
    const [hardDrive, setHardDrive] = useState('')
    const [touchScreen, setTouchScreen] = useState('')
    const [ports, setPorts] = useState('')
    const [battery, setBattery] = useState('')
    const [camera, setCamera] = useState('')
    const [price, setPrice] = useState('')

    const [stock, setStock] = useState('')
    const [rating, setRating] = useState('')
    const [status, setStatus] = useState('continue')
    const [saleStatus, setSaleStatus] = useState('')
    const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })

    // const [value, setValue] = useState(2)
    var navigate = useNavigate()

    const handleSubmit = async () => {

        alert(touchScreen)
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subCategoryId)
        formData.append('productname', productName)
        formData.append('processor', processor)
        formData.append('memory', memory)
        formData.append('harddrive', hardDrive)
        formData.append('touchscreen', touchScreen)
        formData.append('ports', ports)
        formData.append('battery', battery)
        formData.append('camera', camera)
        formData.append('price', price)
        formData.append('picture', picture.bytes)
        var result = await postData('products/add_new_products', formData)
        alert(result.status)
    }

    const handleIcon = (event) => {
        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }


    const handleCategoryChange = (event) => {

        setCategoryId(event.target.value)
        fetchAllSubCategories(event.target.value)

    }
    const handleSubCategoryChange = (event) => {

        setSubCategoryId(event.target.value)

    }
    const fillCategories = () => {
        return categories.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    const fillSubCategories = () => {

        return subCategories.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchAllSubCategories = async (cid) => {

        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategories(data.data)
    }


    const fetchAllCategories = async () => {

        var response = await getData('category/display_all_category')
        setCategories(response.data)
    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const handleSalesStates = (event) => {
        setSaleStatus(event.target.value)
    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid className={classes.gridStyle} container spacing={2}>
                    <Grid className={classes.heading} item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span >
                                Product Interfare
                            </span>
                            <span >
                                <img src="/images/edit.gif" alt="logo" width="40px" style={{ cursor: 'pointer' }} onClick={(event) => navigate('/dashboard/displayallproducts')} />
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="categories">Category</InputLabel>
                            <Select
                                labelId="categories"
                                id="categories"
                                value={categoryId}
                                label="Category"
                                onChange={handleCategoryChange}
                            >

                                {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="subcategories">Sub Category</InputLabel>
                            <Select
                                labelId="subcategories"
                                id="subcategories"
                                value={subCategoryId}
                                label="Sub Category"
                                onChange={handleSubCategoryChange}
                            >

                                {fillSubCategories()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField value={productName} onChange={(event) => setProductName(event.target.value)} variant="outlined" fullWidth label="Product Name" />
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        <TextField value={processor} onChange={(event) => setProcessor(event.target.value)} variant="outlined" fullWidth label="Processor" />
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                        <TextField value={memory} onChange={(event) => setMemory(event.target.value)} variant="outlined" fullWidth label="Memory" />
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        <TextField value={hardDrive} onChange={(event) => setHardDrive(event.target.value)} variant="outlined" fullWidth label="Hard Drive" />
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Touch Screen</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={touchScreen}
                                
                            >
                                <FormControlLabel onChange={(event)=>setTouchScreen(event.target.value)} value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel onChange={(event)=>setTouchScreen(event.target.value)} value="No" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField value={battery} onChange={(event) => setBattery(event.target.value)} variant="outlined" fullWidth label="Battery" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField value={camera} onChange={(event) => setCamera(event.target.value)} variant="outlined" fullWidth label="Camera" />
                    </Grid>

                    

                    <Grid item xs={2} className={classes.center}>
                        
                        <IconButton onChange={handleIcon} color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>

                    <Grid item xs={2} className={classes.center}>
                        <Avatar
                            alt="Remy Sharp"
                            src={picture.url}
                            sx={{ width: 80, height: 80 }}
                        />
                    </Grid>


                    <Grid item xs={4}>
                        <TextField value={ports} onChange={(event) => setPorts(event.target.value)} variant="outlined" fullWidth label="Ports" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={price} onChange={(event) => setPrice(event.target.value)} variant="outlined" fullWidth label="Price" />
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