'use client'
import { useState } from 'react'
import { SidebarProps } from '@/types' 
import { topics ,ageGroups ,languages ,tips } from '@/utils/helpers'






export default function Sidebar({
  activeTopic, setActiveTopic,
  isOpen, setIsOpen,
  babyAge, setBabyAge,
  language, setLanguage,
}: SidebarProps) {
  const tip = tips[new Date().getDay() % tips.length]

  return (
    <>
      <div
        className={`mobile-overlay ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">N</div>
          <div className="logo-text">
            <span className="logo-main">NeoNatal</span>
            <span className="logo-sub"> Guide</span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="baby-section">
          <p className="section-label">🌐 Language</p>
          <div style={{
            display: 'flex', gap: '6px', flexWrap: 'wrap'
          }}>
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                title={lang.full}
                style={{
                  padding: '5px 10px',
                  borderRadius: '99px',
                  border: language === lang.id
                    ? '1.5px solid #3B7DD8'
                    : '1.5px solid #E7E2DB',
                  background: language === lang.id ? '#EEF4FF' : 'white',
                  color: language === lang.id ? '#3B7DD8' : '#A8A29E',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.15s',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Baby Age Card */}
        <div className="baby-section">
          <p className="section-label">Your Baby</p>
          <div className="baby-card">
            <div className="baby-card-top">
              <div className="baby-avatar">👶</div>
              <div>
                <div className="baby-age-num">
                  {babyAge === '0-4w' ? '3' :
                   babyAge === '1-3m' ? '2' :
                   babyAge === '3-6m' ? '4' : '9'}
                </div>
                <div className="baby-age-label">
                  {babyAge === '0-4w' ? 'weeks old' :
                   babyAge === '1-3m' ? 'months old' :
                   babyAge === '3-6m' ? 'months old' : 'months old'}
                </div>
              </div>
            </div>

            <div className="progress-label">
              <span>
                {babyAge === '0-4w' ? 'Week 3 of 52' :
                 babyAge === '1-3m' ? 'Month 2 of 12' :
                 babyAge === '3-6m' ? 'Month 4 of 12' : 'Month 9 of 12'}
              </span>
              <span>Year 1</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{
                width: babyAge === '0-4w' ? '5.7%' :
                       babyAge === '1-3m' ? '16%' :
                       babyAge === '3-6m' ? '33%' : '75%'
              }} />
            </div>

            <div className="age-pills">
              {ageGroups.map(age => (
                <button
                  key={age.id}
                  className={`age-pill ${babyAge === age.id ? 'active' : ''}`}
                  onClick={() => setBabyAge(age.id)}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="topics-section">
          <p className="section-label">Topics</p>
          {topics.map(t => (
            <button
              key={t.id}
              className={`topic-btn ${activeTopic === t.id ? 'active' : ''}`}
              onClick={() => { setActiveTopic(t.id); setIsOpen(false) }}
            >
              <span className="topic-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tip */}
        <div className="tip-card">
          <p className="tip-label">Today&apos;s Tip</p>
          <p className="tip-text">{tip}</p>
        </div>

        <p className="sidebar-disclaimer">
          Always consult your pediatrician<br />for medical emergencies.
        </p>
      </aside>
    </>
  )
}