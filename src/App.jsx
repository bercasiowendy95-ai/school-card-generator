import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import SubjectCard from './SubjectCard'
import './App.css'

export const SUBJECTS = [
  {
    id: 'math', name: 'Math', icon: '📐', color: '#ff6b35', color2: '#ff4500',
    themes: [
      { name: 'General',   emojis: ['➕','✖️','📏'] },
      { name: 'Shapes',    emojis: ['📐','🔷','🔺'] },
      { name: 'Numbers',   emojis: ['🔢','💯','🧮'] },
      { name: 'Fractions', emojis: ['½','📊','🎯'] },
    ],
  },
  {
    id: 'english', name: 'English', icon: '📖', color: '#00b4d8', color2: '#0077b6',
    themes: [
      { name: 'General', emojis: ['📖','✏️','🔤'] },
      { name: 'Reading', emojis: ['📚','👁️','📰'] },
      { name: 'Writing', emojis: ['✏️','📝','🖊️'] },
      { name: 'Grammar', emojis: ['🅰️','📜','💬'] },
    ],
  },
  {
    id: 'filipino', name: 'Filipino', icon: '🇵🇭', color: '#e63946', color2: '#b5121b',
    themes: [
      { name: 'General',    emojis: ['🇵🇭','📜','✍️'] },
      { name: 'Pagbabasa', emojis: ['📖','👁️','📚'] },
      { name: 'Pagsulat',  emojis: ['✍️','📝','🖊️'] },
      { name: 'Gramatika', emojis: ['📜','🔤','💬'] },
    ],
  },
  {
    id: 'science', name: 'Science', icon: '🔬', color: '#06d6a0', color2: '#028a60',
    themes: [
      { name: 'General', emojis: ['🔬','💡','⚗️'] },
      { name: 'Biology', emojis: ['🌱','🦋','🧬'] },
      { name: 'Physics', emojis: ['⚡','🔭','💫'] },
      { name: 'Chemistry', emojis: ['🧪','⚗️','🔥'] },
    ],
  },
  {
    id: 'mapeh', name: 'MAPEH', icon: '🎵', color: '#8338ec', color2: '#5a00cc',
    themes: [
      { name: 'General', emojis: ['⚽','🎨','🎶'] },
      { name: 'Music',   emojis: ['🎵','🎶','🎸'] },
      { name: 'Arts',    emojis: ['🎨','🖌️','✏️'] },
      { name: 'P.E.',    emojis: ['⚽','🏃','🏅'] },
    ],
  },
  {
    id: 'gmrc', name: 'GMRC', icon: '❤️', color: '#ff006e', color2: '#c8005a',
    themes: [
      { name: 'General',  emojis: ['🤝','😊','🌟'] },
      { name: 'Values',   emojis: ['❤️','🙏','💝'] },
      { name: 'Manners',  emojis: ['😊','🤲','🌸'] },
    ],
  },
  {
    id: 'ap', name: 'AP', icon: '🌏', color: '#fb5607', color2: '#c43e00',
    themes: [
      { name: 'General',   emojis: ['🗺️','🏛️','📊'] },
      { name: 'History',   emojis: ['🏛️','📜','⚔️'] },
      { name: 'Geography', emojis: ['🌏','🗺️','🧭'] },
    ],
  },
  {
    id: 'epp', name: 'EPP', icon: '🌱', color: '#2dc653', color2: '#1a8c35',
    themes: [
      { name: 'General',  emojis: ['🔧','🍳','✂️'] },
      { name: 'Cooking',  emojis: ['🍳','🥗','🍴'] },
      { name: 'Gardening',emojis: ['🌱','🌻','🪴'] },
    ],
  },
  {
    id: 'esp', name: 'E.S.P.', icon: '✨', color: '#ff9f1c', color2: '#e07800',
    themes: [
      { name: 'General', emojis: ['🙏','💝','🌸'] },
      { name: 'Ethics',  emojis: ['⚖️','💡','🌟'] },
    ],
  },
  {
    id: 'tle', name: 'T.L.E.', icon: '⚙️', color: '#3a86ff', color2: '#1a5fd4',
    themes: [
      { name: 'General', emojis: ['💼','🌿','🔨'] },
      { name: 'Tech',    emojis: ['💻','⚙️','🔧'] },
    ],
  },
  {
    id: 'values', name: 'Values', icon: '🕊️', color: '#f72585', color2: '#b5006a',
    themes: [
      { name: 'General', emojis: ['💖','🌈','⭐'] },
      { name: 'Faith',   emojis: ['🙏','🕊️','💫'] },
    ],
  },
  {
    id: 'araling', name: 'Araling\nPanlipunan', icon: '🌏', color: '#4361ee', color2: '#2940c4',
    themes: [
      { name: 'General',   emojis: ['🗺️','🏛️','🇵🇭'] },
      { name: 'Kasaysayan',emojis: ['📜','⚔️','🏛️'] },
    ],
  },
  {
    id: 'mathematics', name: 'Mathematics', icon: '🔢', color: '#2196f3', color2: '#1565c0',
    themes: [
      { name: 'General',  emojis: ['➕','📐','🔢'] },
      { name: 'Algebra',  emojis: ['🔣','📊','🧮'] },
      { name: 'Geometry', emojis: ['📐','🔷','△'] },
    ],
  },
  {
    id: 'assignment', name: 'Assignment\nNotebook', icon: '📓', color: '#7209b7', color2: '#4a0080',
    themes: [
      { name: 'General', emojis: ['📝','✏️','📋'] },
    ],
  },
  {
    id: 'writing', name: 'Writing\nNotebook', icon: '🖊️', color: '#e9c46a', color2: '#c49a20',
    themes: [
      { name: 'General', emojis: ['📒','🖊️','✍️'] },
    ],
  },
]

