import React, { useState } from "react";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";

import "./Player.scss";

export default function Player(props) {
    const songData = {
        image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-dbac4.appspot.com/o/album%2F77bdafba-2890-444a-a744-665669e4a0d9?alt=media&token=5c9b4186-c9ce-4fd3-a45b-47167d00bae1',
        name: "Hypersonic",
        url: ""
    }
    //const { songData } = props;
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3)
    const onStart = () => {
        setPlaying(true);
    }

    const onPause = () => {
        setPlaying(false);
    }

    const onProgress = data => {
        setPlayedSeconds(data.playedSeconds);
        setTotalSeconds(data.loadedSeconds);
    }

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={4} className="left">
                    <Image src={songData?.image} />
                    {songData?.name}
                </Grid.Column>
                <Grid.Column width={8} className="center">
                    <div className="controls">
                        {playing ? (
                            <Icon onClick={onPause} name="pause circle outline" />
                        ) : (
                            <Icon onClick={onStart} name="play circle outline" />
                        )
                        }
                    </div>
                    <Progress
                        progress="value"
                        value={playedSeconds}
                        total={totalSeconds}
                        size="tiny"
                    />
                </Grid.Column>
                <Grid.Column width={4} className="right">
                    <Input
                        type="range"
                        label={<Icon name="volume up" />}
                        min={0}
                        max={1}
                        step={0.01}
                        name="volume"
                        onChange={(e, data) => setVolume(data.value)}
                        value={volume}
                    />
                </Grid.Column>
            </Grid>

            <ReactPlayer
                className="react-player"
                url={songData?.url}
                playing={playing}
                height="0"
                width="0"
                volume={volume}
                onProgress={e => onProgress(e)}
            />
        </div>
    )
}