import React, { useState, useEffect } from "react";
import firebaseApp from "../../utils/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { map } from "lodash";

import BannerHome from "../../components/BannerHome";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

import "./Home.scss";

const db = getFirestore(firebaseApp);

export default function Home() {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);


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
            })
    }, [])

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
            })
    }, [])

    return (
        <>
            <BannerHome />
            <div className="home">
                <BasicSliderItems
                    title="Ultimos Artistas"
                    data={artists}
                    folderImage="artist"
                    urlName="artist"
                />

                <BasicSliderItems
                    title="Ultimos Albums"
                    data={albums}
                    folderImage="album"
                    urlName="album"
                />

            </div>
        </>
    )
}