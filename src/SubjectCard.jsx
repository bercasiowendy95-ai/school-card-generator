import { forwardRef } from 'react'

const SubjectCard = forwardRef(function SubjectCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, template, colorTheme, font, fontColor, showEmoji, emojis },
  ref
) {
  const filterStyle = {
    vivid:  'saturate(1.2)',
    pastel: 'saturate(0.55) brightness(1.18)',
    dark:   'saturate(1.1) brightness(0.82)',
  }[colorTheme] || 'none'

  const props = { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, showEmoji, emojis, filterStyle }

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
    ? <div style={{ position:'absolute', inset:0, backgroundImage:`url(${cardBg})`, backgroundSize:'cover', backgroundPosition:'center', zIndex:0 }} />
    : <div style={{ position:'absolute', inset:0, background: gradient || `linear-gradient(135deg,${color} 0%,${color2} 100%)`, zIndex:0 }} />
}

/* Name tag shown on cards — 3 layers: name / section / teacher */
function NameTag({ studentName, grade, section, teacher, sectionBg = 'rgba(0,0,0,0.25)', style = {} }) {
  if (!studentName && !grade && !section && !teacher) return null
  const gradeSection = [grade, section].filter(Boolean).join(' · ')
  return (
    <div style={{ position:'relative', zIndex:2, textAlign:'center', ...style }}>
      {studentName && (
        <div style={{
          fontFamily:"'Nunito',sans-serif", fontSize:12, fontWeight:900,
          color:'rgba(255,255,255,0.97)', textShadow:'0 1px 4px rgba(0,0,0,0.4)',
          lineHeight:1.3, marginBottom:3,
        }}>{studentName}</div>
      )}
      {gradeSection && (
        <div style={{
          display:'inline-block',
          background: sectionBg,
          borderRadius:20, padding:'2px 12px',
          fontFamily:"'Nunito',sans-serif", fontSize:10, fontWeight:900,
          color:'rgba(255,255,255,0.95)', marginBottom:3,
        }}>{gradeSection}</div>
      )}
      {teacher && (
        <div style={{
          fontFamily:"'Nunito',sans-serif", fontSize:10, fontWeight:700,
          color:'rgba(255,255,255,0.8)', fontStyle:'italic',
        }}>👩‍🏫 {teacher}</div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   LABEL — bold die-cut banner style
───────────────────────────────────────── */
const LabelCard = forwardRef(function LabelCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, showEmoji, emojis, filterStyle }, ref
) {
  const { name, color, color2 } = subject
  const lines = name.split('\n')
  const isLong = lines.some(l => l.length > 9)
  const fontSize = isLong ? 32 : lines.length > 1 ? 36 : 52
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'

  return (
    <div ref={ref} style={{
      width:340, minHeight:130,
      borderRadius:22, position:'relative', overflow:'hidden',
      filter:filterStyle,
      boxShadow:`0 6px 24px ${color}55, 0 0 0 4px #222, 0 0 0 7px rgba(255,255,255,0.6)`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'18px 20px',
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(135deg,${color} 0%,${color2} 100%)`} />
      <div style={{ position:'absolute', top:-30,left:-30, width:120,height:120, borderRadius:'50%', background:'rgba(255,255,255,0.1)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-20,right:-20, width:100,height:100, borderRadius:'50%', background:'rgba(255,255,255,0.08)', zIndex:1, pointerEvents:'none' }}/>
      {['12%,8%','88%,6%','5%,75%','93%,80%','50%,4%'].map((pos,i) => {
        const [l,t] = pos.split(',')
        return <div key={i} style={{ position:'absolute', left:l, top:t, color:'rgba(255,255,255,0.75)', fontSize:i===4?14:11, zIndex:1, pointerEvents:'none' }}>✦</div>
      })}

      <div style={{
        position:'relative', zIndex:2,
        fontFamily:`'${font}',cursive`,
        fontSize, color:fontColor,
        textAlign:'center', lineHeight:1.1,
        WebkitTextStroke:`2px ${strokeColor}`,
        textShadow:`2px 4px 8px rgba(0,0,0,0.4)`,
        letterSpacing:1, whiteSpace:'pre-line', padding:'0 4px',
      }}>{name}</div>

      {showEmoji && (
        <div style={{ position:'relative', zIndex:2, display:'flex', gap:8, marginTop:8 }}>
          {emojis.map((e,i) => <span key={i} style={{ fontSize:18, filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>{e}</span>)}
        </div>
      )}

      <NameTag studentName={studentName} grade={grade} section={section} teacher={teacher} style={{ marginTop:8 }} />
    </div>
  )
})

/* ─────────────────────────────────────────
   BADGE — round sticker
───────────────────────────────────────── */
const BadgeCard = forwardRef(function BadgeCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, showEmoji, emojis, filterStyle }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n','').length > 9
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'

  return (
    <div ref={ref} style={{
      width:240, height:240, borderRadius:'50%', position:'relative',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      overflow:'hidden', filter:filterStyle,
      boxShadow:`0 8px 28px ${color}66`,
      border:'5px solid rgba(255,255,255,0.35)', flexShrink:0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`radial-gradient(circle at 38% 30%,${color}cc,${color2})`} />
      <div style={{ position:'absolute', width:160,height:160, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.15)', top:-30,left:-30, zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:80,height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)', bottom:10,right:10, zIndex:1, pointerEvents:'none' }}/>

      {photo && <div style={{ position:'relative', zIndex:2, marginBottom:4 }}><PhotoCircle photo={photo} icon={icon} size={72} /></div>}

      <div style={{
        position:'relative', zIndex:2,
        background:'rgba(255,255,255,0.18)', backdropFilter:'blur(4px)',
        borderRadius:30, padding:'4px 14px', textAlign:'center', marginBottom:4,
      }}>
        <div style={{
          fontFamily:`'${font}',cursive`,
          fontSize: isLong ? 14 : photo ? 18 : 24,
          color: fontColor,
          WebkitTextStroke:`1px ${strokeColor}`,
          textShadow:'0 2px 6px rgba(0,0,0,0.35)',
          lineHeight:1.15, whiteSpace:'pre-line', letterSpacing:0.5,
        }}>{name}</div>
      </div>

      {(studentName || grade || section || teacher) && (
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 8px' }}>
          {studentName && <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.9)', lineHeight:1.3 }}>{studentName}</div>}
          {(grade || section) && <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.75)' }}>{[grade,section].filter(Boolean).join(' · ')}</div>}
          {teacher && <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:8, fontWeight:600, color:'rgba(255,255,255,0.65)', fontStyle:'italic' }}>👩‍🏫 {teacher}</div>}
        </div>
      )}

      {showEmoji && <div style={{ position:'absolute', top:14,left:14, fontSize:13, opacity:0.85, zIndex:2 }}>{emojis[0]}</div>}
      {showEmoji && <div style={{ position:'absolute', top:14,right:14, fontSize:13, opacity:0.85, zIndex:2 }}>{emojis[1]}</div>}
      {showEmoji && <div style={{ position:'absolute', bottom:16,left:18, fontSize:11, opacity:0.75, zIndex:2 }}>{emojis[2]}</div>}
      <div style={{ position:'absolute', top:'38%',left:10, color:'rgba(255,255,255,0.7)', fontSize:9, zIndex:2 }}>✦</div>
      <div style={{ position:'absolute', top:'25%',right:12, color:'rgba(255,255,255,0.6)', fontSize:7, zIndex:2 }}>✦</div>
    </div>
  )
})

/* ─────────────────────────────────────────
   BANNER — wide card with photo
───────────────────────────────────────── */
const BannerCard = forwardRef(function BannerCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, showEmoji, emojis, filterStyle }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n','').length > 10
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'

  return (
    <div ref={ref} style={{
      width:320, minHeight:150,
      borderRadius:24, position:'relative',
      display:'flex', alignItems:'stretch',
      overflow:'hidden', filter:filterStyle,
      boxShadow:`0 8px 28px ${color}66`,
      border:'4px solid rgba(255,255,255,0.3)', flexShrink:0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} />
      <div style={{ position:'absolute', right:-30,top:-30, width:140,height:140, borderRadius:'50%', background:'rgba(255,255,255,0.1)', zIndex:1, pointerEvents:'none' }}/>

      {/* Photo column */}
      <div style={{ width:110, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:2, padding:'12px 0 12px 12px' }}>
        <PhotoCircle photo={photo} icon={icon} size={86} />
      </div>

      {/* Divider */}
      <div style={{ width:3, height:'60%', borderRadius:3, background:'rgba(255,255,255,0.3)', flexShrink:0, margin:'auto 10px', zIndex:2 }}/>

      {/* Text column */}
      <div style={{ flex:1, zIndex:2, padding:'12px 12px 12px 0', display:'flex', flexDirection:'column', justifyContent:'center', gap:6 }}>
        <div style={{
          fontFamily:`'${font}',cursive`,
          fontSize: isLong ? 18 : 26,
          color: fontColor,
          WebkitTextStroke:`1.5px ${strokeColor}`,
          textShadow:'0 2px 8px rgba(0,0,0,0.3)',
          lineHeight:1.1, whiteSpace:'pre-line',
        }}>{name}</div>
        {showEmoji && (
          <div style={{ display:'flex', gap:5 }}>
            {emojis.map((e,i) => <span key={i} style={{ fontSize:16 }}>{e}</span>)}
          </div>
        )}
        <NameTag studentName={studentName} grade={grade} section={section} teacher={teacher} sectionBg="rgba(0,0,0,0.2)" style={{ textAlign:'left' }} />
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────
   PORTRAIT — tall card
───────────────────────────────────────── */
const PortraitCard = forwardRef(function PortraitCard(
  { subject, photo, cardBg, studentName, grade, section, teacher, font, fontColor, showEmoji, emojis, filterStyle }, ref
) {
  const { name, color, color2, icon } = subject
  const isLong = name.replace('\n','').length > 10
  const strokeColor = fontColor === '#1a1a1a' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'

  return (
    <div ref={ref} style={{
      width:200, borderRadius:22, position:'relative',
      display:'flex', flexDirection:'column', alignItems:'center',
      overflow:'hidden', filter:filterStyle,
      boxShadow:`0 8px 28px ${color}66`,
      border:'4px solid rgba(255,255,255,0.3)', flexShrink:0, paddingBottom:14,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(170deg,${color}ee 0%,${color2} 100%)`} />
      <div style={{ position:'absolute', top:60,left:-20, width:100,height:100, borderRadius:'50%', background:'rgba(255,255,255,0.07)', zIndex:1, pointerEvents:'none' }}/>

      {/* Subject name banner */}
      <div style={{ width:'100%', background:'rgba(0,0,0,0.2)', padding:'12px 10px 10px', textAlign:'center', position:'relative', zIndex:2, marginBottom:10 }}>
        <div style={{
          fontFamily:`'${font}',cursive`,
          fontSize: isLong ? 17 : 22,
          color: fontColor,
          WebkitTextStroke:`1.5px ${strokeColor}`,
          textShadow:'0 2px 8px rgba(0,0,0,0.4)',
          lineHeight:1.15, whiteSpace:'pre-line', letterSpacing:0.5,
        }}>{name}</div>
      </div>

      <div style={{ position:'relative', zIndex:2, marginBottom:8 }}>
        <PhotoCircle photo={photo} icon={icon} size={96} />
      </div>

      {showEmoji && (
        <div style={{ display:'flex', gap:7, marginBottom:8, zIndex:2, position:'relative' }}>
          {emojis.map((e,i) => <span key={i} style={{ fontSize:18 }}>{e}</span>)}
        </div>
      )}

      <NameTag
        studentName={studentName} section={section} teacher={teacher}
        sectionBg="rgba(0,0,0,0.22)"
        style={{ paddingHorizontal:10, maxWidth:'90%' }}
      />

      <div style={{ position:'absolute', top:70,right:14, color:'rgba(255,255,255,0.65)', fontSize:11, zIndex:2 }}>✦</div>
      <div style={{ position:'absolute', bottom:50,left:14, color:'rgba(255,255,255,0.55)', fontSize:9, zIndex:2 }}>✦</div>
    </div>
  )
})

export default SubjectCard
