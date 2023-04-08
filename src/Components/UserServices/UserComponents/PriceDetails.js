import React, { useState } from "react";
import { Divider } from "@mui/material";
import LoginDialog from "./LoginDialog";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Services/NodeServices";


export default function PriceDetails(props) {

    var values = props.values
    console.log('ppppppppppppp',props.values)
    const [open, setOpen] = useState(false)
    var navigate = useNavigate()

    
    const [pincode, setPincode] = useState('');
    const [town, setTown] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [userid, setuserID] = useState('');

    const totalPayableAmount = (a, b) => {
        var price = 0
        if (b.offerprice > 0)
            price = b.offerprice * b.qty
        else
            price = b.price * b.qty
        return a + price
    }

    const actualAmount = (a, b) => {

        return a + b.price * b.qty
    }

    const productQty = (a, b) => {

        return b.qty
    }


    var tamt = values.reduce(totalPayableAmount, 0)
    var aamt = values.reduce(actualAmount, 0)
    var qty = values.reduce(productQty, 0)

    const handleClick = () => {

        // alert(props.page)
        if (props.page == "MyCart") {

            setOpen(true)
        }
        else if (props.page == "Shipping") {

           navigate('/paymentgateway')

        }


    }


    return (
        <div style={{display:'flex',flexDirection:"column", width:"91%", marginLeft:'15px'}} >


            <div style={{ fontSize: '18px', fontWeight: '600', display: 'flex', width: '100%', justifyContent: 'left', marginLeft: '15px', marginRight: '5px', marginBottom: '10px', flexDirection: 'column' }} >PRICE DETAILS({qty} items)</div>
            <Divider style={{ margin: '8px', marginBottom: '10px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', paddingRight: '15px', lineHeight: '27px' }} >
                <div style={{ display: 'flex' }} >
                    <div style={{ display: 'flex', flexGrow: 1 }}  >Total MRP (Inc. of all Taxes)</div>
                    <div>&#8377;{aamt}</div>
                </div>
                <div style={{ display: 'flex' }} >
                    <div style={{ display: 'flex', flexGrow: 1 }}  >TUG Discount</div>
                    <div>-&#8377;{aamt - tamt}</div>
                </div>
                <div style={{ display: 'flex' }} >
                    <div style={{ display: 'flex', flexGrow: 1 }}  >Shipping</div>
                    <div style={{ display: 'flex', color: 'green' }}>Free</div>
                </div>
                <div style={{ display: 'flex' }} >
                    <div style={{ display: 'flex', flexGrow: 1 }}  >Cart Total</div>
                    <div>&#8377;{tamt}</div>
                </div>

            </div>

            <Divider style={{ margin: '8px', marginBottom: 2 }} />

            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', lineHeight: '35px' }}>
                <div style={{ display: 'flex', fontWeight: 'bold', marginBottom: '5px' }} >
                    <div style={{ display: 'flex', flexGrow: 1 }}  >Total Amount</div>
                    <div style={{ display: 'flex' }}>&#8377;{tamt}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', lineHeight: '27px', color: '#fff' }}>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 700, background: 'green', padding: '5px', borderRadius: 2, marginBottom: 7 }}  >You Saved<span>&#160;&#8377;{aamt - tamt}&#160;</span>On This Order</div>

            </div>

            {props.page == 'MyCart' ? <>

                <div onClick={handleClick} style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer',margin:'0px 0px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', lineHeight: '27px', color: '#fff', width: '100%' }}>
                        <div style={{ textDecoration: 'none', color: '#fff', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', fontSize: '25px', width: '102%' }}>

                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 700, background: '#48dbfb', padding: '5px', borderRadius: 2, height: '50px', alignItems: 'center' }}  >

                                CHECKOUT SECURELY

                            </div>
                        </div>
                    </div>

                </div>

            </> : <>

                <div onClick={handleClick} style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer',margin:'0px 0px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', lineHeight: '27px', color: '#fff', width: '100%' }}>
                        <div style={{ textDecoration: 'none', color: '#fff', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', fontSize: '25px', width: '102%' }}>

                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 700, background: '#48dbfb', padding: '5px', borderRadius: 2, height: '50px', alignItems: 'center' }}  >

                                CHECKOUT SECURELY

                            </div>
                        </div>
                    </div>

                </div>

            </>}

            <LoginDialog open={open} />
        </div >


    )
}