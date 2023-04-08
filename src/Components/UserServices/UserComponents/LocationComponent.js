import React from "react";
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



export default function LocationComponent(props) {

    const location=()=>{
        
    }

    
    return (
        <div style={{display:'flex',justifyContent:'left',alignItem:'center',width:'100%',background:'#fff',height:'auto',flexWrap:'wrap',marginTop:'10px' }}>
                        
            <div style={{ width:'100%' }}>
                <ul style={{listStyle:'none',margin:0,padding:'0% 9%',fontSize:'13px',letterSpacing:'1px',fontWeight:'400'}}>                    
                    <li style={{display:'inline-block',margin:'0px 10px'}} >
                        <a style={{textDecoration:'none',color:'#515151'}} href="/home" >HOME</a>
                        
                    </li>
                    <span style={{marginTop:'2px'}}><ArrowForwardIosIcon style={{width:'13px',color:'#515151',margin:'-6px 0px'}} /></span>
                    <li style={{display:'inline-block',margin:'0px 10px'}}>
                        <a style={{textDecoration:'none',color:'#515151'}} href="/#" >COUPLE T-SHIRT</a>
                    </li>
                    <span style={{marginTop:'2px'}}><ArrowForwardIosIcon style={{width:'13px',color:'#515151',margin:'-6px 0px'}} /></span>
                    <li style={{display:'inline-block',margin:'0px 10px'}}>
                        <a style={{textDecoration:'none',color:'#515151'}} href="/#" >MR AND MRS T-SHIRT</a>
                    </li>
                </ul>
            </div >



        </div>
    )
}