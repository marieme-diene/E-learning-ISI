import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const contenuData = [
  {
    id: 1,
    type: 'video',
    titre: 'Introduction à React',
    cours: 'React JS Avancé',
    duree: '45 min',
    taille: null,
    url: '#',
    thumbnail: '⚛️',
    color: '#1B2E4B',
    vues: 128,
  },
  {
    id: 2,
    type: 'pdf',
    titre: 'Support de cours React',
    cours: 'React JS Avancé',
    duree: null,
    taille: '2.4 MB',
    url: '#',
    thumbnail: '📄',
    color: '#DC2626',
    telechargements: 45,
  },
  {
    id: 3,
    type: 'video',
    titre: 'Les Hooks en React',
    cours: 'React JS Avancé',
    duree: '1h 10 min',
    taille: null,
    url: '#',
    thumbnail: '🪝',
    color: '#7C3AED',
    vues: 89,
  },
  {
    id: 4,
    type: 'pdf',
    titre: 'Exercices pratiques Python',
    cours: 'Python & Django',
    duree: null,
    taille: '1.8 MB',
    url: '#',
    thumbnail: '🐍',
    color: '#059669',
    telechargements: 67,
  },
  {
    id: 5,
    type: 'video',
    titre: 'Introduction à Django',
    cours: 'Python & Django',
    duree: '55 min',
    taille: null,
    url: '#',
    thumbnail: '🎬',
    color: '#0891B2',
    vues: 102,
  },
  {
    id: 6,
    type: 'pdf',
    titre: 'Guide SQL Avancé',
    cours: 'SQL & PostgreSQL',
    duree: null,
    taille: '3.1 MB',
    url: '#',
    thumbnail: '🗄️',
    color: '#D97706',
    telechargements: 34,
  },
]

