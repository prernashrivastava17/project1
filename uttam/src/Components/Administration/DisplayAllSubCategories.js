import { useStyles } from "./DisplayAllSubCategoriesCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../Services/NodeServices";
import { Button, Grid, TextField, Avatar } from "@material-ui/core";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function DisplayAllSubCategories(props) {

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')

  const [subCategories, setSubCategories] = useState([])
  const [subCategoryId, setSubCategoryId] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [icon, setIcon] = useState({ url: '/icon.png', bytes: '' })

  const [btn, setBtn] = useState(false)
  const [uploadBtn, setUploadbtn] = useState(false)
  const [oldIcon, setOldIcon] = useState('')

  var navigate = useNavigate()

  const saveAndCancleBtn = () => {

    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        {btn ? <><Button variant="contained" color="primary" onClick={handleSave}>SAVE</Button>
          <Button variant="contained" color="secondary" onClick={handleCancle} >CANCLE</Button></> : <></>}
      </div>
    )

  }

  const handleCancle = () => {
    setBtn(false)
    setIcon({ url: oldIcon, bytes: '' })
    setOldIcon('')
    setUploadbtn(false)
  }

  const handleSave = async () => {
    var formDate = new FormData()
    formDate.append('subcategoryid', subCategoryId)
    formDate.append('icon', icon.bytes)
    var result = await postData('subcategory/update_icon', formDate, true)
    alert(result.result)

    setBtn(false)
    setOldIcon('')
    setUploadbtn(false) 
    fetchAllSubCategories()
  }
  const handleEditSubCategory = async () => {
    setOpen(false)  
    var body = { categoryid:categoryId, subcategoryname: subCategoryName, subcategoryid: subCategoryId }
    var result = await postData('subcategory/edit_subcategory_data', body)
    alert(result.status)
    fetchAllSubCategories()
  }

  const handleDeleteSubCategory = async () => {
    setOpen(false)
    var body = { categoryid: categoryId }
    var result = await postData('category/delete_category', body)
    alert(result.status)
    fetchAllSubCategories()

  }

  const handleIcon = (event) => {
    setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtn(true)
    setUploadbtn(true)
  }

  const fetchAllSubCategories = async () => {
    var data = await getData('subcategory/display_all_subcategory')
    setSubCategories(data.data)
  }

  useEffect(function () {
    fetchAllSubCategories()
  }, [])

  const fetchAllCategories=async()=>{

    var body = await getData('category/display_all_category')
    setCategories(body.data)
  }
  const fillCategories = () => {

    return categories.map((item)=>{
      return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })

  }

  const handleCategoryChange =(event) =>{
    setCategoryId(event.target.value)
  }
  const   handleOpen = (rowData) => {
    fetchAllCategories()          
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setOldIcon(`${ServerURL}/images/${rowData.icon}`)
    setIcon({ url: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
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
                Sub Category Interface
              </Grid>


              <Grid item xs={12}>
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


              <Grid item xs={12}>
                <TextField value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} variant="outlined" fullWidth label="Sub Category name" />
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button onClick={handleEditSubCategory} color="primary" fullWidth variant="contained" >Edit</Button>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button onClick={handleDeleteSubCategory} fullWidth color="secondary" variant="contained" >Delete</Button>
              </Grid>
              <Grid item xs={3} className={classes.center}>
                <Button disabled={uploadBtn} color="primary" variant="contained" component="label">
                  Upload
                  <input onChange={handleIcon} hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>

              <Grid item xs={3} className={classes.center}>
                <Avatar
                  alt="Remy Sharp"
                  src={icon.url}
                  sx={{ width: 70, height: 70 }}
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
        title="List of Sub Categories"
        columns={[
          
          { title: 'Sub Category Id', field: 'subcategoryid' },
          { title: 'Category Name', field: 'cn' },
          { title: 'Sub Category Name', field: 'subcategoryname' },
          { title: 'Icon', render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} alt="img" style={{ display: 'flex', width: '35%', alignItem: 'center', borderRadius: 5 }} /> },
          //{ title: 'Banner Priority', field: 'bannerpriority' },


        ]}
        data={subCategories}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Sub Category',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Sub Category',
            isFreeAction: true,
            onClick: (event) => {
              navigate('/dashboard/subcategory')
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