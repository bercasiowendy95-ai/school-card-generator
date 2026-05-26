import { forwardRef } from 'react'

const SubjectCard = forwardRef(function SubjectCard(
  { subject, photo, studentName, section, template, colorTheme },
  ref
) {
  const filterStyle = {
    vivid:   'saturate(1.2)',
    pastel:  'saturate(0.55) brightness(1.18)',
    dark:    'saturate(1.1) brightness(0.82)',
  }[colorTheme] || 'none'

  if (template === 'badge') return <BadgeCard ref={ref} subject={subject} photo={photo} studentName={studentName} section={section} filterStyle={filterStyle} />
  if (template === 'banner') return <BannerCard ref={ref} subject={subject} photo={photo} studentName={studentName} section={section} filterStyle={filterStyle} />
  return <PortraitCard ref={ref} subject={subject} photo={photo} studentName={studentName} section={section} filterStyle={filterStyle} />
})

/* ── Badge / Round Sticker ── */
const BadgeCard = forwardRef(function BadgeCard({ subject, photo, studentName, section, filterStyle }, ref) {
  const { name, color, color2, emojis, icon } = subject
  return (
    <div ref={ref} style={{
      width: 240, height: 240,
      borderRadius: '50%',
      background: `radial-gradient(circle at 38% 30%, ${color}cc, ${color2})`,
      filter: filterStyle,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: `0 8px 28px ${color}66`,
      border: '5px solid rgba(255,255,255,0.35)',
      flexShrink: 0,
    }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', width:160, height:160, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.15)', top:-30, left:-30, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.08)', bottom:10, right:10, pointerEvents:'none' }} />

      {/* Photo */}
      <div style={{ position:'relative', zIndex:2, marginBottom: 6 }}>
        {photo ? (
          <img src={photo} crossOrigin="anonymous" style={{
            width: 88, height: 88, borderRadius:'50%', objectFit:'cover',
            border:'4px solid rgba(255,255,255,0.9)',
            boxShadow:'0 3px 12px rgba(0,0,0,0.25)',
            display:'block',
          }} />
        ) : (
          <div style={{
            width:88, height:88, borderRadius:'50%',
            background:'rgba(255,255,255,0.25)',
            border:'4px solid rgba(255,255,255,0.9)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'2.2rem',
          }}>{icon}</div>
        )}
      </div>

      {/* Subject name banner */}
      <div style={{
        position:'relative', zIndex:2,
        background:'rgba(255,255,255,0.22)',
        backdropFilter:'blur(4px)',
        borderRadius:30,
        padding:'4px 18px',
        textAlign:'center',
      }}>
        <div style={{
          fontFamily:"'Fredoka One', cursive",
          fontSize: name.length > 9 ? 16 : 22,
          color:'#fff',
          textShadow:'0 2px 6px rgba(0,0,0,0.35)',
          lineHeight:1.15,
          whiteSpace:'pre-line',
          letterSpacing:0.5,
        }}>{name}</div>
      </div>

      {/* Emoji decorations */}
      <div style={{ position:'absolute', top:14, left:14, fontSize:14, opacity:0.85 }}>{emojis[0]}</div>
      <div style={{ position:'absolute', top:14, right:14, fontSize:14, opacity:0.85 }}>{emojis[1]}</div>
      <div style={{ position:'absolute', bottom:18, left:20, fontSize:12, opacity:0.75 }}>{emojis[2]}</div>

      {/* Sparkles */}
      <div style={{ position:'absolute', top:'38%', left:10, color:'rgba(255,255,255,0.7)', fontSize:10 }}>✦</div>
      <div style={{ position:'absolute', top:'25%', right:12, color:'rgba(255,255,255,0.6)', fontSize:8 }}>✦</div>
      <div style={{ position:'absolute', bottom:30, right:22, color:'rgba(255,255,255,0.55)', fontSize:11 }}>✦</div>
    </div>
  )
})

