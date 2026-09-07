
import Auth from './Auth'
import { useState, useEffect } from 'react';
import {Container, Form, Row, Col } from 'react-bootstrap'
import TrackSearchResult from './cards/TrackSearchResult'
import "./styles/background.css";
import MusicMain from './MusicMain'
import axios from 'axios';
import Sidebar from './cards/Sidebar';

import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
})




export default function Music({code}) {

// console.log("code in music", code)
const accessToken = Auth(code)
console.log("accessToken in Music --", accessToken)
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState([])
const [playingTrack, setPlayingTrack] = useState()
const [showsearchResults, setShowSearchResults] = useState(false)
const [profile, setProfile] = useState({
  "username": null,
  "profileImage": null
})  


function chooseTrack(track) {
  console.log("track Selected --", track)
  setPlayingTrack(track)
  setSearch("")
  setShowSearchResults(false)
}

useEffect(() => {
  if (!accessToken) return;
  spotifyApi.setAccessToken(accessToken);
}, [accessToken])

useEffect(() => {
  // console.log("search --", search)
  // console.log("accessToken --", accessToken)
  if (!search) return setSearchResults([]);
  if (!accessToken) return;


  let cancel = false;

  spotifyApi.searchTracks(search).then(res => {

    if (cancel) return;

    // console.log("search results --", res.body.tracks.items)

    setSearchResults(res.body.tracks.items.map(track => {
      
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.album.images[0]);

      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: smallestAlbumImage.url,
        albumId: track.album.id
      }
    })
  )
  })
  return () => { cancel = true;}


}, [search, accessToken]);

useEffect(() => {
  if (search === "") return
 setShowSearchResults(true)
 console.log("here")
}, [search])

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SPOTIFY_BACKEND_URI}/api/profile`, {
          accessToken,
      })

      console.log("profile -- ",response.data)
      setProfile({
        "username":response.data.display_name,
        "profileImage": response.data.images[0].url})
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
  fetchProfile()
}, [accessToken])

useEffect(()=>{
  console.log(playingTrack)
},[playingTrack])


  return (
   <Container fluid className='  p-0 m-0 h-100' style={{ height: "100vh", width:"100%",  borderRadius: "10px", zIndex: "10" }}>
      
      <Row className=" w-100 h-100 m-0 ">
        <Col xs="auto" className='p-0 my-1 ms-1' >
        <Sidebar/>
        </Col>
        <Col className='h-100 p-0' >
              <div fluid className="sticky-top p-2" style={{width:"100%"}} >
                <Row>
                  <Col>
                    <Form.Control type="search" placeholder="Search Songs/Artists" className='' style={{background: "rgba(0, 0, 0, 0.56)", color: "white", border: "1px solid rgb(84, 86, 90)", borderRadius: "10px"}}
                      onChange={e => {setSearch(e.target.value)
                        if (e.target.value === "") {
                          setShowSearchResults(false);
                        }
                      }}/>
                      {showsearchResults && (
                        <div
                          className="my-2"
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            width: "100%",
                            maxHeight: "50vh",
                            overflowY: "auto",
                            zIndex: 1000,

                            background: "rgba(0, 0, 0, 0.92)",
                            border: "1px solid rgb(84, 86, 90)",
                            borderRadius: "10px",
                            padding: "5px",

                            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                          }}
                        >
                          {searchResults.map(track => (
                            <TrackSearchResult track={track} key={track.uri} chooseTrack ={ chooseTrack}/>
                          ))}
                        </div> 
                      )}
                  </Col>

                  <Col xs="auto" className="profile-section">
                    <div
                      className="d-flex align-items-center justify-content-between px-3"
                      style={{
                        background: "rgba(0, 0, 0, 0.56)",
                        color: "white",
                        border: "1px solid rgb(84, 86, 90)",
                        borderRadius: "30px",
                        height: "40px",
                        minWidth: "220px"
                      }}
                    >
                      <i className="profile-btn bi bi-house"></i>

                      <i className="profile-btn bi bi-bell"></i>

                      <i className="profile-btn bi bi-three-dots-vertical"></i>

                      {profile.profileImage ? (
                        <img
                          src={profile.profileImage}
                          style={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                            border: "solid 1px rgb(14, 242, 40)"
                          }}

                          alt="Profile"
                        />
                      ) : (
                        <i className="bi bi-person-circle"></i>
                      )}
                    </div>
                  </Col>
                </Row>
      

              </div>
          <div style={{height: "calc(100vh - 72px)",overflow: "hidden"}}>
            <MusicMain accessToken= {accessToken} playingTrack={playingTrack} setPlayingTrack={setPlayingTrack} user={profile}/>
          </div>
        </Col>
        
        
      </Row>  
      
      

   </Container> 
  ) 
}
