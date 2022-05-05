import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { PlayerApi } from "spotify-web-api-ts/types/apis/PlayerApi";
import { IPlayerProps } from "../Types/Types";


export const Player: React.FC<IPlayerProps> = ({accessToken, trackUri}) =>{
    if (!accessToken) return null
    return(
        <SpotifyWebPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        />
    )
}