import { useRef, useState } from 'react'
import SubjectCard from './SubjectCard'

const MARK_OFFSET = 3  // how far outside the card the border sits

function CutMarks({ cellW, cellH }) {
  return (
    <div style={{
      position: 'absolute',
      top: -MARK_OFFSET,
      left: -MARK_OFFSET,
      width: cellW + MARK_OFFSET * 2,
      height: cellH + MARK_OFFSET * 2,
      border: '1.5px dashed #999',
      borderRadius: 3,
      pointerEvents: 'none',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact',
    }} />
  )
}

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
  subjectFontColors = {},
  subjectInfoColors = {},
  borderStyle,
  watermark,
  printCols,
  onPrintColsChange,
  titleBgColor,
  titleBgOpacity = 0,
  infoBgColor,
  infoBgOpacity = 0,
  subjectTitleBgColors = {},
  subjectTitleBgOpacities = {},
  subjectInfoBgColors = {},
  subjectInfoBgOpacities = {},
  photoZoom = 1,
  photoX = 50,
  photoY = 50,
}) {
  const printAreaRef = useRef(null)
  const [showCutMarks, setShowCutMarks] = useState(true)

  const dims = CARD_DIMS[template] || CARD_DIMS.badge

  const A4_W = 718  // 190mm at 96dpi — A4 content width with 10mm margins
  const GAP = showCutMarks ? 18 : 12
  const cellW = (A4_W - GAP * (printCols - 1)) / printCols
  const scale = Math.min(cellW / dims.w, 1)
  const cellH = dims.h * scale

  // Calculate explicit page groups — Chrome ignores break-inside:avoid on flex/grid,
  // but always respects page-break-after:always on block containers.
  const SAFE_PAGE_H = 950  // conservative A4 usable height in CSS px (≈252mm)
  const rowsPerPage = Math.max(1, Math.floor((SAFE_PAGE_H + GAP) / (cellH + GAP)))
  const totalRows = Math.ceil(activeSubjects.length / printCols)
  const pageGroups = Array.from({ length: Math.ceil(totalRows / rowsPerPage) }, (_, pi) => {
    const startRow = pi * rowsPerPage
    return Array.from({ length: Math.min(rowsPerPage, totalRows - startRow) }, (_, ri) => startRow + ri)
  })

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
            <button
              className={`tone-btn${showCutMarks ? ' active' : ''}`}
              style={{ padding: '5px 10px', fontSize: '0.75rem' }}
              onClick={() => setShowCutMarks(v => !v)}
              title="Show cut guides for trimming"
            >
              ✂️ Cut Marks
            </button>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={handlePrint}>
              Print
            </button>
            <button className="card-bg-clear" onClick={onClose} style={{ width: 32, height: 32, fontSize: '1rem' }}>✕</button>
          </div>
        </div>

        {/* Print area — this is what gets printed */}
        <div className="print-area-scroll">
          <div id="print-area" ref={printAreaRef} className="print-area">
            {/* Explicit page groups: Chrome always respects page-break-after:always */}
            {pageGroups.map((rowIndices, pageIdx) => (
              <div
                key={pageIdx}
                style={{
                  width: A4_W,
                  pageBreakAfter: pageIdx < pageGroups.length - 1 ? 'always' : 'auto',
                  breakAfter:     pageIdx < pageGroups.length - 1 ? 'page'   : 'auto',
                }}
              >
                {rowIndices.map(rowIdx => {
                  const rowSubjects = activeSubjects.slice(rowIdx * printCols, (rowIdx + 1) * printCols)
                  return (
                    <div
                      key={rowIdx}
                      className="print-row"
                      style={{ display: 'flex', gap: GAP, width: A4_W, marginBottom: rowIdx < totalRows - 1 ? GAP : 0 }}
                    >
                      {rowSubjects.map(subj => {
                        const themes = subj.themes || [{ emojis: ['⭐', '📌', '✏️'] }]
                        const activeEmojis = themes[0].emojis
                        const cardBg = subjectBgs[subj.id] || globalCardBg
                        const customColor = cardColors?.[subj.id]
                        const subjFontColor      = subjectFontColors[subj.id]       || fontColor
                        const subjInfoColor      = subjectInfoColors[subj.id]       || infoColor
                        const subjTitleBgColor   = subjectTitleBgColors[subj.id]    ?? titleBgColor
                        const subjTitleBgOpacity = subjectTitleBgOpacities[subj.id] ?? titleBgOpacity
                        const subjInfoBgColor    = subjectInfoBgColors[subj.id]     ?? infoBgColor
                        const subjInfoBgOpacity  = subjectInfoBgOpacities[subj.id]  ?? infoBgOpacity
                        return (
                          <div
                            key={subj.id}
                            className="print-cell"
                            style={{ width: cellW, height: cellH, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', position: 'relative', flexShrink: 0 }}
                          >
                            {showCutMarks && <CutMarks cellW={cellW} cellH={cellH} />}
                            <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
                              <SubjectCard
                                subject={customColor ? { ...subj, color: customColor.c1, color2: customColor.c2 } : subj}
                                photo={photo} cardBg={cardBg}
                                studentName={studentName} grade={grade} section={section} teacher={teacher}
                                template={template} colorTheme={colorTheme} font={font}
                                fontColor={subjFontColor} infoColor={subjInfoColor}
                                showEmoji={showEmoji} emojis={activeEmojis}
                                borderStyle={borderStyle} watermark={watermark}
                                titleBgColor={subjTitleBgColor} titleBgOpacity={subjTitleBgOpacity}
                                infoBgColor={subjInfoBgColor} infoBgOpacity={subjInfoBgOpacity}
                                photoZoom={photoZoom} photoX={photoX} photoY={photoY}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
