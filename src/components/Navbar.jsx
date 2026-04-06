import { Link, useNavigate } from 'react-router-dom'

function Navbar({ role = 'etudiant' }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <nav style={styles.navbar}>

      {/* LOGO */}
      <div style={styles.logo}>
        <div style={styles.logoIcon}>I</div>
        <span style={styles.logoText}>
          E-learning <span style={{color:'#F5A623'}}>ISI</span>
        </span>
      </div>

      {/* LIENS */}
      <div style={styles.links}>
        {role === 'etudiant' ? (
          <>
            <Link to="/dashboard" style={styles.link}>🏠 Dashboard</Link>
            <Link to="/courses" style={styles.link}>📚 Mes cours</Link>
            <Link to="/quiz" style={styles.link}>❓ Quiz</Link>
            <Link to="/profile" style={styles.link}>👤 Profil</Link>
          </>
        ) : (
          <>
            <Link to="/teacher" style={styles.link}>🏠 Dashboard</Link>
            <Link to="/courses" style={styles.link}>📚 Mes cours</Link>
            <Link to="/profile" style={styles.link}>👤 Profil</Link>
          </>
        )}
      </div>

      {/* DROITE */}
      <div style={styles.right}>
        <div style={styles.notif}>🔔</div>
        <div style={styles.avatar}>MD</div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Déconnexion
        </button>
      </div>

    </nav>
  )
}

const styles = {
  navbar: {
    background: '#1B2E4B',
    padding: '0 40px',
    height: '68px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '12px',
  },
  logoIcon: {
    width: '40px', height: '40px', borderRadius: '10px',
    background: '#F5A623',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '900', fontSize: '18px', color: '#1B2E4B',
  },
  logoText: {
    fontSize: '18px', fontWeight: '700', color: '#fff',
  },
  links: {
    display: 'flex', alignItems: 'center', gap: '4px',
  },
  link: {
    padding: '8px 16px', borderRadius: '8px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px', fontWeight: '500',
    transition: 'all .2s',
    textDecoration: 'none',
  },
  right: {
    display: 'flex', alignItems: 'center', gap: '12px',
  },
  notif: {
    width: '36px', height: '36px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', cursor: 'pointer',
  },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5A623, #E8941A)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', color: '#1B2E4B',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '8px 14px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none', color: '#fff',
    fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
}

export default Navbar