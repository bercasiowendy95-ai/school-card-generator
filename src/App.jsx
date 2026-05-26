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
  { id: 'values',     name: 'Values Ed',         icon: '🕊️', color: '#f72585', color2: '#b5006a', emojis: ['💖','🌈','⭐'] },
  { id: 'assignment', name: 'Assignment\nNotebook', icon: '📓', color: '#7209b7', color2: '#4a0080', emojis: ['📝','✏️','📋'] },
  { id: 'writing',    name: 'Writing\nNotebook', icon: '🖊️', color: '#4361ee', color2: '#2940c4', emojis: ['📒','🖊️','✍️'] },
  { id: 'reading',    name: 'Reading',           icon: '📰', color: '#e9c46a', color2: '#c49a20', emojis: ['📰','👁️','📖'] },
]

const TEMPLATES = [
  { id: 'badge',    name: 'Badge',    desc: 'Round sticker style' },
  { id: 'banner',   name: 'Banner',   desc: 'Wide card with photo' },
  { id: 'portrait', name: 'Portrait', desc: 'Tall label card' },
]

const THEMES = [
  { id: 'vivid',   name: 'Vivid',   style: 'saturate(1.2)' },
  { id: 'pastel',  name: 'Pastel',  style: 'saturate(0.6) brightness(1.15)' },
  { id: 'dark',    name: 'Bold',    style: 'saturate(1.1) brightness(0.85)' },
]

export default function App() {
  const [photo, setPhoto] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [section, setSection] = useState('')
  const [selected, setSelected] = useState(SUBJECTS.map(s => s.id))
  const [template, setTemplate] = useState('badge')
  const [colorTheme, setColorTheme] = useState('vivid')
  const [customName, setCustomName] = useState('')
  const [customSubjects, setCustomSubjects] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [downloading, setDownloading] = useState(null)

  const cardRefs = useRef({})

  const allSubjects = [...SUBJECTS, ...customSubjects]
  const activeSubjects = allSubjects.filter(s => selected.includes(s.id))

  const handlePhotoChange = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setPhoto(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const toggleSubject = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const selectAll = () => setSelected(allSubjects.map(s => s.id))
  const clearAll = () => setSelected([])

  const addCustom = () => {
    const name = customName.trim()
    if (!name) return
    const COLORS = ['#e76f51','#264653','#2a9d8f','#e9c46a','#f4a261','#457b9d','#a8dadc']
    const id = 'custom_' + Date.now()
    const color = COLORS[customSubjects.length % COLORS.length]
    const newSubj = { id, name, icon: '⭐', color, color2: color, emojis: ['⭐','📌','✏️'] }
    setCustomSubjects(prev => [...prev, newSubj])
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
      link.download = `${subj?.name.replace(/\n/g, '-') || subjId}-card.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch(e) { console.error(e) }
    setDownloading(null)
  }

  const downloadAll = async () => {
    for (const s of activeSubjects) {
      await downloadCard(s.id)
      await new Promise(r => setTimeout(r, 300))
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎒 School Card Maker</h1>
        <p>Generate personalized subject cards for your child — one card per subject!</p>
      </div>

      <div className="sidebar-layout">
        {/* ─── Sidebar Controls ─── */}
        <aside className="sidebar">

          {/* Photo + Info */}
          <div className="panel">
            <h2>📸 Student Info</h2>
            <div
              className={`upload-zone${dragOver ? ' drag-over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handlePhotoChange(e.dataTransfer.files[0]) }}
            >
              <input type="file" accept="image/*" onChange={e => handlePhotoChange(e.target.files[0])} />
              {photo ? (
                <><img src={photo} className="preview-img" alt="Student" /><p>Click to change photo</p></>
              ) : (
                <><span className="upload-icon">🖼️</span><p>Click or drag photo here</p></>
              )}
            </div>
            <label>Student's Full Name</label>
            <input type="text" placeholder="e.g. Keiszyn Viatrix B. Pava" value={studentName} onChange={e => setStudentName(e.target.value)} />
            <label>Section / Class</label>
            <input type="text" placeholder="e.g. Goodness" value={section} onChange={e => setSection(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          {/* Template */}
          <div className="panel">
            <h2>🎨 Card Style</h2>
            <div className="template-grid">
              {TEMPLATES.map(t => (
                <div key={t.id} className={`template-item${template === t.id ? ' active' : ''}`} onClick={() => setTemplate(t.id)}>
                  <div className="template-preview">
                    {t.id === 'badge' && <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#ff6b35,#ff006e)', margin: '0 auto' }} />}
                    {t.id === 'banner' && <div style={{ width: 52, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00b4d8,#8338ec)' }} />}
                    {t.id === 'portrait' && <div style={{ width: 30, height: 42, borderRadius: 6, background: 'linear-gradient(170deg,#06d6a0,#3a86ff)' }} />}
                  </div>
                  <div className="template-name">{t.name}</div>
                  <div className="template-desc">{t.desc}</div>
                </div>
              ))}
            </div>

            <label style={{ marginTop: 12 }}>Color Tone</label>
            <div className="tone-row">
              {THEMES.map(th => (
                <button key={th.id} className={`tone-btn${colorTheme === th.id ? ' active' : ''}`} onClick={() => setColorTheme(th.id)}>
                  {th.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="panel">
            <h2>📖 Subjects</h2>
            <div className="subj-actions">
              <button className="btn-tiny" onClick={selectAll}>Select All</button>
              <button className="btn-tiny outline" onClick={clearAll}>Clear</button>
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

        {/* ─── Card Grid ─── */}
        <main className="cards-area">
          <div className="cards-header">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", color: '#4a2dad', fontSize: '1.2rem' }}>
              🖼️ {activeSubjects.length} Card{activeSubjects.length !== 1 ? 's' : ''} Generated
            </h2>
            {activeSubjects.length > 0 && (
              <button className="btn-primary" onClick={downloadAll}>
                ⬇️ Download All
              </button>
            )}
          </div>

          {activeSubjects.length === 0 ? (
            <div className="empty-state">
              <div className="big-icon">🎨</div>
              <p>Select at least one subject to generate cards</p>
            </div>
          ) : (
            <div className={`cards-grid template-${template}`}>
              {activeSubjects.map(subj => (
                <div key={subj.id} className="card-wrapper">
                  <SubjectCard
                    ref={el => cardRefs.current[subj.id] = el}
                    subject={subj}
                    photo={photo}
                    studentName={studentName}
                    section={section}
                    template={template}
                    colorTheme={colorTheme}
                  />
                  <button
                    className="dl-btn"
                    onClick={() => downloadCard(subj.id)}
                    disabled={downloading === subj.id}
                  >
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
