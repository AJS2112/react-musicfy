import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebaseApp from "../../utils/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import './Album.scss';

const db = getFirestore(firebaseApp);

function Album(props) {
    const { match } = props;
    const [album, setAlbum] = useState(null);
    const [albumImg, setAlbumImg] = useState(null);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        getDoc(doc(db, "albums", match?.params?.id))
            .then(response => {
                setAlbum(response.data());
            })
    }, [match]);

    useEffect(() => {
        if (album) {
            var storage = getStorage(firebaseApp);
            var storageRefence = ref(storage, `album/${album?.banner}`);
            getDownloadURL(storageRefence)
                .then(url => {
                    setAlbumImg(url);
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [album]);

    useEffect(() => {
        if (album) {
            getDoc(doc(db, "artists", album?.artist))
                .then(response => {
                    setArtist(response.data());
                })
        }
    }, [album])

    return (
        <div>
            <h1>Album...</h1>
        </div>
    )
}

export default withRouter(Album);