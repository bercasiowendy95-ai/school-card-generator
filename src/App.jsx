import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import CardPreview from './CardPreview'
import './App.css'

const DEFAULT_SUBJECTS = [
  { id: 'english',  name: 'English',  icon: '📚', color: '#f5a623' },
  { id: 'science',  name: 'Science',  icon: '🔬', color: '#7ed321' },
  { id: 'filipino', name: 'Filipino', icon: '🇵🇭', color: '#e91e63' },
  { id: 'math',     name: 'Math',     icon: '🔢', color: '#2196f3' },
  { id: 'araling',  name: 'Araling Panlipunan', icon: '🌏', color: '#9c27b0' },
  { id: 'mapeh',    name: 'MAPEH',    icon: '🎵', color: '#ff5722' },
  { id: 'tle',      name: 'TLE',      icon: '🔧', color: '#00bcd4' },
  { id: 'values',   name: 'Values Ed', icon: '❤️', color: '#f44336' },
]

const THEMES = [
  {
    id: 'rainbow',
    name: 'Rainbow',
    colors: ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff'],
    banner: '#f8f0ff',
    sectionBg: '#7c5cbf',
  },
  {
    id: 'pastel',
    name: 'Pastel',
    colors: ['#ffb3ba','#ffdfba','#ffffba','#baffc9'],
    banner: '#fff9f0',
    sectionBg: '#f0a0c0',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#0077b6','#00b4d8','#90e0ef','#023e8a'],
    banner: '#e8f8ff',
    sectionBg: '#0077b6',
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#2d6a4f','#40916c','#74c69d','#1b4332'],
    banner: '#f0fff4',
    sectionBg: '#2d6a4f',
  },
  {
    id: 'candy',
    name: 'Candy',
    colors: ['#ff006e','#fb5607','#ffbe0b','#8338ec'],
    banner: '#fff0f8',
    sectionBg: '#8338ec',
  },
  {
    id: 'space',
    name: 'Space',
    colors: ['#10002b','#240046','#3c096c','#5a189a'],
    banner: '#f5f0ff',
    sectionBg: '#3c096c',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#f72585','#b5179e','#7209b7','#480ca8'],
    banner: '#fff5fb',
    sectionBg: '#b5179e',
  },
  {
    id: 'earth',
    name: 'Earth',
    colors: ['#cb4b16','#b58900','#268bd2','#2aa198'],
    banner: '#fdf6e3',
    sectionBg: '#657b83',
  },
]

const CARD_LAYOUTS = [
  { id: 'grid', name: '2×2 Grid', icon: '⊞' },
  { id: 'row',  name: 'Strip Row', icon: '▬' },
]

const SUBJECT_ICON_COLORS = [
  '#ff6b6b','#ffd93d','#6bcb77','#4d96ff',
  '#c77dff','#ff9f1c','#2ec4b6','#e63946',
]

export default function App() {
  const [photo, setPhoto] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [section, setSection] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState(['english','science','filipino','math'])
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS)
  const [theme, setTheme] = useState(THEMES[0])
  const [cardLayout, setCardLayout] = useState('grid')
  const [customSubject, setCustomSubject] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef(null)
  const fileInputRef = useRef(null)

  const handlePhotoChange = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setPhoto(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const onFileInput = (e) => handlePhotoChange(e.target.files[0])

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handlePhotoChange(e.dataTransfer.files[0])
  }

  const toggleSubject = (id) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const addCustomSubject = () => {
    const name = customSubject.trim()
    if (!name) return
    const id = 'custom_' + Date.now()
    const colorIdx = subjects.length % SUBJECT_ICON_COLORS.length
    setSubjects(prev => [...prev, { id, name, icon: '⭐', color: SUBJECT_ICON_COLORS[colorIdx] }])
    setSelectedSubjects(prev => [...prev, id])
    setCustomSubject('')
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `${studentName || 'school-card'}-card.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error(err)
      alert('Could not generate image. Please try again.')
    }
    setDownloading(false)
  }

  const activeSubjects = subjects.filter(s => selectedSubjects.includes(s.id))

  return (
    <div className="app">
      <div className="header">
        <h1>🎒 School Card Maker</h1>
        <p>Create a personalized school card for your child — pick subjects, upload a photo, and download!</p>
      </div>

      <div className="layout">
        {/* ─── Left: Controls ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Photo + Name */}
          <div className="panel">
            <h2>📸 Student Info</h2>

            <div
              className={`upload-zone${dragOver ? ' drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileInput}
              />
              {photo ? (
                <>
                  <img src={photo} className="preview-img" alt="Student" />
                  <p>Click or drag to change photo</p>
                </>
              ) : (
                <>
                  <span className="upload-icon">🖼️</span>
                  <p>Click or drag &amp; drop a photo here</p>
                </>
              )}
            </div>
            <p className="upload-hint">JPG, PNG, WEBP accepted</p>

            <label>Student's Full Name</label>
            <input
              type="text"
              placeholder="e.g. Keiszyn Viatrix B. Pava"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
            />

            <label>Section / Class</label>
            <input
              type="text"
              placeholder="e.g. Goodness"
              value={section}
              onChange={e => setSection(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>

          {/* Subjects */}
          <div className="panel">
            <h2>📖 Subjects</h2>
            <div className="subject-grid">
              {subjects.map((subj, i) => (
                <div
                  key={subj.id}
                  className={`subject-item${selectedSubjects.includes(subj.id) ? ' selected' : ''}`}
                  style={{ background: subj.color }}
                  onClick={() => toggleSubject(subj.id)}
                >
                  <span className="subj-icon">{subj.icon}</span>
                  {subj.name}
                </div>
              ))}
            </div>
            <div className="add-subject">
              <input
                type="text"
                placeholder="Add custom subject..."
                value={customSubject}
                onChange={e => setCustomSubject(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomSubject()}
              />
              <button className="btn-sm" onClick={addCustomSubject}>+ Add</button>
            </div>
          </div>

          {/* Theme */}
          <div className="panel">
            <h2>🎨 Color Theme</h2>
            <div className="theme-grid">
              {THEMES.map(t => (
                <div
                  key={t.id}
                  className={`theme-item${theme.id === t.id ? ' active' : ''}`}
                  onClick={() => setTheme(t)}
                >
                  <div className="theme-swatch">
                    {t.colors.map((c, i) => <span key={i} style={{ background: c }} />)}
                  </div>
                  {t.name}
                </div>
              ))}
            </div>

            <hr className="section-divider" />
            <h2 style={{ marginBottom: 10 }}>🗂️ Card Layout</h2>
            <div className="layout-toggle">
              {CARD_LAYOUTS.map(l => (
                <button
                  key={l.id}
                  className={`layout-btn${cardLayout === l.id ? ' active' : ''}`}
                  onClick={() => setCardLayout(l.id)}
                >
                  {l.icon} {l.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ─── Right: Preview ─── */}
        <div className="preview-panel">
          <h2>👁️ Live Preview</h2>
          <CardPreview
            ref={cardRef}
            photo={photo}
            studentName={studentName}
            section={section}
            activeSubjects={activeSubjects}
            theme={theme}
            cardLayout={cardLayout}
          />
          <div className="actions">
            <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
              {downloading && <span className="spinner" />}
              {downloading ? 'Generating...' : '⬇️ Download Card'}
            </button>
            <button className="btn-secondary" onClick={() => { setPhoto(null); setStudentName(''); setSection('') }}>
              Reset
            </button>
          </div>
          <p className="download-hint">Downloads as a high-resolution PNG</p>
        </div>
      </div>
    </div>
  )
}
