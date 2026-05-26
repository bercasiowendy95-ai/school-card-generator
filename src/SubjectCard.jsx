import { forwardRef } from 'react'

const SubjectCard = forwardRef(function SubjectCard(
  { subject, photo, cardBg, studentName, section, template, colorTheme, font, showEmoji },
  ref
) {
  const filterStyle = {
    vivid:  'saturate(1.2)',
    pastel: 'saturate(0.55) brightness(1.18)',
    dark:   'saturate(1.1) brightness(0.82)',
  }[colorTheme] || 'none'

  const props = { subject, photo, cardBg, studentName, section, font, showEmoji, filterStyle }

  if (template === 'label')    return <LabelCard    ref={ref} {...props} />
  if (template === 'banner')   return <BannerCard   ref={ref} {...props} />
  if (template === 'portrait') return <PortraitCard ref={ref} {...props} />
  return                              <BadgeCard    ref={ref} {...props} />
})

/* ─────────────────────────────────────────
   Shared helpers
───────────────────────────────────────── */
function PhotoCircle({ photo, icon, size, borderColor = 'rgba(255,255,255,0.9)' }) {
  const s = {
    width: size, height: size, borderRadius: '50%',
    border: `4px solid ${borderColor}`,
    boxShadow: '0 3px 14px rgba(0,0,0,0.25)',
    display: 'block', flexShrink: 0,
  }
  return photo
    ? <img src={photo} crossOrigin="anonymous" style={{ ...s, objectFit: 'cover' }} />
    : <div style={{ ...s, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4 }}>{icon}</div>
}

