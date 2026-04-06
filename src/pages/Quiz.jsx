import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const questions = [
  {
    id: 1,
    text: 'Quel hook React permet de gérer un état local dans un composant ?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
  },
  {
    id: 2,
    text: 'Quel hook React permet de gérer les effets de bord comme les appels API ?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correct: 1,
  },
  {
    id: 3,
    text: 'Comment passe-t-on des données d\'un composant parent à un enfant en React ?',
    options: ['Avec le state', 'Avec les props', 'Avec useContext', 'Avec Redux'],
    correct: 1,
  },
  {
    id: 4,
    text: 'Quelle bibliothèque permet de gérer la navigation dans React ?',
    options: ['react-navigation', 'react-router-dom', 'react-link', 'react-nav'],
    correct: 1,
  },
  {
    id: 5,
    text: 'Qu\'est-ce que JSX ?',
    options: [
      'Un langage de programmation',
      'Une extension de JavaScript permettant d\'écrire du HTML dans JS',
      'Un framework CSS',
      'Une base de données',
    ],
    correct: 1,
  },
]

function Quiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]

  const handleSelect = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const getOptionStyle = (index) => {
    if (!answered) {
      return selected === index ? styles.optionSelected : styles.option
    }
    if (index === question.correct) return styles.optionCorrect
    if (index === selected) return styles.optionWrong
    return styles.option
  }

  const getLetterStyle = (index) => {
    if (!answered) {
      return selected === index ? styles.letterSelected : styles.letter
    }
    if (index === question.correct) return styles.letterCorrect
    if (index === selected) return styles.letterWrong
    return styles.letter
  }

  // PAGE RÉSULTAT
  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div>
        <Navbar role="etudiant" />
        <div style={styles.resultPage}>
          <div style={styles.resultCard}>
            <div style={styles.resultEmoji}>
              {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
            </div>
            <h2 style={styles.resultTitle}>Quiz terminé !</h2>
            <div style={styles.resultScore}>
              {score}/{questions.length}
            </div>
            <div style={styles.resultPct}>{pct}% de bonnes réponses</div>
            <div style={styles.resultMsg}>
              {pct >= 80
                ? '🎉 Excellent ! Vous maîtrisez bien le sujet !'
                : pct >= 60
                ? '👍 Bien ! Continuez vos révisions.'
                : '📚 Revoyez le cours et réessayez !'}
            </div>
            <div style={styles.resultBtns}>
              <button
                style={styles.btnPrimary}
                onClick={() => {
                  setCurrent(0)
                  setSelected(null)
                  setAnswered(false)
                  setScore(0)
                  setFinished(false)
                }}
              >
                🔄 Recommencer
              </button>
              <button
                style={styles.btnGold}
                onClick={() => navigate('/dashboard')}
              >
                🏠 Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar role="etudiant" />
      <div style={styles.main}>

        {/* HEADER QUIZ */}
        <div style={styles.quizHeader}>
          <div style={styles.quizHeaderTop}>
            <div>
              <div style={styles.quizSub}>Quiz · React JS Avancé</div>
              <div style={styles.quizTitle}>
                Question {current + 1} sur {questions.length}
              </div>
            </div>
            <div style={styles.scoreBox}>
              <div style={styles.scoreLabel}>Score actuel</div>
              <div style={styles.scoreNum}>{score}/{current} ✅</div>
            </div>
          </div>

          {/* PROGRESS */}
          <div style={styles.progressWrap}>
            <div style={{
              ...styles.progressFill,
              width: `${((current) / questions.length) * 100}%`
            }} />
          </div>

          {/* DOTS */}
          <div style={styles.dots}>
            {questions.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  background: i < current
                    ? '#F5A623'
                    : i === current
                    ? '#fff'
                    : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* QUESTION */}
        <div style={styles.questionCard}>
          <div style={styles.questionNum}>
            Question {current + 1} · React JS
          </div>
          <div style={styles.questionText}>{question.text}</div>

          {question.options.map((opt, i) => (
            <div
              key={i}
              style={getOptionStyle(i)}
              onClick={() => handleSelect(i)}
            >
              <div style={getLetterStyle(i)}>
                {String.fromCharCode(65 + i)}
              </div>
              <div style={styles.optionText}>{opt}</div>
              {answered && i === question.correct && (
                <div style={styles.correctIcon}>✅</div>
              )}
              {answered && i === selected && i !== question.correct && (
                <div style={styles.wrongIcon}>❌</div>
              )}
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div style={styles.nav}>
          <button
            style={styles.btnOutline}
            onClick={() => navigate('/courses')}
          >
            ← Quitter le quiz
          </button>
          {answered && (
            <button style={styles.btnPrimary} onClick={handleNext}>
              {current + 1 >= questions.length
                ? 'Voir les résultats 🏆'
                : 'Question suivante →'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

const styles = {
  main: { padding: '32px 40px', background: '#F0F4F8', minHeight: 'calc(100vh - 68px)' },
  quizHeader: {
    background: 'linear-gradient(135deg, #1B2E4B, #243857)',
    borderRadius: '16px', padding: '28px',
    color: '#fff', marginBottom: '24px',
  },
  quizHeaderTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  quizSub: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' },
  quizTitle: { fontSize: '22px', fontWeight: '800' },
  scoreBox: { textAlign: 'right' },
  scoreLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.6)' },
  scoreNum: { fontSize: '28px', fontWeight: '800', color: '#F5A623' },
  progressWrap: { background: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '8px', marginBottom: '12px' },
  progressFill: { height: '100%', borderRadius: '4px', background: '#F5A623', transition: 'width .3s' },
  dots: { display: 'flex', gap: '8px' },
  dot: { width: '32px', height: '8px', borderRadius: '4px' },
  questionCard: {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #DDE5F0', padding: '32px',
    marginBottom: '16px',
  },
  questionNum: { fontSize: '12px', fontWeight: '700', color: '#F5A623', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  questionText: { fontSize: '18px', fontWeight: '700', color: '#1B2E4B', marginBottom: '24px', lineHeight: '1.5' },
  option: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 18px', borderRadius: '12px',
    border: '2px solid #DDE5F0', marginBottom: '10px',
    cursor: 'pointer', transition: 'all .2s',
  },
  optionSelected: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 18px', borderRadius: '12px',
    border: '2px solid #1B2E4B', background: '#E2EAF4',
    marginBottom: '10px', cursor: 'pointer',
  },
  optionCorrect: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 18px', borderRadius: '12px',
    border: '2px solid #22C55E', background: '#DCFCE7',
    marginBottom: '10px', cursor: 'pointer',
  },
  optionWrong: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 18px', borderRadius: '12px',
    border: '2px solid #EF4444', background: '#FEE2E2',
    marginBottom: '10px', cursor: 'pointer',
  },
  letter: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: '#E2EAF4', color: '#1B2E4B',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', flexShrink: 0,
  },
  letterSelected: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: '#1B2E4B', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', flexShrink: 0,
  },
  letterCorrect: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: '#22C55E', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', flexShrink: 0,
  },
  letterWrong: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: '#EF4444', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '14px', flexShrink: 0,
  },
  optionText: { fontSize: '14px', fontWeight: '500', color: '#1A2332', flex: 1 },
  correctIcon: { fontSize: '18px' },
  wrongIcon: { fontSize: '18px' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnPrimary: {
    padding: '12px 28px', borderRadius: '10px',
    background: '#1B2E4B', color: '#fff',
    border: 'none', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnGold: {
    padding: '12px 28px', borderRadius: '10px',
    background: '#F5A623', color: '#1B2E4B',
    border: 'none', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnOutline: {
    padding: '12px 28px', borderRadius: '10px',
    background: 'transparent', color: '#64748B',
    border: '1.5px solid #DDE5F0', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  resultPage: {
    minHeight: 'calc(100vh - 68px)',
    background: '#F0F4F8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  resultCard: {
    background: '#fff', borderRadius: '20px',
    padding: '48px', textAlign: 'center',
    border: '1px solid #DDE5F0', width: '440px',
  },
  resultEmoji: { fontSize: '64px', marginBottom: '16px' },
  resultTitle: { fontSize: '24px', fontWeight: '800', color: '#1B2E4B', marginBottom: '16px' },
  resultScore: { fontSize: '56px', fontWeight: '900', color: '#1B2E4B', marginBottom: '8px' },
  resultPct: { fontSize: '18px', color: '#64748B', marginBottom: '16px' },
  resultMsg: { fontSize: '15px', color: '#64748B', marginBottom: '32px', lineHeight: '1.6' },
  resultBtns: { display: 'flex', gap: '12px', justifyContent: 'center' },
}

export default Quiz