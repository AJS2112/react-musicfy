import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome";
import firebaseApp from "../../utils/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { map } from "lodash";
import "./Home.scss";

const db = getFirestore(firebaseApp);

export default function Home() {
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
            })

    }, [])

    return (
        <>
            <BannerHome />
            <div className="home">
                <h1>Home...</h1>
            </div>
        </>
    )
}