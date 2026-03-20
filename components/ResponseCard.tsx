'use client'
import { useState } from 'react'
import { Tparse } from '@/utils/helpers'
interface Props { content: string }




export default function ResponseCard({ content }: Props) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved]   = useState(false)
  const sections = Tparse(content)

  const copy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!sections) return (
    <div className="response-plain">
      <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
    </div>
  )

  return (
    <div className="response-card">
      {sections.might && (
        <div className="response-section section-might">
          <p className="section-tag tag-might">What This Might Be</p>
          <p className="section-body">{sections.might}</p>
        </div>
      )}
      {sections.doCan && (
        <div className="response-section section-do">
          <p className="section-tag tag-do">What You Can Do Now</p>
          <div className="section-body">
            {sections.doCan.split('\n').filter(Boolean).map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>
      )}
      {sections.doctor && (
        <div className="response-section section-doctor">
          <p className="section-tag tag-doctor">See a Doctor If</p>
          <div className="section-body">
            {sections.doctor.split('\n').filter(Boolean).map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>
      )}
      <div className="response-actions">
        <button className="action-btn" onClick={copy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
        <button className="action-btn" onClick={() => setSaved(!saved)}>
          {saved ? '🔖 Saved' : '🔖 Save'}
        </button>
      </div>
    </div>
  )
}