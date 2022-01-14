import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
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
    //const [isLoading, setIsLoading] = useState(false);

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

    if (!album || !artist) {
        return <Loader active>Cargando</Loader>
    }
    return (
        <div className='album'>
            <div className='album__header'>
                <HeaderAlbum album={album} albumImg={albumImg} artist={artist} />
            </div>
            <div className='album__songs'>
                <p>Lista de canciones...</p>
            </div>
        </div>
    )
}

export default withRouter(Album);

function HeaderAlbum(props) {
    const { album, albumImg, artist } = props;

    return (
        <>
            <div
                className='image'
                style={{ backgroundImage: `url('${albumImg}')` }}
            />
            <div className='info'>
                <h1>{album.name}</h1>
                <p>De <span>
                    {artist.name}
                </span>
                </p>
            </div>
        </>
    )
}