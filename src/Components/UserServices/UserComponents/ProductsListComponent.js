import React from "react";
import { ServerURL } from "../../Services/NodeServices";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export default function ProductsListComponent(props) {

    const navigate = useNavigate()
    const handleProductDetails = (item) => {

        navigate('/productdetails', { state: { product: JSON.stringify(item) } })

    }


    return props.data.map((item) => {
        return (

            <div onClick={() => handleProductDetails(item)} style={{ display: 'flex', flexDirection: 'column', color: '#fff', flexDirection:'row', margin:"10px"  }}>

                <div style={{ display:'flex', justifyContent: "center",padding: 2, margin: 4, position: 'relative', width: '270px'}}>
                    <img src={`${ServerURL}/images/${item.picture}`} alt='smallcomponent' style={{ width: '100%', height: '100%' }} />

                </div>
                <div style={{display:'flex',justifyContent: "center",flexDirection:'column' }} >
                    <div style={{ display: 'flex',  marginTop: 5, color: '#fff', fontWeight: 700, letterSpacing: 1, fontSize: 16 }} >
                        {item.productname}
                    </div>
                    <div style={{ display: 'flex', justifyContent: "left", marginTop: 3, fontWeight: 600, letterSpacing: 1, fontSize: 14 }}>
                        {item.price}
                    </div>
                </div>
            </div>
            
        )
    })


}