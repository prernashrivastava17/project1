import { useEffect, useState } from "react";
import { useStyles } from "./DisplayAllColorCss";
import MaterialTable from "@material-table/core";
import { Button, Grid, TextField } from "@material-ui/core";
import { getData, postData, } from "../Services/NodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { useNavigate } from "react-router";
import ColorPicker from 'material-ui-color-picker'


export default function DisplayAllColor(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [colors, setColors] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productId, setProductId] = useState('')
    const [productList, setProductList] = useState([])
    const [sizeId, setSizeId] = useState('')
    const [sizeList, setSizeList] = useState([])
    const [color, setColor] = useState('')
    const [colorId, setColorId] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [colorList, setColorList] = useState([])


    const fetchAllColors = async () => {
        var data = await getData('color/display_all_color') 
        setColorList(data.data)
    }
    useEffect(function () {
        fetchAllColors()
    }, [])

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

    const fetchAllSize = async (pid) => {
        var data = await postData('size/display_size_by_products', { productid: pid })
        setSizeList(data.data)
    }
    const fillsize = () => {
        return sizeList.map((item) => {
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




    const handleClose = (rowData) => {
        setOpen(false)
    }

    const handleOpen = (rowData) => {
        fetchAllSubCategory(rowData.categoryid)
        fetchAllProducts(rowData.subcategoryid)
        fetchAllSize(rowData.productid)
        setColorId(rowData.colorid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setSizeId(rowData.sizeid)
        setColor(rowData.color)
        setColorCode(rowData.colorcode)
        setOpen(true)
    }

    const handleEditColor = async () => {
        setOpen(false)
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, sizeid: sizeId, color: color, colorid: colorId }
        var result = await postData('color/edit_color_data', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Edit Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        fetchAllColors()
    }

    const handleColorChange = (event) => {
        console.log("Color:", event)
        setColorCode(event)
    }
    const handleAddColor = () => {
        var temp = colors


        setColors({ ...temp, [color]: colorCode })

    }
    const handleColor = (event) => {
        const {
            target: { value },
        } = event;

        setColors(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const handleDeleteColor = async () => {
        setOpen(false)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (res) => {
            if (res.isConfirmed) {
                var body = { colorid: colorId }
                var result = await postData('color/delete_color_data', body)
                if (result.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    fetchAllColors()
                } else {
                    Swal.fire('Server Error', '', 'error')
                }
            }
        })
    }



    const showColor = () => {
        return (<div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid className={classes.gridStyle} container spacing={2}>
                        <Grid item className={classes.heading} xs={12}>
                            
                                Edit Color Interface
                            
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryId}
                                    label="Category Name"
                                    onChange={handleCategoryId}
                                >
                                    {fillCategories()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Sub Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label1"
                                    id="demo-simple-select1"
                                    value={subCategoryId}
                                    label="Sub Category Name"
                                    onChange={handleSubCategoryId}
                                >
                                    <MenuItem>Choose Sub Category</MenuItem>
                                    {fillSubCategories()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label2">Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select2"
                                    value={productId}
                                    label="Product"
                                    onChange={handleProductId}
                                >
                                    <MenuItem>Choose Products</MenuItem>
                                    {fillproducts()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
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
                        <Grid item xs={4}>
                            <TextField value={color} onChange={handleColor} fullWidth variant="outlined" label="Color" />
                        </Grid>
                        <Grid item xs={4}>
                            <ColorPicker
                                name='color'
                                variant="outlined"
                                fullWidth
                                value={colorCode}
                                defaultValue="#000"

                                onChange={(code) => handleColorChange(code)}

                            />

                        </Grid>
                        <Grid item xs={4}>
                            <Button fullWidth onClick={handleAddColor} variant="contained">Set</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={JSON.stringify(colors)} onChange={(event) => setColors(event.target.value)} fullWidth variant="outlined" label="Color List" />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Button style={{ backgroundColor: 'green' }} onClick={handleEditColor} fullWidth color="primary" variant="contained">Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{ backgroundColor: 'red' }} onClick={handleDeleteColor} fullWidth color="primary" variant="contained">Delete</Button>
                        </Grid>



                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>

        </div>)
    }




    function displayColor() {
        return (
            <MaterialTable
                title="List of Color"
                columns={[
                    { title: 'Color Id', field: 'colorid' },
                    { title: 'Category', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{rowData.cn}</div><div>{rowData.scn}</div></div> },
                    
                    { title: 'Product', field: 'pn' },
                    { title: 'Size', field: 'sizeid' },
                    { title: 'Color', field: 'color' },
                    { title: 'Color Code', field: 'colorcode' },

                ]}
                data={colorList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Color',
                        onClick: (event, rowData) => handleOpen(rowData)
                    }, {
                        icon: 'add',
                        tooltip: 'Add Color',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/color")
                    }
                ]}
                options={{
                    rowStyle: {

                    }, headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },

                }}
            />
        )

    }



    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            {displayColor()}
        </div>
        {showColor()}
    </div>)
}