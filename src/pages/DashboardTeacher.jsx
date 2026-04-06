import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const devoirs = [
  { id: 1, etudiant: 'Marieme Dieme', initiales: 'MD', cours: 'React JS Avancé', devoir: 'Projet Todo App', date: '02/04/2026', status: 'attente', color: '#F5A623' },
  { id: 2, etudiant: 'Amadou Baldé', initiales: 'AB', cours: 'React JS Avancé', devoir: 'Composants & Props', date: '01/04/2026', status: 'attente', color: '#3B82F6' },
  { id: 3, etudiant: 'Fatou Ndiaye', initiales: 'FN', cours: 'React JS Avancé', devoir: 'Hooks avancés', date: '31/03/2026', status: 'corrige', color: '#22C55E' },
  { id: 4, etudiant: 'Ibrahima Fall', initiales: 'IF', cours: 'React JS Avancé', devoir: 'React Router', date: '30/03/2026', status: 'attente', color: '#7C3AED' },
]

function DashboardTeacher() {
  const navigate = useNavigate()

  const getBadge = (status) => {
    if (status === 'corrige') return { label: '✅ Corrigé', bg: '#DCFCE7', color: '#15803D' }
    return { label: '⏳ En attente', bg: '#FEF9C3', color: '#854D0E' }
  }

  return (
    <div>
      <Navbar role="enseignant" />
      <div style={styles.layout}>
        <Sidebar role="enseignant" />
        <main style={styles.main}>

          {/* BANNER */}
          <div style={styles.banner}>
            <div>
              <h2 style={styles.bannerTitle}>Bonjour Prof. Baba TOP ! 👨‍🏫</h2>
              <p style={styles.bannerSub}>
                {devoirs.filter(d => d.status === 'attente').length} devoirs sont en attente de correction
              </p>
              <div style={styles.bannerBtns}>
                <button style={styles.btnPrimary}>
                  Corriger les devoirs
                </button>
                <button
                  style={styles.btnOutline}
                  onClick={() => navigate('/courses')}
                >
                  + Nouveau cours
                </button>
              </div>
            </div>
            <div style={styles.bannerEmoji}>👨‍🏫</div>
          </div>

          {/* STATS */}
          <div style={styles.statGrid}>
            {[
              { icon: '📚', num: '3', label: 'Cours publiés' },
              { icon: '👥', num: '142', label: 'Étudiants inscrits' },
              { icon: '📝', num: '8', label: 'Devoirs à corriger', danger: true },
              { icon: '⭐', num: '4.8', label: 'Note moyenne cours' },
            ].map((stat, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
                {stat.danger && (
                  <div style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600', marginTop: '4px' }}>
                    ⚠ En attente
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MES COURS */}
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Mes cours</h3>
            <button
              style={styles.btnGoldSm}
              onClick={() => navigate('/courses')}
            >
              + Créer un cours
            </button>
          </div>

          <div style={styles.coursesRow}>
            {[
              { emoji: '⚛️', title: 'React JS Avancé', students: 48, color: '#1B2E4B' },
              { emoji: '🐍', title: 'Python & Django', students: 52, color: '#7C3AED' },
              { emoji: '🗄️', title: 'SQL & PostgreSQL', students: 42, color: '#059669' },
            ].map((c, i) => (
              <div key={i} style={styles.miniCard}>
                <div style={{ ...styles.miniThumb, background: c.color }}>
                  <span style={{ fontSize: '32px' }}>{c.emoji}</span>
                </div>
                <div style={styles.miniBody}>
                  <div style={styles.miniTitle}>{c.title}</div>
                  <div style={styles.miniStudents}>👥 {c.students} étudiants</div>
                </div>
                <button style={styles.btnOutlineSm}>Gérer</button>
              </div>
            ))}
          </div>

          {/* DEVOIRS */}
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Devoirs récents à corriger</h3>
          </div>

          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Étudiant', 'Cours', 'Devoir', 'Soumis le', 'Statut', 'Action'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devoirs.map((d) => {
                  const badge = getBadge(d.status)
                  return (
                    <tr key={d.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.etudiantCell}>
                          <div style={{ ...styles.avatar, background: d.color }}>
                            {d.initiales}
                          </div>
                          {d.etudiant}
                        </div>
                      </td>
                      <td style={styles.td}>{d.cours}</td>
                      <td style={styles.td}>{d.devoir}</td>
                      <td style={styles.td}>{d.date}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button style={d.status === 'corrige' ? styles.btnOutlineSm : styles.btnPrimarySm}>
                          {d.status === 'corrige' ? 'Voir' : 'Corriger'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    background: 'linear-gradient(135deg, #F5A623, #E8941A)',
    borderRadius: '16px', padding: '28px 32px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: '24px',
  },
  bannerTitle: { fontSize: '22px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  bannerSub: { fontSize: '14px', color: 'rgba(27,46,75,0.65)' },
  bannerBtns: { display: 'flex', gap: '8px', marginTop: '16px' },
  bannerEmoji: { fontSize: '56px' },
  btnPrimary: {
    padding: '8px 16px', borderRadius: '8px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontWeight: '700',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnOutline: {
    padding: '8px 16px', borderRadius: '8px',
    background: 'transparent',
    border: '1.5px solid #1B2E4B',
    color: '#1B2E4B', fontWeight: '600',
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
  sectionHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  sectionTitle: { fontSize: '16px', fontWeight: '800', color: '#1B2E4B' },
  btnGoldSm: {
    padding: '8px 16px', borderRadius: '8px',
    background: '#F5A623', color: '#1B2E4B',
    border: 'none', fontSize: '13px',
    fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
  },
  coursesRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
    gap: '16px', marginBottom: '24px',
  },
  miniCard: {
    background: '#fff', borderRadius: '12px',
    border: '1px solid #DDE5F0', overflow: 'hidden',
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '0 16px 0 0',
  },
  miniThumb: {
    width: '72px', height: '72px', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  miniBody: { flex: 1 },
  miniTitle: { fontSize: '14px', fontWeight: '700', color: '#1B2E4B' },
  miniStudents: { fontSize: '12px', color: '#64748B', marginTop: '4px' },
  btnOutlineSm: {
    padding: '6px 12px', borderRadius: '8px',
    background: 'transparent', color: '#64748B',
    border: '1.5px solid #DDE5F0', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  tableCard: {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #DDE5F0', overflow: 'hidden',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', padding: '12px 16px',
    fontSize: '11px', fontWeight: '700',
    letterSpacing: '1px', textTransform: 'uppercase',
    color: '#64748B', borderBottom: '2px solid #DDE5F0',
  },
  tr: { borderBottom: '1px solid #DDE5F0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#1A2332' },
  etudiantCell: { display: 'flex', alignItems: 'center', gap: '8px' },
  avatar: {
    width: '32px', height: '32px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '12px', color: '#fff',
  },
  badge: {
    padding: '3px 10px', borderRadius: '20px',
    fontSize: '11px', fontWeight: '600',
  },
  btnPrimarySm: {
    padding: '6px 14px', borderRadius: '8px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
}

export default DashboardTeacher