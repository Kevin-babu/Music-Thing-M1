import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/background.css'

import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: "6c8b66a0cce34832bd9895c65d7fb811"
})




export default function MusicUI({accessToken, albumId}) {

  const [albumData, setAlbumData] = useState(null);

  // console.log("accessToken in MusicUI --", accessToken)

  useEffect(() => {
    if (!albumId) return;
    const fetchAlbum = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/album`, {
            accessToken,
            albumId
        })

        console.log("album -- ",response.data)
        setAlbumData(response.data);

        // const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
        //   if (image.height < smallest.height) return image;
        //   return smallest;
        // }, track.album.images[0]);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };
    fetchAlbum()
  }, [accessToken, albumId]);


  return (
    
  
  <div>
    {albumData  ?
    <div className="ms-1 " style={{ height:"100%", width: "100%", color:"white"}}>
      <span className='' style={{color:"green"}}>Now Playing</span>
      <h4> </h4><span>Album :  {albumData.name.substring(0,40)}</span>
      <p>Artists:
        {albumData.artists.map((artist) =>{
          return(
          <span className='' key={artist.id}> {artist.name}</span>)
      })}
      </p>
    </div> : <div></div>}
    </div>
  )
}
