import React, { use } from 'react'
import Player from './cards/Player'
import PlaylistCreator from './cards/PlaylistCreator'
import MusicUI from './cards/MusicUI'
import Queue from './cards/Queue'
import PlaylistTracks from './cards/PlaylistTracks'

import { useState, useEffect } from 'react';
import {Container, Form, Row, Col } from 'react-bootstrap'

const auroraFrost = {
  background: `
    linear-gradient(
      135deg,
      rgba(0, 255, 200, 0.15) 0%,
      rgba(130, 90, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.08) 100%
    )
  `,
  overflowY: "auto", height:"100%" ,
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "20px",
  boxShadow:
    "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
};



export default function MusicMain({accessToken, playingTrack, setPlayingTrack, user}) { 

  const access_Token =accessToken
  const track = playingTrack
  const [viewGeneratedPlaylist, setviewGeneratedPlaylist ] = useState(false);
  const [newPlaylistTracks, setNewPlaylistTracks] = useState([{}])
  const [playlistID, setPlaylistID] = useState([]);
  const [PlaylistName, setPlaylistName] = useState("");
  const [refreshQueue, setRefreshQueue] = useState(true)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  // console.log(" accesstoken from MusicMain", accessToken)
  console.log("track from MusicMain",track)

  useEffect(() => { 
  console.log("playlist name", PlaylistName)
  }, [PlaylistName]); 

  return (
    <Container fluid className="pt-3 px-3" style={{height: "calc(100vh - 90px)",overflow: "hidden"}}>
      <Row className="g-3 h-100">

        {/* Left Column */}
        <Col lg={7} className="d-flex flex-column h-100 " >

          <Row className="flex-grow-1 mb-3" >
            <Col className=" ">
            <PlaylistCreator 
            setviewGeneratedPlaylist ={setviewGeneratedPlaylist} 
            setNewPlaylistTracks={setNewPlaylistTracks} 
            newPlaylistTracks={newPlaylistTracks} 
            user={user} 
            accessToken={accessToken}
            setRefreshQueue= {setRefreshQueue}
            refreshQueue={refreshQueue}
            />
              
            </Col>
          </Row>
          
          <Row className=""style={{}}>
            <MusicUI accessToken={access_Token} albumId={track?.albumId} />
          </Row>

          <Row className=" mt-auto" >
            <Col>
              <Player accessToken={access_Token} trackUri={track?.uri}/>
            </Col>
          </Row>

          

        </Col>

        
        <Col lg={3} className=" justify-content-center align-items-center h-100" >
            <div style={{...auroraFrost,height:"100%" }}>
             <PlaylistTracks 
             accessToken={access_Token}
             playlistID={playlistID}
             setPlayingTrack={setPlayingTrack}
             viewGeneratedPlaylist={viewGeneratedPlaylist}
          setviewGeneratedPlaylist={setviewGeneratedPlaylist} 
          newPlaylistTracks = {newPlaylistTracks}
            PlaylistName={PlaylistName}
            setNewPlaylistTracks={setNewPlaylistTracks}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
             />
            </div>
        </Col>
        

        {/* Right Column */}
        <Col md={2} className="h-100" >
          <div style={{...auroraFrost, height:"100%" }}>
            <Queue 
              accessToken={access_Token}
              playlistID={playlistID}
              setPlaylistID={setPlaylistID}
              viewGeneratedPlaylist={viewGeneratedPlaylist}
              setviewGeneratedPlaylist={setviewGeneratedPlaylist} 
              newPlaylistTracks = {newPlaylistTracks}
              setPlaylistName = {setPlaylistName}
              refreshQueue ={refreshQueue}
            />
            
          </div>
          
        </Col>

        </Row>
      
      </Container>
      
  )
}
