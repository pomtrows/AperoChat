import { MessageCircle, Split, Ghost, Trophy, Swords, Zap, Dices } from 'lucide-react';
import { motion } from 'framer-motion';

const themeConfig = {
  'Small talk': { icon: MessageCircle, id: 'smalltalk', desc: 'Pour briser la glace en douceur.' },
  'Dilemmes Absurdes': { icon: Split, id: 'dilemmes', desc: 'Des choix impossibles et stupides.' },
  'Confessions': { icon: Ghost, id: 'confessions', desc: 'L\'heure de dire la vérité.' },
  'Nominations': { icon: Trophy, id: 'nominations', desc: 'Qui est le plus susceptible de...' },
  'Débats improbables': { icon: Swords, id: 'debats', desc: 'Des disputes sur des sujets futiles.' },
  'Scénarios WTF': { icon: Zap, id: 'scenarios', desc: 'Des situations complètement folles.' },
  'Rumble': { icon: Dices, id: 'rumble', desc: 'Un mélange explosif de toutes les catégories !' }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

export default function ThemeSelector({ onSelect }) {
  // Ordered themes with Rumble at the end
  const themesList = Object.keys(themeConfig);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
        width: '100%'
      }}
    >
      {themesList.map((themeName) => {
        const config = themeConfig[themeName];
        const Icon = config.icon;
        
        return (
          <motion.div variants={item} key={themeName} style={{ height: '100%' }}>
            <button
              onClick={() => onSelect(themeName)}
              className={`glass theme-bg-${config.id}`}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '2rem',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '16px', background: 'rgba(0,0,0,0.2)', display: 'inline-flex' }}>
                <Icon className={`theme-text-${config.id}`} size={32} />
              </div>
              <h2 className={`theme-text-${config.id}`} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {themeName}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {config.desc}
              </p>
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
