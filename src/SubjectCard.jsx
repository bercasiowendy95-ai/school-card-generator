import { forwardRef } from 'react'

function hexToRgba(hex, opacity) {
  if (!opacity) return 'transparent'
  let h = hex.replace('#','')
  if (h.length === 3) h = h.split('').map(c=>c+c).join('')
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16)
  return `rgba(${r},${g},${b},${opacity})`
}

const SubjectCard = forwardRef(function SubjectCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, template, colorTheme, font, fontColor, infoColor, showEmoji, emojis, borderStyle, watermark, titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity },
  ref
) {
  const filterStyle = {
    vivid:  'saturate(1.2)',
    pastel: 'saturate(0.78) brightness(1.08)',
    dark:   'saturate(1.45) contrast(1.08)',
  }[colorTheme] || 'none'

  const props = {
    subject, photo, cardBg, studentName, grade, section, teacher,
    font, fontColor, infoColor: infoColor || '#ffffff',
    showEmoji, emojis, filterStyle, borderStyle, watermark,
    titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity,
  }

  if (template === 'label')    return <LabelCard    ref={ref} {...props} />
  if (template === 'banner')   return <BannerCard   ref={ref} {...props} />
  if (template === 'portrait') return <PortraitCard ref={ref} {...props} />
  return                              <BadgeCard    ref={ref} {...props} />
})

/* ── Shared helpers ── */
function PhotoCircle({ photo, icon, size }) {
  const base = {
    width: size, height: size, borderRadius: '50%',
    border: '4px solid rgba(255,255,255,0.9)',
    boxShadow: '0 3px 14px rgba(0,0,0,0.25)',
    display: 'block', flexShrink: 0,
  }
  return photo
    ? <img src={photo} crossOrigin="anonymous" style={{ ...base, objectFit: 'cover' }} />
    : <div style={{ ...base, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4 }}>{icon}</div>
}

function BgLayer({ cardBg, color, color2, gradient }) {
  return cardBg
    ? <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cardBg})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
    : <div style={{ position: 'absolute', inset: 0, background: gradient || `linear-gradient(135deg,${color} 0%,${color2} 100%)`, zIndex: 0 }} />
}

/* Name tag shown on cards */
function NameTag({ studentName, grade, section, teacher, infoColor = '#ffffff', sectionBg = 'rgba(0,0,0,0.25)', style = {}, bgColor = '#000000', bgOpacity = 0 }) {
  if (!studentName && !grade && !section && !teacher) return null
  const gradeSection = [grade, section].filter(Boolean).join(' · ')
  const inner = (
    <>
      {studentName && (
        <div style={{
          fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: 900,
          color: infoColor, textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          lineHeight: 1.3, marginBottom: 3,
        }}>{studentName}</div>
      )}
      {gradeSection && (
        <div style={{
          display: 'inline-block', background: sectionBg,
          borderRadius: 20, padding: '2px 12px',
          fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 900,
          color: infoColor, marginBottom: 3,
        }}>{gradeSection}</div>
      )}
      {teacher && (
        <div style={{
          fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 700,
          color: infoColor, fontStyle: 'italic', opacity: 0.85,
        }}>{teacher}</div>
      )}
    </>
  )
  return (
    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', ...style }}>
      {bgOpacity > 0
        ? <div style={{ display: 'inline-block', background: hexToRgba(bgColor, bgOpacity), borderRadius: 8, padding: '4px 10px' }}>{inner}</div>
        : inner
      }
    </div>
  )
}

