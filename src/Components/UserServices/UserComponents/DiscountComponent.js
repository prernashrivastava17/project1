import React, { useState } from "react";
import { Button } from "@mui/material";


export default function DiscountComponent() {

    const [showMoreOrLessBtn, setShowMoreOrLessBtn] = useState(false)

    return (
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center',width:'91%',lineHeight:"25px",marginLeft:"15px " }}>
            <ul>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                    <li>Flat  &#8377;100 off on orders above &#8377;999-<span style={{ fontWeight: '700', paddingLeft: '35px' }}>TUG100</span></li>
                </span>

                {showMoreOrLessBtn ? <><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <li >Flat  &#8377;200 off on orders above &#8377;1999<span style={{ fontWeight: '700', paddingLeft: '35px' }}>TUG200</span><br />(Prepaid orders only)-</li>
                </span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <li>Flat  &#8377;300 off on orders above &#8377;2999<span style={{ fontWeight: '700', paddingLeft: '35px' }}>TUG300</span><br />(Prepaid orders only)-</li>
                    </span>
                </> : <></>}
                <div>
                    <Button onClick={() => setShowMoreOrLessBtn(!showMoreOrLessBtn)} style={{ textTransform: 'capitalize', color: '#8B8B8B', margin: "3px 0px" }}>Show Offers</Button>
                </div>
            </ul>
        </div>
    )
}