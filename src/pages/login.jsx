import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('etudiant')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (role === 'enseignant') {
      navigate('/teacher')
    } else if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>I</div>
          <span style={styles.logoText}>E-learning <span style={{color:'#F5A623'}}>ISI</span></span>
        </div>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Apprenez.<br/>
            <span style={{color:'#F5A623'}}>Progressez.</span><br/>
            Réussissez.
          </h1>
          <p style={styles.heroSub}>
            La plateforme pédagogique officielle de
            l'Institut Supérieur d'Informatique de Dakar.
          </p>
          <div style={styles.stats}>
            <div>
              <div style={styles.statNum}>1200+</div>
              <div style={styles.statLabel}>Étudiants actifs</div>
            </div>
            <div>
              <div style={styles.statNum}>48</div>
              <div style={styles.statLabel}>Cours disponibles</div>
            </div>
            <div>
              <div style={styles.statNum}>32</div>
              <div style={styles.statLabel}>Enseignants</div>
            </div>
          </div>
        </div>
        <div style={{color:'rgba(255,255,255,0.3)', fontSize:'12px'}}>
          © 2026 ISI Dakar
        </div>
      </div>

      <div style={styles.right}>
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formLogo}>
            <div style={styles.logoIcon}>I</div>
            <span style={{fontSize:'20px', fontWeight:'800', color:'#1B2E4B'}}>
              E-learning <span style={{color:'#F5A623'}}>ISI</span>
            </span>
          </div>
          <h2 style={styles.formTitle}>Bon retour ! 👋</h2>
          <p style={styles.formSub}>Connectez-vous à votre espace personnel</p>
          <div style={styles.roleTabs}>
            {['etudiant', 'enseignant', 'admin'].map((r) => (
              <div
                key={r}
                onClick={() => setRole(r)}
                style={{
                  ...styles.roleTab,
                  ...(role === r ? styles.roleTabActive : {})
                }}
              >
                {r === 'etudiant' ? '🎓' : r === 'enseignant' ? '👨‍🏫' : '⚙️'}
                {' '}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
            ))}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Adresse email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="marieme@isi.sn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mot de passe</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={styles.forgot}>Mot de passe oublié ?</div>
          <button type="submit" style={styles.btnPrimary}>
            Se connecter
          </button>
          <div style={styles.registerLink}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{color:'#1B2E4B', fontWeight:'700'}}>
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  page: { display: 'flex', minHeight: '100vh' },
  left: {
    flex: 1,
    background: 'linear-gradient(135deg, #0F1E33 0%, #1B2E4B 50%, #243857 100%)',
    padding: '60px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' },
  logoIcon: {
    width: '44px', height: '44px', borderRadius: '12px',
    background: '#F5A623',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '900', fontSize: '20px', color: '#1B2E4B',
  },
  logoText: { fontSize: '20px', fontWeight: '800', color: '#fff' },
  hero: { marginTop: 'auto', marginBottom: 'auto' },
  heroTitle: { fontSize: '52px', fontWeight: '900', color: '#fff', lineHeight: '1.15', marginBottom: '16px' },
  heroSub: { fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', maxWidth: '400px' },
  stats: { display: 'flex', gap: '40px', marginTop: '48px' },
  statNum: { fontSize: '32px', fontWeight: '800', color: '#F5A623' },
  statLabel: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' },
  right: {
    width: '500px', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '60px 48px',
  },
  form: { width: '100%' },
  formLogo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' },
  formTitle: { fontSize: '26px', fontWeight: '800', color: '#1B2E4B', marginBottom: '6px' },
  formSub: { fontSize: '14px', color: '#64748B', marginBottom: '24px' },
  roleTabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  roleTab: {
    flex: 1, padding: '10px', borderRadius: '10px',
    border: '2px solid #DDE5F0',
    textAlign: 'center', fontSize: '13px', fontWeight: '600',
    color: '#64748B', cursor: 'pointer',
  },
  roleTabActive: { borderColor: '#1B2E4B', background: '#E2EAF4', color: '#1B2E4B' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1B2E4B', marginBottom: '6px' },
  input: {
    width: '100%', padding: '12px 16px',
    borderRadius: '10px', border: '1.5px solid #DDE5F0',
    fontSize: '14px', outline: 'none', color: '#1A2332', fontFamily: 'inherit',
  },
  forgot: { fontSize: '13px', color: '#1B2E4B', fontWeight: '600', textAlign: 'right', marginBottom: '24px', cursor: 'pointer' },
  btnPrimary: {
    width: '100%', padding: '14px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', borderRadius: '12px',
    fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  registerLink: { textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '20px' },
}

export default Login