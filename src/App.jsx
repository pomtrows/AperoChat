import { useState, useRef } from 'react';
import { Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, themes } from './data/questions';
import ThemeSelector from './components/ThemeSelector';
import QuestionDisplay from './components/QuestionDisplay';
import './index.css'; // Make sure the styles are applied

function App() {
  const [currentView, setCurrentView] = useState('selector'); // 'selector' | 'question'
  const [activeTheme, setActiveTheme] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Keep track of unasked questions per theme session to avoid repeats
  const questionPool = useRef([]);

  const getQuestionsForTheme = (themeName) => {
    if (themeName === 'Rumble') {
      return [...questions];
    }
    return questions.filter(q => q.theme === themeName);
  };

  const drawNextQuestion = (themeName) => {
    // If pool is empty or not initialized, refill it
    if (!questionPool.current || questionPool.current.length === 0) {
      questionPool.current = getQuestionsForTheme(themeName);
      // Shuffle the pool
      questionPool.current.sort(() => Math.random() - 0.5);
    }
    
    // Pop a question
    const nextQ = questionPool.current.pop();
    setCurrentQuestion(nextQ);
  };

  const handleSelectTheme = (themeName) => {
    setActiveTheme(themeName);
    // Reset pool when switching themes
    questionPool.current = [];
    drawNextQuestion(themeName);
    setCurrentView('question');
  };

  const handleNext = () => {
    drawNextQuestion(activeTheme);
  };

  const handleBack = () => {
    setCurrentView('selector');
    setActiveTheme(null);
    setCurrentQuestion(null);
  };

  return (
    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', marginBottom: currentView === 'selector' ? '4rem' : '2rem', transition: 'all 0.3s ease' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Sparkles className="theme-text-rumble" size={40} />
          <span>Opéro Chat</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
          Le jeu parfait pour détruire (ou renforcer) vos amitiés.
        </p>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {currentView === 'selector' ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <ThemeSelector onSelect={handleSelectTheme} />
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <button className="btn-secondary" onClick={handleBack} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={18} />
                Retour aux thèmes
              </button>
              
              <QuestionDisplay 
                question={currentQuestion} 
                activeTheme={activeTheme} 
                onNext={handleNext}
              />
              
              <button className="btn-primary" onClick={handleNext} style={{ alignSelf: 'center', padding: '1.25rem 3rem', fontSize: '1.25rem', marginTop: '1rem' }}>
                <span>Question Suivante</span>
                <RefreshCw size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
