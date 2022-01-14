import React from "react";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";

import "./Player.scss";

export default function Player(props) {
    //const { songData } = props;

    const songData = {
        image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-dbac4.appspot.com/o/album%2F77bdafba-2890-444a-a744-665669e4a0d9?alt=media&token=5c9b4186-c9ce-4fd3-a45b-47167d00bae1',
        name: "Hypersonic"
    }

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={4} className="left">
                    <Image src={songData?.image} />
                    {songData?.name}
                </Grid.Column>
                <Grid.Column width={8} className="center">
                    <h2>center</h2>
                </Grid.Column>
                <Grid.Column width={4} className="right">
                    <h2>right</h2>
                </Grid.Column>
            </Grid>
        </div>
    )
}