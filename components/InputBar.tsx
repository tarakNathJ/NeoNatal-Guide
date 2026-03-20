'use client'
import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { TProps } from '@/types'
import { chips } from '@/utils/helpers'



export default function InputBar({ onSend, isLoading }: TProps) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  const send = () => {
    if (!value.trim() || isLoading) return
    onSend(value.trim())
    setValue('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div className="input-bar">
      <div className="mobile-chips">
        {chips.map((c, i) => (
          <button key={i} className="mobile-chip"
            onClick={() => onSend(`Tell me about ${c.split(' ')[1]} for my newborn`)}>
            {c}
          </button>
        ))}
      </div>
      <div className="input-row">
        <div className="input-wrap">
          <textarea
            ref={ref} value={value}
            onChange={onInput} onKeyDown={onKey}
            placeholder="Describe your concern about baby..."
            rows={1} disabled={isLoading}
            className="input-textarea"
          />
        </div>
        <button className="send-btn" onClick={send} disabled={!value.trim() || isLoading}>
          <Send size={16} />
        </button>
      </div>
      <p className="input-disclaimer">
        Always consult your pediatrician for emergencies · NeoNatal Guide
      </p>
    </div>
  )
}