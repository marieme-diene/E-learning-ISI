import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const notesData = [
  {
    id: 1,
    cours: 'React JS Avancé',
    professeur: 'Prof. Baba TOP',
    emoji: '⚛️',
    color: '#1B2E4B',
    notes: [
      { type: 'Quiz 1', note: 18, sur: 20, date: '15/02/2026' },
      { type: 'Devoir 1', note: 16, sur: 20, date: '01/03/2026' },
      { type: 'Quiz 2', note: 17, sur: 20, date: '20/03/2026' },
    ],
  },
  {
    id: 2,
    cours: 'Python & Django',
    professeur: 'Prof. Amadou BA',
    emoji: '🐍',
    color: '#7C3AED',
    notes: [
      { type: 'Quiz 1', note: 14, sur: 20, date: '10/02/2026' },
      { type: 'Devoir 1', note: 15, sur: 20, date: '25/02/2026' },
    ],
  },
  {
    id: 3,
    cours: 'SQL & PostgreSQL',
    professeur: 'Prof. Fatou NDIAYE',
    emoji: '🗄️',
    color: '#059669',
    notes: [
      { type: 'Quiz 1', note: 19, sur: 20, date: '05/02/2026' },
      { type: 'Devoir 1', note: 17, sur: 20, date: '20/02/2026' },
      { type: 'Examen', note: 16, sur: 20, date: '10/03/2026' },
    ],
  },
]

const coursDisponibles = [
  { id: 4, titre: 'Cybersécurité', professeur: 'Prof. Moussa DIOP', emoji: '🔐', color: '#DC2626', places: 15, inscrits: 38 },
  { id: 5, titre: 'Node.js & Express', professeur: 'Prof. Ibrahima FALL', emoji: '🟢', color: '#16A34A', places: 20, inscrits: 12 },
  { id: 6, titre: 'Machine Learning', professeur: 'Prof. Aissatou SOW', emoji: '🤖', color: '#7C3AED', places: 25, inscrits: 20 },
]