/* ── Border Frame overlay ── */
function BorderFrame({ style: borderStyle, color, isCircle }) {
  if (!borderStyle || borderStyle === 'none') return null

  const CORNERS = ['top:6px;left:6px', 'top:6px;right:6px', 'bottom:6px;left:6px', 'bottom:6px;right:6px']

  if (borderStyle === 'stars') {
    return (
      <>
        {/* inner ring */}
        <div style={{
          position: 'absolute', inset: 8,
          borderRadius: isCircle ? '50%' : 14,
          border: '2px solid rgba(255,255,255,0.45)',
          zIndex: 8, pointerEvents: 'none',
        }} />
        {/* corner stars */}
        {CORNERS.map((pos, i) => {
          const s = {}
          pos.split(';').forEach(p => {
            const [k, v] = p.split(':')
            s[k] = v
          })
          return (
            <div key={i} style={{
              position: 'absolute', ...s,
              color: 'rgba(255,255,255,0.9)', fontSize: 14,
              zIndex: 8, pointerEvents: 'none', lineHeight: 1,
            }}>✦</div>
          )
        })}
      </>
    )
  }

  if (borderStyle === 'dots') {
    return (
      <div style={{
        position: 'absolute', inset: 5,
        borderRadius: isCircle ? '50%' : 16,
        border: '3px dotted rgba(255,255,255,0.6)',
        zIndex: 8, pointerEvents: 'none',
      }} />
    )
  }

  if (borderStyle === 'ribbon') {
    return (
      <>
        <div style={{
          position: 'absolute', inset: 4,
          borderRadius: isCircle ? '50%' : 18,
          border: '3px solid rgba(255,255,255,0.7)',
          zIndex: 8, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 9,
          borderRadius: isCircle ? '50%' : 13,
          border: '2px solid rgba(255,255,255,0.35)',
          zIndex: 8, pointerEvents: 'none',
        }} />
      </>
    )
  }

  if (borderStyle === 'glow') {
    return (
      <div style={{
        position: 'absolute', inset: -4,
        borderRadius: isCircle ? '50%' : 26,
        boxShadow: `0 0 18px 6px ${color}99, 0 0 36px 10px ${color}44`,
        zIndex: 8, pointerEvents: 'none',
      }} />
    )
  }

  return null
}

/* ── Watermark ── */
function Watermark() {
  return (
    <div style={{
      position: 'absolute', bottom: 4, left: 0, right: 0,
      textAlign: 'center', zIndex: 9, pointerEvents: 'none',
      fontFamily: "'Nunito',sans-serif", fontSize: 10, fontWeight: 700,
      color: 'rgba(255,255,255,0.55)', letterSpacing: 0.3,
    }}>
      schoolcardmaker.com
    </div>
  )
}

/* ─────────────────────────────────────────
   LABEL — bold die-cut banner style
───────────────────────────────────────── */
const LabelCard = forwardRef(function LabelCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, infoColor, showEmoji, emojis, filterStyle, borderStyle, watermark, titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity }, ref
) {
  const { name, color, color2 } = subject
  const lines = name.split('\n')
  const isLong = lines.some(l => l.length > 9)
  const fontSize = isLong ? 32 : lines.length > 1 ? 36 : 52
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'

  return (
    <div ref={ref} style={{
      width: 340, minHeight: 130,
      borderRadius: 22, position: 'relative', overflow: 'hidden',
      filter: filterStyle,
      boxShadow: `0 6px 24px ${color}55, 0 0 0 4px #222, 0 0 0 7px rgba(255,255,255,0.6)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '18px 20px',
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(135deg,${color} 0%,${color2} 100%)`} />
      <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', zIndex: 1, pointerEvents: 'none' }} />
      {['12%,8%', '88%,6%', '5%,75%', '93%,80%', '50%,4%'].map((pos, i) => {
        const [l, t] = pos.split(',')
        return <div key={i} style={{ position: 'absolute', left: l, top: t, color: 'rgba(255,255,255,0.75)', fontSize: i === 4 ? 14 : 11, zIndex: 1, pointerEvents: 'none' }}>✦</div>
      })}

      <div style={{ position: 'relative', zIndex: 2, display: 'inline-block', background: hexToRgba(titleBgColor, titleBgOpacity), borderRadius: 8, padding: titleBgOpacity > 0 ? '2px 10px' : 0 }}>
        <div style={{
          fontFamily: `'${font}',cursive`,
          fontSize, color: fontColor,
          textAlign: 'center', lineHeight: 1.1,
          WebkitTextStroke: `2px ${strokeColor}`,
          textShadow: `2px 4px 8px rgba(0,0,0,0.4)`,
          letterSpacing: 1, whiteSpace: 'pre-line', padding: '0 4px',
        }}>{name}</div>
      </div>

      {showEmoji && (
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 8, marginTop: 8 }}>
          {emojis.map((e, i) => <span key={i} style={{ fontSize: 18, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>{e}</span>)}
        </div>
      )}

      <NameTag studentName={studentName} grade={grade} section={section} teacher={teacher} infoColor={infoColor} style={{ marginTop: 8 }} bgColor={infoBgColor} bgOpacity={infoBgOpacity} />
      <BorderFrame style={borderStyle} color={color} isCircle={false} />
      {watermark && <Watermark />}
    </div>
  )
})

