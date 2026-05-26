import { forwardRef, useState } from 'react'

const CardBack = forwardRef(function CardBack(
  { subject, studentName, grade, section, teacher, template, font, fontColor, infoColor, topics, onTopicsChange },
  ref
) {
  const { name, color, color2 } = subject

  const dims = {
    badge:    { width: 240, height: 240, borderRadius: '50%' },
    label:    { width: 340, minHeight: 130, borderRadius: 22 },
    banner:   { width: 320, minHeight: 150, borderRadius: 24 },
    portrait: { width: 200, minHeight: 280, borderRadius: 22 },
  }[template] || { width: 240, height: 240, borderRadius: '50%' }

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

  const isCompact = template === 'badge' || template === 'label'

  return (
    <div
      ref={ref}
      style={{
        ...dims,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${color2} 0%, ${color} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isCompact ? '12px 14px' : '16px 14px',
        boxShadow: `0 8px 28px ${color}66`,
        flexShrink: 0,
      }}
    >
      {/* decorative blobs */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -15, left: -15, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

      {/* Subject name */}
      <div style={{
        fontFamily: `'${font}', cursive`,
        fontSize: isCompact ? 18 : 22,
        color: fontColor,
        textAlign: 'center',
        marginBottom: isCompact ? 6 : 10,
        textShadow: '0 2px 6px rgba(0,0,0,0.35)',
        lineHeight: 1.1,
        whiteSpace: 'pre-line',
        position: 'relative', zIndex: 2,
      }}>
        {name}
      </div>

      {/* Quarter topics */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? 3 : 5,
        position: 'relative', zIndex: 2,
        marginBottom: isCompact ? 6 : 10,
      }}>
        {quarters.map((q, i) => (
          <div key={q} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
            <span style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: isCompact ? 9 : 11,
              color: 'rgba(255,255,255,0.9)',
              flexShrink: 0,
              paddingTop: 2,
              minWidth: 20,
            }}>{q}:</span>
            <textarea
              value={topics?.[i] || ''}
              onChange={e => {
                const next = [...(topics || ['', '', '', ''])]
                next[i] = e.target.value
                onTopicsChange?.(next)
              }}
              placeholder={`${q} topics...`}
              rows={1}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                borderRadius: 6,
                padding: '2px 6px',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: isCompact ? 8 : 10,
                color: '#fff',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.4,
              }}
            />
          </div>
        ))}
      </div>

      {/* Student info */}
      {(studentName || grade || section || teacher) && (
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 10,
          padding: '4px 10px',
        }}>
          {studentName && (
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: isCompact ? 8 : 10, fontWeight: 900, color: infoColor, lineHeight: 1.3 }}>
              {studentName}
            </div>
          )}
          {(grade || section) && (
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: isCompact ? 7 : 9, fontWeight: 700, color: infoColor, opacity: 0.9 }}>
              {[grade, section].filter(Boolean).join(' · ')}
            </div>
          )}
          {teacher && (
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: isCompact ? 7 : 9, fontWeight: 600, color: infoColor, fontStyle: 'italic', opacity: 0.75 }}>
              {teacher}
            </div>
          )}
        </div>
      )}
    </div>
  )
})

export default CardBack
