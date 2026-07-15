'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { featuredRepos, links, projects, skills, stations, type StationId, experience } from '@/lib/portfolio-data';
import { InteractiveTerminal } from './InteractiveTerminal';

type StationPanelProps = {
  activeStation: StationId;
};

// Variants for smooth staggered tab animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 240, 
      damping: 24 
    } 
  }
} as const;

export function StationPanel({ activeStation }: StationPanelProps) {
  const station = stations.find((item) => item.id === activeStation) ?? stations[0];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={station.id}
        id={station.id}
        aria-live="polite"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="station-panel h-full max-h-full overflow-y-auto rounded-[2rem] border border-[#1f6f78]/35 bg-[#08131a]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-6"
      >
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#d8a657]">
          <span>{station.kicker}</span>
          <span className="rounded-full border border-[#1f6f78]/40 px-2 py-1 text-[#b7c6d1]">{station.object}</span>
        </div>
        <h1 className="font-display text-xl md:text-3xl font-extrabold leading-tight text-white">{station.title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#b7c6d1] md:text-base opacity-90">{station.summary}</p>
        <div className="mt-6">{renderStation(activeStation)}</div>
      </motion.section>
    </AnimatePresence>
  );
}

function renderStation(station: StationId) {
  if (station === 'boot') {
    return (
      <div className="space-y-5">
        {/* Interactive Hacker CLI Prompt and Game */}
        <InteractiveTerminal />

        <div className="flex flex-wrap gap-3 mt-2">
          <a className="station-btn station-btn-gold" href={links.resume} target="_blank" rel="noopener noreferrer">Download Resume</a>
          <a className="station-btn" href={links.github} target="_blank" rel="noreferrer">Open GitHub</a>
        </div>
      </div>
    );
  }

  if (station === 'about') {
    const aboutList = [
      'Full Stack Engineer based in Patna, India.',
      'Building DocStream at NexoGrafix: document conversion platform (OCR -> XML -> EPUB), microservices architecture (FastAPI, React, RabbitMQ).',
      'Pursuing MCA at IIIT Ranchi & IIT Patna (2026-Present).',
      'Holds an MBA in Marketing in addition to engineering background, adding product-thinking angle.',
      'Prior: ShipU Logistics, Shabra Softech; shipped production systems, migrated a monolith to Turborepo, helped serve 1,000+ MAUs.'
    ];

    return (
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3.5 text-sm leading-6 text-[#dce7ee]"
      >
        {aboutList.map((text, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
            className="pl-4 border-l-2 border-[#1f6f78]/40 hover:border-accent-primary transition-colors duration-200"
          >
            {text}
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  if (station === 'skills') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-3 md:grid-cols-2"
      >
        {skills.map((group) => (
          <motion.div 
            key={group.group} 
            variants={itemVariants}
            className="rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22]/80 p-4 transition-all hover:border-[#1f6f78]/55 duration-300"
          >
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8a657]">{group.group}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-[#1f6f78]/15 px-3 py-1 text-xs text-[#dce7ee] border border-transparent hover:border-accent-primary/20 hover:bg-[#1f6f78]/25 transition-all">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (station === 'experience') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {experience.map((item) => (
          <motion.article 
            key={`${item.org}-${item.date}`} 
            variants={itemVariants}
            className="rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22]/80 p-4 hover:border-[#d8a657]/40 transition-all duration-300"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <h2 className="font-semibold text-white">{item.org}</h2>
              <span className="font-mono text-xs text-[#d8a657]">{item.date}</span>
            </div>
            <p className="mt-1 text-sm text-[#b7c6d1]">{item.role}</p>
            {item.bullets.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#dce7ee]">
                {item.bullets.map((bullet) => <li key={bullet}>- {bullet}</li>)}
              </ul>
            )}
          </motion.article>
        ))}
      </motion.div>
    );
  }

  if (station === 'projects') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-3 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article 
            key={project.name} 
            variants={itemVariants}
            className="rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22]/80 p-4 hover:border-[#22D3EE]/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-white">{project.name}</h2>
              <span className="rounded-full border border-[#d8a657]/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[#d8a657] shrink-0">{project.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#dce7ee]">{project.description}</p>
          </motion.article>
        ))}
      </motion.div>
    );
  }

  if (station === 'github') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="grid gap-3 sm:grid-cols-3">
          {['24 public repos', '45 followers', 'live contribution graph'].map((item) => (
            <div key={item} className="rounded-2xl bg-[#0d1b22] p-4 font-mono text-xs text-[#dce7ee] text-center border border-[#1f6f78]/15">{item}</div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {featuredRepos.map((repo) => (
            <span key={repo} className="rounded-full border border-[#1f6f78]/30 px-3 py-1 text-xs text-[#b7c6d1]">
              {repo}
            </span>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <a className="station-btn" href={links.github} target="_blank" rel="noreferrer">Open GitHub</a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <motion.div variants={itemVariants} className="space-y-3 text-sm text-[#dce7ee]">
        <a className="block rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22] p-4 hover:border-accent-primary transition-colors" href={links.email}>ayushkumar9315983@gmail.com</a>
        <a className="block rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22] p-4 hover:border-accent-primary transition-colors" href={links.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/ayush-kumar-94310522a</a>
        <a className="block rounded-2xl border border-[#1f6f78]/25 bg-[#0d1b22] p-4 hover:border-accent-primary transition-colors" href={links.cal} target="_blank" rel="noreferrer">Book a 15-min call on Cal.com</a>
      </motion.div>
      
      <motion.form variants={itemVariants} className="space-y-3" action={links.email}>
        <input className="station-input" name="subject" placeholder="Transmission subject" />
        <textarea className="station-input min-h-28" name="body" placeholder="Transmit Message" />
        <button className="station-btn station-btn-gold w-full sm:w-auto" type="submit">Transmit Message</button>
      </motion.form>
    </motion.div>
  );
}