/* ─────────────────────────────────────────
   BADGE — round sticker
───────────────────────────────────────── */
const BadgeCard = forwardRef(function BadgeCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, infoColor, showEmoji, emojis, filterStyle, borderStyle, watermark, titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n', '').length > 9
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'

  return (
    <div ref={ref} style={{
      width: 240, height: 240, borderRadius: '50%', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '5px solid rgba(255,255,255,0.35)', flexShrink: 0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`radial-gradient(circle at 38% 30%,${color}cc,${color2})`} />
      <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)', top: -30, left: -30, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', bottom: 10, right: 10, zIndex: 1, pointerEvents: 'none' }} />

      {photo && <div style={{ position: 'relative', zIndex: 2, marginBottom: 4 }}><PhotoCircle photo={photo} icon={icon} size={72} /></div>}

      <div style={{ position: 'relative', zIndex: 2, marginBottom: 4 }}>
        <div style={{ display: 'inline-block', background: hexToRgba(titleBgColor, titleBgOpacity), borderRadius: 8, padding: titleBgOpacity > 0 ? '2px 10px' : 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
            borderRadius: 30, padding: '4px 14px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: `'${font}',cursive`,
              fontSize: isLong ? 14 : photo ? 18 : 24,
              color: fontColor,
              WebkitTextStroke: `1px ${strokeColor}`,
              textShadow: '0 2px 6px rgba(0,0,0,0.35)',
              lineHeight: 1.15, whiteSpace: 'pre-line', letterSpacing: 0.5,
            }}>{name}</div>
          </div>
        </div>
      </div>

      <NameTag studentName={studentName} grade={grade} section={section} teacher={teacher} infoColor={infoColor} sectionBg="rgba(0,0,0,0.2)" style={{ padding: '0 8px' }} bgColor={infoBgColor} bgOpacity={infoBgOpacity} />

      {showEmoji && <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 13, opacity: 0.85, zIndex: 2 }}>{emojis[0]}</div>}
      {showEmoji && <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 13, opacity: 0.85, zIndex: 2 }}>{emojis[1]}</div>}
      {showEmoji && <div style={{ position: 'absolute', bottom: 16, left: 18, fontSize: 11, opacity: 0.75, zIndex: 2 }}>{emojis[2]}</div>}
      <div style={{ position: 'absolute', top: '38%', left: 10, color: 'rgba(255,255,255,0.7)', fontSize: 9, zIndex: 2 }}>✦</div>
      <div style={{ position: 'absolute', top: '25%', right: 12, color: 'rgba(255,255,255,0.6)', fontSize: 7, zIndex: 2 }}>✦</div>
      <BorderFrame style={borderStyle} color={color} isCircle={true} />
      {watermark && <Watermark />}
    </div>
  )
})

