import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";




export default function Sidelist(props)
{
 return(
<div style={{ display: 'flex', flexDirection: 'row' }}>
                <Divider />
                <List component="nav">
                    <React.Fragment>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>

                        <Link to='/dashboard/displayallcategories' style={{textDecoration:'none',color:'black'}} > 
                            <ListItemButton  >
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Categories" />
                            </ListItemButton>
                        </Link>

                        <Link to='/dashboard/displayallsubcategories' style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="SubCategory" />
                        </ListItemButton>
                        </Link>

                        <Link to='/dashboard/displayallproducts' style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                        </Link>

                        

                        {/* <Link to='/dashboard/productimages' style={{textDecoration:'none',color:'black'}} > 
                            <ListItemButton  >
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Product Images" />
                            </ListItemButton>
                        </Link> */}

                    </React.Fragment>
                    <Divider sx={{ my: 2 }} fullWidth />
                    <React.Fragment>
                        <ListSubheader component="div" inset>
                            Saved reports
                        </ListSubheader>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Current month" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Last quarter" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Year-end sale" />
                        </ListItemButton>
                    </React.Fragment>
                </List>
            </div>

 )

}