function BgLayer({ cardBg, color, color2, gradient }) {
  if (cardBg) return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `url(${cardBg})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      zIndex: 0,
    }} />
  )
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: gradient || `linear-gradient(135deg, ${color} 0%, ${color2} 100%)`,
      zIndex: 0,
    }} />
  )
}

/* ─────────────────────────────────────────
   LABEL — bold die-cut banner style
───────────────────────────────────────── */
const LabelCard = forwardRef(function LabelCard(
  { subject, photo, cardBg, studentName, section, font, showEmoji, filterStyle }, ref
) {
  const { name, color, color2, emojis, icon } = subject
  const lines = name.split('\n')
  const isLong = lines.some(l => l.length > 9)
  const fontSize = isLong ? 32 : lines.length > 1 ? 36 : 52

  return (
    <div ref={ref} style={{
      width: 340, minHeight: 130,
      borderRadius: 22,
      position: 'relative',
      overflow: 'hidden',
      filter: filterStyle,
      boxShadow: `0 6px 24px ${color}55, 0 0 0 4px #222, 0 0 0 7px rgba(255,255,255,0.6)`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '18px 20px',
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(135deg, ${color} 0%, ${color2} 100%)`} />

      {/* Decorative circles */}
      <div style={{ position:'absolute', top:-30, left:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.1)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.08)', zIndex:1, pointerEvents:'none' }}/>

      {/* Stars */}
      {['12%,8%','88%,6%','5%,75%','93%,80%','50%,4%'].map((pos, i) => {
        const [l, t] = pos.split(',')
        return <div key={i} style={{ position:'absolute', left:l, top:t, color:'rgba(255,255,255,0.75)', fontSize: i === 4 ? 14 : 11, zIndex:1, pointerEvents:'none' }}>✦</div>
      })}

      {/* Main subject name */}
      <div style={{
        position: 'relative', zIndex: 2,
        fontFamily: `'${font}', cursive`,
        fontSize: fontSize,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.1,
        WebkitTextStroke: cardBg ? '2px rgba(0,0,0,0.7)' : '2px rgba(0,0,0,0.35)',
        textShadow: '2px 4px 8px rgba(0,0,0,0.4), 0 1px 0 rgba(0,0,0,0.3)',
        letterSpacing: 1,
        whiteSpace: 'pre-line',
        padding: '0 4px',
      }}>
        {name}
      </div>

      {/* Emoji row */}
      {showEmoji && (
        <div style={{ position:'relative', zIndex:2, display:'flex', gap:10, marginTop:8 }}>
          {emojis.map((e, i) => <span key={i} style={{ fontSize:20, filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>{e}</span>)}
        </div>
      )}

      {/* Name tag */}
      {studentName && (
        <div style={{
          position:'relative', zIndex:2,
          marginTop:8,
          background:'rgba(0,0,0,0.2)',
          borderRadius:20, padding:'3px 14px',
          fontFamily:"'Nunito', sans-serif",
          fontSize:11, fontWeight:900,
          color:'rgba(255,255,255,0.95)',
          letterSpacing:0.3,
        }}>
          {studentName}{section ? ` · ${section}` : ''}
        </div>
      )}
    </div>
  )
})

/* ─────────────────────────────────────────
   BADGE — round sticker
───────────────────────────────────────── */
const BadgeCard = forwardRef(function BadgeCard(
  { subject, photo, cardBg, studentName, section, font, showEmoji, filterStyle }, ref
) {
  const { name, color, color2, emojis, icon } = subject
  const isLong = name.replace('\n','').length > 9

  return (
    <div ref={ref} style={{
      width: 240, height: 240,
      borderRadius: '50%',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '5px solid rgba(255,255,255,0.35)',
      flexShrink: 0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`radial-gradient(circle at 38% 30%, ${color}cc, ${color2})`} />

      <div style={{ position:'absolute', width:160, height:160, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.15)', top:-30, left:-30, zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)', bottom:10, right:10, zIndex:1, pointerEvents:'none' }}/>

      {/* Photo */}
      {photo && (
        <div style={{ position:'relative', zIndex:2, marginBottom:6 }}>
          <PhotoCircle photo={photo} icon={icon} size={80} />
        </div>
      )}

      {/* Name */}
      <div style={{
        position:'relative', zIndex:2,
        background:'rgba(255,255,255,0.18)', backdropFilter:'blur(4px)',
        borderRadius:30, padding:'4px 16px', textAlign:'center',
      }}>
        <div style={{
          fontFamily:`'${font}', cursive`,
          fontSize: isLong ? 16 : photo ? 20 : 26,
          color:'#fff',
          textShadow:'0 2px 6px rgba(0,0,0,0.35)',
          lineHeight:1.15, whiteSpace:'pre-line', letterSpacing:0.5,
          WebkitTextStroke: cardBg ? '1.5px rgba(0,0,0,0.5)' : 'none',
        }}>{name}</div>
      </div>

      {showEmoji && (
        <div style={{ position:'absolute', top:14, left:14, fontSize:14, opacity:0.85, zIndex:2 }}>{emojis[0]}</div>
      )}
      {showEmoji && (
        <div style={{ position:'absolute', top:14, right:14, fontSize:14, opacity:0.85, zIndex:2 }}>{emojis[1]}</div>
      )}
      {showEmoji && (
        <div style={{ position:'absolute', bottom:18, left:20, fontSize:12, opacity:0.75, zIndex:2 }}>{emojis[2]}</div>
      )}

      <div style={{ position:'absolute', top:'38%', left:10, color:'rgba(255,255,255,0.7)', fontSize:10, zIndex:2 }}>✦</div>
      <div style={{ position:'absolute', top:'25%', right:12, color:'rgba(255,255,255,0.6)', fontSize:8, zIndex:2 }}>✦</div>
    </div>
  )
})

/* ─────────────────────────────────────────
   BANNER — wide card with photo on left
───────────────────────────────────────── */
const BannerCard = forwardRef(function BannerCard(
  { subject, photo, cardBg, studentName, section, font, showEmoji, filterStyle }, ref
) {
  const { name, color, color2, emojis, icon } = subject
  const isLong = name.replace('\n','').length > 10

  return (
    <div ref={ref} style={{
      width: 320, height: 150,
      borderRadius: 24,
      position: 'relative',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
      filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)',
      flexShrink: 0,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} />
      <div style={{ position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.1)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', right:10, bottom:-40, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.08)', zIndex:1, pointerEvents:'none' }}/>

      <div style={{ width:120, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:2 }}>
        <PhotoCircle photo={photo} icon={icon} size={96} />
      </div>

      <div style={{ width:3, height:'60%', borderRadius:3, background:'rgba(255,255,255,0.3)', flexShrink:0, marginRight:14, zIndex:2 }}/>

      <div style={{ flex:1, zIndex:2, paddingRight:12 }}>
        <div style={{
          fontFamily:`'${font}', cursive`,
          fontSize: isLong ? 20 : 28,
          color:'#fff',
          textShadow:'0 2px 8px rgba(0,0,0,0.3)',
          lineHeight:1.1, whiteSpace:'pre-line', marginBottom:6,
          WebkitTextStroke: cardBg ? '2px rgba(0,0,0,0.5)' : 'none',
        }}>{name}</div>
        {showEmoji && (
          <div style={{ display:'flex', gap:6 }}>
            {emojis.map((e,i) => <span key={i} style={{ fontSize:18 }}>{e}</span>)}
          </div>
        )}
        {studentName && (
          <div style={{
            marginTop:6, background:'rgba(255,255,255,0.2)', borderRadius:20,
            padding:'2px 12px', display:'inline-block',
            fontFamily:"'Nunito', sans-serif", fontSize:11, fontWeight:900,
            color:'rgba(255,255,255,0.95)',
          }}>{studentName}{section ? ` · ${section}` : ''}</div>
        )}
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────
   PORTRAIT — tall card
───────────────────────────────────────── */
const PortraitCard = forwardRef(function PortraitCard(
  { subject, photo, cardBg, studentName, section, font, showEmoji, filterStyle }, ref
) {
  const { name, color, color2, emojis, icon } = subject
  const isLong = name.replace('\n','').length > 10

  return (
    <div ref={ref} style={{
      width: 200,
      borderRadius: 22,
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      filter: filterStyle,
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)',
      flexShrink: 0,
      paddingBottom: 16,
    }}>
      <BgLayer cardBg={cardBg} color={color} color2={color2} gradient={`linear-gradient(170deg, ${color}ee 0%, ${color2} 100%)`} />
      <div style={{ position:'absolute', top:60, left:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.07)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-20, right:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)', zIndex:1, pointerEvents:'none' }}/>

      <div style={{
        width:'100%', background:'rgba(0,0,0,0.18)',
        padding:'12px 10px 10px', textAlign:'center',
        position:'relative', zIndex:2, marginBottom:12,
      }}>
        <div style={{
          fontFamily:`'${font}', cursive`,
          fontSize: isLong ? 18 : 24,
          color:'#fff',
          textShadow:'0 2px 8px rgba(0,0,0,0.4)',
          lineHeight:1.15, whiteSpace:'pre-line', letterSpacing:0.5,
          WebkitTextStroke: cardBg ? '1.5px rgba(0,0,0,0.5)' : 'none',
        }}>{name}</div>
      </div>

      <div style={{ position:'relative', zIndex:2, marginBottom:10 }}>
        <PhotoCircle photo={photo} icon={icon} size={100} />
      </div>

      {showEmoji && (
        <div style={{ display:'flex', gap:8, marginBottom:8, zIndex:2, position:'relative' }}>
          {emojis.map((e,i) => <span key={i} style={{ fontSize:20 }}>{e}</span>)}
        </div>
      )}

      {studentName && (
        <div style={{
          background:'rgba(255,255,255,0.22)', backdropFilter:'blur(4px)',
          borderRadius:20, padding:'4px 16px', zIndex:2, position:'relative',
          textAlign:'center', maxWidth:'85%',
        }}>
          <div style={{
            fontFamily:"'Nunito', sans-serif", fontSize:11, fontWeight:900,
            color:'rgba(255,255,255,0.95)', lineHeight:1.3,
          }}>
            {studentName}
            {section && <><br/><span style={{ opacity:0.8 }}>{section}</span></>}
          </div>
        </div>
      )}

      <div style={{ position:'absolute', top:70, right:14, color:'rgba(255,255,255,0.65)', fontSize:11, zIndex:2 }}>✦</div>
      <div style={{ position:'absolute', bottom:50, left:14, color:'rgba(255,255,255,0.55)', fontSize:9, zIndex:2 }}>✦</div>
    </div>
  )
})

export default SubjectCard