/* ─────────────────────────────────────────
   BANNER — wide card with photo
───────────────────────────────────────── */
const BannerCard = forwardRef(function BannerCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, infoColor, showEmoji, emojis, filterStyle, borderStyle, watermark, titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n', '').length > 10
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'

  return (
    <div ref={ref} style={{
      width: 320, minHeight: 150,
      borderRadius: 24, position: 'relative',
      display: 'flex', alignItems: 'stretch',
      overflow: 'hidden', filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)', flexShrink: 0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} />
      <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Photo column */}
      <div style={{ width: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 2, padding: '12px 0 12px 12px' }}>
        <PhotoCircle photo={photo} icon={icon} size={86} />
      </div>

      {/* Divider */}
      <div style={{ width: 3, height: '60%', borderRadius: 3, background: 'rgba(255,255,255,0.3)', flexShrink: 0, margin: 'auto 10px', zIndex: 2 }} />

      {/* Text column */}
      <div style={{ flex: 1, zIndex: 2, padding: '12px 12px 12px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
        <div style={{ display: 'inline-block', background: hexToRgba(titleBgColor, titleBgOpacity), borderRadius: 8, padding: titleBgOpacity > 0 ? '2px 10px' : 0 }}>
          <div style={{
            fontFamily: `'${font}',cursive`,
            fontSize: isLong ? 18 : 26,
            color: fontColor,
            WebkitTextStroke: `1.5px ${strokeColor}`,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            lineHeight: 1.1, whiteSpace: 'pre-line',
          }}>{name}</div>
        </div>
        {showEmoji && (
          <div style={{ display: 'flex', gap: 5 }}>
            {emojis.map((e, i) => <span key={i} style={{ fontSize: 16 }}>{e}</span>)}
          </div>
        )}
        <NameTag studentName={studentName} grade={grade} section={section} teacher={teacher} infoColor={infoColor} sectionBg="rgba(0,0,0,0.2)" style={{ textAlign: 'left' }} bgColor={infoBgColor} bgOpacity={infoBgOpacity} />
      </div>
      <BorderFrame style={borderStyle} color={color} isCircle={false} />
      {watermark && <Watermark />}
    </div>
  )
})

/* ─────────────────────────────────────────
   PORTRAIT — tall card
───────────────────────────────────────── */
const PortraitCard = forwardRef(function PortraitCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, infoColor, showEmoji, emojis, filterStyle, borderStyle, watermark, titleBgColor, titleBgOpacity, infoBgColor, infoBgOpacity }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n', '').length > 10
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'

  return (
    <div ref={ref} style={{
      width: 200, borderRadius: 22, position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflow: 'hidden', filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)', flexShrink: 0, paddingBottom: 14,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(170deg,${color}ee 0%,${color2} 100%)`} />
      <div style={{ position: 'absolute', top: 60, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Subject name banner */}
      <div style={{ width: '100%', padding: '12px 10px 10px', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: 10 }}>
        <div style={{ display: 'inline-block', background: hexToRgba(titleBgColor, titleBgOpacity), borderRadius: 8, padding: titleBgOpacity > 0 ? '2px 10px' : 0 }}>
          <div style={{
            fontFamily: `'${font}',cursive`,
            fontSize: isLong ? 17 : 22,
            color: fontColor,
            WebkitTextStroke: `1.5px ${strokeColor}`,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            lineHeight: 1.15, whiteSpace: 'pre-line', letterSpacing: 0.5,
          }}>{name}</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginBottom: 8 }}>
        <PhotoCircle photo={photo} icon={icon} size={96} />
      </div>

      {showEmoji && (
        <div style={{ display: 'flex', gap: 7, marginBottom: 8, zIndex: 2, position: 'relative' }}>
          {emojis.map((e, i) => <span key={i} style={{ fontSize: 18 }}>{e}</span>)}
        </div>
      )}

      <NameTag
        studentName={studentName} grade={grade} section={section} teacher={teacher} infoColor={infoColor}
        sectionBg="rgba(0,0,0,0.22)"
        style={{ paddingHorizontal: 10, maxWidth: '90%' }}
        bgColor={infoBgColor} bgOpacity={infoBgOpacity}
      />

      <div style={{ position: 'absolute', top: 70, right: 14, color: 'rgba(255,255,255,0.65)', fontSize: 11, zIndex: 2 }}>✦</div>
      <div style={{ position: 'absolute', bottom: 50, left: 14, color: 'rgba(255,255,255,0.55)', fontSize: 9, zIndex: 2 }}>✦</div>
      <BorderFrame style={borderStyle} color={color} isCircle={false} />
      {watermark && <Watermark />}
    </div>
  )
})

export default SubjectCard
