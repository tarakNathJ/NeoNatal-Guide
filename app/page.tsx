'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatArea  from '../components/ChatArea'
import InputBar from '../components/InputBar'
import { Menu, X, AlertCircle, Plus, MessageSquare, Trash2, ChevronLeft } from 'lucide-react'
import type { ChatSession ,TMessage } from '@/types'
import { topicLabels ,generateTitle ,generateId } from '@/utils/helpers'



export default function Home() {
  const [sessions,      setSessions]      = useState<ChatSession[]>([])
  const [activeId,      setActiveId]      = useState<string>('')
  const [isTyping,      setIsTyping]      = useState(false)
  const [activeTopic,   setActiveTopic]   = useState('feeding')
  const [sidebarOpen,   setSidebarOpen]   = useState(false)
  const [historyOpen,   setHistoryOpen]   = useState(false)
  const [error,         setError]         = useState<string|null>(null)
  const [babyAge,       setBabyAge]       = useState('0-4w')
  const [language,      setLanguage]      = useState('english')

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('neonate-sessions')
      if (saved) {
        const parsed: ChatSession[] = JSON.parse(saved).map((s: ChatSession) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          messages: s.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }))
        }))
        setSessions(parsed)
        if (parsed.length > 0) {
          const last = parsed[parsed.length - 1]
          setActiveId(last.id)
          setBabyAge(last.babyAge)
          setActiveTopic(last.topic)
          setLanguage(last.language)
        } else {
          createNewSession()
        }
      } else {
        createNewSession()
      }
    } catch {
      createNewSession()
    }
  }, [])

  // Save to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('neonate-sessions', JSON.stringify(sessions))
    }
  }, [sessions])

  function createNewSession(age = babyAge, topic = activeTopic, lang = language): string {
    const id = generateId()
    const newSession: ChatSession = {
      id,
      title: 'New Chat',
      messages: [],
      babyAge: age,
      topic,
      language: lang,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSessions(prev => [...prev, newSession])
    setActiveId(id)
    setHistoryOpen(false)
    return id
  }

  function switchSession(session: ChatSession) {
    setActiveId(session.id)
    setBabyAge(session.babyAge)
    setActiveTopic(session.topic)
    setLanguage(session.language)
    setHistoryOpen(false)
  }

  function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    const remaining = sessions.filter(s => s.id !== id)
    setSessions(remaining)
    if (activeId === id) {
      if (remaining.length > 0) {
        const last = remaining[remaining.length - 1]
        setActiveId(last.id)
        setBabyAge(last.babyAge)
        setActiveTopic(last.topic)
        setLanguage(last.language)
      } else {
        createNewSession()
      }
    }
    // Update localStorage
    localStorage.setItem('neonate-sessions', JSON.stringify(remaining))
  }

  function clearAllSessions() {
    localStorage.removeItem('neonate-sessions')
    setSessions([])
    createNewSession()
  }

  const activeSession = sessions.find(s => s.id === activeId)
  const currentMessages = activeSession?.messages || []

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    setError(null)

    const userMsg: TMessage = {
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    const updatedMessages = [...currentMessages, userMsg]

    // Update session messages
    setSessions(prev => prev.map(s =>
      s.id === activeId ? {
        ...s,
        messages: updatedMessages,
        title: generateTitle(updatedMessages as any),
        updatedAt: new Date(),
        babyAge,
        topic: activeTopic,
        language,
      } : s
    ))

    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          babyAge,
          topic: activeTopic,
          language,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Something went wrong')

      const botMsg: TMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }

      setSessions(prev => prev.map(s =>
        s.id === activeId ? {
          ...s,
          messages: [...updatedMessages, botMsg],
          updatedAt: new Date(),
        } : s
      ))
    } catch(e) {
      setError(e instanceof Error ? e.message : 'Connection lost.')
    } finally {
      setIsTyping(false)
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const d = new Date(date)
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeTopic={activeTopic}
        setActiveTopic={(t) => {
          setActiveTopic(t)
          setSessions(prev => prev.map(s =>
            s.id === activeId ? { ...s, topic: t } : s
          ))
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        babyAge={babyAge}
        setBabyAge={(a) => {
          setBabyAge(a)
          setSessions(prev => prev.map(s =>
            s.id === activeId ? { ...s, babyAge: a } : s
          ))
        }}
        language={language}
        setLanguage={(l) => {
          setLanguage(l)
          setSessions(prev => prev.map(s =>
            s.id === activeId ? { ...s, language: l } : s
          ))
        }}
      />

      <div className="main-content">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>

            {/* Chat history toggle */}
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '99px',
                border: '1.5px solid #E7E2DB',
                background: historyOpen ? '#EEF4FF' : 'white',
                color: historyOpen ? '#3B7DD8' : '#44403C',
                fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              <MessageSquare size={14}/>
              Chats
              <span style={{
                background: '#3B7DD8', color: 'white',
                borderRadius: '99px', fontSize: '10px',
                padding: '1px 6px', fontWeight: '600',
              }}>
                {sessions.length}
              </span>
            </button>

            <div className="breadcrumb">
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">
                {activeSession?.title || 'New Chat'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* New chat button */}
            <button
              onClick={() => createNewSession()}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 14px', borderRadius: '99px',
                background: '#3B7DD8', color: 'white',
                border: 'none', fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                boxShadow: '0 2px 6px rgba(59,125,216,0.3)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2E6BC4')}
              onMouseLeave={e => (e.currentTarget.style.background = '#3B7DD8')}
            >
              <Plus size={14}/>
              New Chat
            </button>

            <span style={{
              fontSize: '11px', background: '#F7F3EE',
              color: '#A8A29E', padding: '4px 10px',
              borderRadius: '99px', border: '1px solid #E7E2DB',
            }}>
              {babyAge === '0-4w' ? '0–4w' :
               babyAge === '1-3m' ? '1–3m' :
               babyAge === '3-6m' ? '3–6m' : '6–12m'}
            </span>
            <span className="week-badge">
              {language === 'english'  ? '🇬🇧' :
               language === 'hindi'    ? '🇮🇳' :
               language === 'bengali'  ? '🇧🇩' :
               language === 'french'   ? '🇫🇷' : '🇨🇳'}
            </span>
          </div>
        </header>

        {/* Chat History Panel */}
        {historyOpen && (
          <div style={{
            position: 'absolute', top: '57px', left: '0', right: '0',
            background: 'white', borderBottom: '1px solid #E7E2DB',
            zIndex: 15, maxHeight: '320px', overflowY: 'auto',
            boxShadow: '0 4px 20px rgba(28,25,23,0.08)',
          }}>
            {/* Panel header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #E7E2DB',
              position: 'sticky', top: 0, background: 'white', zIndex: 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setHistoryOpen(false)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#A8A29E', display: 'flex', padding: '4px',
                    borderRadius: '6px',
                  }}
                >
                  <ChevronLeft size={16}/>
                </button>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1C1917' }}>
                  Chat History ({sessions.length})
                </span>
              </div>
              <button
                onClick={clearAllSessions}
                style={{
                  fontSize: '11px', color: '#D95F5F',
                  background: '#FDEAEA', border: 'none',
                  padding: '4px 10px', borderRadius: '99px',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontWeight: '500',
                }}
              >
                Clear All
              </button>
            </div>

            {/* Session list */}
            {sessions.length === 0 ? (
              <div style={{
                padding: '32px 16px', textAlign: 'center',
                color: '#A8A29E', fontSize: '13px',
              }}>
                No chat history yet.<br />Start a conversation!
              </div>
            ) : (
              [...sessions].reverse().map(session => (
                <div
                  key={session.id}
                  onClick={() => switchSession(session)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: '12px', padding: '12px 16px',
                    cursor: 'pointer', borderBottom: '1px solid #F7F3EE',
                    background: session.id === activeId ? '#EEF4FF' : 'white',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => {
                    if (session.id !== activeId)
                      e.currentTarget.style.background = '#FDFAF6'
                  }}
                  onMouseLeave={e => {
                    if (session.id !== activeId)
                      e.currentTarget.style.background = 'white'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '36px', height: '36px', flexShrink: 0,
                    background: session.id === activeId ? '#3B7DD8' : '#F7F3EE',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                    {session.topic === 'feeding'  ? '🍼' :
                     session.topic === 'sleep'    ? '😴' :
                     session.topic === 'fever'    ? '🌡️' :
                     session.topic === 'growth'   ? '📏' :
                     session.topic === 'vaccines' ? '💉' : '😢'}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '13px', fontWeight: '500',
                      color: session.id === activeId ? '#3B7DD8' : '#1C1917',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', marginBottom: '3px',
                    }}>
                      {session.title}
                    </p>
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      gap: '8px', fontSize: '11px', color: '#A8A29E',
                    }}>
                      <span>{topicLabels[session.topic]}</span>
                      <span>·</span>
                      <span>{session.babyAge}</span>
                      <span>·</span>
                      <span>{session.messages.length} msgs</span>
                      <span>·</span>
                      <span>{formatDate(session.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => deleteSession(session.id, e)}
                    style={{
                      background: 'none', border: 'none',
                      cursor: 'pointer', color: '#A8A29E',
                      padding: '4px', borderRadius: '6px',
                      display: 'flex', flexShrink: 0,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D95F5F')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A8A29E')}
                  >
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="error-banner">
            <AlertCircle size={15} color="#E8955A" style={{flexShrink:0}}/>
            <p className="error-text">{error}</p>
            <button className="error-dismiss" onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        )}

        {/* Chat */}
        <ChatArea
        // @ts-ignore
          messages ={currentMessages}
          isTyping={isTyping}
          onSuggestedClick={sendMessage}
          babyAge={babyAge}
          activeTopic={activeTopic}
        />

        <InputBar
          onSend={sendMessage}
          isLoading={isTyping}
          activeTopic={activeTopic}
        />
      </div>
    </div>
  )
}