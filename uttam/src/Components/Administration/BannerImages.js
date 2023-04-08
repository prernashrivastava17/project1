import { useStyles } from "./BannerImagesCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useState } from "react";
import { postData } from "../Services/NodeServices";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import { DropzoneArea } from 'material-ui-dropzone'

export default function BannerImages(props) {

    var classes = useStyles()
    const [getFiles, setFiles] = useState([])
    
    var navigate = useNavigate()

    
    const handleSubmit = async () => {


        var formData = new FormData();
        getFiles.map((item, index) => {
            formData.append("picture" + index, item);
        });
        var result = await postData("products/add_new_banners", formData, true);
        if (result.status) {
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

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files)
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid className={classes.gridStyle} container spacing={2}>
                    <Grid className={classes.heading} item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span >
                                Banner Interfare
                            </span>
                            
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea

                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            filesLimit={6}
                            maxFileSize={5000000}
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