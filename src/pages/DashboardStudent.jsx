import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function DashboardStudent() {
  const navigate = useNavigate()

  const courses = [
    { id: 1, emoji: '⚛️', title: 'React JS Avancé', teacher: 'Prof. Baba TOP', progress: 60, total: 15, done: 9, color: '#1B2E4B' },
    { id: 2, emoji: '🐍', title: 'Python & Django', teacher: 'Prof. Amadou BA', progress: 35, total: 14, done: 5, color: '#7C3AED' },
    { id: 3, emoji: '🗄️', title: 'SQL & PostgreSQL', teacher: 'Prof. Fatou NDIAYE', progress: 80, total: 15, done: 12, color: '#059669' },
  ]

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* BANNER */}
          <div style={styles.banner}>
            <div>
              <h2 style={styles.bannerTitle}>Bonjour Marieme ! 👋</h2>
              <p style={styles.bannerSub}>
                Continuez votre apprentissage — vous êtes à 60% de votre objectif
              </p>
              <div style={styles.bannerBtns}>
              <button
               style={styles.btnGold}
                onClick={() => navigate('/courses')}
                        >
                Reprendre le cours
                  </button>
                </div>
            </div>
            <div style={styles.bannerEmoji}>📖</div>
          </div>

          {/* STATS */}
          <div style={styles.statGrid}>
            {[
              { icon: '📚', num: '5', label: 'Cours inscrits', change: '↑ +1 ce mois' },
              { icon: '✅', num: '12', label: 'Leçons terminées', change: '↑ +3 cette semaine' },
              { icon: '📝', num: '2', label: 'Devoirs en attente', change: '⚠ Urgent', danger: true },
              { icon: '⭐', num: '14.5', label: 'Moyenne générale', change: '↑ Bien' },
            ].map((stat, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={{
                  ...styles.statChange,
                  color: stat.danger ? '#EF4444' : '#22C55E'
                }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* COURS */}
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Mes cours en cours</h3>
            <span
              style={styles.sectionLink}
              onClick={() => navigate('/courses')}
            >
              Voir tous →
            </span>
          </div>

          <div style={styles.coursesGrid}>
            {courses.map((course) => (
              <div
                key={course.id}
                style={styles.courseCard}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div style={{
                  ...styles.courseThumb,
                  background: course.color
                }}>
                  <span style={{fontSize:'48px'}}>{course.emoji}</span>
                </div>
                <div style={styles.courseBody}>
                  <div style={styles.courseTitle}>{course.title}</div>
                  <div style={styles.courseTeacher}>👨‍🏫 {course.teacher}</div>
                  <div style={styles.progressWrap}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${course.progress}%`
                    }} />
                  </div>
                  <div style={styles.progressLabel}>
                    <span>{course.progress}% complété</span>
                    <span>{course.done}/{course.total} leçons</span>
                  </div>
                </div>
                <div style={styles.courseFooter}>
                  <button
                    style={course.progress >= 80 ? styles.btnGoldSm : styles.btnPrimarySm}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/courses/${course.id}`)
                    }}
                  >
                    {course.progress >= 80 ? 'Terminer 🏁' : 'Continuer'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex' },
  main: { flex: 1, padding: '32px 40px', background: '#F0F4F8' },
  banner: {
    background: 'linear-gradient(135deg, #1B2E4B, #243857)',
    borderRadius: '16px', padding: '28px 32px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px', color: '#fff',
  },
  bannerTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' },
  bannerSub: { fontSize: '14px', color: 'rgba(255,255,255,0.65)' },
  bannerBtns: { display: 'flex', gap: '8px', marginTop: '16px' },
  bannerEmoji: { fontSize: '56px' },
  btnGold: {
    padding: '8px 16px', borderRadius: '8px',
    background: '#F5A623', color: '#1B2E4B',
    border: 'none', fontWeight: '700',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnOutline: {
    padding: '8px 16px', borderRadius: '8px',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.3)',
    color: '#fff', fontWeight: '600',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
    gap: '16px', marginBottom: '24px',
  },
  statCard: {
    background: '#fff', borderRadius: '14px',
    padding: '20px 24px', border: '1px solid #DDE5F0',
  },
  statIcon: { fontSize: '24px', marginBottom: '8px' },
  statNum: { fontSize: '28px', fontWeight: '800', color: '#1B2E4B' },
  statLabel: { fontSize: '13px', color: '#64748B', fontWeight: '500' },
  statChange: { fontSize: '12px', fontWeight: '600', marginTop: '4px' },
  sectionHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  sectionTitle: { fontSize: '16px', fontWeight: '800', color: '#1B2E4B' },
  sectionLink: {
    fontSize: '13px', fontWeight: '600',
    color: '#1B2E4B', cursor: 'pointer', opacity: .7,
  },
  coursesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px',
  },
  courseCard: {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #DDE5F0', overflow: 'hidden',
    cursor: 'pointer', transition: 'transform .2s',
  },
  courseThumb: {
    height: '140px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  courseBody: { padding: '16px' },
  courseTitle: {
    fontSize: '15px', fontWeight: '700',
    color: '#1B2E4B', marginBottom: '6px',
  },
  courseTeacher: {
    fontSize: '12px', color: '#64748B', marginBottom: '12px',
  },
  progressWrap: {
    background: '#E2EAF4', borderRadius: '4px',
    height: '6px', marginBottom: '6px',
  },
  progressFill: {
    height: '100%', borderRadius: '4px',
    background: 'linear-gradient(90deg, #1B2E4B, #F5A623)',
  },
  progressLabel: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '11px', color: '#64748B',
  },
  courseFooter: {
    padding: '12px 16px',
    borderTop: '1px solid #DDE5F0',
    display: 'flex', justifyContent: 'flex-end',
  },
  btnPrimarySm: {
    padding: '6px 14px', borderRadius: '8px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnGoldSm: {
    padding: '6px 14px', borderRadius: '8px',
    background: '#F5A623', color: '#1B2E4B',
    border: 'none', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
}

export default DashboardStudent