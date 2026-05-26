import { useRef } from 'react'
import SubjectCard from './SubjectCard'

const COL_OPTIONS = [
  { cols: 2, label: '2 cols (Large)' },
  { cols: 3, label: '3 cols (Medium)' },
  { cols: 4, label: '4 cols (Small)' },
]

// Base card dimensions per template
const CARD_DIMS = {
  badge:    { w: 240, h: 240 },
  label:    { w: 340, h: 140 },
  banner:   { w: 320, h: 150 },
  portrait: { w: 200, h: 280 },
}

export default function PrintSheet({
  onClose,
  activeSubjects,
  photo,
  subjectBgs,
  globalCardBg,
  studentName,
  grade,
  section,
  teacher,
  template,
  colorTheme,
  font,
  fontColor,
  infoColor,
  showEmoji,
  cardColors,
  borderStyle,
  watermark,
  printCols,
  onPrintColsChange,
}) {
  const printAreaRef = useRef(null)

  const dims = CARD_DIMS[template] || CARD_DIMS.badge

  // A4 usable width at 96dpi: 794px, with margins ~20px each side → ~754px usable
  // We want the cards to fit in `printCols` columns with some gap
  const A4_W = 754
  const GAP = 12
  const cellW = (A4_W - GAP * (printCols - 1)) / printCols
  const scale = Math.min(cellW / dims.w, 1)
  const cellH = dims.h * scale

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="print-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="print-modal">
        {/* Header */}
        <div className="print-modal-header">
          <h2>Print Sheet</h2>
          <div className="print-modal-controls">
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#666' }}>Layout:</span>
            {COL_OPTIONS.map(opt => (
              <button
                key={opt.cols}
                className={`tone-btn${printCols === opt.cols ? ' active' : ''}`}
                onClick={() => onPrintColsChange(opt.cols)}
                style={{ padding: '5px 10px', fontSize: '0.75rem' }}
              >
                {opt.label}
              </button>
            ))}
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={handlePrint}>
              Print
            </button>
            <button className="card-bg-clear" onClick={onClose} style={{ width: 32, height: 32, fontSize: '1rem' }}>✕</button>
          </div>
        </div>

        {/* Print area — this is what gets printed */}
        <div className="print-area-scroll">
          <div id="print-area" ref={printAreaRef} className="print-area">
            <div
              className="print-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${printCols}, ${cellW}px)`,
                gap: GAP,
                width: A4_W,
              }}
            >
              {activeSubjects.map(subj => {
                const themes = subj.themes || [{ emojis: ['⭐', '📌', '✏️'] }]
                const activeEmojis = themes[0].emojis
                const cardBg = subjectBgs[subj.id] || globalCardBg
                const customColor = cardColors?.[subj.id]

                return (
                  <div
                    key={subj.id}
                    style={{
                      width: cellW,
                      height: cellH,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'center center',
                      flexShrink: 0,
                    }}>
                      <SubjectCard
                        subject={customColor
                          ? { ...subj, color: customColor.c1, color2: customColor.c2 }
                          : subj
                        }
                        photo={photo}
                        cardBg={cardBg}
                        studentName={studentName}
                        grade={grade}
                        section={section}
                        teacher={teacher}
                        template={template}
                        colorTheme={colorTheme}
                        font={font}
                        fontColor={fontColor}
                        infoColor={infoColor}
                        showEmoji={showEmoji}
                        emojis={activeEmojis}
                        borderStyle={borderStyle}
                        watermark={watermark}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
