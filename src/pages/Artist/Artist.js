import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { map } from "lodash";

import BannerArtist from "../../components/Artists/BannerArtist/BannerArtist";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

import "./Artist.scss";

const db = getFirestore(firebaseApp);

function Artist(props) {
    const { match } = props;
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        getDoc(doc(db, "artists", match?.params?.id))
            .then(response => {
                const data = response.data();
                data.id = response.id;
                setArtist(data);
            })

    }, [match]);

    useEffect(() => {
        if (artist) {
            const q = query(collection(db, "albums"), where("artist", "==", artist.id));
            getDocs(q)
                .then(response => {
                    const arrayAlbums = [];
                    map(response?.docs, album => {
                        const data = album.data();
                        data.id = album.id;
                        arrayAlbums.push(data);
                    });
                    setAlbums(arrayAlbums);
                });
        }

    }, [artist]);




    return (
        <div className="artist">
            {artist && (
                <>
                    <BannerArtist artist={artist} />

                    <div className="artist__content">
                        <BasicSliderItems
                            title="Albums"
                            data={albums}
                            folderImage="album"
                            urlName="album"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default withRouter(Artist);