import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { postData, ServerURL } from "../../Services/NodeServices";
import { color } from "@mui/system";


var productImage = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    focusOnSelect:true,
    prevArrow:color.red
}

var sliderNav = {
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    centerMode: true
}

export default function ProductImageSlider(props) {

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const [images,setImages]= useState([])

    const fetchAllProductImages=async()=>{

        var result = await postData('userinterface/fetchallpictures',{productid:props.productid})
        setImages(JSON.parse(result.data[0].productimages))
    }


    const setImageSlider = () => {
        return images.map((item) => {
            return (<div>
                <img src={`${ServerURL}/images/${item}`} alt="xx" style={{ width: '100%', height: '100%' }} />
            </div>)
        })

    }

    useEffect(function(){
        fetchAllProductImages()
    },[])
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', width: '80%', background: '#fff', height: 'auto', flexWrap: 'wrap', margin: '0% 5%' }}>


            <div style={{ width: '90%' }}>
                <div style={{  display: 'flex' }}>

                    <div style={{ width: '18%',height:'100%',marginRight:'10px' }}>
                        <Slider {...sliderNav} ref={(slider2) => setNav2(slider2)} asNavFor={nav1}>
                            {setImageSlider()}
                        </Slider>
                    </div>
                    <div style={{ width: '96%' }}>

                        <Slider {...productImage} ref={(slider1) => setNav1(slider1)} asNavFor={nav2} >
                            {setImageSlider()}
                        </Slider>
                    </div>
                </div>
            </div>




        </div>
    )
}