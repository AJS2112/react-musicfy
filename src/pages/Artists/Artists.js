import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
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
                    <Artist key={artist.id} artist={artist} />
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
        <div>
            <h2>{artist.name}</h2>
        </div>
    )
}