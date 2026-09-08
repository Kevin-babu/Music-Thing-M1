import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import {useState, useEffect}  from 'react'
import { Row, Col,Button } from 'react-bootstrap';
import { motion } from "framer-motion";
import '../../App.css'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
})



export default function Queue({accessToken, playlistID,setPlaylistID, viewGeneratedPlaylist, setviewGeneratedPlaylist, newPlaylistTracks, setPlaylistName, refreshQueue}) {

  // spotifyApi.setAccessToken(accessToken);

  // console.log("access token in queue", accessToken)
  console.log("viewGeneratedPlaylist in queue", viewGeneratedPlaylist)

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SPOTIFY_BACKEND_URI}/api/playlists`, {
            accessToken,
        })

        console.log("playlists -- ",response.data)
        setPlaylist(response.data.items);
        setPlaylistID(response.data.items[0].id)
        setPlaylistName(response.data.items[0].name)
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchPlaylists()
  }, [accessToken, refreshQueue]);

  return (
    <div className='queue' style={{height:"100%", color:"white", overflowY: "auto", overflowX: "hidden"}}>
      <div>
        <h3 className='m-3'> Playlists</h3>
        {playlist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.08
            }}
          >
          <div key={item.id} className= "" 
            style={{cursor: "pointer",  borderRadius: "10px", padding: "3px"}}
            onClick={() => { playlistID === item.id ? setPlaylistID(null) : setPlaylistID(item.id); setPlaylistName(item.name) }}
            >
            <Row>
              <Col md={2} className='me-4 justify-items-center align-items-center'>
                <img src={item.images[0]?.url} style={{height: "40px", borderRadius:"2px"}} className=''/>
              </Col>  
              <Col>
                <Row style={{fontSize: "14px"}}>{item.name.substring(0,15)}</Row>
                <Row className='' style={{fontSize: "8px"}}> {item.items.total} Tracks </Row>
                
              </Col>
            </Row>
          
          </div> 
          </motion.div>
        ))} 
      
      
    </div>
    </div>
  )
}
