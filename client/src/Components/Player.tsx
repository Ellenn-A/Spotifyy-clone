import React, { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { PlayerApi } from "spotify-web-api-ts/types/apis/PlayerApi";
import { IPlayerProps } from "../Types/Types";


export const Player: React.FC<IPlayerProps> = ({accessToken, trackUri}) =>{

    const [play, setPlay] = useState(false);

    useEffect(()=> setPlay(true),[trackUri])

    if (!accessToken) return null
    return(
        <SpotifyWebPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        />
    )
}