export const TEMPLATES = [
  { id: 'badge',    name: 'Badge',    desc: 'Round sticker' },
  { id: 'label',    name: 'Label',    desc: 'Bold banner' },
  { id: 'banner',   name: 'Banner',   desc: 'Wide + photo' },
  { id: 'portrait', name: 'Portrait', desc: 'Tall card' },
]

export const FONTS = [
  { id: 'Fredoka One', name: 'Fredoka', preview: 'Rounded' },
  { id: 'Bangers',     name: 'Bangers', preview: 'Comic' },
  { id: 'Lilita One',  name: 'Lilita',  preview: 'Bold' },
  { id: 'Pacifico',    name: 'Pacifico',preview: 'Cursive' },
  { id: 'Boogaloo',    name: 'Boogaloo',preview: 'Casual' },
  { id: 'Titan One',   name: 'Titan',   preview: 'Heavy' },
]

const FONT_COLORS = [
  { id: 'white',  label: 'White',  value: '#ffffff' },
  { id: 'black',  label: 'Black',  value: '#1a1a1a' },
  { id: 'yellow', label: 'Yellow', value: '#ffe600' },
  { id: 'gold',   label: 'Gold',   value: '#ffd700' },
  { id: 'pink',   label: 'Pink',   value: '#ff69b4' },
  { id: 'sky',    label: 'Sky',    value: '#87ceeb' },
  { id: 'mint',   label: 'Mint',   value: '#a8ffce' },
  { id: 'cream',  label: 'Cream',  value: '#fff5d6' },
]

const THEMES = [
  { id: 'vivid',  name: 'Vivid',  style: 'saturate(1.2)' },
  { id: 'pastel', name: 'Pastel', style: 'saturate(0.55) brightness(1.18)' },
  { id: 'dark',   name: 'Bold',   style: 'saturate(1.1) brightness(0.82)' },
]

const SIZES = [
  { id: 'sm', name: 'Small',  scale: 0.72 },
  { id: 'md', name: 'Medium', scale: 1 },
  { id: 'lg', name: 'Large',  scale: 1.35 },
]

