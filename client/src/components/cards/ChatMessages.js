import { useEffect, useRef } from 'react'
import './Chatbot.css'

export default function ChatMessages({ messages, isTyping }) {
  const bottomRef = useRef(null)

  // console.log("chat messages :", messages)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble-row ${msg.role === 'user' ? 'is-user' : 'is-assistant'}`}
        >
          {msg.role === 'assistant' && <span className="chat-avatar-dot" aria-hidden="true" />}
          <div className="chat-bubble">{msg.content}</div>
        </div>
      ))}

      {isTyping && (
        <div className="chat-bubble-row is-assistant">
          <span className="chat-avatar-dot" aria-hidden="true" />
          <div className="chat-bubble chat-bubble--typing">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
