

export interface Message {
  timestamp: string | number | Date
  role: 'user' | 'assistant'
  content: string
}

 
export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  babyAge: string
  topic: string
  language: string
  createdAt: Date
  updatedAt: Date
}


export interface TMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Props {
  messages: Message[]
  isTyping: boolean
  onSuggestedClick: (t: string) => void
  babyAge: string
  activeTopic: string
}


export interface TProps {
  onSend: (t: string) => void
  isLoading: boolean
  activeTopic: string
}


export interface Sections {
  might?: string
  doCan?: string
  doctor?: string
}

export interface SidebarProps {
  activeTopic: string
  setActiveTopic: (t: string) => void
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  babyAge: string
  setBabyAge: (a: string) => void
  language: string
  setLanguage: (l: string) => void
}