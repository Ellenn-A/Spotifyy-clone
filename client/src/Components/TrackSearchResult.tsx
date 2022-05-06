import React, { FC } from "react";
import { ITrackResult } from "../Types/Types";

export const TrackSearchResult: React.FC<ITrackResult> = ({
  track,
  setChosenTrack,
  setSearch,
  setLyrics
}) => {
  const handlePlay = () => {
    setChosenTrack(track);
    setSearch("");
    setLyrics("");
  };

  return (
    <div
      className="d-flex m-2 align-items-centre"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />

      <div className="px-3">{track.title}</div>

      <div className="text-muted">{track.artist}</div>
    </div>
  );
};
