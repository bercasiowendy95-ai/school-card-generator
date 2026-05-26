import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import SubjectCard from './SubjectCard'
import './App.css'

export const SUBJECTS = [
  { id: 'math',       name: 'Math',             icon: '📐', color: '#ff6b35', color2: '#ff4500', emojis: ['➕','✖️','📏'] },
  { id: 'english',    name: 'English',           icon: '📖', color: '#00b4d8', color2: '#0077b6', emojis: ['✏️','📚','🔤'] },
  { id: 'filipino',   name: 'Filipino',          icon: '🇵🇭', color: '#e63946', color2: '#b5121b', emojis: ['🇵🇭','📜','✍️'] },
  { id: 'science',    name: 'Science',           icon: '🔬', color: '#06d6a0', color2: '#028a60', emojis: ['💡','⚗️','🧪'] },
  { id: 'mapeh',      name: 'MAPEH',             icon: '🎵', color: '#8338ec', color2: '#5a00cc', emojis: ['⚽','🎨','🎶'] },
  { id: 'gmrc',       name: 'GMRC',              icon: '❤️', color: '#ff006e', color2: '#c8005a', emojis: ['🤝','😊','🌟'] },
  { id: 'ap',         name: 'AP',                icon: '🌏', color: '#fb5607', color2: '#c43e00', emojis: ['🗺️','🏛️','📊'] },
  { id: 'epp',        name: 'EPP',               icon: '🌱', color: '#2dc653', color2: '#1a8c35', emojis: ['🔧','🍳','✂️'] },
  { id: 'esp',        name: 'E.S.P.',            icon: '✨', color: '#ff9f1c', color2: '#e07800', emojis: ['🙏','💝','🌸'] },
  { id: 'tle',        name: 'T.L.E.',            icon: '⚙️', color: '#3a86ff', color2: '#1a5fd4', emojis: ['💼','🌿','🔨'] },
  { id: 'values',     name: 'Values',            icon: '🕊️', color: '#f72585', color2: '#b5006a', emojis: ['💖','🌈','⭐'] },
  { id: 'araling',    name: 'Araling\nPanlipunan', icon: '🌏', color: '#4361ee', color2: '#2940c4', emojis: ['🗺️','🏛️','🇵🇭'] },
  { id: 'assignment', name: 'Assignment\nNotebook', icon: '📓', color: '#7209b7', color2: '#4a0080', emojis: ['📝','✏️','📋'] },
  { id: 'writing',    name: 'Writing\nNotebook', icon: '🖊️', color: '#e9c46a', color2: '#c49a20', emojis: ['📒','🖊️','✍️'] },
  { id: 'mathematics',name: 'Mathematics',       icon: '🔢', color: '#2196f3', color2: '#1565c0', emojis: ['➕','📐','🔢'] },
]

export const TEMPLATES = [
  { id: 'badge',    name: 'Badge',    desc: 'Round sticker' },
  { id: 'label',    name: 'Label',    desc: 'Bold banner' },
  { id: 'banner',   name: 'Banner',   desc: 'Wide + photo' },
  { id: 'portrait', name: 'Portrait', desc: 'Tall card' },
]

export const FONTS = [
  { id: 'Fredoka One',  name: 'Fredoka', preview: 'Rounded' },
  { id: 'Bangers',      name: 'Bangers', preview: 'Comic' },
  { id: 'Lilita One',   name: 'Lilita',  preview: 'Bold' },
  { id: 'Pacifico',     name: 'Pacifico',preview: 'Cursive' },
  { id: 'Boogaloo',     name: 'Boogaloo',preview: 'Casual' },
  { id: 'Titan One',    name: 'Titan',   preview: 'Heavy' },
]

const THEMES = [
  { id: 'vivid',   name: 'Vivid',   style: 'saturate(1.2)' },
  { id: 'pastel',  name: 'Pastel',  style: 'saturate(0.55) brightness(1.18)' },
  { id: 'dark',    name: 'Bold',    style: 'saturate(1.1) brightness(0.82)' },
]

const SIZES = [
  { id: 'sm',  name: 'Small',  scale: 0.72 },
  { id: 'md',  name: 'Medium', scale: 1 },
  { id: 'lg',  name: 'Large',  scale: 1.35 },
]

