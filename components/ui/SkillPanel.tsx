'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/useCursor';
import * as LucideIcons from 'lucide-react';

interface Skill {
  name: string;
  primary: boolean;
  lucideIcon?: string;
  deviconClass?: string;
}

interface SkillPanelProps {
  category: string;
  skills: Skill[];
  index: number;
}

// Devicon and Lucide fallback mapper
const deviconMap: Record<string, string> = {
  'TypeScript': 'devicon-typescript-plain colored',
  'JavaScript (ES6+)': 'devicon-javascript-plain colored',
  'SQL': 'devicon-postgresql-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  'Python': 'devicon-python-plain colored',
  'Next.js': 'devicon-nextjs-plain text-white',
  'React.js': 'devicon-react-original colored',
  'React Native (Expo)': 'devicon-react-original colored',
  'Tailwind CSS': 'devicon-tailwindcss-plain colored',
  'Redux Toolkit': 'devicon-redux-original colored',
  'Expo Router': 'devicon-react-original colored',
  'Node.js': 'devicon-nodejs-plain colored',
  'FastAPI': 'devicon-fastapi-plain colored',
  'Express.js': 'devicon-express-original text-white',
  'RabbitMQ': 'devicon-rabbitmq-original colored',
  'PostgreSQL': 'devicon-postgresql-plain colored',
  'MongoDB': 'devicon-mongodb-plain colored',
  'Redis': 'devicon-redis-plain colored',
  'Prisma ORM': 'devicon-prisma-original text-white',
  'Neon Serverless': 'devicon-postgresql-plain colored',
  'Docker': 'devicon-docker-plain colored',
  'AWS (EC2/S3)': 'devicon-amazonwebservices-plain colored',
  'GitHub Actions': 'devicon-github-original text-white',
  'Turborepo': 'devicon-turborepo-original colored',
};

const lucideMap: Record<string, keyof typeof LucideIcons> = {
  'RESTful APIs': 'Globe',
  'WebSockets': 'Radio',
  'Microservices': 'Boxes',
  'JWT & OAuth 2.0': 'KeyRound',
  'RBAC (Auth)': 'ShieldAlert',
};

export const SkillPanel: React.FC<SkillPanelProps> = ({ category, skills, index }) => {
  const { setCursorType, setCursorText } = useCursor();

  // Render icon based on name
  const renderSkillIcon = (name: string) => {
    if (deviconMap[name]) {
      return <i className={`${deviconMap[name]} text-sm mr-2 flex-shrink-0`} />;
    }
    if (lucideMap[name]) {
      const IconComp = LucideIcons[lucideMap[name]] as React.ComponentType<{ className?: string }>;
      return IconComp ? <IconComp className="w-3.5 h-3.5 mr-2 text-accent-glow flex-shrink-0" /> : null;
    }
    // Default fallback
    return <LucideIcons.Cpu className="w-3.5 h-3.5 mr-2 text-text-tertiary flex-shrink-0" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-2xl p-6 transition-all duration-500 overflow-hidden"
      onMouseEnter={() => {
        setCursorType('hover');
        setCursorText('SKILLS');
      }}
      onMouseLeave={() => {
        setCursorType('default');
        setCursorText('');
      }}
    >
      {/* Background pulsing glow on panel hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.01] to-accent-glow/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Category Title */}
      <h3 className="font-mono text-xs text-accent-primary font-bold uppercase tracking-widest mb-6">
        &gt; {category}
      </h3>

      {/* Chips list */}
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, sIdx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 + sIdx * 0.03 }}
            whileHover={{ y: -2 }}
            className={`flex items-center px-3 py-1.5 rounded-full text-xs font-mono border transition-colors duration-300 ${
              skill.primary
                ? 'bg-accent-primary/10 border-accent-primary/30 text-text-primary hover:border-accent-primary/60'
                : 'bg-bg-elevated border-border-subtle text-text-secondary hover:border-accent-glow/50 hover:text-text-primary'
            }`}
          >
            {renderSkillIcon(skill.name)}
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default SkillPanel;
