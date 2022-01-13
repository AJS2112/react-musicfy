import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { map } from "lodash";

import "./Artists.scss";

const db = getFirestore(firebaseApp);

export default function Artists() {
    const [artists, setArtists] = useState([]);

    //console.log(artists);

    useEffect(() => {
        getDocs(collection(db, "artists"))
            .then(response => {
                const arrayArtists = [];
                map(response?.docs, artist => {
                    const data = artist.data();
                    data.id = artist.id;
                    arrayArtists.push(data);
                });
                setArtists(arrayArtists);
            });
    }, [])

    return (
        <div className="artists">
            <h1>Artistas</h1>
            <Grid>
                {map(artists, artist => (
                    <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
                        <Artist artist={artist} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}

function Artist(props) {
    const { artist } = props;
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `artist/${artist.banner}`);
        getDownloadURL(storageRefence)
            .then(url => {
                setBannerUrl(url);
            }).catch((err) => {
                console.log(err)
            })
    }, [artist]);

    return (
        <Link to={`/artist/${artist.id}`}>
            <div className="artists__item">
                <div
                    className="avatar"
                    style={{ backgroundImage: `url('${bannerUrl}')` }}
                />
                <h3>{artist.name}</h3>
            </div>
        </Link>
    )
}