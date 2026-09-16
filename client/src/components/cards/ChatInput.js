import { Paperclip, SlidersHorizontal, Mic, ArrowUp, Sparkles } from 'lucide-react'
import './Chatbot.css'
import axios from 'axios';
import { useState } from 'react';

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  compact = false,
  placeholder = 'Ask me ...',
  viewButton,
  setviewGeneratedPlaylist,
  accessToken,
  newPlaylistName,
  newPlaylistTracks,
  setNewPlaylistId,
  refreshQueue,
  setRefreshQueue,
  setViewButton,
  setNewPlaylistName
}) {

  const [showPop, setShowPop] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSubmit(value)
  }

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
                    "name": newPlaylistName || "New Playlist",
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

            // setReply("Playlist added")
            

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

        setShowPop(true)
        setRefreshQueue(!refreshQueue)
        setViewButton(false)
        setviewGeneratedPlaylist(false)
        setNewPlaylistName("New Playlist")
        setTimeout(()=>{
          setShowPop(false)
        }, 7000)
        }
        catch(err){
            console.error("Error in addding song", err);
        }
    }

  return (
    <div className={`chat-card ${compact ? 'chat-card--compact' : ''}`}>
      {showPop && (
        <button className="chat-card-banner" type="button">
          <Sparkles size={13} strokeWidth={2} />
          Playlist created
        </button>
       )}

      <form className="chat-input-box" onSubmit={handleSubmit}>
        <textarea
          rows={1}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="chat-input-row">
          <div className="chat-input-tools">
            <img src="https://github.com/Kevin-babu/Music-Thing-M1/blob/main/client/public/57902600d588aa543ceb0043627cb659.jpg?raw=true" alt="Icon" style={{width: "35px", height: "35px", marginRight: "10px", borderRadius: "50%"}} />
            <button type="button" className="chat-pill">
              <Paperclip size={14} strokeWidth={1.8} />
              Import file
            </button>
            <button type="button" className="chat-pill">
              <SlidersHorizontal size={14} strokeWidth={1.8} />
              Tools
            </button>
            {viewButton? <button type="button" className="chat-pill bright" onClick={() => {
                        setviewGeneratedPlaylist(true)
                    }}>
              {/* <SlidersHorizontal size={14} strokeWidth={1.8} /> */}
              View Playlist
            </button>: ""}
            {viewButton? <button type="button" className="chat-pill bright" onClick={handleCreate}>
              <SlidersHorizontal size={14} strokeWidth={1.8} />
              Create Playlist
            </button>: ""} 
            
          </div>

          <div className="chat-input-actions">
            <button type="button" className="chat-icon-btn" aria-label="Voice input">
              <Mic size={16} strokeWidth={1.8} />
            </button>
            <button
              type="submit"
              className="chat-send-btn"
              aria-label="Send message"
              disabled={!value.trim()}
            >
              <ArrowUp size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
