import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import BannerArtist from "../../components/Artists/BannerArtist/BannerArtist";

import "./Artist.scss";

const db = getFirestore(firebaseApp);

function Artist(props) {
    const { match } = props;
    const [artist, setArtist] = useState(null);

    useEffect(() => {

        getDoc(doc(db, "artists", match?.params?.id))
            .then(response => {
                setArtist(response.data());
            })

    }, [match])



    return (
        <div className="artist">
            {artist && (
                <>
                    <BannerArtist artist={artist} />
                    <h2>
                        Mas informacion
                    </h2>
                </>
            )}
        </div>
    )
}

export default withRouter(Artist);