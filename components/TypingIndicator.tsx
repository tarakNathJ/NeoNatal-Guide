
export default function TypingIndicator() {
  return (
    <div className="typing-wrap">
      <div className="bot-avatar">N</div>
      <div className="typing-bubble">
        {/* Animated skeleton lines */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '12px',
        }}>
          {/* Line 1 — long */}
          <div style={{
            height: '10px',
            width: '240px',
            background: 'linear-gradient(90deg, #F0EBE3 25%, #E7E2DB 50%, #F0EBE3 75%)',
            backgroundSize: '400px 100%',
            borderRadius: '99px',
            animation: 'shimmer 1.5s infinite',
          }}/>
          {/* Line 2 — medium */}
          <div style={{
            height: '10px',
            width: '180px',
            background: 'linear-gradient(90deg, #F0EBE3 25%, #E7E2DB 50%, #F0EBE3 75%)',
            backgroundSize: '400px 100%',
            borderRadius: '99px',
            animation: 'shimmer 1.5s infinite 0.1s',
          }}/>
          {/* Line 3 — short */}
          <div style={{
            height: '10px',
            width: '120px',
            background: 'linear-gradient(90deg, #F0EBE3 25%, #E7E2DB 50%, #F0EBE3 75%)',
            backgroundSize: '400px 100%',
            borderRadius: '99px',
            animation: 'shimmer 1.5s infinite 0.2s',
          }}/>
        </div>

        {/* Dots + label row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '4px',
          borderTop: '1px solid #F0EBE3',
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[0,1,2].map(i => (
              <div key={i} className="dot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span style={{
            fontSize: '11px',
            color: '#A8A29E',
            fontStyle: 'italic',
          }}>
            NeoNatal is checking guidelines...
          </span>
        </div>
      </div>
    </div>
  )
}