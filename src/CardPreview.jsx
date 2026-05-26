import { forwardRef } from 'react'

const STAR_POSITIONS = [
  { top: '12%', left: '46%' },
  { top: '8%',  left: '54%' },
  { top: '45%', left: '16%' },
  { top: '45%', left: '84%' },
]

const CardPreview = forwardRef(function CardPreview(
  { photo, studentName, section, activeSubjects, theme, cardLayout },
  ref
) {
  const isRow = cardLayout === 'row'
  const subjects = activeSubjects.slice(0, isRow ? 8 : 4)
  const colCount = isRow ? Math.min(subjects.length, 4) : 2

  // Assign theme colors cyclically to subjects
  const getSubjectColor = (index) => theme.colors[index % theme.colors.length]

  return (
    <div id="card-output" ref={ref} style={{ fontFamily: "'Fredoka One', cursive" }}>
      {/* Subjects area */}
      <div
        className={`card-subjects-grid${isRow ? ' layout-row' : ''}`}
        style={{ '--col-count': colCount }}
      >
        {subjects.map((subj, i) => (
          <div
            key={subj.id}
            className="card-subject"
            style={{ background: getSubjectColor(i) }}
          >
            <span className="card-subject-name">{subj.name.toUpperCase()}</span>
            <span className="card-subject-icons">{subj.icon}</span>
            {/* mini sparkles */}
            <span className="card-star" style={{ top: '10%', right: '28%' }}>✦</span>
            <span className="card-star" style={{ bottom: '20%', left: '14%', fontSize: '0.6rem' }}>✦</span>
          </div>
        ))}

        {/* Center photo overlay — only for grid layout */}
        {!isRow && (
          <div className="card-photo-center">
            {photo ? (
              <img src={photo} alt="Student" crossOrigin="anonymous" />
            ) : (
              <div className="photo-placeholder">👤</div>
            )}
          </div>
        )}
      </div>

      {/* Row layout: photo + name side by side */}
      {isRow && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 20px',
          background: theme.banner,
        }}>
          {photo ? (
            <img
              src={photo}
              alt="Student"
              crossOrigin="anonymous"
              style={{
                width: 72, height: 72,
                borderRadius: '50%',
                objectFit: 'cover',
                border: `4px solid ${theme.sectionBg}`,
                flexShrink: 0,
                boxShadow: '0 3px 12px rgba(0,0,0,0.18)',
              }}
            />
          ) : (
            <div style={{
              width: 72, height: 72,
              borderRadius: '50%',
              background: '#ede5ff',
              border: `4px solid ${theme.sectionBg}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', flexShrink: 0,
            }}>👤</div>
          )}
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Nunito, sans-serif' }}>Student's Name:</div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.3rem', color: '#3a2080', lineHeight: 1.1, wordBreak: 'break-word' }}>
              {studentName || 'Student Name'}
            </div>
            {section && (
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Nunito, sans-serif', marginRight: 6 }}>Section:</span>
                <span style={{ background: theme.sectionBg, color: '#fff', borderRadius: 20, padding: '2px 14px', fontSize: '0.85rem', fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>{section}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid layout: name banner */}
      {!isRow && (
        <div className="card-name-banner" style={{ background: theme.banner }}>
          <div className="card-name-label">Student's Name:</div>
          <div className="card-student-name">
            {studentName || <span style={{ color: '#ccc' }}>Enter name above</span>}
          </div>
          {section && (
            <div className="card-section-row">
              <span className="card-section-label">Section:</span>
              <span className="card-section-value" style={{ background: theme.sectionBg }}>
                {section}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
})

export default CardPreview
