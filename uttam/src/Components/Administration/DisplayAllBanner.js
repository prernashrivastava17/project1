import { useStyles } from "./DisplayAllBannersCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, ServerURL } from "../Services/NodeServices";
import { Button, Grid } from "@material-ui/core";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useNavigate } from "react-router-dom";

export default function DisplayAllBanners(props) {

  const classes = useStyles()
  const [banners, setBanners] = useState([])
  const [bannersId, setBannersId] = useState('')

  const [open, setOpen] = useState(false)

 
  var navigate = useNavigate()
  
  

  // const handleCancle = () => {
  //   setOpen(false)
    
  // }

  

  // const handleDelete = async () => {
  //   var body = { bannersid: bannersId }
  //   var result = await postData('category/delete_category', body)
  //   alert(result.status)
  //   fetchAllBanners()

  // }

  
  const fetchAllBanners = async () => {
    var data = await getData('userinterface/display_all_banners')
    var temp = JSON.parse(data.data)
    alert('ddd',temp)
    

  }

  useEffect(function () {
    fetchAllBanners()
  }, [])

  const handleOpen = (rowData) => {
    fetchAllBanners()
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
        title="Banner Pictures"
        columns={[
          { title: 'Banners Id', field: 'bannersid' },
          { title: 'Banner Pictures', field: 'bannerpictures' },

          { title: 'Banner Pictures', render: (rowData) => {
            <div>
                <img src={`${ServerURL}/images/${rowData.bannerpictures}`} alt='bannerpicture'  />
            </div>
          } },
          

        ]}
        data={banners}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Banner Images',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Banner Images',
            isFreeAction: true,
            onClick: (event, rowData) => {
              navigate('/dashboard/bannerimages')
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