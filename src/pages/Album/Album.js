import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebaseApp from "../../utils/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import './Album.scss';

const db = getFirestore(firebaseApp);

function Album(props) {
    const { match } = props;
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        getDoc(doc(db, "albums", match?.params?.id))
            .then(response => {
                setAlbum(response.data());
            })

    }, [match])

    return (
        <div>
            <h1>Album...</h1>
        </div>
    )
}

export default withRouter(Album);