import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { size, map } from "lodash";
import { Link } from 'react-router-dom';
import firebaseApp from "../../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

import "./SongsSlider.scss";

const db = getFirestore(firebaseApp);


export default function SongsSlider(props) {
    const { title, data } = props;

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        className: "songs-slider__list"
    }

    // if (size(data)<5) {
    //     return null;
    // }

    return (
        <div className="songs-slider">
            <h2>{title}</h2>
            <Slider {...settings}>
                {map(data, item => (
                    <Song key={item.id} item={item} />
                ))}
            </Slider>
        </div>
    )
}

function Song(props) {
    const { item } = props;

    const [banner, setBanner] = useState(null);
    const [album, setAlbum] = useState(null);

    console.log(album)

    useEffect(() => {

        getDoc(doc(db, "albums", item.album))
            .then(response => {
                const data = response.data();
                data.id = response.id;
                setAlbum(data);
                getImage(data);
            })

    }, [item]);

    const getImage = album => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `album/${album.banner}`);
        getDownloadURL(storageRefence)
            .then(url => {
                setBanner(url);
            }).catch((err) => {
                console.log(err)
            })
    }

    return (

        <p>{item.name}</p>
    )
}