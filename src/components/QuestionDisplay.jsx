import { motion } from 'framer-motion';

const getThemeId = (themeName) => {
  if (!themeName) return 'rumble';
  const mapping = {
    'Small talk': 'smalltalk',
    'Dilemmes Absurdes': 'dilemmes',
    'Confessions': 'confessions',
    'Nominations': 'nominations',
    'Débats improbables': 'debats',
    'Scénarios WTF': 'scenarios',
    'Rumble': 'rumble'
  };
  return mapping[themeName] || 'rumble';
};

export default function QuestionDisplay({ question, activeTheme }) {
  if (!question) {
    return (
      <div className="glass" style={{ padding: '4rem', textAlign: 'center', marginTop: '2rem' }}>
        <h2 style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
          Oups, on a fait le tour des questions pour ce thème !
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', opacity: 0.7 }}>
          Change de thème ou recommence.
        </p>
      </div>
    );
  }

  // Dans le mode Rumble, on veut afficher de quel thème provient la question
  const themeId = getThemeId(question.theme);

  return (
    <motion.div
      key={question.id} // Clé sur l'ID pour forcer le re-render et l'animation lors du passage à la question suivante
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`glass theme-bg-${themeId}`}
      style={{
        padding: '4rem 2.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        minHeight: '350px',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className={`theme-text-${themeId}`}
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 700,
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '9999px',
          marginBottom: 'auto'
        }}
      >
        {question.theme}
      </div>

      <h2 
        style={{
          fontSize: '2.25rem',
          lineHeight: '1.4',
          fontWeight: 600,
          margin: 0,
          zIndex: 1
        }}
      >
        {question.text}
      </h2>
      
      <div style={{ marginTop: 'auto' }}></div>
    </motion.div>
  );
}
