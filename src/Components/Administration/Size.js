import { useState, useEffect } from "react";
import { useStyles } from "./SizeCss";
import {  Grid, Button, } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { useNavigate } from "react-router";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'S',
    'M',
    'L',
    'XS',
    'XL',
    'XXL'
];


export default function Size(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productId, setProductId] = useState('')
    const [productList, setProductList] = useState([])
    const [size, setSize] = useState([])


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const fetchAllCategory = async () => {
        var data = await getData('category/display_all_category')
        setCategoryList(data.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillCategories = () => {
        return categoryList.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fetchAllSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(data.data)
    }

    const fillSubCategories = () => {
        return subCategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchAllProducts = async (scid) => {
        var data = await postData('products/display_products_by_subcategory', { subcategoryid: scid })
        
        setProductList(data.data)
    }
    const fillproducts = () => {
        return productList.map((item) => {
            return (
                <MenuItem value={item.productid}>{item.productname}</MenuItem>
            )
        })
    }

    const handleCategoryId = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)

    }

    const handleSubCategoryId = (event) => {
        setSubCategoryId(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const handleProductId = (event) => {
        setProductId(event.target.value)
    }


    const handleSubmit = async () => {
        alert(JSON.stringify(size))
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: JSON.stringify(size) }
        var result = await postData('size/add_new_size', body)
        if (result.result) {
            Swal.fire({
                icon: 'success',
                title: 'Size have been Saved',

            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    const handleReset = async () => {
        setCategoryId('')
        setSubCategoryId('')
        setProductId('')
        setSize('')
    }


    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <Grid className={classes.gridStyle} container spacing={2}>
                <Grid className={classes.heading} item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span >
                            Size Interfare
                        </span>
                        <span >
                            <img src="/images/edit.gif" alt="logo" width="40px" style={{ cursor: 'pointer' }} onClick={(event) => navigate('/dashboard/displayallsize')} />
                        </span>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={handleCategoryId}
                        >
                            
                            {fillCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label1">Sub Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={subCategoryId}
                            label="Sub Category"
                            onChange={handleSubCategoryId}
                        >
                           
                            {fillSubCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label2">Products</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={productId}
                            label="Products"
                            onChange={handleProductId}
                        >
                           
                            {fillproducts()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Sizes</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={size}
                            onChange={handleChange}
                            input={<OutlinedInput label="Sizes" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={size.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={handleReset} variant="contained">Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>
    )
}