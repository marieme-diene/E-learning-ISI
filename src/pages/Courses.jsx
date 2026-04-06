import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const allCourses = [
  { id: 1, emoji: '⚛️', title: 'React JS Avancé', teacher: 'Prof. Baba TOP', progress: 60, total: 15, done: 9, tag: 'Frontend', color: '#1B2E4B', status: 'encours' },
  { id: 2, emoji: '🐍', title: 'Python & Django', teacher: 'Prof. Amadou BA', progress: 35, total: 14, done: 5, tag: 'Backend', color: '#7C3AED', status: 'encours' },
  { id: 3, emoji: '🗄️', title: 'SQL & PostgreSQL', teacher: 'Prof. Fatou NDIAYE', progress: 80, total: 15, done: 12, tag: 'Base de données', color: '#059669', status: 'encours' },
  { id: 4, emoji: '🌐', title: 'Réseaux & Protocoles', teacher: 'Prof. Ibrahima FALL', progress: 100, total: 10, done: 10, tag: 'Réseau', color: '#0891B2', status: 'termine' },
  { id: 5, emoji: '🔐', title: 'Cybersécurité', teacher: 'Prof. Moussa DIOP', progress: 10, total: 12, done: 1, tag: 'Sécurité', color: '#DC2626', status: 'debut' },
]

function Courses() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tous')

  const filtered = allCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'tous' || c.status === filter
    return matchSearch && matchFilter
  })

  const getBadge = (status) => {
    if (status === 'termine') return { label: '✅ Terminé', bg: '#DCFCE7', color: '#15803D' }
    if (status === 'debut') return { label: '🔴 Pas commencé', bg: '#FEE2E2', color: '#991B1B' }
    return { label: '🔵 En cours', bg: '#DBEAFE', color: '#1D4ED8' }
  }

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Mes cours 📚</h1>
              <p style={styles.sub}>5 cours inscrits · Semestre 2 — 2025/2026</p>
            </div>
          </div>

          {/* FILTRES */}
          <div style={styles.filterBar}>
            <input
              style={styles.search}
              placeholder="🔍 Rechercher un cours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={styles.filterBtns}>
              {[
                { key: 'tous', label: 'Tous' },
                { key: 'encours', label: 'En cours' },
                { key: 'termine', label: 'Terminés' },
                { key: 'debut', label: 'Pas commencé' },
              ].map(f => (
                <button
                  key={f.key}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === f.key ? styles.filterBtnActive : {})
                  }}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* LISTE */}
          <div style={styles.grid}>
            {filtered.map(course => {
              const badge = getBadge(course.status)
              return (
                <div
                  key={course.id}
                  style={styles.card}
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div style={{ ...styles.thumb, background: course.color }}>
                    <span style={{ fontSize: '48px' }}>{course.emoji}</span>
                  </div>
                  <div style={styles.body}>
                    <span style={styles.tag}>{course.tag}</span>
                    <div style={styles.courseTitle}>{course.title}</div>
                    <div style={styles.teacher}>👨‍🏫 {course.teacher}</div>
                    <div style={styles.progressWrap}>
                      <div style={{ ...styles.progressFill, width: `${course.progress}%` }} />
                    </div>
                    <div style={styles.progressLabel}>
                      <span>{course.progress}%</span>
                      <span>{course.done}/{course.total} leçons</span>
                    </div>
                  </div>
                  <div style={styles.footer}>
                    <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                    <button
                      style={course.status === 'termine' ? styles.btnOutline : styles.btnPrimary}
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/courses/${course.id}`)
                      }}
                    >
                      {course.status === 'termine' ? 'Revoir' : course.status === 'debut' ? 'Commencer' : 'Continuer'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* AUCUN RÉSULTAT */}
          {filtered.length === 0 && (
            <div style={styles.empty}>
              <div style={{ fontSize: '48px' }}>🔍</div>
              <h3>Aucun cours trouvé</h3>
              <p>Essayez un autre mot-clé</p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex' },
  main: { flex: 1, padding: '32px 40px', background: '#F0F4F8' },
  header: { marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  sub: { fontSize: '14px', color: '#64748B' },
  filterBar: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  search: {
    padding: '10px 16px', borderRadius: '10px',
    border: '1.5px solid #DDE5F0', fontSize: '14px',
    outline: 'none', width: '280px', fontFamily: 'inherit',
  },
  filterBtns: { display: 'flex', gap: '8px' },
  filterBtn: {
    padding: '8px 16px', borderRadius: '20px',
    border: '1.5px solid #DDE5F0',
    background: '#fff', color: '#64748B',
    fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  filterBtnActive: {
    background: '#1B2E4B', color: '#fff',
    borderColor: '#1B2E4B',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' },
  card: {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #DDE5F0', overflow: 'hidden',
    cursor: 'pointer',
  },
  thumb: {
    height: '140px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: '16px' },
  tag: {
    display: 'inline-block',
    fontSize: '10px', fontWeight: '700',
    letterSpacing: '1px', textTransform: 'uppercase',
    padding: '3px 10px', borderRadius: '6px',
    background: '#E2EAF4', color: '#1B2E4B', marginBottom: '8px',
  },
  courseTitle: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B', marginBottom: '6px' },
  teacher: { fontSize: '12px', color: '#64748B', marginBottom: '12px' },
  progressWrap: { background: '#E2EAF4', borderRadius: '4px', height: '6px', marginBottom: '6px' },
  progressFill: { height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, #1B2E4B, #F5A623)' },
  progressLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' },
  footer: {
    padding: '12px 16px', borderTop: '1px solid #DDE5F0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  btnPrimary: {
    padding: '6px 14px', borderRadius: '8px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnOutline: {
    padding: '6px 14px', borderRadius: '8px',
    background: 'transparent', color: '#64748B',
    border: '1.5px solid #DDE5F0', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  empty: {
    textAlign: 'center', padding: '60px',
    color: '#64748B', display: 'flex',
    flexDirection: 'column', gap: '10px', alignItems: 'center',
  },
}

export default Courses