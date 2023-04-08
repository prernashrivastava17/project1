import React from "react";
import { TextField, Button } from "@mui/material";

export default function CouponComponent() {

    return (
        <div style={{ display: 'flex',flexDirection:'column',width:'91%',justifyContent:'left', paddingLeft: '15px',marginRight:'0px', }}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', lineHeight: 3,width:'100%' }}>
                {/* right product details */}

                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>                    
                    <img src="images/Coupon-PNG.png" alt="coupon" width='65px' />
                </span>
                <span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', textDecoration: 'none', fontWeight: '500', padding: 4, fontFamily: 'Roboto' }} >
                    Have a coupon/referal code?
                </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }} >
                <span style={{ display: 'flex', alignItems: 'center',flexGrow:1 }}>
                    <TextField size="small" label="Enter Code" fullWidth/>
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex',background:'#48dbfb',width:'67px',height:'40px',borderRadius:'2px',cursor:'pointer' }} >
                        <div style={{ display: 'flex',fontWeight:'600',width:'100%',color:'#fff',justifyContent:'center',alignItems:'center' }}>
                            {/* <a href="#" style={{textDecoration:'none'}} >APPLY</a> */}
                            APPLY
                        </div>
                    </div>
                    {/* <Button variant="contained" fullWidth >Apply</Button> */}
                </span>
            </div>
        </div>

    )
}