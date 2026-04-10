import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const devoirsData = [
  {
    id: 1,
    titre: 'Projet Todo App',
    cours: 'React JS Avancé',
    professeur: 'Prof. Baba TOP',
    deadline: '15/04/2026',
    status: 'en_attente',
    description: 'Créer une application Todo complète avec React, hooks et localStorage.',
  },
  {
    id: 2,
    titre: 'API REST avec Django',
    cours: 'Python & Django',
    professeur: 'Prof. Amadou BA',
    deadline: '20/04/2026',
    status: 'en_attente',
    description: 'Créer une API REST complète avec Django REST Framework.',
  },
  {
    id: 3,
    titre: 'Modélisation BDD',
    cours: 'SQL & PostgreSQL',
    professeur: 'Prof. Fatou NDIAYE',
    deadline: '10/04/2026',
    status: 'soumis',
    description: 'Modéliser une base de données pour un système de gestion.',
    fichier: 'modélisation_bdd.pdf',
    note: '16/20',
  },
]

function Devoirs() {
  const navigate = useNavigate()
  const [devoirs, setDevoirs] = useState(devoirsData)
  const [selectedDevoir, setSelectedDevoir] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [fichier, setFichier] = useState(null)
  const [commentaire, setCommentaire] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSoumettre = (devoir) => {
    setSelectedDevoir(devoir)
    setShowModal(true)
    setFichier(null)
    setCommentaire('')
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fichier) return

    setLoading(true)
    // Simulation d'un envoi
    await new Promise(r => setTimeout(r, 1500))

    setDevoirs(prev => prev.map(d =>
      d.id === selectedDevoir.id
        ? { ...d, status: 'soumis', fichier: fichier.name }
        : d
    ))

    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      setShowModal(false)
      setSuccess(false)
    }, 2000)
  }

  const getBadge = (status) => {
    if (status === 'soumis') return { label: '✅ Soumis', bg: '#DCFCE7', color: '#15803D' }
    return { label: '⏳ En attente', bg: '#FEF9C3', color: '#854D0E' }
  }

  const isUrgent = (deadline) => {
    const [day, month, year] = deadline.split('/')
    const date = new Date(`${year}-${month}-${day}`)
    const diff = (date - new Date()) / (1000 * 60 * 60 * 24)
    return diff <= 3
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
              <h1 style={styles.title}>Mes Devoirs 📝</h1>
              <p style={styles.sub}>
                {devoirs.filter(d => d.status === 'en_attente').length} devoir(s) en attente
              </p>
            </div>
          </div>

          {/* STATS */}
          <div style={styles.statsGrid}>
            {[
              { icon: '📝', num: devoirs.length, label: 'Total', color: '#2563EB' },
              { icon: '⏳', num: devoirs.filter(d => d.status === 'en_attente').length, label: 'En attente', color: '#D97706' },
              { icon: '✅', num: devoirs.filter(d => d.status === 'soumis').length, label: 'Soumis', color: '#16A34A' },
            ].map((s, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon}>{s.icon}</div>
                <div style={{ ...styles.statNum, color: s.color }}>{s.num}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* LISTE DEVOIRS */}
          <div style={styles.list}>
            {devoirs.map(devoir => {
              const badge = getBadge(devoir.status)
              const urgent = isUrgent(devoir.deadline) && devoir.status === 'en_attente'
              return (
                <div
                  key={devoir.id}
                  style={{
                    ...styles.card,
                    borderLeft: urgent
                      ? '4px solid #DC2626'
                      : devoir.status === 'soumis'
                      ? '4px solid #16A34A'
                      : '4px solid #2563EB',
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div>
                      <div style={styles.cardTitle}>{devoir.titre}</div>
                      <div style={styles.cardMeta}>
                        📚 {devoir.cours} &nbsp;·&nbsp; 👨‍🏫 {devoir.professeur}
                      </div>
                    </div>
                    <div style={styles.cardRight}>
                      <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
                        {badge.label}
                      </span>
                      {devoir.note && (
                        <span style={styles.note}>⭐ {devoir.note}</span>
                      )}
                    </div>
                  </div>

                  <p style={styles.desc}>{devoir.description}</p>

                  <div style={styles.cardFooter}>
                    <div style={styles.deadline}>
                      <span style={{ color: urgent ? '#DC2626' : 'var(--muted)', fontSize: '13px', fontWeight: urgent ? '700' : '400' }}>
                        {urgent ? '🚨' : '📅'} Deadline : {devoir.deadline}
                        {urgent && ' — URGENT !'}
                      </span>
                      {devoir.fichier && (
                        <span style={styles.fichierTag}>
                          📎 {devoir.fichier}
                        </span>
                      )}
                    </div>
                    {devoir.status === 'en_attente' && (
                      <button
                        style={styles.btnPrimary}
                        onClick={() => handleSoumettre(devoir)}
                      >
                        📤 Soumettre
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

        </main>
      </div>

      {/* MODAL SOUMISSION */}
      {showModal && selectedDevoir && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {success ? (
              <div style={styles.successBox}>
                <div style={{ fontSize: '48px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#15803D', margin: '12px 0 6px' }}>
                  Devoir soumis !
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>
                  Votre devoir a été envoyé avec succès.
                </p>
              </div>
            ) : (
              <>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalTitle}>📤 Soumettre le devoir</h3>
                  <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                </div>

                <div style={styles.devoirInfo}>
                  <div style={styles.devoirInfoTitle}>{selectedDevoir.titre}</div>
                  <div style={styles.devoirInfoMeta}>{selectedDevoir.cours}</div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>📎 Fichier (PDF, ZIP, etc.) *</label>
                    <div
                      style={{
                        ...styles.fileZone,
                        borderColor: fichier ? '#16A34A' : '#CBD5E1',
                        background: fichier ? '#F0FDF4' : '#F8FAFC',
                      }}
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      {fichier ? (
                        <div>
                          <div style={{ fontSize: '24px', marginBottom: '6px' }}>✅</div>
                          <div style={{ fontWeight: '600', color: '#15803D' }}>{fichier.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {(fichier.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📂</div>
                          <div style={{ fontWeight: '600', color: '#64748B' }}>
                            Cliquez pour choisir un fichier
                          </div>
                          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                            PDF, ZIP, RAR, DOCX acceptés
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      accept=".pdf,.zip,.rar,.docx,.doc"
                      onChange={(e) => setFichier(e.target.files[0])}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>💬 Commentaire (optionnel)</label>
                    <textarea
                      style={styles.textarea}
                      placeholder="Ajoutez un commentaire pour votre professeur..."
                      value={commentaire}
                      onChange={(e) => setCommentaire(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div style={styles.modalBtns}>
                    <button
                      type="button"
                      style={styles.btnOutline}
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      style={{
                        ...styles.btnPrimary,
                        opacity: !fichier || loading ? 0.6 : 1,
                      }}
                      disabled={!fichier || loading}
                    >
                      {loading ? '⏳ Envoi...' : '📤 Soumettre le devoir'}
                    </button>
                  </div>
                </form>
              </>
            )}
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
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #DDE5F0', textAlign: 'center' },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statNum: { fontSize: '28px', fontWeight: '800', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#64748B' },
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #DDE5F0', padding: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px' },
  cardMeta: { fontSize: '13px', color: '#64748B' },
  cardRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  note: { fontSize: '13px', fontWeight: '700', color: '#D97706' },
  desc: { fontSize: '14px', color: '#64748B', marginBottom: '14px', lineHeight: '1.6' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  deadline: { display: 'flex', flexDirection: 'column', gap: '4px' },
  fichierTag: { fontSize: '12px', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' },
  btnPrimary: { padding: '10px 20px', borderRadius: '10px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnOutline: { padding: '10px 20px', borderRadius: '10px', background: 'transparent', color: '#64748B', border: '1.5px solid #DDE5F0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: '16px', padding: '32px', width: '520px', maxWidth: '90vw' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' },
  devoirInfo: { background: '#F8FAFC', borderRadius: '10px', padding: '14px', marginBottom: '20px' },
  devoirInfoTitle: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px' },
  devoirInfoMeta: { fontSize: '13px', color: '#64748B' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1B2E4B', marginBottom: '8px' },
  fileZone: { border: '2px dashed', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  textarea: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #DDE5F0', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', color: '#1A2332' },
  modalBtns: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' },
  successBox: { textAlign: 'center', padding: '32px' },
}

export default Devoirs