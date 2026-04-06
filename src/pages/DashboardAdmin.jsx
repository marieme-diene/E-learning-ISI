import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const initialEtudiants = [
  { id: 1, nom: 'Marieme Dieme', email: 'marieme@isi.sn', filiere: 'M1 GL', status: 'actif', initiales: 'MD', color: '#F5A623' },
  { id: 2, nom: 'Amadou Baldé', email: 'amadu@isi.sn', filiere: 'M1 GL', status: 'actif', initiales: 'AB', color: '#3B82F6' },
  { id: 3, nom: 'Fatou Ndiaye', email: 'fatou@isi.sn', filiere: 'L3', status: 'inactif', initiales: 'FN', color: '#22C55E' },
  { id: 4, nom: 'Ibrahima Fall', email: 'ibrahima@isi.sn', filiere: 'M1 Réseaux', status: 'actif', initiales: 'IF', color: '#7C3AED' },
]

const initialEnseignants = [
  { id: 1, nom: 'Prof. Baba TOP', email: 'baba@isi.sn', cours: 'React JS Avancé', status: 'actif', initiales: 'BT', color: '#1B2E4B' },
  { id: 2, nom: 'Prof. Amadou BA', email: 'aba@isi.sn', cours: 'Python & Django', status: 'actif', initiales: 'AB', color: '#059669' },
  { id: 3, nom: 'Prof. Fatou NDIAYE', email: 'fndiaye@isi.sn', cours: 'SQL & PostgreSQL', status: 'actif', initiales: 'FN', color: '#DC2626' },
]

const colors = ['#F5A623', '#3B82F6', '#22C55E', '#7C3AED', '#DC2626', '#059669', '#1B2E4B']

