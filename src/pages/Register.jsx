import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '',
    filiere: 'M1 Génie Logiciel',
    numero: '', password: '', confirm: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LOGO */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>I</div>
          <span style={styles.logoText}>
            E-learning <span style={{color:'#F5A623'}}>ISI</span>
          </span>
        </div>

        <h2 style={styles.title}>Créer un compte 🚀</h2>
        <p style={styles.sub}>Rejoignez la communauté ISI</p>

        <form onSubmit={handleSubmit}>

          {/* PRENOM + NOM */}
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Prénom</label>
              <input
                style={styles.input}
                name="prenom"
                placeholder="Marieme"
                value={form.prenom}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nom</label>
              <input
                style={styles.input}
                name="nom"
                placeholder="Dieme"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Adresse email ISI</label>
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="marieme.dieme@isi.sn"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* FILIERE + NUMERO */}
          <div style={styles.row}>
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
            <div style={styles.formGroup}>
              <label style={styles.label}>Numéro étudiant</label>
              <input
                style={styles.input}
                name="numero"
                placeholder="ISI-2024-001"
                value={form.numero}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                style={styles.input}
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirmer</label>
              <input
                style={styles.input}
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.btn}>
            Créer mon compte
          </button>

          <div style={styles.loginLink}>
            Déjà un compte ?{' '}
            <Link to="/login" style={{color:'#1B2E4B', fontWeight:'700'}}>
              Se connecter
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0F1E33, #1B2E4B)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px',
  },
  card: {
    background: '#fff', borderRadius: '20px',
    width: '600px', padding: '48px',
  },
  logoWrap: {
    display: 'flex', alignItems: 'center',
    gap: '10px', marginBottom: '28px',
  },
  logoIcon: {
    width: '44px', height: '44px', borderRadius: '12px',
    background: '#F5A623',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '900', fontSize: '20px', color: '#1B2E4B',
  },
  logoText: {
    fontSize: '20px', fontWeight: '800', color: '#1B2E4B',
  },
  title: {
    fontSize: '26px', fontWeight: '800',
    color: '#1B2E4B', marginBottom: '6px',
  },
  sub: {
    fontSize: '14px', color: '#64748B', marginBottom: '32px',
  },
  row: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
  },
  formGroup: { marginBottom: '16px' },
  label: {
    display: 'block', fontSize: '13px',
    fontWeight: '600', color: '#1B2E4B', marginBottom: '6px',
  },
  input: {
    width: '100%', padding: '12px 16px',
    borderRadius: '10px', border: '1.5px solid #DDE5F0',
    fontSize: '14px', outline: 'none',
    color: '#1A2332', fontFamily: 'inherit',
    background: '#fff',
  },
  btn: {
    width: '100%', padding: '14px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', borderRadius: '12px',
    fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
    marginTop: '8px',
  },
  loginLink: {
    textAlign: 'center', fontSize: '14px',
    color: '#64748B', marginTop: '16px',
  },
}

export default Register