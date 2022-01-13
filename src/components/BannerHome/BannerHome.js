import React, { useState, useEffect } from "react";
import firebaseApp from "../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import "./BannerHome.scss";

export default function BannerHome() {
    const [bannerUrl, setbannerUrl] = useState(null);

    useEffect(() => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `other/banner-home.jpg`);
        getDownloadURL(storageRefence)
            .then(url => {
                setbannerUrl(url)
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    if (!bannerUrl) {
        return null;
    }

    return (
        <div
            className="banner-home"
            style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
    )
}