import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React,{createRef} from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { ServerURL } from "../../Services/NodeServices";


export default function  SliderComponent(props){
    var mySlider = createRef()
    var theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const setImageInSlider = () => {
        
        return props.images.map((item) => {
            return (
                <div>
                    <img src={`${ServerURL}/images/${item}`} width='100%' alt="bannerimages" />
                </div>
            )
        })
    }

    

    const handleBack = () => {
        mySlider.current.slickPrev()
    }

    const handleForward=()=>{
        mySlider.current.slickNext()
    
    }

    return(<div>
        <div style={{ width: '100%' }}>
            {matches?<></>:
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', left: '2%', top: '32%', zIndex: 1, background: '#000', width: 55, height: 55, opacity:0.5, borderRadius:'30px' }}>

                <ArrowBackIosNewIcon style={{ color: '#fff' }} onClick={() => handleBack()} />
            </div>
            }
            <Slider {...props.bannersettings} ref={mySlider}  >
                {setImageInSlider()}
            </Slider>
            {matches?<></>:
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', right:'2%', top: '32%', zIndex: 1, background: '#000', width: 55, height: 55, opacity:0.5, borderRadius:'30px' }}>

                <ArrowForwardIosIcon style={{ color: '#fff' }} onClick={() => handleForward()} />
            </div>
            }
        </div>
    </div>)
}