function Notes() {
  const [activeTab, setActiveTab] = useState('notes')
  const [inscriptions, setInscriptions] = useState([])
  const [showSuccess, setShowSuccess] = useState(null)

  const getMoyenne = (notes) => {
    const total = notes.reduce((acc, n) => acc + (n.note / n.sur) * 20, 0)
    return (total / notes.length).toFixed(1)
  }

  const getMoyenneGenerale = () => {
    const toutes = notesData.flatMap(c => c.notes)
    const total = toutes.reduce((acc, n) => acc + (n.note / n.sur) * 20, 0)
    return (total / toutes.length).toFixed(1)
  }

  const getMention = (moy) => {
    if (moy >= 16) return { label: 'Très Bien', color: '#15803D', bg: '#DCFCE7' }
    if (moy >= 14) return { label: 'Bien', color: '#1D4ED8', bg: '#DBEAFE' }
    if (moy >= 12) return { label: 'Assez Bien', color: '#D97706', bg: '#FEF9C3' }
    return { label: 'Passable', color: '#DC2626', bg: '#FEE2E2' }
  }

  const handleInscrire = (cours) => {
    if (inscriptions.includes(cours.id)) return
    setInscriptions(prev => [...prev, cours.id])
    setShowSuccess(cours.id)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const moyGenerale = getMoyenneGenerale()
  const mention = getMention(parseFloat(moyGenerale))

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* HEADER */}
          <div style={styles.header}>
            <h1 style={styles.title}>Notes & Inscriptions 📊</h1>
            <p style={styles.sub}>Suivez vos résultats et inscrivez-vous à de nouveaux cours</p>
          </div>

          {/* TABS */}
          <div style={styles.tabs}>
            {[
              { key: 'notes', label: '📊 Mes Notes' },
              { key: 'inscriptions', label: '📚 S\'inscrire à un cours' },
            ].map(tab => (
              <button
                key={tab.key}
                style={{
                  ...styles.tab,
                  background: activeTab === tab.key ? '#1B2E4B' : '#fff',
                  color: activeTab === tab.key ? '#fff' : '#64748B',
                  borderColor: activeTab === tab.key ? '#1B2E4B' : '#DDE5F0',
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ONGLET NOTES */}
          {activeTab === 'notes' && (
            <div>
              {/* MOYENNE GENERALE */}
              <div style={styles.moyenneCard}>
                <div style={styles.moyenneLeft}>
                  <div style={styles.moyenneNum}>{moyGenerale}</div>
                  <div style={styles.moyenneSur}>/20</div>
                </div>
                <div style={styles.moyenneRight}>
                  <h3 style={styles.moyenneTitle}>Moyenne Générale</h3>
                  <span style={{
                    ...styles.mention,
                    background: mention.bg,
                    color: mention.color,
                  }}>
                    🏆 {mention.label}
                  </span>
                  <p style={styles.moyenneSub}>
                    Sur {notesData.reduce((acc, c) => acc + c.notes.length, 0)} évaluations
                  </p>
                </div>
              </div>

              {/* NOTES PAR COURS */}
              {notesData.map(cours => {
                const moy = getMoyenne(cours.notes)
                const m = getMention(parseFloat(moy))
                return (
                  <div key={cours.id} style={styles.coursCard}>
                    <div style={styles.coursHeader}>
                      <div style={styles.coursLeft}>
                        <div style={{ ...styles.coursEmoji, background: cours.color }}>
                          {cours.emoji}
                        </div>
                        <div>
                          <div style={styles.coursTitre}>{cours.cours}</div>
                          <div style={styles.coursProfesseur}>👨‍🏫 {cours.professeur}</div>
                        </div>
                      </div>
                      <div style={styles.coursMoyenne}>
                        <div style={styles.coursMoyenneNum}>{moy}/20</div>
                        <span style={{ ...styles.mention, background: m.bg, color: m.color }}>
                          {m.label}
                        </span>
                      </div>
                    </div>

                    {/* TABLEAU DES NOTES */}
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          {['Évaluation', 'Note', 'Sur', 'Pourcentage', 'Date'].map(h => (
                            <th key={h} style={styles.th}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cours.notes.map((n, i) => {
                          const pct = Math.round((n.note / n.sur) * 100)
                          return (
                            <tr key={i} style={styles.tr}>
                              <td style={styles.td}>{n.type}</td>
                              <td style={{ ...styles.td, fontWeight: '700', color: '#1B2E4B' }}>
                                {n.note}
                              </td>
                              <td style={styles.td}>{n.sur}</td>
                              <td style={styles.td}>
                                <div style={styles.pctWrap}>
                                  <div style={styles.pctBar}>
                                    <div style={{
                                      ...styles.pctFill,
                                      width: `${pct}%`,
                                      background: pct >= 80 ? '#16A34A' : pct >= 60 ? '#2563EB' : '#DC2626',
                                    }} />
                                  </div>
                                  <span style={styles.pctNum}>{pct}%</span>
                                </div>
                              </td>
                              <td style={{ ...styles.td, color: '#64748B' }}>{n.date}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              })}
            </div>
          )}

          {/* ONGLET INSCRIPTIONS */}
          {activeTab === 'inscriptions' && (
            <div>
              <div style={styles.inscriptionHeader}>
                <h3 style={styles.inscriptionTitle}>Cours disponibles</h3>
                <p style={styles.inscriptionSub}>Inscrivez-vous à de nouveaux cours pour enrichir votre formation</p>
              </div>

              <div style={styles.coursGrid}>
                {coursDisponibles.map(cours => {
                  const estInscrit = inscriptions.includes(cours.id)
                  const placesRestantes = cours.places - cours.inscrits
                  return (
                    <div key={cours.id} style={styles.coursInscCard}>
                      <div style={{ ...styles.coursInscThumb, background: cours.color }}>
                        <span style={{ fontSize: '48px' }}>{cours.emoji}</span>
                      </div>
                      <div style={styles.coursInscBody}>
                        <div style={styles.coursInscTitre}>{cours.titre}</div>
                        <div style={styles.coursInscProf}>👨‍🏫 {cours.professeur}</div>
                        <div style={styles.coursInscMeta}>
                          <span style={{
                            ...styles.placesTag,
                            background: placesRestantes < 5 ? '#FEE2E2' : '#DCFCE7',
                            color: placesRestantes < 5 ? '#DC2626' : '#15803D',
                          }}>
                            {placesRestantes < 5 ? '🔥' : '✅'} {placesRestantes} places restantes
                          </span>
                          <span style={styles.inscritsTag}>
                            👥 {cours.inscrits} inscrits
                          </span>
                        </div>
                      </div>
                      <div style={styles.coursInscFooter}>
                        {showSuccess === cours.id && (
                          <div style={styles.successMsg}>
                            🎉 Inscription réussie !
                          </div>
                        )}
                        <button
                          style={{
                            ...styles.btnInscrire,
                            background: estInscrit ? '#DCFCE7' : '#1B2E4B',
                            color: estInscrit ? '#15803D' : '#fff',
                            cursor: estInscrit ? 'default' : 'pointer',
                          }}
                          onClick={() => handleInscrire(cours)}
                          disabled={estInscrit}
                        >
                          {estInscrit ? '✅ Inscrit' : '+ S\'inscrire'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex' },
  main: { flex: 1, padding: '32px 40px', background: '#F0F4F8', minHeight: 'calc(100vh - 68px)' },
  header: { marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  sub: { fontSize: '14px', color: '#64748B' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: { padding: '10px 20px', borderRadius: '10px', border: '1.5px solid', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  moyenneCard: { background: 'linear-gradient(135deg, #1B2E4B, #243857)', borderRadius: '16px', padding: '28px', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', color: '#fff' },
  moyenneLeft: { display: 'flex', alignItems: 'baseline', gap: '4px' },
  moyenneNum: { fontSize: '64px', fontWeight: '900', color: '#F5A623' },
  moyenneSur: { fontSize: '24px', color: 'rgba(255,255,255,0.6)' },
  moyenneRight: { flex: 1 },
  moyenneTitle: { fontSize: '20px', fontWeight: '800', marginBottom: '8px' },
  mention: { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '8px' },
  moyenneSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
  coursCard: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', padding: '20px', marginBottom: '16px' },
  coursHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  coursLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  coursEmoji: { width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
  coursTitre: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B', marginBottom: '2px' },
  coursProfesseur: { fontSize: '13px', color: '#64748B' },
  coursMoyenne: { textAlign: 'right' },
  coursMoyenneNum: { fontSize: '24px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#64748B', borderBottom: '2px solid #DDE5F0' },
  tr: { borderBottom: '1px solid #DDE5F0' },
  td: { padding: '12px', fontSize: '14px', color: '#1A2332' },
  pctWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  pctBar: { flex: 1, background: '#E2EAF4', borderRadius: '4px', height: '6px' },
  pctFill: { height: '100%', borderRadius: '4px' },
  pctNum: { fontSize: '12px', fontWeight: '600', color: '#64748B', minWidth: '35px' },
  inscriptionHeader: { marginBottom: '20px' },
  inscriptionTitle: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px' },
  inscriptionSub: { fontSize: '14px', color: '#64748B' },
  coursGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' },
  coursInscCard: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', overflow: 'hidden' },
  coursInscThumb: { height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  coursInscBody: { padding: '16px' },
  coursInscTitre: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B', marginBottom: '6px' },
  coursInscProf: { fontSize: '13px', color: '#64748B', marginBottom: '10px' },
  coursInscMeta: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  placesTag: { fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' },
  inscritsTag: { fontSize: '11px', color: '#64748B', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px' },
  coursInscFooter: { padding: '12px 16px', borderTop: '1px solid #DDE5F0' },
  successMsg: { fontSize: '13px', color: '#15803D', fontWeight: '600', marginBottom: '8px', textAlign: 'center' },
  btnInscrire: { width: '100%', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '600', fontFamily: 'inherit' },
}

export default Notes