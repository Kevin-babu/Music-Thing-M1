import Tracks from './Tracks'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { motion } from "framer-motion";
import "../styles/background.css"

export default function PlaylistTracks({accessToken, playlistID, setPlayingTrack,viewGeneratedPlaylist, setviewGeneratedPlaylist, newPlaylistTracks, PlaylistName, setNewPlaylistTracks, setNewPlaylistName, newPlaylistName}) {

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
  
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  console.log("playlistName --", PlaylistName)

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SPOTIFY_BACKEND_URI}/api/playlist-tracks`, {
          accessToken,
          playlistID,
        });
        console.log("playlist tracks -- ", response.data);

        setPlaylistTracks(response.data.items.map(track => {
      
          const smallestAlbumImage = track.item.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.item.album.images[0]);
  
        return {
          artist: track.item.artists[0].name,
          title: track.item.name,
          uri: track.item.uri,
          albumUrl: smallestAlbumImage.url,
          albumId: track.item.album.id,
          duration: formatDuration(track.item.duration_ms)
        }
        }));
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
    };
    fetchPlaylistTracks();
  }, [playlistID, accessToken]);


  useEffect(()=>{
    console.log("newTracks loaded", newPlaylistTracks)
  }, [newPlaylistTracks])

  function playsong(index){
    console.log("now playing", newPlaylistTracks[index])
    setPlayingTrack(newPlaylistTracks[index])
  }

  function removeTrack(indexToRemove){
  setNewPlaylistTracks(prev =>
    prev.filter((_, index) => index !== indexToRemove)
  );
};

  return (
    <div className='playlistTracks'>

    {viewGeneratedPlaylist ? (
      <div className='' style={{ color:"white", overflowY: "auto", }}>
        <h3 className= "m-3 justify-items-center" style={{width:"100%"}}>Tracks</h3>
        <div classname= "m-3">
        {isEditing ? (
          <h4 className="ms-3 flex align-items-center track" > 
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
              style={{
                width: "200px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit"
              }}
            />
            <Button className='ms-3 play-btn bi bi-check-lg' onClick={()=>setIsEditing(false)}> Done</Button>
            </h4>
          ) : (
            <h4 className='ms-3 flex mb-2'>{newPlaylistName}
                <Button className='ms-4 play-btn bi ' onClick={()=>setIsEditing(true)}>Edit</Button>
                <Button className="rem-btn ms-2" onClick={()=>{setviewGeneratedPlaylist(false)}} > Close </Button>
                </h4>
        )}
        </div>

        
          <div className=''>
             <Container fluid>
        {newPlaylistTracks.map((track, index) => (
          <motion.div
            key={track.trackId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.20
            }}
          >
          
          <Row className='mb-1 py-1 fs-6 ' style={{borderRadius:"5px", justifyContent:"centre", alignItems: "center"}}>
            
            <Col md={1} style={{fontSize:"13px"}}>{index+1}</Col>
            <Col md={2}>
              <img src = {track.albumUrl} style={{height: "40px", width:"40px", borderRadius:"2px"}} alt="Album Art"></img>
            </Col>
            <Col >
              <div key={track.trackid}
                style={{cursor: "pointer", height:"100%"}}
                onClick={()=>playsong(index)}
                >
                <p style={{fontSize:"13px"}}>{track.trackName.substring(0,22)}</p>
              </div>
              
            </Col>
            <Col md ={2}>
              <Button className='rem-btn bi bi-x ' style={{height:"30px"}} onClick={()=>{removeTrack(index)}}></Button>
            </Col>
          </Row>
          
          </motion.div>
        ))}
        </Container>
      </div>
    </div>):
    <div className='' style={{height:"100%", color:"white", overflowY: "auto", }}>
      
    <h3 className= "m-3 justify-items-center" style={{width:"100%"}}>Tracks</h3>
    <Row>
      <Col md={9} >
      {/* <div className='d-flex'> */}

      <h4 className='ps-3 mb-3 '>{PlaylistName}</h4>
      </Col>
      {/* <Col className='me-2' md={1}>
        <Button className='play-btn bi bi-download'></Button>
      </Col> */}
      {/* <Col className='ms-3' md={1}>
        <Button className='play-btn bi bi-three-dots'></Button>
      </Col> */}
      {/* <Col className='me-2' md={1}>
        <Button className='play-btn bi bi-search'></Button>
      </Col> */}
      <Col className='ms-2' md={1}>
        <Button className='play-btn bi bi-play-fill'></Button>
      </Col>
    </Row>
    {/* </div> */}
    {console.log("playlist tracks2 --", playlistTracks)}
    {
    playlistTracks && playlistTracks.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.08
        }}
      >
      <div key={item.uri} className= "track mb-1" 
        style={{cursor: "pointer",  borderRadius: "9px", padding: "5px"}}
        onClick={() => setPlayingTrack(item)}
      > 
        <Tracks trackImg={item.albumUrl} title={item.title} duration={item.duration} index={index+1}/>
      </div>

    </motion.div>
    ))}
    </div>}
    </div>
  )
}
