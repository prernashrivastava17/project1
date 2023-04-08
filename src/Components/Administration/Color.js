import { useState, useEffect } from "react";
import { useStyles } from "./ColorCss"
import { TextField, Grid, Button, } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { useNavigate } from "react-router";
import ColorPicker from 'material-ui-color-picker'



export default function Color(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategories, setSubCategories] = useState([])
    const [productId, setProductId] = useState('')
    const [products, setProducts] = useState([])
    const [sizeId, setSizeId] = useState('')
    const [sizes, setSizes] = useState([])

    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [colors, setColors] = useState([])



    const fetchAllCategory = async () => {

        var data = await getData('category/display_all_category')

        setCategories(data.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillCategories = () => {
        return categories.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fetchAllSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })

        setSubCategories(data.data)
    }

    const fillSubCategories = () => {
        return subCategories.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchAllProducts = async (scid) => {
        var data = await postData('products/display_products_by_subcategory', { subcategoryid: scid })

        setProducts(data.data)
    }
    const fillproducts = () => {
        return products.map((item) => {
            return (
                <MenuItem value={item.productid}>{item.productname}</MenuItem>
            )
        })
    }

    const fetchAllSize = async (pid) => {

        var data = await postData('size/display_size_by_products', { productid: pid })

        setSizes(data.data)
    }
    const fillsize = () => {

        return sizes.map((item) => {

            return (
                <MenuItem value={item}>{item}</MenuItem>

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
        fetchAllSize(event.target.value)
    }

    const handleSizeId = (event) => {

        setSizeId(event.target.value)
    }

    const handleSubmit = async () => {

        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, sizeid: sizeId, color: JSON.stringify(colors), colorcode: colorCode }
        var result = await postData('color/add_new_color', body)
        if (result.result) {
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully',

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
        setSizeId('')
        setColor('')
    }

    const handleColorChange = (event) => {
        console.log("Color:", event)
        setColorCode(event)
    }
    const handleAddColor = () => {
        var temp = colors
        setColors({ ...temp, [color]: colorCode })

    }


    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <Grid className={classes.gridStyle} container spacing={2}>
                <Grid className={classes.heading} item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span >
                            Color Interfare
                        </span>
                        <span >
                            <img src="/images/edit.gif" alt="logo" width="40px" style={{ cursor: 'pointer' }} onClick={(event) => navigate('/dashboard/displayallcolor')} />
                        </span>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={handleCategoryId}
                        >
                            <MenuItem>Choose Category</MenuItem>
                            {fillCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label1">Sub Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={subCategoryId}
                            label="Sub Category"
                            onChange={handleSubCategoryId}
                        >
                            <MenuItem>Choose Sub Category</MenuItem>
                            {fillSubCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label2">Products</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={productId}
                            label="Products"
                            onChange={handleProductId}
                        >
                            <MenuItem>Choose Products</MenuItem>
                            {fillproducts()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label3">Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label3"
                            id="demo-simple-select3"
                            value={sizeId}
                            label="Size"
                            onChange={handleSizeId}
                        >
                            <MenuItem>Choose Size</MenuItem>
                            {fillsize()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <TextField value={color} onChange={(event) => setColor(event.target.value)} fullWidth variant="outlined" label="Color" />
                </Grid>
                <Grid item xs={3}>
                    <ColorPicker
                        name='color'
                        variant="outlined"
                        fullWidth
                        value={colorCode}
                        defaultValue="#000"

                        onChange={(code) => handleColorChange(code)}

                    />

                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth onClick={handleAddColor} variant="contained">Set</Button>
                </Grid>

                <Grid item xs={12}>
                    <TextField value={JSON.stringify(colors)} onChange={(event) => setColors(event.target.value)} fullWidth variant="outlined" label="Color List" />
                </Grid>


                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={handleReset} variant="contained">Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>)

}
