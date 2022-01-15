import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import firebaseApp from "../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import MenuLeft from "../../components/MenuLeft/MenuLeft";
import TopBar from "../../components/TopBar/TopBar";
import Player from "../../components/Player";

import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
    const { user, setReloadApp } = props;
    const [songData, setSongData] = useState(null);

    const playerSong = (albumImage, songName, songNameFile) => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `song/${songNameFile}`);
        getDownloadURL(storageRefence)
            .then(songUrl => {
                setSongData({ url: songUrl, image: albumImage, name: songName });
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLeft user={user} />
                    </Grid.Column>
                    <Grid.Column className="content" width={13}>
                        <TopBar user={user} />
                        <Routes
                            user={user}
                            setReloadApp={setReloadApp}
                            playerSong={playerSong}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Player songData={songData} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    );
}