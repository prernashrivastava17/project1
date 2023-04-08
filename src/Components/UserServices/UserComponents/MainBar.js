import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import { getData, postData, ServerURL } from '../../Services/NodeServices';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LaptopIcon from '@mui/icons-material/Laptop';

import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MainBar(props) {

    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')

    const [subCategory, setSubCategory] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = useState(anchorEl)

    const navigate = useNavigate()
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
        setOpen(true)
        setCategoryId(event.currentTarget.value)
        fetchAllSubCategories(event.currentTarget.value)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };


    const fetchAllSubCategories = async (categoryid) => {

        var body = await postData('userinterface/display_all_subcategory', { categoryid: categoryid })

        setSubCategory(body.data)
    }

    const fetchAllCategories = async () => {

        var body = await getData('userinterface/display_all_category')
        setCategory(body.data)
    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const showCategoryMenu = () => {
        return category.map((item) => {
            return (
                <div style={{display:'flex',justifyContent:"center",margin:'0% 1%'}} >                    
                    <Button onClick={handleClick} value={item.categoryid} color="inherit" id="basic-button">
                        {/* <LaptopIcon/> */}
                        {/* <img src={`${ServerURL}/images/${item.picture}`} width='30px' style={{display:'flex', justifyContent:"center",  marginRight:2}}  /> */}
                        {item.categoryname}
                    
                    </Button>
                </div>
            )
        })
    }

    const showSubCategoryMenu = () => {
        return subCategory.map((item) => {

            return (
                <MenuItem  >{item.subcategoryname}</MenuItem>
            )
        })
    }

    const [popOpen, setPopOpen] = useState(false)
    const [anchorE2, setAnchorE2] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const handlePopoverOpen = (event) => {
        // console.log(event)
        // if (keys.length) {
        //   setAnchorE2(event.currentTarget)
        //   setPopOpen(true)
        //   setRefresh(!refresh)
        // }
        // else {
        //   setPopOpen(false);
        // }
    }

    const handlePopoverClose = (event) => {
        setAnchorE2(null);
        setPopOpen(false);
        setRefresh(!refresh);
    };

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#fff', height:'45px', display:'flex', justifyContent:'center' }} >
                <Toolbar>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'bottom', width: '94%', color: '#000', flexGrow: 1 }}>
                        {showCategoryMenu()}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {showSubCategoryMenu()}
                        </Menu>
                    </div>

                    <div style={{ width: '4%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                        <div onClick={() => navigate("/mycart")}
                            style={{ display: "flex", width: "20%", justifyContent: "right" }}
                        >
                            <Badge
                                //badgeContent={keys.length} 
                                color="primary">
                                <ShoppingCart
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                    style={{ color: '#000' }}
                                />
                            </Badge>

                        </div>
                    </div>

                </Toolbar>
            </AppBar>

        </Box>
        {/* <PopCart anchorE2={anchorE2} popOpen={popOpen} /> */}
    </>
    );
}
