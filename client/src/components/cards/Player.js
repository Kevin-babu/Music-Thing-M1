import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, setTrackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <SpotifyPlayer
        token={accessToken}
        uris={trackUri ? [trackUri] : []}
        play={play}
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
        styles={{
          bgColor: "#0303046f",
          color: "#ffffff",
          loaderColor: "#1ef240",

          sliderColor: "#1ef240",
          sliderTrackColor: "#3a3f45",

          trackArtistColor: "#8f98a3",
          trackNameColor: "#ffffff",

          // Controls
          activeColor: "#1ef240",
          playButtonColor: "#1ef240",

          // Layout
          height: 80,
          compact: false,
        }}
      />
    </div>
  );
}