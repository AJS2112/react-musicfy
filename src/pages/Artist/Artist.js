import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebaseApp from "../../utils/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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
        <div>
            <h1>
                Artist
            </h1>
        </div>
    )
}

export default withRouter(Artist);