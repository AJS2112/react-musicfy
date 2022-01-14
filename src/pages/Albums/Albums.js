import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { map } from "lodash";

import "./Albums.scss";

const db = getFirestore(firebaseApp);

export default function Albums() {
    const [albums, setAlbums] = useState([]);

    //console.log(artists);

    useEffect(() => {
        getDocs(collection(db, "albums"))
            .then(response => {
                const arrayAlbums = [];
                map(response?.docs, album => {
                    const data = album.data();
                    data.id = album.id;
                    arrayAlbums.push(data);
                });
                setAlbums(arrayAlbums);
            });
    }, [])

    return (
        <div className="albums">
            <h1>Albums</h1>
            <Grid>
                {map(albums, album => (
                    <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
                        <Album album={album} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}

function Album(props) {
    const { album } = props;
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `album/${album.banner}`);
        getDownloadURL(storageRefence)
            .then(url => {
                setBannerUrl(url);
            }).catch((err) => {
                console.log(err)
            })
    }, [album]);

    return (
        <Link to={`/album/${album.id}`}>
            <div className="albums__item">
                <div
                    className="avatar"
                    style={{ backgroundImage: `url('${bannerUrl}')` }}
                />
                <h3>{album.name}</h3>
            </div>
        </Link>
    )
}