/* ── Banner / Wide Card ── */
const BannerCard = forwardRef(function BannerCard({ subject, photo, studentName, section, filterStyle }, ref) {
  const { name, color, color2, emojis, icon } = subject
  return (
    <div ref={ref} style={{
      width: 320, height: 150,
      borderRadius: 24,
      background: `linear-gradient(135deg, ${color} 0%, ${color2} 100%)`,
      filter: filterStyle,
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)',
      flexShrink: 0,
    }}>
      {/* Decorative wave on right */}
      <div style={{
        position:'absolute', right:-30, top:-30,
        width:140, height:140,
        borderRadius:'50%',
        background:'rgba(255,255,255,0.1)',
        pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute', right:10, bottom:-40,
        width:100, height:100,
        borderRadius:'50%',
        background:'rgba(255,255,255,0.08)',
        pointerEvents:'none',
      }}/>

      {/* Photo section */}
      <div style={{
        width:120,
        display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink:0, position:'relative', zIndex:2,
      }}>
        {photo ? (
          <img src={photo} crossOrigin="anonymous" style={{
            width:96, height:96, borderRadius:'50%', objectFit:'cover',
            border:'4px solid rgba(255,255,255,0.9)',
            boxShadow:'0 3px 14px rgba(0,0,0,0.25)',
          }}/>
        ) : (
          <div style={{
            width:96, height:96, borderRadius:'50%',
            background:'rgba(255,255,255,0.25)',
            border:'4px solid rgba(255,255,255,0.9)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'2.5rem',
          }}>{icon}</div>
        )}
      </div>

      {/* Divider */}
      <div style={{
        width:3, height:'60%', borderRadius:3,
        background:'rgba(255,255,255,0.3)',
        flexShrink:0, marginRight:14,
      }}/>

      {/* Subject name + info */}
      <div style={{ flex:1, zIndex:2, paddingRight:12 }}>
        <div style={{
          fontFamily:"'Fredoka One', cursive",
          fontSize: name.length > 10 ? 20 : 28,
          color:'#fff',
          textShadow:'0 2px 8px rgba(0,0,0,0.3)',
          lineHeight:1.1,
          whiteSpace:'pre-line',
          marginBottom:6,
        }}>{name}</div>
        <div style={{ display:'flex', gap:6 }}>
          {emojis.map((e,i) => <span key={i} style={{ fontSize:18 }}>{e}</span>)}
        </div>
        {studentName && (
          <div style={{
            marginTop:6,
            background:'rgba(255,255,255,0.2)',
            borderRadius:20,
            padding:'2px 12px',
            display:'inline-block',
            fontFamily:"'Nunito', sans-serif",
            fontSize:11,
            fontWeight:900,
            color:'rgba(255,255,255,0.95)',
            letterSpacing:0.3,
          }}>{studentName}{section ? ` · ${section}` : ''}</div>
        )}
      </div>
    </div>
  )
})

/* ── Portrait / Tall Card ── */
const PortraitCard = forwardRef(function PortraitCard({ subject, photo, studentName, section, filterStyle }, ref) {
  const { name, color, color2, emojis, icon } = subject
  return (
    <div ref={ref} style={{
      width: 200,
      borderRadius: 22,
      background: `linear-gradient(170deg, ${color}ee 0%, ${color2} 100%)`,
      filter: filterStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: `0 8px 28px ${color}66`,
      border: '4px solid rgba(255,255,255,0.3)',
      flexShrink: 0,
      paddingBottom: 16,
    }}>
      {/* Top subject name banner */}
      <div style={{
        width:'100%',
        background:'rgba(0,0,0,0.18)',
        padding:'12px 10px 10px',
        textAlign:'center',
        position:'relative',
        zIndex:2,
        marginBottom:12,
      }}>
        <div style={{
          fontFamily:"'Fredoka One', cursive",
          fontSize: name.length > 10 ? 18 : 24,
          color:'#fff',
          textShadow:'0 2px 8px rgba(0,0,0,0.4)',
          lineHeight:1.15,
          whiteSpace:'pre-line',
          letterSpacing:0.5,
        }}>{name}</div>
      </div>

      {/* Decorative bg elements */}
      <div style={{ position:'absolute', top:60, left:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-20, right:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>

      {/* Photo */}
      <div style={{ position:'relative', zIndex:2, marginBottom:10 }}>
        {photo ? (
          <img src={photo} crossOrigin="anonymous" style={{
            width:100, height:100, borderRadius:'50%', objectFit:'cover',
            border:'4px solid rgba(255,255,255,0.9)',
            boxShadow:'0 4px 16px rgba(0,0,0,0.28)',
          }}/>
        ) : (
          <div style={{
            width:100, height:100, borderRadius:'50%',
            background:'rgba(255,255,255,0.25)',
            border:'4px solid rgba(255,255,255,0.9)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'2.8rem',
          }}>{icon}</div>
        )}
      </div>

      {/* Emojis row */}
      <div style={{ display:'flex', gap:8, marginBottom:8, zIndex:2 }}>
        {emojis.map((e,i) => <span key={i} style={{ fontSize:20 }}>{e}</span>)}
      </div>

      {/* Name tag */}
      {studentName && (
        <div style={{
          background:'rgba(255,255,255,0.22)',
          backdropFilter:'blur(4px)',
          borderRadius:20,
          padding:'4px 16px',
          zIndex:2,
          textAlign:'center',
          maxWidth:'85%',
        }}>
          <div style={{
            fontFamily:"'Nunito', sans-serif",
            fontSize:11,
            fontWeight:900,
            color:'rgba(255,255,255,0.95)',
            lineHeight:1.3,
          }}>
            {studentName}
            {section && <><br/><span style={{ opacity:0.8 }}>{section}</span></>}
          </div>
        </div>
      )}

      {/* Corner sparkles */}
      <div style={{ position:'absolute', top:70, right:14, color:'rgba(255,255,255,0.65)', fontSize:11, zIndex:2 }}>✦</div>
      <div style={{ position:'absolute', bottom:50, left:14, color:'rgba(255,255,255,0.55)', fontSize:9, zIndex:2 }}>✦</div>
    </div>
  )
})

export default SubjectCard