function Multimedia() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('tous')
  const [search, setSearch] = useState('')
  const [playing, setPlaying] = useState(null)

  const filtered = contenuData.filter(c => {
    const matchFilter = filter === 'tous' || c.type === filter
    const matchSearch = c.titre.toLowerCase().includes(search.toLowerCase()) ||
      c.cours.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Contenus Multimédia 🎥</h1>
              <p style={styles.sub}>Vidéos et documents de vos cours</p>
            </div>
          </div>

          {/* STATS */}
          <div style={styles.statsGrid}>
            {[
              { icon: '🎥', num: contenuData.filter(c => c.type === 'video').length, label: 'Vidéos', color: '#7C3AED' },
              { icon: '📄', num: contenuData.filter(c => c.type === 'pdf').length, label: 'Documents PDF', color: '#DC2626' },
              { icon: '👁️', num: '319', label: 'Vues totales', color: '#2563EB' },
              { icon: '⬇️', num: '146', label: 'Téléchargements', color: '#16A34A' },
            ].map((s, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon}>{s.icon}</div>
                <div style={{ ...styles.statNum, color: s.color }}>{s.num}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* FILTRES */}
          <div style={styles.filterBar}>
            <input
              style={styles.search}
              placeholder="🔍 Rechercher un contenu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={styles.filterBtns}>
              {[
                { key: 'tous', label: '📚 Tous' },
                { key: 'video', label: '🎥 Vidéos' },
                { key: 'pdf', label: '📄 PDFs' },
              ].map(f => (
                <button
                  key={f.key}
                  style={{
                    ...styles.filterBtn,
                    background: filter === f.key ? '#1B2E4B' : '#fff',
                    color: filter === f.key ? '#fff' : '#64748B',
                    borderColor: filter === f.key ? '#1B2E4B' : '#DDE5F0',
                  }}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* GRILLE CONTENUS */}
          <div style={styles.grid}>
            {filtered.map(contenu => (
              <div key={contenu.id} style={styles.card}>

                {/* THUMBNAIL */}
                <div
                  style={{
                    ...styles.thumbnail,
                    background: contenu.color,
                  }}
                  onClick={() => contenu.type === 'video' && setPlaying(contenu)}
                >
                  <span style={{ fontSize: '48px' }}>{contenu.thumbnail}</span>
                  {contenu.type === 'video' && (
                    <div style={styles.playOverlay}>
                      <div style={styles.playBtn}>▶</div>
                    </div>
                  )}
                  <div style={styles.typeBadge}>
                    {contenu.type === 'video' ? '🎥 Vidéo' : '📄 PDF'}
                  </div>
                </div>

                {/* INFOS */}
                <div style={styles.cardBody}>
                  <div style={styles.cardCours}>{contenu.cours}</div>
                  <div style={styles.cardTitre}>{contenu.titre}</div>
                  <div style={styles.cardMeta}>
                    {contenu.type === 'video' ? (
                      <span>⏱ {contenu.duree} &nbsp;·&nbsp; 👁️ {contenu.vues} vues</span>
                    ) : (
                      <span>📦 {contenu.taille} &nbsp;·&nbsp; ⬇️ {contenu.telechargements} téléchargements</span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div style={styles.cardFooter}>
                  {contenu.type === 'video' ? (
                    <button
                      style={styles.btnPrimary}
                      onClick={() => setPlaying(contenu)}
                    >
                      ▶ Regarder
                    </button>
                  ) : (
                    <button style={styles.btnGold}>
                      ⬇️ Télécharger
                    </button>
                  )}
                  <button style={styles.btnOutline}>
                    🔖 Sauvegarder
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={styles.empty}>
              <div style={{ fontSize: '48px' }}>🔍</div>
              <h3 style={{ color: '#1B2E4B', marginTop: '12px' }}>Aucun contenu trouvé</h3>
              <p style={{ color: '#64748B', marginTop: '6px' }}>Essayez un autre mot-clé</p>
            </div>
          )}

        </main>
      </div>

      {/* MODAL VIDEO */}
      {playing && (
        <div style={styles.overlay}>
          <div style={styles.videoModal}>
            <div style={styles.videoModalHeader}>
              <h3 style={styles.videoModalTitle}>{playing.titre}</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setPlaying(null)}
              >
                ✕
              </button>
            </div>
            <div style={styles.videoPlayer}>
              <div style={styles.videoPlayerInner}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                  {playing.thumbnail}
                </div>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  {playing.titre}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                  {playing.cours} · {playing.duree}
                </div>
                <div style={styles.videoControls}>
                  <button style={styles.videoBtn}>⏮</button>
                  <button style={{ ...styles.videoBtn, ...styles.videoBtnMain }}>⏸</button>
                  <button style={styles.videoBtn}>⏭</button>
                </div>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '8px' }}>
                  12:34 / {playing.duree}
                </div>
              </div>
            </div>
            <div style={styles.videoInfo}>
              <div style={styles.videoInfoTitle}>{playing.cours}</div>
              <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                👁️ {playing.vues} vues · ⏱ {playing.duree}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  layout: { display: 'flex' },
  main: { flex: 1, padding: '32px 40px', background: '#F0F4F8', minHeight: 'calc(100vh - 68px)' },
  header: { marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  sub: { fontSize: '14px', color: '#64748B' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #DDE5F0', textAlign: 'center' },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statNum: { fontSize: '28px', fontWeight: '800', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#64748B' },
  filterBar: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' },
  search: { padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #DDE5F0', fontSize: '14px', outline: 'none', width: '280px', fontFamily: 'inherit' },
  filterBtns: { display: 'flex', gap: '8px' },
  filterBtn: { padding: '8px 16px', borderRadius: '20px', border: '1.5px solid', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' },
  card: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', overflow: 'hidden', cursor: 'pointer' },
  thumbnail: { height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  playOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' },
  playBtn: { width: '48px', height: '48px', borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#1B2E4B', fontWeight: '700' },
  typeBadge: { position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' },
  cardBody: { padding: '14px 16px' },
  cardCours: { fontSize: '11px', fontWeight: '700', color: '#F5A623', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' },
  cardTitre: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B', marginBottom: '8px' },
  cardMeta: { fontSize: '12px', color: '#64748B' },
  cardFooter: { padding: '12px 16px', borderTop: '1px solid #DDE5F0', display: 'flex', gap: '8px' },
  btnPrimary: { flex: 1, padding: '8px', borderRadius: '8px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnGold: { flex: 1, padding: '8px', borderRadius: '8px', background: '#F5A623', color: '#1B2E4B', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnOutline: { padding: '8px 12px', borderRadius: '8px', background: 'transparent', color: '#64748B', border: '1.5px solid #DDE5F0', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  empty: { textAlign: 'center', padding: '60px', color: '#64748B' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  videoModal: { background: '#fff', borderRadius: '16px', width: '600px', maxWidth: '90vw', overflow: 'hidden' },
  videoModalHeader: { padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #DDE5F0' },
  videoModalTitle: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' },
  videoPlayer: { background: '#0F1E33', padding: '32px' },
  videoPlayerInner: { textAlign: 'center' },
  videoControls: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' },
  videoBtn: { width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' },
  videoBtnMain: { width: '52px', height: '52px', background: '#F5A623', color: '#1B2E4B' },
  progressBar: { background: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '4px', marginTop: '20px' },
  progressFill: { width: '40%', height: '100%', background: '#F5A623', borderRadius: '4px' },
  videoInfo: { padding: '16px 20px' },
  videoInfoTitle: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B' },
}

export default Multimedia