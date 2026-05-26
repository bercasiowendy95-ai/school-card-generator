import { useState, useRef, useCallback, useEffect } from 'react'
import html2canvas from 'html2canvas'
import SubjectCard from './SubjectCard'
import CardBack from './CardBack'
import PrintSheet from './PrintSheet'
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

const BORDER_STYLES = [
  { id: 'none',   name: 'None' },
  { id: 'stars',  name: 'Stars' },
  { id: 'dots',   name: 'Dots' },
  { id: 'ribbon', name: 'Ribbon' },
  { id: 'glow',   name: 'Glow' },
]

const GRADE_PRESETS = [
  { label: 'Grade 1', subjects: ['math','english','filipino','mapeh','gmrc'] },
  { label: 'Grade 2', subjects: ['math','english','filipino','mapeh','gmrc','araling'] },
  { label: 'Grade 3', subjects: ['math','english','filipino','science','mapeh','gmrc','araling'] },
  { label: 'Grade 4', subjects: ['mathematics','english','filipino','science','mapeh','esp','ap','epp'] },
  { label: 'Grade 5', subjects: ['mathematics','english','filipino','science','mapeh','esp','ap','epp','tle'] },
  { label: 'Grade 6', subjects: ['mathematics','english','filipino','science','mapeh','esp','ap','epp','tle'] },
  { label: 'HS',      subjects: ['mathematics','english','filipino','science','mapeh','esp','ap','tle','values'] },
]

const LS_KEY = 'school-card-v1'

/* ── Auto-contrast utility ── */
export function getAutoContrast(hex) {
  if (!hex || hex.length < 4) return '#ffffff'
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const toLinear = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  return L > 0.179 ? '#1a1a1a' : '#ffffff'
}

/* ── Load / save helpers ── */
function loadSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function mergeWithDefaults(saved) {
  return {
    studentName: saved.studentName ?? '',
    grade:       saved.grade       ?? '',
    section:     saved.section     ?? '',
    teacher:     saved.teacher     ?? '',
    selected:    saved.selected    ?? SUBJECTS.map(s => s.id),
    template:    saved.template    ?? 'badge',
    colorTheme:  saved.colorTheme  ?? 'vivid',
    font:        saved.font        ?? 'Fredoka One',
    fontColor:   saved.fontColor   ?? '#ffffff',
    infoColor:   saved.infoColor   ?? '#ffffff',
    cardSize:    saved.cardSize    ?? 'md',
    showEmoji:   saved.showEmoji   ?? true,
    showPhoto:   saved.showPhoto   ?? true,
    customSubjects: saved.customSubjects ?? [],
    cardColors:        saved.cardColors        ?? {},
    subjectFontColors: saved.subjectFontColors ?? {},
    subjectInfoColors: saved.subjectInfoColors ?? {},
    borderStyle: saved.borderStyle ?? 'none',
    watermark:   saved.watermark   ?? false,
    cardTopics:  saved.cardTopics  ?? {},
    printCols:   saved.printCols   ?? 3,
  }
}

