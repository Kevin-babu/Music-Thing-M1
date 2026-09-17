import { useState, useCallback } from 'react'
// import Orb from './Orb.jsx'
import ChatInput from './ChatInput.js'
// import SuggestionCards from './SuggestionCards.jsx'
import ChatMessages from './ChatMessages.js'
import './Chatbot.css'

const MOCK_REPLIES = [
  "Got it — I've noted that down. Anything else you'd like to add?",
  "Here's a quick take: break it into smaller steps and tackle the first one today.",
  "That's a great question. Let me lay out a couple of options for you.",
  "Sure thing. Give me a moment to pull that together.",
]

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`

export default function ChatBot({ userName = 'User' , 
  accessToken, 
  setviewGeneratedPlaylist, 
  setNewPlaylistTracks,
  newPlaylistName,
  newPlaylistTracks,
  refreshQueue,
  setRefreshQueue,
  setNewPlaylistName
}) {
  const [messages, setMessages] = useState([{ role: "system", content: "You are a music assistant. You only help with playlists and music." },])
  const [chatMessages, setChatMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [viewButton, setViewButton] = useState(false)
  const [newPlaylistId, setNewPlaylistId] = useState(null)
  const [showPop, setShowPop] = useState(false)
  const [popMessage, setPopMessage] = useState("Thinking...")

  const isChatMode = messages.length > 1

  console.log("In chatbot with access token", accessToken)

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    let newMessages = [...messages, { id: nextId(), role: "user", content: trimmed }]

    let newChatMessage = [...chatMessages, { id: nextId(), role: "user", content: trimmed }]

    if (newMessages.length > 6) {
      const cutoff = newMessages.length - 2 // keep the last 6 messages verbatim
      const toSummarize = newMessages.slice(0, cutoff)
      const recent = newMessages.slice(cutoff)

      console.log("Messages to summarize:", toSummarize)

      const summaryRes = await fetch("http://localhost:3001/api/chat/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: toSummarize.map(({ role, content }) => ({ role, content })),
        }),
      })
      const { summary } = await summaryRes.json()

      console.log("Summary received:", summary)

      newMessages = [
        { id: nextId(), role: "system", content: `Summary of earlier conversation: ${summary}` },
        ...recent,
      ]
    }

    console.log("new messages:", newMessages)
    console.log("new chat messages", chatMessages)

    setMessages(newMessages)
    setChatMessages(newChatMessage)
    setDraft('')
    setIsTyping(true)
    setShowPop(true)

    console.log("right before fetch", accessToken)
    const output = await fetch(`${process.env.REACT_APP_SPOTIFY_BACKEND_URI}/api/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message:  newMessages.map(({ role, content }) => ({ role, content })),
        accessToken: accessToken,
      }),
    });

    const reply = await output.json();
    console.log("reply",reply)

    if(reply.tracks){
      setPopMessage("click view playlist for preview")
      setNewPlaylistTracks(reply.tracks.structuredContent.tracks)
      console.log("reply",reply.tracks)
      setViewButton(true)
    }else{
      setShowPop(false)
    }
    
    console.log("no reply.tracks")
    setIsTyping(false)
    
    setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', content: reply.result }])
    setChatMessages((prev) =>[...prev, { id: nextId(), role: 'assistant', content: reply.result }])

  }, [messages, accessToken])

  // const handleSuggestionClick = (prompt) => {
  //   sendMessage(prompt)
  // }

  return (
    <main className={`home-panel ${isChatMode ? 'is-chat' : ''}`} style={{height:"100%", overflow: "hidden"}}>
      <div className="home-panel-inner">
        {!isChatMode && (
          <>
            {/* <Orb /> */}
            <p className="greeting-eyebrow">Hey</p>
            <h1 className="greeting-title ">How can I help today?</h1>
            <p className="greeting-sub">
              Examples:

                        Play relaxing Malayalam songs, 

                        Create a road trip playlist
            </p>
          </>
        )}

        {isChatMode && <ChatMessages messages={chatMessages} isTyping={isTyping} />}

        <div className="home-panel-composer">
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={sendMessage}
            compact={isChatMode}
            viewButton = {viewButton}
            setviewGeneratedPlaylist = {setviewGeneratedPlaylist}
            accessToken ={accessToken}
            newPlaylistName ={newPlaylistName}
            newPlaylistTracks ={newPlaylistTracks}
            refreshQueue = {refreshQueue}
            setNewPlaylistId ={setNewPlaylistId}
            setRefreshQueue={setRefreshQueue}
            setViewButton ={setViewButton}
            setNewPlaylistName ={setNewPlaylistName}
            showPop={showPop}
            setShowPop={setShowPop}
            setPopMessage ={setPopMessage}
            popMessage = {popMessage}
          />
          {/* {!isChatMode && (
            // <SuggestionCards onSelect={handleSuggestionClick} />
          )} */}
        </div>
      </div>
    </main>
  )
}
