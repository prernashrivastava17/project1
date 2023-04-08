import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { postData } from "../../Services/NodeServices";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';

export default function LoginDialog(props) {

    // var dispatch = useDispatch()
    var navigate = useNavigate()

    console.log('ddddddddddddddddd', props.open)
    const [open, setOpen] = React.useState(props.open);
    const [otpDialog, setOtpDialog] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [userData, setUserData] = useState([])
    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');
    const [mobileNumber, setMobileNumber] = useState('')
    const [emailid, setEmailid] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [dateofbirth, setDateofbirth] = useState(dayjs(''));
    const [gender, setGender] = useState('')



    const handleClickOpen = () => {
        setOpen(true)

    };
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckOtp = () => {

        // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqq',userData)
        alert("otp:" + otp + ", inputOTP: " + inputOtp)
        if (otp == inputOtp) {
            if (userData.status) {
                // alert('hhhh')
                // console.log('check', userData.data)
                // alert(JSON.stringify(userData.data))
                // dispatch({ type: 'ADD_USER', payload: [userData.data.mobilenumber, userData.data] })
                // setOtpDialog(false)
                // dispatch({type:'LOGIN', payload: [userData.data.mobilenumber, userData.data]})
                navigate("/shipping")


            }
            else {
                setOpenDetails(true)
                setOpen(false)
                setOtpDialog(false)
            }
        }
        else {
            alert('Invalid OTP...')
        }
    }

    const generateOtp = () => {
        // if (userData.result) {
        //     alert('dd')
        fetchUserData()
        // }

        var otp = parseInt(Math.random() * 8999) + 1000
        alert(otp)
        setOtp(otp)

    }

    const handleOtpDialog = (value, phoneNo) => {
        generateOtp()
        setOpen(false)
        setOtpDialog(true, phoneNo)
    };

    const handleOtpClose = () => {
        setOtpDialog(false);
    };



    const handleDetailsClose = () => {
        setOpenDetails(false);
    };

    const fetchUserData = async () => {
        var result = await postData('userinterface/check_user_mobilenumber', { mobilenumber: mobileNumber })

        setUserData(result)
        console.log('sssssssssssssssss', result.status)

    }

    const handleSubmit = async () => {

        var body = { mobilenumber: mobileNumber, emailid: emailid, firstname: firstname, lastname: lastname, dateofbirth: dateofbirth, gender: gender }
        var result = await postData('userinterface/submit_userdata', body)
        if (result.status) {
            setOtpDialog(false)
            setOpenDetails(false)
            fetchUserData()
            // dispatch({ type: 'ADD_USER', payload: [mobileNumber, body] })
            navigate("/shipping")
            alert("Welcome to TUG")
        }
        else {
            alert("Pls Check the input vlaues....")
        }

    }

    const handleDetailClose = () => {
        setOpenDetails(false);
    }

    const handleDateChange = (dateofbirth) => {
        setDateofbirth(dateofbirth)
    };


    useEffect(function () { setOpen(props.open) }, [props])

    const loginDialog = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Dialog open={open} onClose={handleClose}   >

                    <DialogContent style={{ padding: '0px', width: '350px' }}  >
                        <img src='images/welcome.png' alt="login" width="100%" />
                        <DialogContentText style={{ fontSize: '12px', display: 'block', color: 'color: rgba(40, 44, 63, 0.8)', paddingLeft: '15px' }}>
                            Get Exiting offers on your favoriot product.

                        </DialogContentText>
                        <div style={{ paddingTop: 15, margin: '0px 15px' }}>
                            <TextField
                                autoFocus
                                size='small'
                                margin="dense"
                                id="name"
                                label="Phone Number"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            //startAdornment={<InputAdornment position="start" >+91</InputAdornment>}

                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '500', color: 'color: rgba(40, 44, 63, 0.8)', display: 'block', margin: '0px 15px' }}>OTP will be sent to this number by SMS.</div>
                        <div style={{ paddingTop: 15, fontSize: '12px', margin: '0px 15px' }}>
                            <Button
                                variant="contained"
                                size='medium'
                                fullWidth
                                onClick={(value) => handleOtpDialog(value, mobileNumber)}
                            >
                                Login with OTP

                            </Button>


                        </div>
                        <div style={{ paddingTop: 15, margin: '0px 15px' }}>
                            <Button fullWidth>
                                Continue as Guest
                            </Button>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button size='small' onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }


    const loginOtpDialog = () => {

        return (
            <div>

                <Dialog open={otpDialog} onClose={handleOtpClose} >
                    {/* <DialogTitle><div style={{ lineHeight: 0.6 }}>Login <span style={{ color: 'rgba(40, 44, 63, 0.8)' }}>/</span> Signup</div></DialogTitle> */}
                    <DialogContent style={{ padding: '0px', width: '350px' }}>
                        <img src='images/login-image-final.jpg' alt="login" width="350px" />
                        <DialogContentText style={{ fontSize: '12px', display: 'block', color: 'color: rgba(40, 44, 63, 0.8)', margin: '0px 15px' }}>
                            Get Exiting offers on your favoriot product.

                        </DialogContentText>
                        <div style={{ paddingTop: 1, margin: '0px 15px' }}>
                            <TextField
                                autoFocus
                                size='small'
                                margin="dense"
                                id="name"
                                label="Phone Number"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                value={mobileNumber}


                            />
                        </div>
                        <div>
                            <a style={{ color: 'rgb(81, 204, 204)', fontSize: '16px', textAlign: 'right', display: 'block', marginBottom: '0px', paddingTop: 0, marginRight: '15px' }}>Resend OTP</a>
                        </div>
                        <div style={{ paddingTop: 0, margin: '0px 15px' }} >
                            <TextField
                                size="small"
                                margin="dense"
                                id="inputotp"
                                label="Enter 4 Digit OTP"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                onChange={(event) => setInputOtp(event.target.value)}
                            />
                        </div>


                        <div style={{ paddingTop: 1, margin: '0px 15px', fontSize: '12px' }}>
                            <Button onClick={handleCheckOtp} variant="contained" size='medium' fullWidth mobileNumber={mobileNumber} >
                                Sign up
                            </Button>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button size='small' onClick={handleOtpClose}>Close</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

    const loginDeitails = () => {
        return (
            <div>
                <Dialog
                    open={openDetails}
                    onClose={handleDetailClose}

                >

                    <DialogContent style={{ padding: '10px', width: '350px', fontSize: '20px', fontWeight: 500, letterSpacing: 1 }}>
                        Welcome to TUG
                        <DialogContentText style={{ fontSize: '12px', display: 'block', color: 'color: rgba(40, 44, 63, 0.8)', margin: '0px 15px' }}>
                            Enter your details. Let us quickly get to know you to provide Exiting offers on your favoriot product.

                        </DialogContentText>

                        <div style={{ paddingTop: 1, margin: '0px 15px' }} >
                            <Grid container spacing={1} >
                                <Grid item xs={6} >
                                    <TextField
                                        size="small"
                                        margin="dense"
                                        id="firstname"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        onChange={(event) => setFirstname(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField
                                        size="small"
                                        margin="dense"
                                        id="lastname"
                                        label="last Name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        onChange={(event) => setLastname(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{ paddingTop: 1, margin: '0px 15px 5px' }} >
                            <TextField
                                size="small"
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                onChange={(event) => setEmailid(event.target.value)}
                            />
                        </div>

                        <div style={{ paddingTop: 1, margin: '0px 15px 5px' }} >
                            <Grid container spacing={1} >
                                <Grid item xs={12} style={{ lineHeight: "50px" }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <MobileDatePicker

                                            margin="dense"
                                            label="Date Of Birth"
                                            inputFormat="DD/MM/YYYY"
                                            value={dateofbirth}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField style={{ width: '320px', height: '12px', color: 'rgba(0, 0, 0, 0.6);' }} {...params} />}
                                        />
                                    </LocalizationProvider>

                                </Grid>
                                <Grid item xs={12} style={{ lineHeight: "50px" }} >

                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={gender}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />


                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                            </Grid>

                        </div>

                        <div style={{ display: 'flex', letterSpacing: '0.3', color: '#6f6f6f;' }}>
                            <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}><Checkbox {...label} defaultChecked size="small" /></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 500 }}>Yes, Keep me updated with current offers.</div>

                        </div>

                        <div style={{ paddingTop: 1, margin: '0px 15px', fontSize: '12px' }}>
                            <Button onClick={handleSubmit} variant="contained" size='medium' fullWidth  >
                                Sign up
                            </Button>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button size='small' onClick={handleDetailsClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <div>
            {loginDialog()}
            {loginOtpDialog()}
            {loginDeitails()}

        </div>



    )
}