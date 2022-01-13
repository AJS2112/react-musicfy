import React, { useState, useEffect } from "react";
import firebaseApp from "../../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import "./BannerArtist.scss";

export default function BannerArtist(props) {
    const { artist } = props;
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `artist/${artist?.banner}`);
        getDownloadURL(storageRefence)
            .then(url => {
                setBannerUrl(url);
            }).catch((err) => {
                console.log(err)
            })
    }, [artist]);

    return (
        <div
            className="banner-artist"
            style={{ backgroundImage: `url('${bannerUrl}')` }}
        >
            <div className="banner-artist__gradient" />
            <div className="banner-artist__info">
                <h4>ARTISTA</h4>
                <h1>{artist.name}</h1>
            </div>
        </div>
    )
}