export default function App() {
  const saved = mergeWithDefaults(loadSaved())

  const [photo, setPhoto]               = useState(null)
  const [globalCardBg, setGlobalCardBg] = useState(null)
  const [subjectBgs, setSubjectBgs]     = useState({})

  const [studentName, setStudentName]   = useState(saved.studentName)
  const [grade, setGrade]               = useState(saved.grade)
  const [section, setSection]           = useState(saved.section)
  const [teacher, setTeacher]           = useState(saved.teacher)
  const [selected, setSelected]         = useState(saved.selected)
  const [template, setTemplate]         = useState(saved.template)
  const [colorTheme, setColorTheme]     = useState(saved.colorTheme)
  const [font, setFont]                 = useState(saved.font)
  const [fontColor, setFontColor]       = useState(saved.fontColor)
  const [infoColor, setInfoColor]       = useState(saved.infoColor)
  const [cardSize, setCardSize]         = useState(saved.cardSize)
  const [showEmoji, setShowEmoji]       = useState(saved.showEmoji)
  const [showPhoto, setShowPhoto]       = useState(saved.showPhoto)
  const [customSubjects, setCustomSubjects] = useState(saved.customSubjects)
  const [customName, setCustomName]     = useState('')
  const [downloading, setDownloading]   = useState(null)

  // Feature: card colors
  const [cardColors, setCardColors]     = useState(saved.cardColors)       // { [subjId]: { c1, c2 } }
  const [openColorPicker, setOpenColorPicker] = useState(null)             // subjId or null

  // Feature: per-subject font color (subject name)
  const [subjectFontColors, setSubjectFontColors] = useState(saved.subjectFontColors) // { [subjId]: '#hex' }
  const [openFontPicker, setOpenFontPicker] = useState(null)               // subjId or null

  // Feature: per-subject info color (name/grade/teacher)
  const [subjectInfoColors, setSubjectInfoColors] = useState(saved.subjectInfoColors) // { [subjId]: '#hex' }
  const [openInfoPicker, setOpenInfoPicker] = useState(null)               // subjId or null

  // Feature: border style
  const [borderStyle, setBorderStyle]   = useState(saved.borderStyle)

  // Feature: card flip
  const [flippedCards, setFlippedCards] = useState({})                     // { [subjId]: bool }
  const [cardTopics, setCardTopics]     = useState(saved.cardTopics)       // { [subjId]: ['','','',''] }

  // Feature: watermark
  const [watermark, setWatermark]       = useState(saved.watermark)

  // Feature: print sheet
  const [showPrint, setShowPrint]       = useState(false)
  const [printCols, setPrintCols]       = useState(saved.printCols)

  // Feature: save flash
  const [savedFlash, setSavedFlash]     = useState(false)
  const saveTimerRef = useRef(null)

  const cardRefs    = useRef({})
  const cardBackRefs = useRef({})

  const allSubjects    = [...SUBJECTS, ...customSubjects]
  const activeSubjects = allSubjects.filter(s => selected.includes(s.id))
  const scale          = SIZES.find(s => s.id === cardSize)?.scale || 1

  /* ── Auto-save to localStorage ── */
  useEffect(() => {
    const data = {
      studentName, grade, section, teacher,
      selected, template, colorTheme, font, fontColor, infoColor,
      cardSize, showEmoji, showPhoto, customSubjects,
      cardColors, subjectFontColors, subjectInfoColors, borderStyle, watermark, cardTopics, printCols,
    }
    localStorage.setItem(LS_KEY, JSON.stringify(data))

    // flash indicator
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    setSavedFlash(true)
    saveTimerRef.current = setTimeout(() => setSavedFlash(false), 1500)
  }, [
    studentName, grade, section, teacher,
    selected, template, colorTheme, font, fontColor, infoColor,
    cardSize, showEmoji, showPhoto, customSubjects,
    cardColors, subjectFontColors, subjectInfoColors, borderStyle, watermark, cardTopics, printCols,
  ])

  const clearSavedData = () => {
    localStorage.removeItem(LS_KEY)
    const def = mergeWithDefaults({})
    setStudentName(def.studentName); setGrade(def.grade); setSection(def.section); setTeacher(def.teacher)
    setSelected(def.selected); setTemplate(def.template); setColorTheme(def.colorTheme)
    setFont(def.font); setFontColor(def.fontColor); setInfoColor(def.infoColor)
    setCardSize(def.cardSize); setShowEmoji(def.showEmoji); setShowPhoto(def.showPhoto)
    setCustomSubjects(def.customSubjects); setCardColors(def.cardColors); setSubjectFontColors(def.subjectFontColors); setSubjectInfoColors(def.subjectInfoColors)
    setBorderStyle(def.borderStyle); setWatermark(def.watermark)
    setCardTopics(def.cardTopics); setPrintCols(def.printCols)
  }

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

  const applyGradePreset = (subjects) => {
    setSelected(subjects)
  }

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

  // Card color picker
  const setCardColor = (subjId, c1, c2) => {
    setCardColors(prev => ({ ...prev, [subjId]: { c1, c2 } }))
  }
  const clearCardColor = (subjId) => {
    setCardColors(prev => { const n = { ...prev }; delete n[subjId]; return n })
  }

  // Card flip
  const toggleFlip = (subjId) => {
    setFlippedCards(prev => ({ ...prev, [subjId]: !prev[subjId] }))
  }

  // Auto-contrast
  const autoFontColor = () => {
    if (activeSubjects.length === 0) return
    const subj = activeSubjects[0]
    const cc = cardColors[subj.id]
    const bg = cc ? cc.c1 : subj.color
    setFontColor(getAutoContrast(bg))
  }
  const autoInfoColor = () => {
    if (activeSubjects.length === 0) return
    const subj = activeSubjects[0]
    const cc = cardColors[subj.id]
    const bg = cc ? cc.c1 : subj.color
    setInfoColor(getAutoContrast(bg))
  }

  const downloadCard = async subjId => {
    const el = flippedCards[subjId] ? cardBackRefs.current[subjId] : cardRefs.current[subjId]
    if (!el) return
    setDownloading(subjId)
    try {
      const canvas = await html2canvas(el, { scale: 3, useCORS: true, allowTaint: true, backgroundColor: null, logging: false })
      const link = document.createElement('a')
      const subj = allSubjects.find(s => s.id === subjId)
      link.download = `${subj?.name.replace(/\n/g, '-') || subjId}${flippedCards[subjId] ? '-back' : ''}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch(e) { console.error(e) }
    setDownloading(null)
  }

  const downloadBack = async subjId => {
    const el = cardBackRefs.current[subjId]
    if (!el) return
    setDownloading(subjId + '_back')
    try {
      const canvas = await html2canvas(el, { scale: 3, useCORS: true, allowTaint: true, backgroundColor: null, logging: false })
      const link = document.createElement('a')
      const subj = allSubjects.find(s => s.id === subjId)
      link.download = `${subj?.name.replace(/\n/g, '-') || subjId}-back.png`
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
        {savedFlash && <div className="saved-flash">✓ Saved</div>}
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
              <label className="color-swatch custom-color" title="Custom color">
                <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
                <span>🎨</span>
              </label>
              <button className="auto-btn" title="Auto contrast based on first card" onClick={autoFontColor}>Auto</button>
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
              <button className="auto-btn" title="Auto contrast based on first card" onClick={autoInfoColor}>Auto</button>
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

            <label style={{ marginTop: 8 }}>Border Frame</label>
            <div className="tone-row" style={{ flexWrap: 'wrap' }}>
              {BORDER_STYLES.map(b => (
                <button key={b.id} className={`tone-btn${borderStyle === b.id ? ' active' : ''}`} onClick={() => setBorderStyle(b.id)}>{b.name}</button>
              ))}
            </div>

            <div className="toggle-row" style={{ marginTop: 12 }}>
              <Toggle label="Show Emojis" value={showEmoji} onChange={setShowEmoji} />
              <Toggle label="Show Photo"  value={showPhoto}  onChange={setShowPhoto} />
              <Toggle label="Watermark"   value={watermark}  onChange={setWatermark} />
            </div>

            <button className="clear-saved-btn" onClick={clearSavedData} style={{ marginTop: 12 }}>
              🗑️ Clear saved data
            </button>
          </div>

          {/* Subjects */}
          <div className="panel">
            <h2>📖 Subjects</h2>

            {/* Grade Presets */}
            <div className="grade-presets">
              {GRADE_PRESETS.map(p => (
                <button key={p.label} className="btn-tiny grade-preset-btn" onClick={() => applyGradePreset(p.subjects)}>
                  {p.label}
                </button>
              ))}
            </div>

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
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {activeSubjects.length > 0 && (
                <>
                  <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '9px 16px' }} onClick={() => setShowPrint(true)}>
                    🖨️ Print Sheet
                  </button>
                  <button className="btn-primary" onClick={downloadAll}>⬇️ Download All</button>
                </>
              )}
            </div>
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
                const cardBg           = subjectBgs[subj.id] || globalCardBg
                const isFlipped        = !!flippedCards[subj.id]
                const customColor      = cardColors[subj.id]
                const subjFontColor    = subjectFontColors[subj.id] || fontColor
                const subjInfoColor    = subjectInfoColors[subj.id] || infoColor
                const subjForCard  = customColor
                  ? { ...subj, color: customColor.c1, color2: customColor.c2 }
                  : subj

                return (
                  <div key={subj.id} className="card-wrapper">
                    {/* 3D flip container */}
                    <div
                      className={`flip-container${isFlipped ? ' flipped' : ''}`}
                      style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}
                    >
                      <div className="flip-inner">
                        {/* Front */}
                        <div className="flip-front">
                          <SubjectCard
                            ref={el => cardRefs.current[subj.id] = el}
                            subject={subjForCard}
                            photo={showPhoto ? photo : null}
                            cardBg={cardBg}
                            studentName={studentName}
                            grade={grade}
                            section={section}
                            teacher={teacher}
                            template={template}
                            colorTheme={colorTheme}
                            font={font}
                            fontColor={subjFontColor}
                            infoColor={subjInfoColor}
                            showEmoji={showEmoji}
                            emojis={activeEmojis}
                            borderStyle={borderStyle}
                            watermark={watermark}
                          />
                        </div>
                        {/* Back */}
                        <div className="flip-back">
                          <CardBack
                            ref={el => cardBackRefs.current[subj.id] = el}
                            subject={subjForCard}
                            studentName={studentName}
                            grade={grade}
                            section={section}
                            teacher={teacher}
                            template={template}
                            font={font}
                            fontColor={subjFontColor}
                            infoColor={subjInfoColor}
                            topics={cardTopics[subj.id] || ['','','','']}
                            onTopicsChange={topics => setCardTopics(prev => ({ ...prev, [subj.id]: topics }))}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ height: getScaleOffset(template, scale) }} />

                    {/* Per-subject controls */}
                    <div className="card-controls">
                      <div className="card-actions-row">
                        {/* Per-subject BG */}
                        <label className="card-bg-btn" title="Upload background for this card">
                          {subjectBgs[subj.id] ? '🖼️ Change BG' : '🖼️ Add BG'}
                          <input type="file" accept="image/*" onChange={e => handleSubjectBg(subj.id, e.target.files[0])} />
                        </label>
                        {subjectBgs[subj.id] && (
                          <button className="card-bg-clear" onClick={() => clearSubjectBg(subj.id)}>✕</button>
                        )}

                        {/* Card color dot */}
                        <button
                          className="card-color-dot"
                          style={{ background: customColor ? customColor.c1 : subj.color }}
                          title="Custom card color"
                          onClick={() => { setOpenColorPicker(openColorPicker === subj.id ? null : subj.id); setOpenFontPicker(null); setOpenInfoPicker(null) }}
                        />

                        {/* Subject font color dot */}
                        <button
                          className="card-color-dot card-font-dot"
                          style={{ background: subjectFontColors[subj.id] || fontColor }}
                          title="Subject name color for this card"
                          onClick={() => { setOpenFontPicker(openFontPicker === subj.id ? null : subj.id); setOpenColorPicker(null); setOpenInfoPicker(null) }}
                        />

                        {/* Info color dot (name/grade/teacher) */}
                        <button
                          className="card-color-dot card-info-dot"
                          style={{ background: subjectInfoColors[subj.id] || infoColor }}
                          title="Name/Grade/Teacher color for this card"
                          onClick={() => { setOpenInfoPicker(openInfoPicker === subj.id ? null : subj.id); setOpenColorPicker(null); setOpenFontPicker(null) }}
                        />

                        {/* Flip button */}
                        <button className="dl-btn" onClick={() => toggleFlip(subj.id)}>
                          {isFlipped ? '↩ Front' : '↩ Back'}
                        </button>

                        {/* Download */}
                        <button className="dl-btn" onClick={() => downloadCard(subj.id)} disabled={downloading === subj.id}>
                          {downloading === subj.id ? '⏳' : '⬇️'} Save
                        </button>

                        {/* Save back */}
                        {isFlipped && (
                          <button className="dl-btn" onClick={() => downloadBack(subj.id)} disabled={downloading === subj.id + '_back'}>
                            {downloading === subj.id + '_back' ? '⏳' : '⬇️'} Back
                          </button>
                        )}
                      </div>

                      {/* Inline subject font color picker */}
                      {openFontPicker === subj.id && (
                        <div className="mini-color-picker">
                          <div className="mini-color-row">
                            <label>Subject Name Color</label>
                            <input
                              type="color"
                              value={subjectFontColors[subj.id] || fontColor}
                              onChange={e => setSubjectFontColors(prev => ({ ...prev, [subj.id]: e.target.value }))}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {subjectFontColors[subj.id] && (
                              <button className="btn-tiny outline" style={{ fontSize: '0.7rem' }} onClick={() => setSubjectFontColors(prev => { const n = { ...prev }; delete n[subj.id]; return n })}>Reset</button>
                            )}
                            <button className="btn-tiny" style={{ fontSize: '0.7rem' }} onClick={() => setOpenFontPicker(null)}>Done</button>
                          </div>
                        </div>
                      )}

                      {/* Inline info color picker */}
                      {openInfoPicker === subj.id && (
                        <div className="mini-color-picker">
                          <div className="mini-color-row">
                            <label>Name / Grade / Teacher</label>
                            <input
                              type="color"
                              value={subjectInfoColors[subj.id] || infoColor}
                              onChange={e => setSubjectInfoColors(prev => ({ ...prev, [subj.id]: e.target.value }))}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {subjectInfoColors[subj.id] && (
                              <button className="btn-tiny outline" style={{ fontSize: '0.7rem' }} onClick={() => setSubjectInfoColors(prev => { const n = { ...prev }; delete n[subj.id]; return n })}>Reset</button>
                            )}
                            <button className="btn-tiny" style={{ fontSize: '0.7rem' }} onClick={() => setOpenInfoPicker(null)}>Done</button>
                          </div>
                        </div>
                      )}

                      {/* Inline card color picker */}
                      {openColorPicker === subj.id && (
                        <div className="mini-color-picker">
                          <div className="mini-color-row">
                            <label>Gradient Start</label>
                            <input
                              type="color"
                              value={customColor?.c1 || subj.color}
                              onChange={e => {
                                const c2 = customColor?.c2 || subj.color2
                                setCardColor(subj.id, e.target.value, c2)
                                // auto-suggest font color
                                setFontColor(getAutoContrast(e.target.value))
                              }}
                            />
                          </div>
                          <div className="mini-color-row">
                            <label>Gradient End</label>
                            <input
                              type="color"
                              value={customColor?.c2 || subj.color2}
                              onChange={e => {
                                const c1 = customColor?.c1 || subj.color
                                setCardColor(subj.id, c1, e.target.value)
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {customColor && (
                              <button className="btn-tiny outline" style={{ fontSize: '0.7rem' }} onClick={() => clearCardColor(subj.id)}>Reset</button>
                            )}
                            <button className="btn-tiny" style={{ fontSize: '0.7rem' }} onClick={() => setOpenColorPicker(null)}>Done</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* Print Sheet Modal */}
      {showPrint && (
        <PrintSheet
          onClose={() => setShowPrint(false)}
          activeSubjects={activeSubjects}
          photo={showPhoto ? photo : null}
          subjectBgs={subjectBgs}
          globalCardBg={globalCardBg}
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
          cardColors={cardColors}
          borderStyle={borderStyle}
          watermark={watermark}
          printCols={printCols}
          onPrintColsChange={setPrintCols}
        />
      )}
    </div>
  )
}

function getScaleOffset(template, scale) {
  const baseH = { badge:240, label:140, banner:150, portrait:280 }[template] || 240
  return Math.max(0, baseH * (scale - 1)) + 'px'
}

/* ── Upload Zone ── */
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
      <input ref={inputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleChange} />
      {value ? (
        <>
          <img src={value} className={compact ? 'preview-img-sm' : 'preview-img'} alt="preview" />
          <p style={{ fontSize:'0.75rem' }}>
            Click to change &nbsp;
            <span className="remove-btn" onClick={e => { e.stopPropagation(); onClear() }}>✕ Remove</span>
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