export default function App() {
  const [photo, setPhoto] = useState(null)
  const [cardBg, setCardBg] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [section, setSection] = useState('')
  const [selected, setSelected] = useState(SUBJECTS.map(s => s.id))
  const [template, setTemplate] = useState('badge')
  const [colorTheme, setColorTheme] = useState('vivid')
  const [font, setFont] = useState('Fredoka One')
  const [cardSize, setCardSize] = useState('md')
  const [showEmoji, setShowEmoji] = useState(true)
  const [showPhoto, setShowPhoto] = useState(true)
  const [customSubjects, setCustomSubjects] = useState([])
  const [customName, setCustomName] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [dragOverBg, setDragOverBg] = useState(false)
  const [downloading, setDownloading] = useState(null)

  const cardRefs = useRef({})
  const allSubjects = [...SUBJECTS, ...customSubjects]
  const activeSubjects = allSubjects.filter(s => selected.includes(s.id))
  const scale = SIZES.find(s => s.id === cardSize)?.scale || 1

  const handleFileRead = useCallback((file, setter) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setter(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const toggleSubject = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const addCustom = () => {
    const name = customName.trim()
    if (!name) return
    const COLORS = ['#e76f51','#264653','#2a9d8f','#e9c46a','#f4a261','#457b9d']
    const id = 'custom_' + Date.now()
    const color = COLORS[customSubjects.length % COLORS.length]
    setCustomSubjects(prev => [...prev, { id, name, icon: '⭐', color, color2: color, emojis: ['⭐','📌','✏️'] }])
    setSelected(prev => [...prev, id])
    setCustomName('')
  }

  const downloadCard = async (subjId) => {
    const el = cardRefs.current[subjId]
    if (!el) return
    setDownloading(subjId)
    try {
      const canvas = await html2canvas(el, { scale: 3, useCORS: true, allowTaint: true, backgroundColor: null, logging: false })
      const link = document.createElement('a')
      const subj = allSubjects.find(s => s.id === subjId)
      link.download = `${subj?.name.replace(/\n/g, '-') || subjId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch(e) { console.error(e) }
    setDownloading(null)
  }

  const downloadAll = async () => {
    for (const s of activeSubjects) {
      await downloadCard(s.id)
      await new Promise(r => setTimeout(r, 350))
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎒 School Card Maker</h1>
        <p>Generate personalized subject cards for your child — one card per subject!</p>
      </div>

      <div className="sidebar-layout">
        {/* ─── Sidebar ─── */}
        <aside className="sidebar">

          {/* Student Info */}
          <div className="panel">
            <h2>📸 Student Info</h2>
            <UploadZone
              label="Child's Photo"
              value={photo}
              dragOver={dragOver}
              onDragOver={() => setDragOver(true)}
              onDragLeave={() => setDragOver(false)}
              onDrop={f => { setDragOver(false); handleFileRead(f, setPhoto) }}
              onChange={f => handleFileRead(f, setPhoto)}
              onClear={() => setPhoto(null)}
              placeholder="🖼️"
              hint="Appears on each card"
            />
            <label>Student's Full Name</label>
            <input type="text" placeholder="e.g. Keiszyn Viatrix B. Pava" value={studentName} onChange={e => setStudentName(e.target.value)} />
            <label>Section / Class</label>
            <input type="text" placeholder="e.g. Goodness" value={section} onChange={e => setSection(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          {/* Design */}
          <div className="panel">
            <h2>🎨 Card Design</h2>

            {/* Template */}
            <label>Style</label>
            <div className="template-grid">
              {TEMPLATES.map(t => (
                <div key={t.id} className={`template-item${template === t.id ? ' active' : ''}`} onClick={() => setTemplate(t.id)}>
                  <div className="template-preview">
                    {t.id === 'badge'    && <div style={{ width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,#ff6b35,#ff006e)',margin:'0 auto' }}/>}
                    {t.id === 'label'    && <div style={{ width:52,height:26,borderRadius:6,background:'linear-gradient(135deg,#e63946,#ffbe0b)',border:'2px solid #333' }}/>}
                    {t.id === 'banner'   && <div style={{ width:52,height:28,borderRadius:6,background:'linear-gradient(135deg,#00b4d8,#8338ec)' }}/>}
                    {t.id === 'portrait' && <div style={{ width:30,height:42,borderRadius:6,background:'linear-gradient(170deg,#06d6a0,#3a86ff)' }}/>}
                  </div>
                  <div className="template-name">{t.name}</div>
                  <div className="template-desc">{t.desc}</div>
                </div>
              ))}
            </div>

            {/* Custom background */}
            <label style={{ marginTop: 10 }}>Custom Card Background <span style={{ color:'#bbb', fontWeight:600, textTransform:'none' }}>(optional)</span></label>
            <UploadZone
              value={cardBg}
              dragOver={dragOverBg}
              onDragOver={() => setDragOverBg(true)}
              onDragLeave={() => setDragOverBg(false)}
              onDrop={f => { setDragOverBg(false); handleFileRead(f, setCardBg) }}
              onChange={f => handleFileRead(f, setCardBg)}
              onClear={() => setCardBg(null)}
              placeholder="🖼️"
              hint="Upload your own design as background"
              compact
            />

            {/* Font */}
            <label style={{ marginTop: 10 }}>Font</label>
            <div className="font-grid">
              {FONTS.map(f => (
                <div key={f.id} className={`font-item${font === f.id ? ' active' : ''}`} onClick={() => setFont(f.id)}>
                  <span style={{ fontFamily: f.id, fontSize: '1.1rem' }}>Aa</span>
                  <span className="font-label">{f.name}</span>
                </div>
              ))}
            </div>

            {/* Color tone */}
            <label style={{ marginTop: 10 }}>Color Tone</label>
            <div className="tone-row">
              {THEMES.map(th => (
                <button key={th.id} className={`tone-btn${colorTheme === th.id ? ' active' : ''}`} onClick={() => setColorTheme(th.id)}>
                  {th.name}
                </button>
              ))}
            </div>

            {/* Size */}
            <label style={{ marginTop: 10 }}>Card Size</label>
            <div className="tone-row">
              {SIZES.map(s => (
                <button key={s.id} className={`tone-btn${cardSize === s.id ? ' active' : ''}`} onClick={() => setCardSize(s.id)}>
                  {s.name}
                </button>
              ))}
            </div>

            {/* Toggles */}
            <div className="toggle-row" style={{ marginTop: 14 }}>
              <Toggle label="Show Emojis" value={showEmoji} onChange={setShowEmoji} />
              <Toggle label="Show Photo" value={showPhoto} onChange={setShowPhoto} />
            </div>
          </div>

          {/* Subjects */}
          <div className="panel">
            <h2>📖 Subjects</h2>
            <div className="subj-actions">
              <button className="btn-tiny" onClick={() => setSelected(allSubjects.map(s => s.id))}>All</button>
              <button className="btn-tiny outline" onClick={() => setSelected([])}>Clear</button>
              <span className="subj-count">{selected.length} selected</span>
            </div>
            <div className="subject-list">
              {allSubjects.map(s => (
                <label key={s.id} className={`subj-check${selected.includes(s.id) ? ' checked' : ''}`}>
                  <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSubject(s.id)} />
                  <span className="subj-dot" style={{ background: s.color }} />
                  <span className="subj-icon-sm">{s.icon}</span>
                  {s.name.replace('\n', ' ')}
                </label>
              ))}
            </div>
            <div className="add-subject" style={{ marginTop: 10 }}>
              <input type="text" placeholder="Add custom subject..." value={customName} onChange={e => setCustomName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustom()} />
              <button className="btn-sm" onClick={addCustom}>+ Add</button>
            </div>
          </div>

        </aside>

        {/* ─── Cards grid ─── */}
        <main className="cards-area">
          <div className="cards-header">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", color: '#4a2dad', fontSize: '1.2rem' }}>
              🖼️ {activeSubjects.length} Card{activeSubjects.length !== 1 ? 's' : ''}
            </h2>
            {activeSubjects.length > 0 && (
              <button className="btn-primary" onClick={downloadAll}>⬇️ Download All</button>
            )}
          </div>

          {activeSubjects.length === 0 ? (
            <div className="empty-state">
              <div className="big-icon">🎨</div>
              <p>Select at least one subject to generate cards</p>
            </div>
          ) : (
            <div className="cards-grid">
              {activeSubjects.map(subj => (
                <div key={subj.id} className="card-wrapper">
                  <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
                    <SubjectCard
                      ref={el => cardRefs.current[subj.id] = el}
                      subject={subj}
                      photo={showPhoto ? photo : null}
                      cardBg={cardBg}
                      studentName={studentName}
                      section={section}
                      template={template}
                      colorTheme={colorTheme}
                      font={font}
                      showEmoji={showEmoji}
                    />
                  </div>
                  {/* spacer so button doesn't overlap scaled card */}
                  <div style={{ height: getScaleOffset(template, scale) }} />
                  <button className="dl-btn" onClick={() => downloadCard(subj.id)} disabled={downloading === subj.id}>
                    {downloading === subj.id ? '⏳' : '⬇️'} Save
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function getScaleOffset(template, scale) {
  const baseH = { badge: 240, label: 140, banner: 150, portrait: 280 }[template] || 240
  return Math.max(0, baseH * (scale - 1)) + 'px'
}

/* ── Reusable upload zone ── */
function UploadZone({ value, dragOver, onDragOver, onDragLeave, onDrop, onChange, onClear, placeholder, hint, compact }) {
  return (
    <div
      className={`upload-zone${dragOver ? ' drag-over' : ''}${compact ? ' compact' : ''}`}
      onDragOver={e => { e.preventDefault(); onDragOver() }}
      onDragLeave={onDragLeave}
      onDrop={e => { e.preventDefault(); onDrop(e.dataTransfer.files[0]) }}
      style={{ marginBottom: 10 }}
    >
      <input type="file" accept="image/*" onChange={e => onChange(e.target.files[0])} />
      {value ? (
        <>
          <img src={value} className={compact ? 'preview-img-sm' : 'preview-img'} alt="preview" />
          <p style={{ fontSize: '0.75rem' }}>Click to change &nbsp;
            <span style={{ color:'#e63946', cursor:'pointer', fontWeight:900 }} onClick={e => { e.stopPropagation(); onClear() }}>✕ Remove</span>
          </p>
        </>
      ) : (
        <>
          <span className="upload-icon" style={{ fontSize: compact ? '1.5rem' : '2.2rem' }}>{placeholder}</span>
          <p>{hint}</p>
        </>
      )}
    </div>
  )
}

/* ── Toggle switch ── */
function Toggle({ label, value, onChange }) {
  return (
    <div className="toggle-item" onClick={() => onChange(!value)}>
      <span className="toggle-label">{label}</span>
      <div className={`toggle-switch${value ? ' on' : ''}`}>
        <div className="toggle-knob" />
      </div>
    </div>
  )
}
