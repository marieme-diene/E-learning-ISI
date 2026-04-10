import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const messagesData = [
  {
    id: 1,
    expediteur: 'Prof. Baba TOP',
    initiales: 'BT',
    color: '#1B2E4B',
    sujet: 'Correction Devoir React',
    message: 'Bonjour Marieme, j\'ai corrigé votre devoir Todo App. Très bon travail ! Vous avez bien maîtrisé les hooks. Note : 16/20.',
    date: '10/04/2026',
    heure: '09:30',
    lu: false,
    type: 'professeur',
  },
  {
    id: 2,
    expediteur: 'Prof. Fatou NDIAYE',
    initiales: 'FN',
    color: '#059669',
    sujet: 'Rappel Examen SQL',
    message: 'Rappel : l\'examen de SQL aura lieu le 20 avril. Révisez bien les jointures et les sous-requêtes.',
    date: '09/04/2026',
    heure: '14:15',
    lu: true,
    type: 'professeur',
  },
  {
    id: 3,
    expediteur: 'Amadou Baldé',
    initiales: 'AB',
    color: '#3B82F6',
    sujet: 'Groupe de travail React',
    message: 'Salut Marieme ! On se retrouve demain à 15h pour travailler sur le projet React ensemble ?',
    date: '08/04/2026',
    heure: '18:45',
    lu: true,
    type: 'etudiant',
  },
]

const commentairesData = [
  {
    id: 1,
    cours: 'React JS Avancé',
    lecon: 'Les Hooks en React',
    commentaires: [
      { id: 1, auteur: 'Prof. Baba TOP', initiales: 'BT', color: '#1B2E4B', texte: 'Excellent cours ! N\'oubliez pas de pratiquer les hooks dans vos projets personnels.', date: '05/04/2026', isProf: true },
      { id: 2, auteur: 'Marieme Dieme', initiales: 'MD', color: '#F5A623', texte: 'Super explications ! J\'ai enfin compris useEffect 😊', date: '06/04/2026', isProf: false },
      { id: 3, auteur: 'Amadou Baldé', initiales: 'AB', color: '#3B82F6', texte: 'Est-ce qu\'on peut utiliser plusieurs useEffect dans un même composant ?', date: '06/04/2026', isProf: false },
      { id: 4, auteur: 'Prof. Baba TOP', initiales: 'BT', color: '#1B2E4B', texte: 'Oui Amadou, on peut avoir autant de useEffect qu\'on veut dans un composant !', date: '07/04/2026', isProf: true },
    ],
  },
]

