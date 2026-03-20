'use client'
import { useEffect, useRef } from 'react'
import ResponseCard from './ResponseCard'
import TypingIndicator from './TypingIndicator'
import { TMessage, Props } from '@/types'
import { questionsByTopic ,getGreeting } from '@/utils/helpers'


export default function ChatArea({ messages, isTyping, onSuggestedClick, babyAge, activeTopic }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const g = getGreeting()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const fmt = (d: Date) =>
    new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // Get questions for current topic + age
  const currentQuestions =
    questionsByTopic[activeTopic]?.[babyAge] ||
    questionsByTopic['feeding']['0-4w']

  if (messages.length === 0) return (
    <div className="empty-state">
      <h1 className="greeting-heading">{g.head}</h1>
      <p className="greeting-sub">
        {g.sub}<br />
        Choose a topic or ask anything below.
      </p>
      <div className="question-grid">
        {currentQuestions.map((q, i) => (
          <button key={i} className="question-card" onClick={() => onSuggestedClick(q.text)}>
            <span className="question-card-icon">{q.icon}</span>
            <p className="question-card-text">{q.text}</p>
            <p className="question-card-hint">Tap to ask</p>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="chat-area">
      {messages.map((msg, i) => {
        const showTime = i === 0 ||
          (new Date(msg.timestamp).getTime() - new Date(messages[i-1].timestamp).getTime()) > 1_800_000

        return (
          <div key={i}>
            {showTime && (
              <div className="time-divider">
                <span className="time-chip">{fmt((msg as any).timestamp)}</span>
              </div>
            )}
            {msg.role === 'user' ? (
              <div className="msg-user">
                <div className="bubble-user">{msg.content}</div>
              </div>
            ) : (
              <div className="msg-bot">
                <div className="bot-avatar">N</div>
                <ResponseCard content={msg.content} />
              </div>
            )}
          </div>
        )
      })}
      {isTyping && <TypingIndicator />}
      <div ref={ref} />
    </div>
  )
}