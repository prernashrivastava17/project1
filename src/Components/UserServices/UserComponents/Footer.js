import React from "react";
import { useStyles } from "./FooterCss";
import { Divider } from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {

    const classes = useStyles();

    return (
        
        <div className={classes.mainFooterContainer}>
            <Divider fullWidth style={{ width: '99%', margin:'10px',  }} />
            <div className={classes.linkContainer}>

                <div className={classes.links} style={{ color:'#fff'}}>
                    
                    <h3>LOCATION</h3>
                    
                    <div style={{color:'#434343'}}>13, behind Jhawar Estate Gulabchand Ki<br /> Bagichi, Nehru Colony, Mayur Nagar,<br /> Thatipur, Gwalior, Madhya Pradesh<br /> 474011<br /></div>
                    <a href="#" className={classes.aStyles} >yuvi@gmail.com</a>
                </div>

                <div className={classes.links}>
                    <h3  style={{ color:'#fff'}} >COMPANY</h3>
                    <a href="#" className={classes.aStyles} >About us</a>
                    <a href="#" className={classes.aStyles} >Collaboration</a>
                    <a href="#" className={classes.aStyles} >Term & Condition</a>
                    <a href="#" className={classes.aStyles} >Privacy Policy</a>
                    <a href="#" className={classes.aStyles} >Shipping Policy</a>
                    <a href="#" className={classes.aStyles} >Media</a>

                    
                    
                </div>

                <div className={classes.links}>
                    <h3  style={{ color:'#fff'}} >NEED HELP</h3>
                    <a href="#" className={classes.aStyles} >Contact us</a>
                    <a href="#" className={classes.aStyles}>Return, Refund and Cancellation</a>
                    <a href="#" className={classes.aStyles} >FAQ's</a>
                    <a href="#" className={classes.aStyles}>Track Order</a>
                    <a href="#" className={classes.aStyles}>Career</a>
                    <a href="#" className={classes.aStyles}>Sitemap</a>
                    
                    
                </div>

                <div className={classes.links}>
                    <h3  style={{ color:'#fff'}} >LET'S BE FRIENDS</h3>
                    <div className={classes.linksColumn}>
                        
                    <a href="#" className={classes.iconStyles} ><FacebookIcon fontSize="large"  /></a>
                    <a href="#" className={classes.iconStyles}><TwitterIcon fontSize="large"/></a>
                    <a href="#" className={classes.iconStyles}><InstagramIcon fontSize="large"/></a>
                    <a href="#" className={classes.iconStyles}><LinkedInIcon fontSize="large"/></a>
                    <a href="#" className={classes.iconStyles}><YouTubeIcon fontSize="large" /></a>
                    
                    </div>

                    <h3  style={{ color:'#fff'}} >DOWNLOAD THE APP</h3>
                    <div className={classes.linksColumn}>
                        
                    <a href="#" > <img src="/images/google-play1.png" alt="googleplay" width={"180px"} /> </a>
                    
                    </div>
                </div>

            </div>

        </div>
    )
}