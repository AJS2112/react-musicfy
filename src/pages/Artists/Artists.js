import React, { useState, useEffect } from "react";
import firebaseApp from "../../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { map } from "lodash";

import "./Artists.scss";

const db = getFirestore(firebaseApp);

export default function Artists() {
    const [artists, setArtists] = useState([]);

    console.log(artists);

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
        </div>
    )
}