import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Profile() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    prenom: 'Marieme',
    nom: 'Dieme',
    email: 'marieme@isi.sn',
    filiere: 'M1 Génie Logiciel',
    numero: 'ISI-2024-042',
    phone: '+221 77 000 00 00',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          {/* BANNER + AVATAR */}
          <div style={styles.profileCard}>
            <div style={styles.banner} />
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>MD</div>
            </div>
            <div style={styles.profileInfo}>
              <div>
                <h2 style={styles.profileName}>
                  {form.prenom} {form.nom}
                </h2>
                <p style={styles.profileRole}>
                  Étudiante {form.filiere} · ISI Dakar
                </p>
                <div style={styles.profileBadges}>
                  <span style={styles.badgeNavy}>🎓 {form.filiere}</span>
                  <span style={styles.badgeSuccess}>✅ Active</span>
                  <span style={styles.badgeInfo}>{form.numero}</span>
                </div>
              </div>
              <button
                style={styles.btnOutline}
                onClick={() => setEditing(!editing)}
              >
                {editing ? '✅ Sauvegarder' : '✏️ Modifier le profil'}
              </button>
            </div>
          </div>

          <div style={styles.grid}>

            {/* INFORMATIONS */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Informations personnelles</h3>

              {editing ? (
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Prénom</label>
                      <input
                        style={styles.input}
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nom</label>
                      <input
                        style={styles.input}
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      style={styles.input}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Téléphone</label>
                    <input
                      style={styles.input}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Filière</label>
                    <select
                      style={styles.input}
                      name="filiere"
                      value={form.filiere}
                      onChange={handleChange}
                    >
                      <option>M1 Génie Logiciel</option>
                      <option>M1 Réseaux</option>
                      <option>L3 Informatique</option>
                    </select>
                  </div>
                  <button
                    style={styles.btnPrimary}
                    onClick={() => setEditing(false)}
                  >
                    ✅ Sauvegarder les modifications
                  </button>
                </>
              ) : (
                <div style={styles.infoList}>
                  {[
                    { label: 'Prénom', value: form.prenom },
                    { label: 'Nom', value: form.nom },
                    { label: 'Email', value: form.email },
                    { label: 'Téléphone', value: form.phone },
                    { label: 'Filière', value: form.filiere },
                    { label: 'Numéro étudiant', value: form.numero },
                    { label: 'Inscription', value: 'Septembre 2024' },
                  ].map((item, i) => (
                    <div key={i} style={styles.infoRow}>
                      <span style={styles.infoLabel}>{item.label}</span>
                      <span style={styles.infoValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STATISTIQUES */}
            <div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Statistiques académiques</h3>
                <div style={styles.statsGrid}>
                  {[
                    { num: '5', label: 'Cours inscrits', color: '#1B2E4B' },
                    { num: '14.5', label: 'Moyenne générale', color: '#22C55E' },
                    { num: '12', label: 'Leçons complétées', color: '#F5A623' },
                    { num: '3', label: 'Quiz réussis', color: '#3B82F6' },
                  ].map((stat, i) => (
                    <div key={i} style={styles.statBox}>
                      <div style={{ ...styles.statNum, color: stat.color }}>
                        {stat.num}
                      </div>
                      <div style={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVITÉ RÉCENTE */}
              <div style={{ ...styles.card, marginTop: '20px' }}>
                <h3 style={styles.cardTitle}>Activité récente</h3>
                <div style={styles.activityList}>
                  {[
                    { icon: '✅', text: 'Leçon "React Router" complétée', time: 'Il y a 2h' },
                    { icon: '📝', text: 'Quiz React JS réussi (4/5)', time: 'Il y a 1j' },
                    { icon: '📤', text: 'Devoir "Todo App" soumis', time: 'Il y a 2j' },
                    { icon: '📚', text: 'Inscrit à "Cybersécurité"', time: 'Il y a 5j' },
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
              </div>

              {/* BOUTON DECONNEXION */}
              <button
                style={styles.btnDanger}
                onClick={() => navigate('/login')}
              >
                🚪 Se déconnecter
              </button>
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
  profileCard: {
    background: '#fff', borderRadius: '16px',
    border: '1px solid #DDE5F0',
    overflow: 'hidden', marginBottom: '24px',
  },
  banner: {
    background: 'linear-gradient(135deg, #1B2E4B, #243857)',
    height: '140px',
  },
  avatarWrap: {
    padding: '0 32px',
    marginTop: '-48px',
    marginBottom: '12px',
  },
  avatar: {
    width: '96px', height: '96px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5A623, #E8941A)',
    border: '4px solid #fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '36px', fontWeight: '800', color: '#1B2E4B',
  },
  profileInfo: {
    padding: '0 32px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  profileName: { fontSize: '22px', fontWeight: '800', color: '#1B2E4B', marginBottom: '4px' },
  profileRole: { fontSize: '14px', color: '#64748B', marginBottom: '12px' },
  profileBadges: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  badgeNavy: {
    padding: '3px 10px', borderRadius: '20px',
    background: '#E2EAF4', color: '#1B2E4B',
    fontSize: '12px', fontWeight: '600',
  },
  badgeSuccess: {
    padding: '3px 10px', borderRadius: '20px',
    background: '#DCFCE7', color: '#15803D',
    fontSize: '12px', fontWeight: '600',
  },
  badgeInfo: {
    padding: '3px 10px', borderRadius: '20px',
    background: '#DBEAFE', color: '#1D4ED8',
    fontSize: '12px', fontWeight: '600',
  },
  btnOutline: {
    padding: '10px 18px', borderRadius: '10px',
    background: 'transparent', color: '#64748B',
    border: '1.5px solid #DDE5F0', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  card: {
    background: '#fff', borderRadius: '14px',
    padding: '24px', border: '1px solid #DDE5F0',
  },
  cardTitle: {
    fontSize: '16px', fontWeight: '700',
    color: '#1B2E4B', marginBottom: '20px',
  },
  infoList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  infoRow: {
    display: 'flex', justifyContent: 'space-between',
    paddingBottom: '14px', borderBottom: '1px solid #F0F4F8',
  },
  infoLabel: { fontSize: '14px', color: '#64748B' },
  infoValue: { fontSize: '14px', fontWeight: '500', color: '#1A2332' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  formGroup: { marginBottom: '16px' },
  label: {
    display: 'block', fontSize: '13px',
    fontWeight: '600', color: '#1B2E4B', marginBottom: '6px',
  },
  input: {
    width: '100%', padding: '10px 14px',
    borderRadius: '10px', border: '1.5px solid #DDE5F0',
    fontSize: '14px', outline: 'none',
    color: '#1A2332', fontFamily: 'inherit',
  },
  btnPrimary: {
    width: '100%', padding: '12px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', borderRadius: '10px',
    fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
  },
  statBox: {
    textAlign: 'center', padding: '16px',
    background: '#F8FAFD', borderRadius: '10px',
  },
  statNum: { fontSize: '24px', fontWeight: '800', marginBottom: '4px' },
  statLabel: { fontSize: '12px', color: '#64748B' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  activityItem: { display: 'flex', alignItems: 'flex-start', gap: '12px' },
  activityIcon: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: '#F0F4F8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '14px', flexShrink: 0,
  },
  activityInfo: { flex: 1 },
  activityText: { fontSize: '13px', fontWeight: '500', color: '#1A2332' },
  activityTime: { fontSize: '11px', color: '#94A3B8', marginTop: '2px' },
  btnDanger: {
    width: '100%', padding: '12px',
    background: '#FEE2E2', color: '#EF4444',
    border: 'none', borderRadius: '10px',
    fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
    marginTop: '16px',
  },
}

export default Profile