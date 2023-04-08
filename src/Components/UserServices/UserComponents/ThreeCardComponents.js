import React, { useState, useEffect } from "react";
import { ServerURL } from "../../Services/NodeServices";

export default function ThreeCardComponents(props) {

    const MyComponent = () => {

        return props.data.map((item) => {
            return (
                <div style={{padding:2, margin:3, position: 'relative', width: '375px' }}>
                    <img src={`${ServerURL}/images/${item.picture}`} alt='THREEcomponent' style={{ width: '100%', height: '100%' }} />
                    <div style={{display:'flex', justifyContent:'center', background:'#C0C0C0'}}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', position: 'absolute',  top: '93%', color: '#fff', zIndex: 1, textAlign:'center', width:'99%',background:'#000',opacity:'60%', display:'flex', justifyContent:'center'}}>{item.productname}</div>
                    </div>
                </div>
            )
        })

    }



    return (     
        <MyComponent />       
    )
}