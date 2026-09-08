import { useState, useEffect  } from 'react'
import { InputGroup, Form, Button, Container } from "react-bootstrap";
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
import '../../App.css'


export default function PlaylistCreator({setviewGeneratedPlaylist, setNewPlaylistTracks, newPlaylistTracks, user, accessToken, setRefreshQueue, refreshQueue}) {

    console.log("user in PlaylistCreator", user)
    const greeting = ` Ask Lyra...

                        Examples:

                        Play relaxing Malayalam songs

                        Create a road trip playlist`

    const [prompt, setPrompt] = useState("")
    const [reply, setReply] = useState("")
    const [loading, setLoading] = useState(false)
    const [newPlaylistId, setNewPlaylistId] = useState(null)
    const [placeholder, setPlaceholder] = useState(greeting)

    const [playlistGenerated, setPlaylistGenerated] = useState(false)

    const [index, setIndex] = useState(0);

    const fillers = [
        "Digging through the crates...",
        "Matching the vibe...",
        "Cross-referencing artists...",
        "Lining up the tracklist...",
        "Almost there...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % fillers.length);
        }, 1800);
        return () => clearInterval(interval);
    }, []);
   

    const handleSubmit = async () => {
        console.log("prompt --",prompt);
        setLoading(true)
        setPlaceholder("Generating your playlist... This may take a few seconds.")
        const phrase = "Here is a playlist for you";
        setPlaylistGenerated(false);
        
        try{
            const response = await axios.post(`${process.env.REACT_APP_SPOTIFY_BACKEND_URI}/llm`, {
            prompt,
            accessToken
            })
            console.log("response from LLM", response)
            if (response.status === 200) {
                
                setPlaylistGenerated(true);
                console.log(response.data.tracks)
                setNewPlaylistTracks(response.data.tracks.structuredContent.tracks)
                setReply(response.data.reply)
              }
            else {
                setReply("Could you please add more info to the request")
            }
            
              
            
            
            setLoading(false)
            setPlaceholder("")

        }
        catch (error) {
            console.error("Error communicating with llm:", error);
          }
      };

    const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

    const handleCreate = async () =>{

        try{
            const response = await axios.post('https://api.spotify.com/v1/me/playlists',
                {
                    "name": "New Playlist",
                    "description": "New playlist description",
                    "public": false
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        limit: 50,   // optional
                        offset: 0,   // optional
                    },
                }
            )   
            console.log(response.data.id);
            const id = response.data.id;
            setNewPlaylistId(id)
            console.log("new Tracks", newPlaylistTracks)
            
            await addTracks(id, newPlaylistTracks)
            // console.log("tracks added to Playlist")
            
            
            console.log("refreshQueue set")

            setReply("Playlist added")
            setRefreshQueue(!refreshQueue)

        }catch (error){
            console.error("Error creating playlist:", error);
        }
    }

    const addTracks = async (id,tracks)=>{
        const trackList = tracks.map((track)=>{
                            return("spotify:track:"+track.trackId)
                        });
        console.log("trackList", trackList)
        console.log("NEW PLAYLIST", id)
        try{
            const response= await axios.post(`https://api.spotify.com/v1/playlists/${id}/items`,
                {
                    "uris": trackList
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            )
        console.log("respose", response.data)
        }
        catch(err){
            console.error("Error in addding song", err);
        }
    }

    const handleRefresh = ()=>{
        setPlaylistGenerated(false)
        setPlaceholder(greeting)
        setReply("")
        setNewPlaylistTracks([{}])
        setviewGeneratedPlaylist(false)
        setPrompt("")
    } 
    
    
      return (
        <Container style={{width:"100%", color:"white"}}>
            <InputGroup className="mb-3" style={{height: "50px"}}>
                <img src="https://github.com/Kevin-babu/Music-Thing-M1/blob/main/client/public/57902600d588aa543ceb0043627cb659.jpg?raw=true" alt="Icon" style={{width: "50px", height: "50px", marginRight: "10px", borderRadius: "50%"}} />
                <Form.Control
                    style={{backgroundColor: "rgba(0, 0, 0, 0.63)", color:"white", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", whiteSpace:"pre-line"}}
                    type="search"
                    placeholder="Enter your prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            
                <Button variant="dark" className= "ms-1 bi bi-arrow-right" onClick={handleSubmit} onKeyDown={handleKeyDown} style={{borderRadius: "10px"}}>
                
                </Button>
                <Button variant= "dark" className='ms-1 bi bi-mic' style={{borderRadius: "10px"}}></Button>
            </InputGroup>
            <Container>
                
                
                {loading? <div className="d-flex mt-4 pt-5 justify-content-center align-items-center loading-wrap">
                    {/* <Spinner animation="border" variant="primary" /> */}
                    <div class="loader ">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="loading-text ms-3 ps-4  " key={index}>{fillers[index]}</div>
                    </div> :<p className="ms-3 pt-3 loading-text" style={{color:"white", whiteSpace:"pre-line"}}>{reply}</p>
                }

                <div className="ms-4 pt-3 loading-text" style={{whiteSpace:"pre-line"}}>{placeholder}</div>
                {playlistGenerated? <div>
                    <button  className='me-3 frost-button ' onClick={() => {
                        setviewGeneratedPlaylist(true)
                    }}>
                        View Playlist 
                    </button>
                    <button className="me-3 frost-button"  onClick={handleCreate}>
                        Create Playlist on Spotify
                    </button>
                    <button  className='frost-button bi bi-arrow-counterclockwise' onClick={handleRefresh}>
                        
                    </button>
                </div>
                : <div></div>   
                }
                
            </Container>
        </Container>
        
      );
}
