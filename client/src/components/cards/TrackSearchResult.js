

export default function TrackSearchResult({track, chooseTrack, setSearch}) {
    // console.log("track in TrackSearchResult --", track.albumUrl)

    function handlePlay() {
        // console.log("Playing track --", track.title)
        chooseTrack(track)
        // setSearch("")
    }


  return (
    <div
  className="d-flex m-1 align-items-center"
  style={{
    cursor: "pointer",
    border: "1px solid #6d71768d",
    borderRadius: "10px",
    padding: "5px",
    backgroundColor: "#000000c3",
  }}
  onClick={handlePlay}
>
  <img
    src={track.albumUrl}
    style={{
      height: "50px",
      width: "64px",
      borderRadius: "8px",
      objectFit: "cover",
    }}
    alt="Album Art"
  />

  <div className="ms-2 text-light">
    <div className="fs-6">
      {track.title}
    </div>

    <div
      className="text-secondary"
      style={{ fontSize: "12px" }}
    >
      {track.artist}
    </div>
  </div>
</div>
  )
}
