'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TerminalLine {
  text: string;
  isCommand: boolean;
}

const terminalContent: TerminalLine[] = [
  { text: 'whoami', isCommand: true },
  { text: 'Ayush Kumar, Full Stack Engineer', isCommand: false },
  { text: 'cat current_role.txt', isCommand: true },
  { text: 'Junior SWE @ NexoGrafix\nBuilding: DocStream (OCR → XML → EPUB pipeline)', isCommand: false },
  { text: 'cat open_to.txt', isCommand: true },
  { text: 'Full Stack / Backend roles\nOpen to relocation from Patna', isCommand: false },
  { text: 'echo $BONUS', isCommand: true },
  { text: 'MBA + Engineering = rare combo', isCommand: false },
];

export const TerminalCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let lineIdx = 0;
    let charIdx = 0;
    let currentLineText = '';
    const tempLines: string[] = [];

    const typeChar = () => {
      if (lineIdx >= terminalContent.length) {
        setIsFinished(true);
        return;
      }

      const currentItem = terminalContent[lineIdx];
      const targetText = currentItem.text;

      if (currentItem.isCommand) {
        // Command is typed char by char
        if (charIdx === 0) {
          tempLines.push('$ ');
        }
        
        currentLineText += targetText[charIdx];
        tempLines[tempLines.length - 1] = `$ ${currentLineText}`;
        setDisplayedLines([...tempLines]);
        charIdx++;

        if (charIdx < targetText.length) {
          setTimeout(typeChar, 30);
        } else {
          // Finish command line, move to next output line after a tiny delay
          lineIdx++;
          charIdx = 0;
          currentLineText = '';
          setTimeout(typeChar, 100);
        }
      } else {
        // Output lines appear instantly or very fast (simulating terminal response)
        const outputLines = targetText.split('\n');
        outputLines.forEach((ol) => {
          tempLines.push(`> ${ol}`);
        });
        setDisplayedLines([...tempLines]);
        lineIdx++;
        setTimeout(typeChar, 150);
      }
    };

    const delayTimer = setTimeout(typeChar, 500);

    return () => clearTimeout(delayTimer);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-2xl font-mono text-[12px] md:text-sm text-text-primary"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B0D13] border-b border-border-subtle/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-text-tertiary">ayush@portfolio ~ info</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-3 min-h-[220px] select-none">
        {displayedLines.map((line, idx) => {
          const isCmd = line.startsWith('$');
          return (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                isCmd ? 'text-text-primary' : 'text-text-secondary pl-2'
              }`}
            >
              {line}
            </div>
          );
        })}
        
        {/* Blinking cursor */}
        {isInView && (
          <span
            className={`inline-block w-1.5 h-4 bg-accent-primary ml-1 ${
              isFinished ? 'animate-pulse' : ''
            }`}
          />
        )}
      </div>
    </div>
  );
};
export default TerminalCard;