function Interactions() {
  const [activeTab, setActiveTab] = useState('messages')
  const [messages, setMessages] = useState(messagesData)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showCompose, setShowCompose] = useState(false)
  const [newMessage, setNewMessage] = useState({ destinataire: '', sujet: '', message: '' })
  const [commentaires, setCommentaires] = useState(commentairesData)
  const [newComment, setNewComment] = useState('')
  const [sent, setSent] = useState(false)

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg)
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, lu: true } : m))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.destinataire || !newMessage.message) return
    setSent(true)
    setTimeout(() => {
      setShowCompose(false)
      setSent(false)
      setNewMessage({ destinataire: '', sujet: '', message: '' })
    }, 2000)
  }

  const handleAddComment = (e, coursId) => {
    e.preventDefault()
    if (!newComment.trim()) return
    const comment = {
      id: Date.now(),
      auteur: 'Marieme Dieme',
      initiales: 'MD',
      color: '#F5A623',
      texte: newComment.trim(),
      date: new Date().toLocaleDateString('fr-FR'),
      isProf: false,
    }
    setCommentaires(prev => prev.map(c =>
      c.id === coursId
        ? { ...c, commentaires: [...c.commentaires, comment] }
        : c
    ))
    setNewComment('')
  }

  const nonLus = messages.filter(m => !m.lu).length

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.layout}>
        <Sidebar role="etudiant" />
        <main style={styles.main}>

          <div style={styles.header}>
            <h1 style={styles.title}>Interactions 💬</h1>
            <p style={styles.sub}>Messages et commentaires de vos cours</p>
          </div>

          {/* TABS */}
          <div style={styles.tabs}>
            {[
              { key: 'messages', label: `✉️ Messages ${nonLus > 0 ? `(${nonLus})` : ''}` },
              { key: 'commentaires', label: '💬 Commentaires cours' },
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

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div style={styles.messagesLayout}>

              {/* LISTE MESSAGES */}
              <div style={styles.messagesList}>
                <div style={styles.messagesHeader}>
                  <h3 style={styles.messagesTitle}>Boîte de réception</h3>
                  <button
                    style={styles.btnCompose}
                    onClick={() => setShowCompose(true)}
                  >
                    ✏️ Nouveau
                  </button>
                </div>

                {messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      ...styles.messageItem,
                      background: selectedMessage?.id === msg.id
                        ? '#EFF6FF'
                        : '#fff',
                      borderLeft: !msg.lu
                        ? '3px solid #2563EB'
                        : '3px solid transparent',
                    }}
                    onClick={() => handleOpenMessage(msg)}
                  >
                    <div style={{ ...styles.msgAvatar, background: msg.color }}>
                      {msg.initiales}
                    </div>
                    <div style={styles.msgContent}>
                      <div style={styles.msgTop}>
                        <span style={{
                          ...styles.msgExp,
                          fontWeight: msg.lu ? '500' : '700',
                        }}>
                          {msg.expediteur}
                        </span>
                        <span style={styles.msgDate}>{msg.date}</span>
                      </div>
                      <div style={{
                        ...styles.msgSujet,
                        fontWeight: msg.lu ? '500' : '700',
                      }}>
                        {msg.sujet}
                      </div>
                      <div style={styles.msgPreview}>
                        {msg.message.slice(0, 60)}...
                      </div>
                    </div>
                    {!msg.lu && <div style={styles.unreadDot} />}
                  </div>
                ))}
              </div>

              {/* DETAIL MESSAGE */}
              <div style={styles.messageDetail}>
                {selectedMessage ? (
                  <>
                    <div style={styles.detailHeader}>
                      <h3 style={styles.detailSujet}>{selectedMessage.sujet}</h3>
                      <span style={styles.detailDate}>
                        {selectedMessage.date} à {selectedMessage.heure}
                      </span>
                    </div>
                    <div style={styles.detailFrom}>
                      <div style={{ ...styles.msgAvatar, background: selectedMessage.color }}>
                        {selectedMessage.initiales}
                      </div>
                      <div>
                        <div style={styles.detailFromName}>{selectedMessage.expediteur}</div>
                        <div style={styles.detailFromType}>
                          {selectedMessage.type === 'professeur' ? '👨‍🏫 Professeur' : '🎓 Étudiant'}
                        </div>
                      </div>
                    </div>
                    <div style={styles.detailBody}>
                      {selectedMessage.message}
                    </div>
                    <button
                      style={styles.btnReply}
                      onClick={() => {
                        setNewMessage({ destinataire: selectedMessage.expediteur, sujet: `Re: ${selectedMessage.sujet}`, message: '' })
                        setShowCompose(true)
                      }}
                    >
                      ↩️ Répondre
                    </button>
                  </>
                ) : (
                  <div style={styles.noMessage}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>✉️</div>
                    <p style={{ color: '#64748B' }}>Sélectionnez un message</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COMMENTAIRES */}
          {activeTab === 'commentaires' && (
            <div>
              {commentaires.map(cours => (
                <div key={cours.id} style={styles.commentCard}>
                  <div style={styles.commentHeader}>
                    <h3 style={styles.commentCours}>{cours.cours}</h3>
                    <span style={styles.commentLecon}>📖 {cours.lecon}</span>
                  </div>

                  <div style={styles.commentsList}>
                    {cours.commentaires.map(c => (
                      <div
                        key={c.id}
                        style={{
                          ...styles.commentItem,
                          flexDirection: c.auteur === 'Marieme Dieme' ? 'row-reverse' : 'row',
                        }}
                      >
                        <div style={{ ...styles.commentAvatar, background: c.color }}>
                          {c.initiales}
                        </div>
                        <div style={{
                          ...styles.commentBubble,
                          background: c.auteur === 'Marieme Dieme'
                            ? '#EFF6FF'
                            : c.isProf ? '#F0FDF4' : '#F8FAFC',
                          borderColor: c.auteur === 'Marieme Dieme'
                            ? '#BFDBFE'
                            : c.isProf ? '#BBF7D0' : '#E2E8F0',
                        }}>
                          <div style={styles.commentAuteur}>
                            {c.auteur}
                            {c.isProf && <span style={styles.profBadge}>Prof</span>}
                          </div>
                          <div style={styles.commentTexte}>{c.texte}</div>
                          <div style={styles.commentDate}>{c.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AJOUTER COMMENTAIRE */}
                  <form
                    onSubmit={(e) => handleAddComment(e, cours.id)}
                    style={styles.commentForm}
                  >
                    <input
                      style={styles.commentInput}
                      placeholder="Ajouter un commentaire..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                    />
                    <button type="submit" style={styles.btnSend}>
                      Envoyer ➤
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* MODAL COMPOSE */}
      {showCompose && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {sent ? (
              <div style={styles.successBox}>
                <div style={{ fontSize: '48px' }}>🎉</div>
                <h3 style={{ color: '#15803D', margin: '12px 0 6px', fontSize: '20px', fontWeight: '800' }}>
                  Message envoyé !
                </h3>
              </div>
            ) : (
              <>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalTitle}>✉️ Nouveau message</h3>
                  <button style={styles.closeBtn} onClick={() => setShowCompose(false)}>✕</button>
                </div>
                <form onSubmit={handleSendMessage}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Destinataire *</label>
                    <select
                      style={styles.input}
                      value={newMessage.destinataire}
                      onChange={e => setNewMessage({ ...newMessage, destinataire: e.target.value })}
                      required
                    >
                      <option value="">Choisir un destinataire...</option>
                      <option>Prof. Baba TOP</option>
                      <option>Prof. Amadou BA</option>
                      <option>Prof. Fatou NDIAYE</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Sujet</label>
                    <input
                      style={styles.input}
                      placeholder="Sujet du message"
                      value={newMessage.sujet}
                      onChange={e => setNewMessage({ ...newMessage, sujet: e.target.value })}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Message *</label>
                    <textarea
                      style={{ ...styles.input, height: '120px', resize: 'vertical' }}
                      placeholder="Écrivez votre message..."
                      value={newMessage.message}
                      onChange={e => setNewMessage({ ...newMessage, message: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.modalBtns}>
                    <button type="button" style={styles.btnOutline} onClick={() => setShowCompose(false)}>
                      Annuler
                    </button>
                    <button type="submit" style={styles.btnPrimary}>
                      ✉️ Envoyer
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
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: { padding: '10px 20px', borderRadius: '10px', border: '1.5px solid', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  messagesLayout: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px' },
  messagesList: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', overflow: 'hidden' },
  messagesHeader: { padding: '16px', borderBottom: '1px solid #DDE5F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  messagesTitle: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B' },
  btnCompose: { padding: '6px 14px', borderRadius: '8px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  messageItem: { padding: '14px 16px', borderBottom: '1px solid #DDE5F0', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'flex-start', position: 'relative' },
  msgAvatar: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: '#fff', flexShrink: 0 },
  msgContent: { flex: 1, minWidth: 0 },
  msgTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '3px' },
  msgExp: { fontSize: '13px', color: '#1B2E4B' },
  msgDate: { fontSize: '11px', color: '#94A3B8' },
  msgSujet: { fontSize: '13px', color: '#1B2E4B', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  msgPreview: { fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  unreadDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: '6px' },
  messageDetail: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', padding: '24px', minHeight: '400px', display: 'flex', flexDirection: 'column' },
  detailHeader: { marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #DDE5F0' },
  detailSujet: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px' },
  detailDate: { fontSize: '12px', color: '#94A3B8' },
  detailFrom: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' },
  detailFromName: { fontSize: '15px', fontWeight: '700', color: '#1B2E4B' },
  detailFromType: { fontSize: '12px', color: '#64748B' },
  detailBody: { fontSize: '15px', color: '#1A2332', lineHeight: '1.7', flex: 1 },
  btnReply: { padding: '10px 20px', borderRadius: '10px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', marginTop: '20px', alignSelf: 'flex-start' },
  noMessage: { textAlign: 'center', margin: 'auto' },
  commentCard: { background: '#fff', borderRadius: '14px', border: '1px solid #DDE5F0', padding: '20px', marginBottom: '16px' },
  commentHeader: { marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #DDE5F0' },
  commentCours: { fontSize: '16px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px' },
  commentLecon: { fontSize: '13px', color: '#64748B' },
  commentsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' },
  commentItem: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
  commentAvatar: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px', color: '#fff', flexShrink: 0 },
  commentBubble: { flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid', maxWidth: '80%' },
  commentAuteur: { fontSize: '12px', fontWeight: '700', color: '#1B2E4B', marginBottom: '4px', display: 'flex', gap: '6px', alignItems: 'center' },
  profBadge: { background: '#DCFCE7', color: '#15803D', fontSize: '10px', padding: '1px 6px', borderRadius: '4px' },
  commentTexte: { fontSize: '14px', color: '#1A2332', lineHeight: '1.5' },
  commentDate: { fontSize: '11px', color: '#94A3B8', marginTop: '6px' },
  commentForm: { display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid #DDE5F0' },
  commentInput: { flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #DDE5F0', fontSize: '14px', outline: 'none', fontFamily: 'inherit' },
  btnSend: { padding: '10px 18px', borderRadius: '8px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: '16px', padding: '32px', width: '520px', maxWidth: '90vw' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1B2E4B', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #DDE5F0', fontSize: '14px', outline: 'none', fontFamily: 'inherit', color: '#1A2332' },
  modalBtns: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' },
  btnPrimary: { padding: '10px 20px', borderRadius: '10px', background: '#1B2E4B', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  btnOutline: { padding: '10px 20px', borderRadius: '10px', background: 'transparent', color: '#64748B', border: '1.5px solid #DDE5F0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  successBox: { textAlign: 'center', padding: '32px' },
}

export default Interactions