import { useStyles } from "./DisplayAllCategoriesCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../Services/NodeServices";
import { Button, Grid, TextField, Avatar } from "@material-ui/core";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useNavigate } from "react-router-dom";

export default function DisplayAllCategories(props) {

  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)

  const [categoryName, setCategoryName] = useState('')
  const [icon, setIcon] = useState({ url: '/icon.png', bytes: '' })
  const [categoryId, setCategoryId] = useState('')
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
    formDate.append('categoryid', categoryId)
    formDate.append('icon', icon.bytes)
    var result = await postData('category/update_icon', formDate, true)
    alert(result.result)
    
    setBtn(false)
    setOldIcon('')
    setUploadbtn(false)
    fetchAllCategories()
  }
  const handleEditCategory = async () => {
    var body = { categoryname: categoryName, categoryid: categoryId }
    var result = await postData('category/edit_category', body)
    alert(result.status)
    fetchAllCategories()

  }

  const handleDeleteCategory = async () => {
    var body = { categoryid: categoryId }
    var result = await postData('category/delete_category', body)
    alert(result.status)
    fetchAllCategories()

  }

  const handleIcon = (event) => {
    setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtn(true)
    setUploadbtn(true)
  }

  const fetchAllCategories = async () => {
    var data = await getData('category/display_all_category')
    setCategories(data.data)
  }

  useEffect(function () {
    fetchAllCategories()
  }, [])

  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
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
                Category Interface
              </Grid>
              <Grid item xs={12}>
                <TextField value={categoryName} onChange={(event) => setCategoryName(event.target.value)} variant="outlined" fullWidth label="Category name" />
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button onClick={handleEditCategory} color="primary" fullWidth variant="contained" >Edit</Button>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                <Button onClick={handleDeleteCategory} fullWidth color="secondary" variant="contained" >Delete</Button>
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
        title="List of Categories"
        columns={[
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Image', render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} alt="img" style={{ display: 'flex', width: '35%', alignItem: 'center', borderRadius: 5 }} /> }

        ]}
        data={categories}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event, rowData) => {
              navigate('/dashboard/category')
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