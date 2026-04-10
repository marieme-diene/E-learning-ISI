import { Link, useLocation } from 'react-router-dom'

function Sidebar({ role = 'etudiant' }) {
  const location = useLocation()

  const etudiantItems = [
    { path: '/dashboard', icon: '🏠', label: 'Tableau de bord' },
    { path: '/courses', icon: '📚', label: 'Mes cours', badge: '5' },
    { path: '/quiz', icon: '❓', label: 'Quiz' },
    { path: '/profile', icon: '👤', label: 'Profil' },
    { path: '/devoirs', icon: '📝', label: 'Devoirs', badge: '2' },
    { path: '/multimedia', icon: '🎥', label: 'Multimédia' },
    { path: '/notes', icon: '📊', label: 'Notes' },
    { path: '/interactions', icon: '💬', label: 'Interactions' },
  ]

  const enseignantItems = [
    { path: '/teacher', icon: '🏠', label: 'Dashboard' },
    { path: '/courses', icon: '📚', label: 'Mes cours', badge: '3' },
    { path: '/profile', icon: '👤', label: 'Profil' },
  ]

  const items = role === 'enseignant' ? enseignantItems : etudiantItems

  return (
    <aside style={styles.sidebar}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...styles.item,
            ...(location.pathname === item.path ? styles.itemActive : {})
          }}
        >
          <span style={styles.icon}>{item.icon}</span>
          <span style={styles.label}>{item.label}</span>
          {item.badge && (
            <span style={styles.badge}>{item.badge}</span>
          )}
        </Link>
      ))}
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '240px',
    flexShrink: 0,
    background: '#F8FAFD',
    borderRight: '1px solid #DDE5F0',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minHeight: 'calc(100vh - 68px)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748B',
    textDecoration: 'none',
    transition: 'all .2s',
  },
  itemActive: {
    background: '#1B2E4B',
    color: '#fff',
  },
  icon: {
    fontSize: '16px',
    width: '20px',
    textAlign: 'center',
  },
  label: { flex: 1 },
  badge: {
    background: '#F5A623',
    color: '#1B2E4B',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 7px',
    borderRadius: '10px',
  },
}

export default Sidebar