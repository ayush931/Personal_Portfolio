'use client';

import React from 'react';
import SkillPanel from '../ui/SkillPanel';

const skillsData = {
  'Languages & Core': [
    { name: 'TypeScript', primary: true },
    { name: 'JavaScript (ES6+)', primary: false },
    { name: 'SQL', primary: false },
    { name: 'C++', primary: false },
    { name: 'Python', primary: false },
  ],
  'Frontend Development': [
    { name: 'Next.js', primary: true },
    { name: 'React.js', primary: false },
    { name: 'React Native (Expo)', primary: true },
    { name: 'Tailwind CSS', primary: false },
    { name: 'Redux Toolkit', primary: false },
    { name: 'Expo Router', primary: false },
  ],
  'Backend Architecture': [
    { name: 'Node.js', primary: true },
    { name: 'FastAPI', primary: true },
    { name: 'Express.js', primary: false },
    { name: 'RabbitMQ', primary: false },
    { name: 'RESTful APIs', primary: false },
    { name: 'WebSockets', primary: false },
    { name: 'Microservices', primary: false },
    { name: 'JWT & OAuth 2.0', primary: false },
    { name: 'RBAC (Auth)', primary: false },
  ],
  'Databases & DevOps': [
    { name: 'PostgreSQL', primary: true },
    { name: 'MongoDB', primary: false },
    { name: 'Redis', primary: false },
    { name: 'Prisma ORM', primary: false },
    { name: 'Neon Serverless', primary: false },
    { name: 'Docker', primary: true },
    { name: 'AWS (EC2/S3)', primary: false },
    { name: 'GitHub Actions', primary: false },
    { name: 'Turborepo', primary: false },
  ],
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">&gt; 02. Skills</span>
          <h2 className="text-h2 font-display text-text-primary">
            Technical Arsenal
          </h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsData).map(([category, skills], idx) => (
            <SkillPanel
              key={category}
              category={category}
              skills={skills}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;
