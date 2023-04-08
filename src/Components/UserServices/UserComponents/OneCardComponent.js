import React, { useState, useEffect } from "react";
import { ServerURL } from "../../Services/NodeServices";
import { useNavigate } from "react-router-dom"; 
export default function OneCardComponent(props) {

    const MyComponent = () => {

        const navigate=useNavigate()
        const handleClick = (scid,icon) =>{
            navigate(`/${props.url}/${scid}/${icon}`)

        }

        return props.data.map((item) => {
            return (
                <div onClick={()=>handleClick(item.subcategoryid,item.picture)} style={{margin:15,}}>
                <div style={{position: 'relative', width:'100%', height: 'auto',cursor:'pointer' }}>
                    <img src={`${ServerURL}/images/${item.picture}`} alt='ONecomponent' style={{ width: '100%', height: '100%' }} />
                    
                </div>
                </div>
            )
        })

    }



    return (     
        <MyComponent />       
    )
}