function Modal({ title, onClose, children }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{title}</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function DashboardAdmin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // ÉTUDIANTS STATE
  const [etudiants, setEtudiants] = useState(initialEtudiants)
  const [showAddEtudiant, setShowAddEtudiant] = useState(false)
  const [showEditEtudiant, setShowEditEtudiant] = useState(false)
  const [selectedEtudiant, setSelectedEtudiant] = useState(null)
  const [newEtudiant, setNewEtudiant] = useState({ nom: '', email: '', filiere: 'M1 GL', status: 'actif' })

  // ENSEIGNANTS STATE
  const [enseignants, setEnseignants] = useState(initialEnseignants)
  const [showAddEnseignant, setShowAddEnseignant] = useState(false)
  const [showEditEnseignant, setShowEditEnseignant] = useState(false)
  const [selectedEnseignant, setSelectedEnseignant] = useState(null)
  const [newEnseignant, setNewEnseignant] = useState({ nom: '', email: '', cours: '', status: 'actif' })

  // ── ÉTUDIANTS HANDLERS ──
  const handleAddEtudiant = () => {
    if (!newEtudiant.nom || !newEtudiant.email) return
    const initiales = newEtudiant.nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    const color = colors[etudiants.length % colors.length]
    setEtudiants([...etudiants, { ...newEtudiant, id: Date.now(), initiales, color }])
    setNewEtudiant({ nom: '', email: '', filiere: 'M1 GL', status: 'actif' })
    setShowAddEtudiant(false)
  }

  const handleEditEtudiant = () => {
    setEtudiants(etudiants.map(e => e.id === selectedEtudiant.id ? selectedEtudiant : e))
    setShowEditEtudiant(false)
    setSelectedEtudiant(null)
  }

  const handleDeleteEtudiant = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      setEtudiants(etudiants.filter(e => e.id !== id))
    }
  }

  // ── ENSEIGNANTS HANDLERS ──
  const handleAddEnseignant = () => {
    if (!newEnseignant.nom || !newEnseignant.email) return
    const initiales = newEnseignant.nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    const color = colors[enseignants.length % colors.length]
    setEnseignants([...enseignants, { ...newEnseignant, id: Date.now(), initiales, color }])
    setNewEnseignant({ nom: '', email: '', cours: '', status: 'actif' })
    setShowAddEnseignant(false)
  }

  const handleEditEnseignant = () => {
    setEnseignants(enseignants.map(e => e.id === selectedEnseignant.id ? selectedEnseignant : e))
    setShowEditEnseignant(false)
    setSelectedEnseignant(null)
  }

  const handleDeleteEnseignant = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
      setEnseignants(enseignants.filter(e => e.id !== id))
    }
  }

  return (
    <div>
      <Navbar role="admin" />
      <div style={styles.main}>

        {/* BANNER */}
        <div style={styles.banner}>
          <div>
            <h2 style={styles.bannerTitle}>Panneau d'administration ⚙️</h2>
            <p style={styles.bannerSub}>Gérez les étudiants, enseignants et cours de la plateforme</p>
          </div>
          <div style={styles.bannerEmoji}>⚙️</div>
        </div>

        {/* STATS */}
        <div style={styles.statGrid}>
          {[
            { icon: '👥', num: etudiants.length, label: 'Étudiants inscrits', color: '#3B82F6' },
            { icon: '👨‍🏫', num: enseignants.length, label: 'Enseignants actifs', color: '#22C55E' },
            { icon: '📚', num: '48', label: 'Cours publiés', color: '#F5A623' },
            { icon: '📝', num: '156', label: 'Devoirs soumis', color: '#7C3AED' },
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={{ ...styles.statIconWrap, background: stat.color + '20' }}>
                <span style={styles.statIcon}>{stat.icon}</span>
              </div>
              <div>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={styles.tabs}>
          {[
            { key: 'overview', label: '📊 Vue générale' },
            { key: 'etudiants', label: `🎓 Étudiants (${etudiants.length})` },
            { key: 'enseignants', label: `👨‍🏫 Enseignants (${enseignants.length})` },
            { key: 'cours', label: '📚 Cours' },
          ].map(tab => (
            <button
              key={tab.key}
              style={{ ...styles.tab, ...(activeTab === tab.key ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* VUE GÉNÉRALE */}
        {activeTab === 'overview' && (
          <div style={styles.grid2}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Activité récente</h3>
              {[
                { icon: '👤', text: 'Nouvel étudiant inscrit : Moussa Diallo', time: 'Il y a 10 min' },
                { icon: '📚', text: 'Nouveau cours ajouté : Node.js', time: 'Il y a 1h' },
                { icon: '📝', text: '12 devoirs soumis aujourd\'hui', time: 'Il y a 2h' },
                { icon: '👨‍🏫', text: 'Prof. Ibrahima FALL rejoint la plateforme', time: 'Il y a 3h' },
                { icon: '⭐', text: 'Note moyenne générale : 13.8/20', time: 'Il y a 5h' },
              ].map((act, i) => (
                <div key={i} style={styles.activityItem}>
                  <div style={styles.activityIcon}>{act.icon}</div>
                  <div style={styles.activityInfo}>
                    <div style={styles.activityText}>{act.text}</div>
                    <div style={styles.activityTime}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Statistiques des cours</h3>
              {[
                { title: 'React JS Avancé', students: 48, progress: 75 },
                { title: 'Python & Django', students: 52, progress: 60 },
                { title: 'SQL & PostgreSQL', students: 42, progress: 85 },
                { title: 'Cybersécurité', students: 38, progress: 40 },
                { title: 'Réseaux & Protocoles', students: 45, progress: 90 },
              ].map((c, i) => (
                <div key={i} style={styles.courseStatItem}>
                  <div style={styles.courseStatHeader}>
                    <span style={styles.courseStatTitle}>{c.title}</span>
                    <span style={styles.courseStatStudents}>👥 {c.students}</span>
                  </div>
                  <div style={styles.progressWrap}>
                    <div style={{ ...styles.progressFill, width: `${c.progress}%` }} />
                  </div>
                  <div style={styles.progressPct}>{c.progress}% complétion moyenne</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÉTUDIANTS */}
        {activeTab === 'etudiants' && (
          <div style={styles.card}>
            <div style={styles.tableHeader}>
              <h3 style={styles.cardTitle}>Gestion des étudiants</h3>
              <button style={styles.btnGold} onClick={() => setShowAddEtudiant(true)}>
                + Ajouter étudiant
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Étudiant', 'Email', 'Filière', 'Statut', 'Actions'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {etudiants.map(e => (
                  <tr key={e.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={{ ...styles.avatar, background: e.color }}>{e.initiales}</div>
                        {e.nom}
                      </div>
                    </td>
                    <td style={styles.td}>{e.email}</td>
                    <td style={styles.td}>{e.filiere}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        background: e.status === 'actif' ? '#DCFCE7' : '#FEE2E2',
                        color: e.status === 'actif' ? '#15803D' : '#991B1B',
                      }}>
                        {e.status === 'actif' ? '✅ Actif' : '❌ Inactif'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        <button
                          style={styles.btnPrimarySm}
                          onClick={() => { setSelectedEtudiant({...e}); setShowEditEtudiant(true) }}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          style={styles.btnDangerSm}
                          onClick={() => handleDeleteEtudiant(e.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ENSEIGNANTS */}
        {activeTab === 'enseignants' && (
          <div style={styles.card}>
            <div style={styles.tableHeader}>
              <h3 style={styles.cardTitle}>Gestion des enseignants</h3>
              <button style={styles.btnGold} onClick={() => setShowAddEnseignant(true)}>
                + Ajouter enseignant
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Enseignant', 'Email', 'Cours assigné', 'Statut', 'Actions'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enseignants.map(e => (
                  <tr key={e.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={{ ...styles.avatar, background: e.color }}>{e.initiales}</div>
                        {e.nom}
                      </div>
                    </td>
                    <td style={styles.td}>{e.email}</td>
                    <td style={styles.td}>{e.cours}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, background: '#DCFCE7', color: '#15803D' }}>
                        ✅ Actif
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        <button
                          style={styles.btnPrimarySm}
                          onClick={() => { setSelectedEnseignant({...e}); setShowEditEnseignant(true) }}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          style={styles.btnDangerSm}
                          onClick={() => handleDeleteEnseignant(e.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COURS */}
        {activeTab === 'cours' && (
          <div style={styles.card}>
            <div style={styles.tableHeader}>
              <h3 style={styles.cardTitle}>Gestion des cours</h3>
              <button style={styles.btnGold}>+ Ajouter cours</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Cours', 'Enseignant', 'Étudiants', 'Statut', 'Actions'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { emoji: '⚛️', title: 'React JS Avancé', teacher: 'Prof. Baba TOP', students: 48, status: 'publié' },
                  { emoji: '🐍', title: 'Python & Django', teacher: 'Prof. Amadou BA', students: 52, status: 'publié' },
                  { emoji: '🗄️', title: 'SQL & PostgreSQL', teacher: 'Prof. Fatou NDIAYE', students: 42, status: 'publié' },
                  { emoji: '🔐', title: 'Cybersécurité', teacher: 'Prof. Moussa DIOP', students: 38, status: 'brouillon' },
                  { emoji: '🌐', title: 'Réseaux & Protocoles', teacher: 'Prof. Ibrahima FALL', students: 45, status: 'publié' },
                ].map((c, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <span style={{ fontSize: '24px' }}>{c.emoji}</span>
                        {c.title}
                      </div>
                    </td>
                    <td style={styles.td}>{c.teacher}</td>
                    <td style={styles.td}>👥 {c.students}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        background: c.status === 'publié' ? '#DCFCE7' : '#FEF9C3',
                        color: c.status === 'publié' ? '#15803D' : '#854D0E',
                      }}>
                        {c.status === 'publié' ? '✅ Publié' : '📝 Brouillon'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        <button style={styles.btnPrimarySm}>✏️ Modifier</button>
                        <button style={styles.btnDangerSm}>🗑️ Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL AJOUTER ÉTUDIANT */}
      {showAddEtudiant && (
        <Modal title="➕ Ajouter un étudiant" onClose={() => setShowAddEtudiant(false)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nom complet *</label>
            <input style={styles.input} placeholder="Marieme Dieme"
              value={newEtudiant.nom}
              onChange={e => setNewEtudiant({...newEtudiant, nom: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input style={styles.input} placeholder="marieme@isi.sn"
              value={newEtudiant.email}
              onChange={e => setNewEtudiant({...newEtudiant, email: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Filière</label>
            <select style={styles.input}
              value={newEtudiant.filiere}
              onChange={e => setNewEtudiant({...newEtudiant, filiere: e.target.value})}
            >
              <option>M1 GL</option>
              <option>M1 Réseaux</option>
              <option>L3</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Statut</label>
            <select style={styles.input}
              value={newEtudiant.status}
              onChange={e => setNewEtudiant({...newEtudiant, status: e.target.value})}
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div style={styles.modalBtns}>
            <button style={styles.btnOutline} onClick={() => setShowAddEtudiant(false)}>Annuler</button>
            <button style={styles.btnGold} onClick={handleAddEtudiant}>✅ Ajouter</button>
          </div>
        </Modal>
      )}

      {/* MODAL MODIFIER ÉTUDIANT */}
      {showEditEtudiant && selectedEtudiant && (
        <Modal title="✏️ Modifier l'étudiant" onClose={() => setShowEditEtudiant(false)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nom complet</label>
            <input style={styles.input}
              value={selectedEtudiant.nom}
              onChange={e => setSelectedEtudiant({...selectedEtudiant, nom: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input}
              value={selectedEtudiant.email}
              onChange={e => setSelectedEtudiant({...selectedEtudiant, email: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Filière</label>
            <select style={styles.input}
              value={selectedEtudiant.filiere}
              onChange={e => setSelectedEtudiant({...selectedEtudiant, filiere: e.target.value})}
            >
              <option>M1 GL</option>
              <option>M1 Réseaux</option>
              <option>L3</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Statut</label>
            <select style={styles.input}
              value={selectedEtudiant.status}
              onChange={e => setSelectedEtudiant({...selectedEtudiant, status: e.target.value})}
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div style={styles.modalBtns}>
            <button style={styles.btnOutline} onClick={() => setShowEditEtudiant(false)}>Annuler</button>
            <button style={styles.btnGold} onClick={handleEditEtudiant}>✅ Sauvegarder</button>
          </div>
        </Modal>
      )}

      {/* MODAL AJOUTER ENSEIGNANT */}
      {showAddEnseignant && (
        <Modal title="➕ Ajouter un enseignant" onClose={() => setShowAddEnseignant(false)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nom complet *</label>
            <input style={styles.input} placeholder="Prof. Nom Prénom"
              value={newEnseignant.nom}
              onChange={e => setNewEnseignant({...newEnseignant, nom: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input style={styles.input} placeholder="prof@isi.sn"
              value={newEnseignant.email}
              onChange={e => setNewEnseignant({...newEnseignant, email: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cours assigné</label>
            <input style={styles.input} placeholder="React JS Avancé"
              value={newEnseignant.cours}
              onChange={e => setNewEnseignant({...newEnseignant, cours: e.target.value})}
            />
          </div>
          <div style={styles.modalBtns}>
            <button style={styles.btnOutline} onClick={() => setShowAddEnseignant(false)}>Annuler</button>
            <button style={styles.btnGold} onClick={handleAddEnseignant}>✅ Ajouter</button>
          </div>
        </Modal>
      )}

      {/* MODAL MODIFIER ENSEIGNANT */}
      {showEditEnseignant && selectedEnseignant && (
        <Modal title="✏️ Modifier l'enseignant" onClose={() => setShowEditEnseignant(false)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nom complet</label>
            <input style={styles.input}
              value={selectedEnseignant.nom}
              onChange={e => setSelectedEnseignant({...selectedEnseignant, nom: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input}
              value={selectedEnseignant.email}
              onChange={e => setSelectedEnseignant({...selectedEnseignant, email: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cours assigné</label>
            <input style={styles.input}
              value={selectedEnseignant.cours}
              onChange={e => setSelectedEnseignant({...selectedEnseignant, cours: e.target.value})}
            />
          </div>
          <div style={styles.modalBtns}>
            <button style={styles.btnOutline} onClick={() => setShowEditEnseignant(false)}>Annuler</button>
            <button style={styles.btnGold} onClick={handleEditEnseignant}>✅ Sauvegarder</button>
          </div>
        </Modal>
      )}

    </div>
  )
}

const styles = {
  main: { padding: '32px 40px', background: '#F0F4F8', minHeight: 'calc(100vh - 68px)' },
  banner: {
    background: 'linear-gradient(135deg, #1B2E4B, #243857)',
    borderRadius: '16px', padding: '28px 32px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px', color: '#fff',
  },
  bannerTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' },
  bannerSub: { fontSize: '14px', color: 'rgba(255,255,255,0.65)' },
  bannerEmoji: { fontSize: '56px' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' },
  statCard: {
    background: '#fff', borderRadius: '14px',
    padding: '20px 24px', border: '1px solid #DDE5F0',
    display: 'flex', alignItems: 'center', gap: '16px',
  },
  statIconWrap: { width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statIcon: { fontSize: '24px' },
  statNum: { fontSize: '24px', fontWeight: '800', color: '#1B2E4B' },
  statLabel: { fontSize: '13px', color: '#64748B' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px' },
  tab: {
    padding: '10px 20px', borderRadius: '10px',
    border: '1.5px solid #DDE5F0',
    background: '#fff', color: '#64748B',
    fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  tabActive: { background: '#1B2E4B', color: '#fff', borderColor: '#1B2E4B' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  card: { background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #DDE5F0' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B', marginBottom: '16px' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  activityItem: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' },
  activityIcon: { width: '32px', height: '32px', borderRadius: '8px', background: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 },
  activityInfo: { flex: 1 },
  activityText: { fontSize: '13px', fontWeight: '500', color: '#1A2332' },
  activityTime: { fontSize: '11px', color: '#94A3B8', marginTop: '2px' },
  courseStatItem: { marginBottom: '16px' },
  courseStatHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  courseStatTitle: { fontSize: '13px', fontWeight: '600', color: '#1B2E4B' },
  courseStatStudents: { fontSize: '12px', color: '#64748B' },
  progressWrap: { background: '#E2EAF4', borderRadius: '4px', height: '6px', marginBottom: '4px' },
  progressFill: { height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, #1B2E4B, #F5A623)' },
  progressPct: { fontSize: '11px', color: '#64748B' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#64748B', borderBottom: '2px solid #DDE5F0' },
  tr: { borderBottom: '1px solid #DDE5F0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#1A2332' },
  userCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: '#fff', flexShrink: 0 },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  actionBtns: { display: 'flex', gap: '8px' },
  btnPrimarySm: { padding: '6px 12px', borderRadius: '8px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnDangerSm: { padding: '6px 12px', borderRadius: '8px', background: '#FEE2E2', color: '#EF4444', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnGold: { padding: '8px 16px', borderRadius: '8px', background: '#F5A623', color: '#1B2E4B', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  btnOutline: { padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: '#64748B', border: '1.5px solid #DDE5F0', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1B2E4B', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #DDE5F0', fontSize: '14px', outline: 'none', color: '#1A2332', fontFamily: 'inherit' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: '16px', padding: '32px', width: '480px', maxWidth: '90vw' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  modalTitle: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' },
  modalBtns: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' },
}

export default DashboardAdmin