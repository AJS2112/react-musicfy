import React from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";

import MenuLeft from "../../components/MenuLeft/MenuLeft";
import TopBar from "../../components/TopBar/TopBar";

import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
    const { user } = props;

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
                        //setReloadApp={setReloadApp}
                        //playerSong={playerSong}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {/* <Player songData={songData} /> */}
                        <h2>Player</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    );
}