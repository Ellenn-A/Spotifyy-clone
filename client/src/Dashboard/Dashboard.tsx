import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../Authorisation/useAuth";
import {
  APIResponse,
  ICode,
  IReducedSongInfo,
  IResponseBody,
  ISong,
} from "../Types/Types";
import SpotifyWebApi from "spotify-web-api-node";
import { errorMonitor } from "events";
import { TrackSearchResult } from "../Components/TrackSearchResult";
import { Player } from "../Components/Player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "8f273efb99e646baaa11d22dc9e41803",
});

export const Dashboard: React.FC<ICode> = ({ code }): JSX.Element => {
  //making code back into ICode object
  const accessToken = useAuth({ code });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<IReducedSongInfo[]>();
  const [chosenTrack, setChosenTrack] = useState<IReducedSongInfo>();
  const [lyrics, setLyrics] = useState("");

  //   async function to get songs
  const getTracks = async (
    search: ISong["song"]
  ): Promise<SpotifyApi.TrackObjectFull[]> => {
    const songs = await spotifyApi.searchTracks(search);
    // const songsItems = songs.body.tracks!.items;
    return songs.body.tracks!.items;
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //search function

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    getTracks(search).then((result) => {
      if (cancel) return;

      const sth: IReducedSongInfo[] = result.map((track) => {
        const smallestAlbumImage = track.album.images.reduce<any>(
          (smallest, image) => {
            if (!image.height || !smallest.height) return;
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        };
      });
      setSearchResults(sth);
      // console.log(searchResults)
    });

    return () => {
      cancel = true;
    };
  }, [search, accessToken]);

  //getting lyrics
  useEffect(() =>{
      if(!chosenTrack) return
      axios.get('http://localhost:3001/lyrics',{
          params: {
              track:chosenTrack.title,
              artist: chosenTrack.artist
          }
      }).then(res =>{
          setLyrics(res.data.lyrics)
           console.log(res.data.lyrics)
      })

  },[chosenTrack])

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults?.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            setChosenTrack={setChosenTrack}
            setSearch={setSearch}
            setLyrics={setLyrics}
          />
        ))}
        {searchResults?.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={chosenTrack?.uri} />
      </div>
      <div>Bottom</div>
    </Container>
  );
};
