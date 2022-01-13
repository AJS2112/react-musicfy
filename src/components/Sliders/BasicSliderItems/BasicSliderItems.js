import React from "react";
import { map } from "lodash";
import Slider from 'react-slick'

import './BasicSliderItems.scss';


export default function BasicSliderItems(props) {
    const { title, data } = props;

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        className: "basic-slider-items__list"
    }

    return (
        <div className="basic-slider-items">
            <h2>{title}</h2>
            <Slider {...settings}>

            </Slider>
        </div>
    )
}