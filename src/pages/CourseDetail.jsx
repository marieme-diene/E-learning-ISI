import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const coursesData = {
  1: {
    emoji: '⚛️', title: 'React JS Avancé',
    teacher: 'Prof. Baba TOP', filiere: 'M1 GL',
    total: 15, done: 9, progress: 60,
    duration: '12h', quizzes: 3, devoirs: 2,
    description: 'Ce cours vous permettra de maîtriser React JS de A à Z. Vous apprendrez les composants, les hooks, la gestion d\'état, le routing et les appels API.',
    chapters: [
      { num: 1, title: 'Introduction à React', dur: '45 min', status: 'done' },
      { num: 2, title: 'JSX & Composants', dur: '52 min', status: 'done' },
      { num: 3, title: 'Props & State', dur: '1h 10 min', status: 'done' },
      { num: 4, title: 'Événements & Forms', dur: '48 min', status: 'done' },
      { num: 5, title: 'useEffect', dur: '1h 05 min', status: 'done' },
      { num: 6, title: 'React Router', dur: '58 min', status: 'active' },
      { num: 7, title: 'useContext', dur: '1h 15 min', status: 'locked' },
      { num: 8, title: 'Appels API', dur: '1h 30 min', status: 'locked' },
      { num: 9, title: 'Projet Final', dur: '2h 00 min', status: 'locked' },
    ]
  },
  2: {
    emoji: '🐍', title: 'Python & Django',
    teacher: 'Prof. Amadou BA', filiere: 'M1 GL',
    total: 14, done: 5, progress: 35,
    duration: '10h', quizzes: 2, devoirs: 1,
    description: 'Apprenez Python et Django pour créer des applications web robustes côté serveur.',
    chapters: [
      { num: 1, title: 'Introduction Python', dur: '40 min', status: 'done' },
      { num: 2, title: 'Variables & Types', dur: '50 min', status: 'done' },
      { num: 3, title: 'Fonctions', dur: '55 min', status: 'active' },
      { num: 4, title: 'Django Setup', dur: '1h', status: 'locked' },
      { num: 5, title: 'Models & ORM', dur: '1h 20 min', status: 'locked' },
    ]
  },
}

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = coursesData[id] || coursesData[1]

  const getChapterStyle = (status) => {
    if (status === 'done') return { bg: '#22C55E', color: '#fff', label: '✓' }
    if (status === 'active') return { bg: '#1B2E4B', color: '#F5A623', label: '▶' }
    return { bg: '#F1F5F9', color: '#94A3B8', label: '🔒' }
  }

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* BREADCRUMB */}
          <div style={styles.breadcrumb}>
            <span onClick={() => navigate('/courses')} style={styles.breadLink}>
              Mes cours
            </span>
            <span style={styles.breadSep}>›</span>
            <span style={styles.breadCurrent}>{course.title}</span>
          </div>

          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>{course.emoji} {course.title}</h1>
              <p style={styles.meta}>
                👨‍🏫 {course.teacher} &nbsp;·&nbsp;
                {course.filiere} &nbsp;·&nbsp;
                {course.total} leçons &nbsp;·&nbsp;
                {course.duration} de contenu
              </p>
            </div>
            <div style={styles.badges}>
              <span style={styles.badgeInfo}>🔵 En cours</span>
              <span style={styles.badgeNavy}>{course.progress}% complété</span>
            </div>
          </div>

          {/* CONTENT */}
          <div style={styles.grid}>

            {/* GAUCHE */}
            <div>
              {/* VIDEO */}
              <div style={styles.video}>
                <div style={styles.playBtn}>▶</div>
                <div style={styles.videoLabel}>
                  <span style={styles.videoTitle}>
                    Leçon en cours — {course.chapters.find(c => c.status === 'active')?.title}
                  </span>
                  <span style={styles.videoTime}>12:34 / 28:00</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div style={styles.actions}>
                <button style={styles.btnPrimary}>⬇ Télécharger PDF</button>
                <button
                  style={styles.btnGold}
                  onClick={() => navigate('/quiz')}
                >
                  📝 Faire le Quiz
                </button>
                <button style={styles.btnOutline}>📤 Soumettre devoir</button>
              </div>

              {/* DESCRIPTION */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>À propos de ce cours</h3>
                <p style={styles.cardText}>{course.description}</p>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoNum}>{course.total}</div>
                    <div style={styles.infoLabel}>Leçons</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoNum}>{course.duration}</div>
                    <div style={styles.infoLabel}>Durée</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoNum}>{course.quizzes}</div>
                    <div style={styles.infoLabel}>Quiz</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoNum}>{course.devoirs}</div>
                    <div style={styles.infoLabel}>Devoirs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DROITE — CHAPITRES */}
            <div style={styles.chaptersCard}>
              <div style={styles.chaptersHeader}>
                📋 Chapitres ({course.done}/{course.total} complétés)
              </div>
              {course.chapters.map((ch) => {
                const cs = getChapterStyle(ch.status)
                return (
                  <div
                    key={ch.num}
                    style={{
                      ...styles.chapterItem,
                      background: ch.status === 'active' ? '#E2EAF4' : '#fff',
                    }}
                  >
                    <div style={{
                      ...styles.chapterNum,
                      background: cs.bg, color: cs.color,
                    }}>
                      {cs.label}
                    </div>
                    <div style={styles.chapterInfo}>
                      <div style={{
                        ...styles.chapterTitle,
                        color: ch.status === 'locked' ? '#94A3B8' : '#1B2E4B',
                      }}>
                        {ch.title}
                      </div>
                      <div style={styles.chapterDur}>⏱ {ch.dur}</div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex' },
  main: { flex: 1, padding: '32px 40px', background: '#F0F4F8' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '16px' },
  breadLink: { cursor: 'pointer', color: '#64748B' },
  breadSep: { color: '#94A3B8' },
  breadCurrent: { color: '#1B2E4B', fontWeight: '600' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#1B2E4B', marginBottom: '6px' },
  meta: { fontSize: '14px', color: '#64748B' },
  badges: { display: 'flex', gap: '8px' },
  badgeInfo: { padding: '4px 12px', borderRadius: '20px', background: '#DBEAFE', color: '#1D4ED8', fontSize: '12px', fontWeight: '600' },
  badgeNavy: { padding: '4px 12px', borderRadius: '20px', background: '#E2EAF4', color: '#1B2E4B', fontSize: '12px', fontWeight: '600' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' },
  video: {
    background: '#0F1E33', borderRadius: '14px',
    height: '320px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: '16px', position: 'relative',
  },
  playBtn: {
    width: '64px', height: '64px', borderRadius: '50%',
    background: '#F5A623', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', cursor: 'pointer', color: '#1B2E4B',
  },
  videoLabel: {
    position: 'absolute', bottom: '16px',
    left: '16px', right: '16px',
    display: 'flex', justifyContent: 'space-between',
  },
  videoTitle: { color: '#fff', fontWeight: '600', fontSize: '14px' },
  videoTime: { color: 'rgba(255,255,255,0.65)', fontSize: '12px' },
  actions: { display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  btnPrimary: {
    padding: '10px 18px', borderRadius: '10px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnGold: {
    padding: '10px 18px', borderRadius: '10px',
    background: '#F5A623', color: '#1B2E4B',
    border: 'none', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnOutline: {
    padding: '10px 18px', borderRadius: '10px',
    background: 'transparent', color: '#64748B',
    border: '1.5px solid #DDE5F0', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  card: { background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #DDE5F0' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B', marginBottom: '12px' },
  cardText: { fontSize: '14px', color: '#64748B', lineHeight: '1.7', marginBottom: '16px' },
  infoGrid: { display: 'flex', gap: '20px' },
  infoItem: { textAlign: 'center' },
  infoNum: { fontSize: '20px', fontWeight: '800', color: '#1B2E4B' },
  infoLabel: { fontSize: '12px', color: '#64748B' },
  chaptersCard: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', overflow: 'hidden' },
  chaptersHeader: { padding: '16px 20px', borderBottom: '1px solid #DDE5F0', fontWeight: '700', color: '#1B2E4B', fontSize: '14px' },
  chapterItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderBottom: '1px solid #DDE5F0', cursor: 'pointer' },
  chapterNum: { width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 },
  chapterInfo: { flex: 1 },
  chapterTitle: { fontSize: '13px', fontWeight: '600' },
  chapterDur: { fontSize: '11px', color: '#64748B' },
}

export default CourseDetail