export default function App() {
  const [photo, setPhoto]               = useState(null)
  const [globalCardBg, setGlobalCardBg] = useState(null)
  const [subjectBgs, setSubjectBgs]     = useState({})       // { subjId: base64 }
  const [studentName, setStudentName]   = useState('')
  const [grade, setGrade]               = useState('')
  const [section, setSection]           = useState('')
  const [teacher, setTeacher]           = useState('')
  const [selected, setSelected]         = useState(SUBJECTS.map(s => s.id))
  const [template, setTemplate]         = useState('badge')
  const [colorTheme, setColorTheme]     = useState('vivid')
  const [font, setFont]                 = useState('Fredoka One')
  const [fontColor, setFontColor]       = useState('#ffffff')
  const [infoColor, setInfoColor]       = useState('#ffffff')
  const [cardSize, setCardSize]         = useState('md')
  const [showEmoji, setShowEmoji]       = useState(true)
  const [showPhoto, setShowPhoto]       = useState(true)
  const [customSubjects, setCustomSubjects] = useState([])
  const [customName, setCustomName]     = useState('')
  const [downloading, setDownloading]   = useState(null)

  const cardRefs = useRef({})
  const allSubjects  = [...SUBJECTS, ...customSubjects]
  const activeSubjects = allSubjects.filter(s => selected.includes(s.id))
  const scale = SIZES.find(s => s.id === cardSize)?.scale || 1

  const readFile = useCallback((file, setter) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => setter(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const handleSubjectBg = (subjId, file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => setSubjectBgs(prev => ({ ...prev, [subjId]: e.target.result }))
    reader.readAsDataURL(file)
  }

  const clearSubjectBg = (subjId) =>
    setSubjectBgs(prev => { const n = { ...prev }; delete n[subjId]; return n })

  const toggleSubject = id =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const addCustom = () => {
    const name = customName.trim()
    if (!name) return
    const COLORS = ['#e76f51','#264653','#2a9d8f','#e9c46a','#f4a261','#457b9d']
    const id = 'custom_' + Date.now()
    const color = COLORS[customSubjects.length % COLORS.length]
    setCustomSubjects(prev => [...prev, {
      id, name, icon: '⭐', color, color2: color,
      themes: [{ name: 'General', emojis: ['⭐','📌','✏️'] }],
    }])
    setSelected(prev => [...prev, id])
    setCustomName('')
  }

  const downloadCard = async subjId => {
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
        <aside className="sidebar">

          {/* Student Info */}
          <div className="panel">
            <h2>📸 Student Info</h2>
            <UploadZone
              value={photo} onSet={setPhoto} onClear={() => setPhoto(null)}
              placeholder="🖼️" hint="Child's photo (appears on each card)"
            />
            <label>Student's Full Name</label>
            <input type="text" placeholder="e.g. Keiszyn Viatrix B. Pava" value={studentName} onChange={e => setStudentName(e.target.value)} />
            <label>Grade</label>
            <input type="text" placeholder="e.g. Grade 3" value={grade} onChange={e => setGrade(e.target.value)} />
            <label>Section</label>
            <input type="text" placeholder="e.g. Goodness" value={section} onChange={e => setSection(e.target.value)} />
            <label>Teacher</label>
            <input type="text" placeholder="e.g. Mrs. Santos" value={teacher} onChange={e => setTeacher(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          {/* Card Design */}
          <div className="panel">
            <h2>🎨 Card Design</h2>

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

            <label style={{ marginTop: 10 }}>Global Card Background <span className="opt-tag">optional</span></label>
            <UploadZone
              value={globalCardBg} onSet={setGlobalCardBg} onClear={() => setGlobalCardBg(null)}
              placeholder="🖼️" hint="Upload design — applies to all cards" compact
            />

            <label style={{ marginTop: 6 }}>Font</label>
            <div className="font-grid">
              {FONTS.map(f => (
                <div key={f.id} className={`font-item${font === f.id ? ' active' : ''}`} onClick={() => setFont(f.id)}>
                  <span style={{ fontFamily: f.id, fontSize: '1.1rem' }}>Aa</span>
                  <span className="font-label">{f.name}</span>
                </div>
              ))}
            </div>

            <label style={{ marginTop: 8 }}>Font Color</label>
            <div className="color-swatches">
              {FONT_COLORS.map(c => (
                <button
                  key={c.id}
                  className={`color-swatch${fontColor === c.value ? ' active' : ''}`}
                  style={{ background: c.value, border: c.value === '#ffffff' ? '1px solid #ddd' : 'none' }}
                  title={c.label}
                  onClick={() => setFontColor(c.value)}
                />
              ))}
              {/* Custom color */}
              <label className="color-swatch custom-color" title="Custom color">
                <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
                <span>🎨</span>
              </label>
            </div>

            <label style={{ marginTop: 8 }}>Name / Grade / Teacher Color</label>
            <div className="color-swatches">
              {FONT_COLORS.map(c => (
                <button
                  key={c.id}
                  className={`color-swatch${infoColor === c.value ? ' active' : ''}`}
                  style={{ background: c.value, border: c.value === '#ffffff' ? '1px solid #ddd' : 'none' }}
                  title={c.label}
                  onClick={() => setInfoColor(c.value)}
                />
              ))}
              <label className="color-swatch custom-color" title="Custom color">
                <input type="color" value={infoColor} onChange={e => setInfoColor(e.target.value)} />
                <span>🎨</span>
              </label>
            </div>

            <label style={{ marginTop: 8 }}>Color Tone</label>
            <div className="tone-row">
              {THEMES.map(th => (
                <button key={th.id} className={`tone-btn${colorTheme === th.id ? ' active' : ''}`} onClick={() => setColorTheme(th.id)}>{th.name}</button>
              ))}
            </div>

            <label style={{ marginTop: 8 }}>Card Size</label>
            <div className="tone-row">
              {SIZES.map(s => (
                <button key={s.id} className={`tone-btn${cardSize === s.id ? ' active' : ''}`} onClick={() => setCardSize(s.id)}>{s.name}</button>
              ))}
            </div>

            <div className="toggle-row" style={{ marginTop: 12 }}>
              <Toggle label="Show Emojis" value={showEmoji} onChange={setShowEmoji} />
              <Toggle label="Show Photo"  value={showPhoto}  onChange={setShowPhoto} />
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

        {/* Cards grid */}
        <main className="cards-area">
          <div className="cards-header">
            <h2 style={{ fontFamily:"'Fredoka One',cursive", color:'#4a2dad', fontSize:'1.2rem' }}>
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
              {activeSubjects.map(subj => {
                const themes       = subj.themes || [{ emojis: ['⭐','📌','✏️'] }]
                const activeEmojis = themes[0].emojis
                const cardBg       = subjectBgs[subj.id] || globalCardBg

                return (
                  <div key={subj.id} className="card-wrapper">
                    {/* Card */}
                    <div style={{ transform:`scale(${scale})`, transformOrigin:'top center', transition:'transform 0.2s' }}>
                      <SubjectCard
                        ref={el => cardRefs.current[subj.id] = el}
                        subject={subj}
                        photo={showPhoto ? photo : null}
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
                      />
                    </div>
                    <div style={{ height: getScaleOffset(template, scale) }} />

                    {/* Per-subject controls */}
                    <div className="card-controls">
                      {/* Per-subject BG */}
                      <div className="card-actions-row">
                        <label className="card-bg-btn" title="Upload background for this card">
                          {subjectBgs[subj.id] ? '🖼️ Change BG' : '🖼️ Add BG'}
                          <input type="file" accept="image/*" onChange={e => handleSubjectBg(subj.id, e.target.files[0])} />
                        </label>
                        {subjectBgs[subj.id] && (
                          <button className="card-bg-clear" onClick={() => clearSubjectBg(subj.id)}>✕</button>
                        )}
                        <button className="dl-btn" onClick={() => downloadCard(subj.id)} disabled={downloading === subj.id}>
                          {downloading === subj.id ? '⏳' : '⬇️'} Save
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function getScaleOffset(template, scale) {
  const baseH = { badge:240, label:140, banner:150, portrait:280 }[template] || 240
  return Math.max(0, baseH * (scale - 1)) + 'px'
}

/* ── Upload Zone ── fixed: hidden input triggered by ref, remove button works */
function UploadZone({ value, onSet, onClear, placeholder, hint, compact }) {
  const inputRef = useRef(null)

  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = ev => onSet(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => onSet(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className={`upload-zone${compact ? ' compact' : ''}`}
      style={{ marginBottom: 10 }}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* hidden input — not overlaying, triggered by ref click */}
      <input ref={inputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleChange} />
      {value ? (
        <>
          <img src={value} className={compact ? 'preview-img-sm' : 'preview-img'} alt="preview" />
          <p style={{ fontSize:'0.75rem' }}>
            Click to change &nbsp;
            <span
              className="remove-btn"
              onClick={e => { e.stopPropagation(); onClear() }}
            >✕ Remove</span>
          </p>
        </>
      ) : (
        <>
          <span className="upload-icon" style={{ fontSize: compact ? '1.5rem' : '2rem' }}>{placeholder}</span>
          <p>{hint}</p>
        </>
      )}
    </div>
  )
}

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
