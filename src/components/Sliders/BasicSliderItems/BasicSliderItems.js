import React, { useEffect, useState } from "react";
import { map } from "lodash";
import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import firebaseApp from "../../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import './BasicSliderItems.scss';


export default function BasicSliderItems(props) {
    const { title, data, folderImage, urlName } = props;

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
                {map(data, item => (
                    <RenderItem key={item.id} item={item} folderImage={folderImage} urlName={urlName} />
                ))}
            </Slider>
        </div>
    )
}

function RenderItem(props) {
    const { item, folderImage, urlName } = props;
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `${folderImage}/${item.banner}`);
        getDownloadURL(storageRefence)
            .then(url => {
                setImageUrl(url);
            }).catch((err) => {
                console.log(err)
            })
    }, [item, folderImage]);


    return (
        <Link to={`/${urlName}/${item.id}`}>
            <div className="basic-slider-items__list-item">
                <div
                    className="avatar"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                />
                <h3>{item.name}</h3>
            </div>
        </Link>
    );
};