import { useStyles } from "./DisplayAllProductsCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../Services/NodeServices";
import { Button, Grid, TextField, Avatar, Radio } from "@material-ui/core";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Swal from "sweetalert2";

export default function DisplayAllProducts(props) {

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [ratings, setRatings] = useState('')
  const [status, setStatus] = useState('continue')
  const [saleStatus, setSaleStatus] = useState('')
  const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')

  const [subCategoryId, setSubCategoryId] = useState('')
  const [subCategories, setSubCategories] = useState([])

  const [btn, setBtn] = useState(false)
  const [uploadBtn, setUploadbtn] = useState(false)
  const [oldIcon, setOldIcon] = useState('')

  var navigate = useNavigate()

  const fetchAllProducts = async () => {
    var data = await getData('products/display_all_products')
    setProducts(data.data)
  }
  useEffect(function () {
    fetchAllProducts()
  }, [])



  const saveAndCancleBtn = () => {

    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        {btn ? <><Button variant="contained" color="primary" onClick={handleSave} >SAVE</Button>
          <Button variant="contained" color="secondary" onClick={handleCancle} >CANCLE</Button></> : <></>}
      </div>
    )

  }

  const handleSave = async () => {
    setOpen(false)
    var formData = new FormData()
    formData.append('productid', productId)
    formData.append('picture', picture.bytes)
    var result = await postData('products/update_picture', formData, true)
    if (result.result) {
      Swal.fire({
        icon: 'success',
        title: 'Picture Edit Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

    setBtn(false)
    setUploadbtn(false)
    setOldIcon('')
    fetchAllProducts()
  }


  const handleCancle = () => {
    setBtn(false)
    setPicture({ url: oldIcon, bytes: '' })
    setOldIcon('')
    setUploadbtn(false)
  }


  const handleEditProduct = async () => {
    setOpen(false)
    var body = { categoryid: categoryId, subcategoryid: subCategoryId, productname: productName, price: price, offerprice: offerPrice, stock: stock, description: description, ratings: ratings, status: status, salestatus: saleStatus, productid: productId }
    var result = await postData('products/edit_products_data', body)
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
    fetchAllProducts()
  }

  const handleDeleteProduct = async () => {
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
        var body = { productid: productId }
        var result = await postData('products/delete_products_data', body)
        if (result.status) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          fetchAllProducts()
        } else {
          Swal.fire('Server Error', '', 'error')
        }
      }
    })

  }

  const handlePicture = (event) => {
    setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtn(true)
    setUploadbtn(true)
  }

  const fetchAllSubCategories = async (cid) => {

    var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
    setSubCategories(data.data)
  }

  const fetchAllCategories = async () => {

    var body = await getData('category/display_all_category')
    setCategories(body.data)
  }

  useEffect(function () {
    fetchAllCategories()
  }, [])

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

  const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value)
  }

  const handleSalesStates = (event) => {
    setSaleStatus(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategories(event.target.value)
  }
  const handleOpen = (rowData) => {
    fetchAllSubCategories(rowData.categoryid)

    setProductId(rowData.productid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setProductName(rowData.productname)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setStock(rowData.stock)
    setDescription(rowData.description)
    setRatings(rowData.ratings)
    setStatus(rowData.status)
    setSaleStatus(rowData.salestatus)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const showCategory = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
        >

          <DialogContent>

            <Grid className={classes.gridStyle} container spacing={2}>
              <Grid className={classes.heading} item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span >
                    Edit Product Interfare
                  </span>
                  <span >
                    <img src="/images/edit.gif" alt="logo" width="40px" style={{ cursor: 'pointer' }} onClick={(event) => navigate('/displayallproducts')} />
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
                <TextField value={price} onChange={(event) => setPrice(event.target.value)} variant="outlined" fullWidth label="Price" />
              </Grid>

              <Grid item xs={4} className={classes.center}>
                <TextField value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} variant="outlined" fullWidth label="Offer Price" />
              </Grid>
              <Grid item xs={4} className={classes.center}>
                <TextField value={stock} onChange={(event) => setStock(event.target.value)} variant="outlined" fullWidth label="Stock" />
              </Grid>
              <Grid item xs={8} className={classes.center}>
                <TextField value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" fullWidth label="Description" />
              </Grid>
              <Grid item xs={4}>
                <TextField value={ratings} onChange={(event) => setRatings(event.target.value)} fullWidth variant="outlined" label="Rating" />
              </Grid>


              <Grid item xs={6} className={classes.center}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                  <RadioGroup
                    row value={status}

                    name="row-radio-buttons-group"
                  >

                    <FormControlLabel value={"Continue"} onChange={(event) => setStatus(event.target.value)} control={<Radio />} label="Continue" />

                    <FormControlLabel value={"Discontinue"} onChange={(event) => setStatus(event.target.value)} control={<Radio />} label="Discontinue" />

                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="subcategories">Sales Status</InputLabel>
                  <Select
                    labelId="Sales Status"
                    id="Sales Status"
                    value={saleStatus}
                    label="Sales Status"
                    onChange={handleSalesStates}
                  >
                    <MenuItem value={"Trending"} >Trending</MenuItem>
                    <MenuItem value={"Most Popular"}>Most Popular</MenuItem>
                    <MenuItem value={"Best Sellings"}>Best Sellings</MenuItem>


                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button variant="contained" onClick={handleEditProduct} color="primary" fullWidth >Edit</Button>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button variant="contained" onClick={handleDeleteProduct} color="primary" fullWidth >Delete</Button>
              </Grid>

              <Grid item xs={6} className={classes.center}>
                <Button disabled={uploadBtn} fullWidth variant="contained" component="label">
                  Upload
                  <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
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
                {saveAndCancleBtn()}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>

          </DialogActions>
        </Dialog>
      </div>
    )
  }

  function displayCategories() {
    return (
      <MaterialTable
        title="List of Products"
        columns={[
          // { title: 'Product Id', field: 'productid' },
          // { title: 'Category', render:(rowData)=> <div  style={{display:'flex',flexDirection:'column'}}>
          //   <div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div>
          //   </div>
          // },          
          // { title: 'Product Name', field: 'productname' },
          // { title: 'Price', render: (rowData) => <div>
          //   <div>{rowData.offerprice>0?<><div style={{color:'red',fontSize:'15px'}}>Price:<s>{rowData.price}</s></div><div style={{color:'blue', fontWeight:'bold'}}>Offer:{rowData.offerprice}</div></>:<div style={{color:'blue', fontWeight:'bold'}}>Price:{rowData.price}</div>}</div>
          //   <div>Stock:{rowData.stock}</div>
          // </div> },
          // { title: 'Description', field: 'description' },
          // { title: 'Ratings', field: 'ratings' },
          // { title: 'Sale Status', render: (rowData) => <div>
          //   <div>{rowData.status==="Continue"?<><div style={{color:'green',fontWeight:'bold'}}>{rowData.status}</div></>:<div style={{color:'red', fontWeight:'bold',fontSize:'15px'}}>{rowData.status}</div>}</div>
          //   {/* <div style={{color:'green', fontWeight:'bold'}}>{rowData.status}</div> */}
          //   <div>{rowData.salestatus}</div>
          // </div> },
          // { title: 'Icon', render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} alt="img" style={{ display: 'flex', width: '60%', alignItem: 'center', borderRadius: 5 }} /> }

          {
            title: 'Category', render: (rowData) => <div>
              <div style={{ fontSize: '12px', fontWeight: 500 }}>{rowData.categoryname}</div>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{rowData.subcategoryname}</div>
            </div>
          },

          {
            title: 'Product', render: (rowData) => <div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'grey' }}>{rowData.productid}</div>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{rowData.productname}</div>
            </div>
          },

          {
            title: 'Processor', render: (rowData) => <div>
              <div style={{ fontSize: '13px', fontWeight: 500, }}>{rowData.processor}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'grey' }}>{rowData.rating}</div>
            </div>
          },

          {
            title: 'Memory', render: (rowData) => <div>
              <div style={{ fontSize: '12px', fontWeight: 500 }}>RAM: {rowData.memory}<br/>ROM: {rowData.harddrive}</div>
            </div>
          },

          

          {
            title: 'Screen Touch', render: (rowData) => <div>
              <div style={{ fontSize: '12px', fontWeight: 500, }}>{rowData.touchscreen}</div>
            </div>
          },

          {
            title: 'Ports', render: (rowData) => <div>
              
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{rowData.ports}</div>
            </div>
          },
          {
            title: 'Battery', render: (rowData) => <div>
              
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{rowData.battery}</div>
            </div>
          },
          {
            title: 'Camera', render: (rowData) => <div>
              
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{rowData.camera}</div>
            </div>
          },
          


          { title: 'icon', render: (rowData) => <div><img src={`${ServerURL}/images/${rowData.picture}`} alt="logo" style={{ width: '40px', borderRadius: 7 }} /><br/>{rowData.price}</div> }

        ]}
        data={products}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Product',
            isFreeAction: true,
            onClick: (event) => {
              navigate('/dashboard/product')
            }
          }
        ]}
      />
    )
  }


  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        {displayCategories()}
      </div>
      {showCategory()}

    </div>
  )



}

