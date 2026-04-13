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
      className="themes-grid"
    >
      {themesList.map((themeName) => {
        const config = themeConfig[themeName];
        const Icon = config.icon;
        
        return (
          <motion.div variants={item} key={themeName} style={{ height: '100%' }}>
            <button
              onClick={() => onSelect(themeName)}
              className={`glass theme-card theme-bg-${config.id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="theme-card-icon">
                <Icon 
                  className={config.id === 'rumble' 
                    ? `theme-icon-rumble rolling` 
                    : `theme-text-${config.id}`} 
                  size={32} 
                />
              </div>
              <h2 className={`theme-card-title theme-text-${config.id}`}>
                {themeName}
              </h2>
              <p className="theme-card-desc">
                {config.desc}
              </p>
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
