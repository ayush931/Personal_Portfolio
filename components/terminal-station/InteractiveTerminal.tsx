'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, CornerDownLeft, Volume2, VolumeX } from 'lucide-react';

interface CommandHistoryItem {
  type: 'input' | 'output' | 'error';
  text: string;
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    { type: 'output', text: 'TERMINAL STATION CORE v2.8 - COMPILER ONLINE' },
    { type: 'output', text: 'Type "help" to display available terminal commands.' },
  ]);
  const [input, setInput] = useState('');
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Snake game states
  const [snake, setSnake] = useState<[number, number][]>([[5, 5], [5, 6], [5, 7]]);
  const [food, setFood] = useState<[number, number]>([3, 3]);
  const [dir, setDir] = useState<[number, number]>([0, -1]); // moving up
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const boardWidth = 18;
  const boardHeight = 10;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isPlayingSnake, gameOver]);

  const exitGame = useCallback(() => {
    setIsPlayingSnake(false);
    setHistory((prev) => [
      ...prev,
      { type: 'output', text: `Game exited. Final score: ${score}` },
    ]);
  }, [score]);

  const playTone = useCallback((freq: number, duration: number) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration / 1000);
      osc.start();
      osc.stop(audioCtx.currentTime + duration / 1000);
    } catch {}
  }, [soundEnabled]);

  // Handle game input
  useEffect(() => {
    if (!isPlayingSnake || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (dir[1] !== 1) setDir([0, -1]);
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (dir[1] !== -1) setDir([0, 1]);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (dir[0] !== 1) setDir([-1, 0]);
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (dir[0] !== -1) setDir([1, 0]);
          e.preventDefault();
          break;
        case 'Escape':
          exitGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayingSnake, dir, gameOver, exitGame]);

  // Game tick
  useEffect(() => {
    if (!isPlayingSnake || gameOver) return;

    const tick = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead: [number, number] = [head[0] + dir[0], head[1] + dir[1]];

        // Collide walls
        if (
          newHead[0] < 0 ||
          newHead[0] >= boardWidth ||
          newHead[1] < 0 ||
          newHead[1] >= boardHeight
        ) {
          setGameOver(true);
          playTone(150, 400); // Fail sound
          return prevSnake;
        }

        // Collide self
        if (prevSnake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          playTone(150, 400); // Fail sound
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 10);
          playTone(600, 80); // Eat sound
          // Spawn new food
          let newFood: [number, number];
          do {
            newFood = [
              Math.floor(Math.random() * boardWidth),
              Math.floor(Math.random() * boardHeight),
            ];
          } while (newSnake.some((seg) => seg[0] === newFood[0] && seg[1] === newFood[1]));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(tick, 180);
    return () => clearInterval(intervalId);
  }, [isPlayingSnake, food, dir, gameOver, playTone]);



  const handleCommand = (cmdText: string) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'input' as const, text: cmdText }];

    playTone(800, 30); // Key click tone

    switch (cleanCmd) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  ls, dir           - List directory structure' },
          { type: 'output', text: '  cat [filename]    - Print file content (e.g. cat about.txt)' },
          { type: 'output', text: '  snake             - Launch retro terminal game' },
          { type: 'output', text: '  clear, cls        - Clear the terminal display' },
          { type: 'output', text: '  matrix            - Establish digital rain sequence' },
          { type: 'output', text: '  audio             - Toggle synth sound effects' },
          { type: 'output', text: '  whoami            - Display current operator profile' }
        );
        break;
      case 'ls':
      case 'dir':
        newHistory.push(
          { type: 'output', text: 'Directory: /home/ayush/portfolio/' },
          { type: 'output', text: '  -rw-r--r--   1 operator  staff   1.2K Jul 15 about.txt' },
          { type: 'output', text: '  -rw-r--r--   1 operator  staff   850B Jul 15 skills.md' },
          { type: 'output', text: '  -rw-r--r--   1 operator  staff   2.1K Jul 15 projects.json' },
          { type: 'output', text: '  -rwxr-xr-x   1 operator  staff   4.5K Jul 15 snake.sh' },
          { type: 'output', text: '  -rw-r--r--   1 operator  staff   420B Jul 15 contact.cfg' }
        );
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'Ayush Kumar -- Full Stack Software Engineer -- Patna, India' });
        break;
      case 'audio':
        setSoundEnabled((prev) => {
          const next = !prev;
          newHistory.push({ type: 'output', text: `Audio sound synthesis: ${next ? 'ENABLED' : 'DISABLED'}` });
          return next;
        });
        break;
      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;
      case 'matrix':
        newHistory.push(
          { type: 'output', text: 'INITIALIZING DIGITAL RAIN GATEWAY...' },
          { type: 'output', text: '01010101   SYSTEM OVERLOADED   10101010' },
          { type: 'output', text: '00110011   CONNECTING PORTFOLIO  11001100' },
          { type: 'output', text: 'SUCCESS: Alt text conversion DocStream channel configured.' }
        );
        break;
      case 'snake':
        setIsPlayingSnake(true);
        setSnake([[5, 5], [5, 6], [5, 7]]);
        setFood([3, 3]);
        setDir([0, -1]);
        setGameOver(false);
        setScore(0);
        playTone(400, 100);
        setTimeout(() => playTone(600, 100), 100);
        return;
      case 'cat about.txt':
        newHistory.push(
          { type: 'output', text: 'FILE: about.txt' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: 'Junior Software Engineer at NexoGrafix building DocStream.' },
          { type: 'output', text: 'Pursuing MCA at IIIT Ranchi & IIT Patna.' },
          { type: 'output', text: 'Unique tech + marketing background (MCA + MBA).' }
        );
        break;
      case 'cat skills.md':
        newHistory.push(
          { type: 'output', text: 'FILE: skills.md' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: '* Languages: TypeScript, JavaScript, Python, SQL, C++' },
          { type: 'output', text: '* Core Frontend: Next.js, React.js, React Native (Expo), Tailwind' },
          { type: 'output', text: '* Backend: FastAPI, Node.js, Express, Celery, RabbitMQ' },
          { type: 'output', text: '* Data & DevOps: PostgreSQL, MongoDB, Redis, Prisma, Docker, AWS' }
        );
        break;
      case 'cat projects.json':
        newHistory.push(
          { type: 'output', text: 'FILE: projects.json' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: '1. Aetheria (multiplayer sandbox world with WebRTC proximity audio)' },
          { type: 'output', text: '2. RideSync (full-featured React Native cab scheduler app)' },
          { type: 'output', text: '3. DocStream (microservice conversion pipeline)' },
          { type: 'output', text: '4. Excalidraw Clone (collaborative whiteboarding socket server)' }
        );
        break;
      case 'cat contact.cfg':
        newHistory.push(
          { type: 'output', text: 'FILE: contact.cfg' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: 'Email: ayushkumar9315983@gmail.com' },
          { type: 'output', text: 'LinkedIn: linkedin.com/in/ayush-kumar-94310522a' },
          { type: 'output', text: 'GitHub: github.com/ayush931' },
          { type: 'output', text: 'Call booking: cal.com/ayushkumar' }
        );
        break;
      default:
        if (cleanCmd.startsWith('cat ')) {
          newHistory.push({ type: 'error', text: `cat: ${cleanCmd.split(' ')[1]}: File or directory not found` });
        } else {
          newHistory.push({ type: 'error', text: `command not found: "${cleanCmd}". Type "help" for a list of utilities.` });
        }
        break;
    }

    setHistory(newHistory);
    setInput('');
  };



  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  // Render Snake Board ASCII
  const renderBoard = () => {
    const grid: string[][] = Array(boardHeight)
      .fill(null)
      .map(() => Array(boardWidth).fill('.'));

    // Place Food
    if (food[0] >= 0 && food[0] < boardWidth && food[1] >= 0 && food[1] < boardHeight) {
      grid[food[1]][food[0]] = '★';
    }

    // Place Snake segments
    snake.forEach((segment, idx) => {
      if (segment[0] >= 0 && segment[0] < boardWidth && segment[1] >= 0 && segment[1] < boardHeight) {
        grid[segment[1]][segment[0]] = idx === 0 ? '◈' : 'o';
      }
    });

    return grid.map((row, rIdx) => (
      <div key={rIdx} className="flex leading-4 tracking-wider h-4 text-emerald-400 select-none">
        {row.join(' ')}
      </div>
    ));
  };

  return (
    <div className="w-full bg-[#030c12]/95 border border-border-subtle rounded-2xl p-4 shadow-inner flex flex-col h-[280px] md:h-[350px]">
      
      {/* Sound Toggle HUD */}
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle/30 mb-3 text-[10px] font-mono text-text-tertiary">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-accent-primary" />
          Interactive Operator Console
        </span>
        <button
          onClick={() => setSoundEnabled((s) => !s)}
          className="flex items-center gap-1 rounded bg-[#1f6f78]/20 px-2 py-0.5 border border-[#1f6f78]/30 hover:border-accent-primary text-text-secondary hover:text-text-primary transition-all duration-200"
        >
          {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          <span>{soundEnabled ? 'Synth: ON' : 'Synth: OFF'}</span>
        </button>
      </div>

      {/* Terminal Output history */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-none pr-1 select-text cursor-text"
      >
        {history.map((line, idx) => {
          if (line.type === 'input') {
            return (
              <div key={idx} className="flex text-text-primary font-bold">
                <span className="text-accent-primary mr-2 select-none">$</span>
                {line.text}
              </div>
            );
          } else if (line.type === 'error') {
            return (
              <div key={idx} className="text-red-400 pl-2 border-l border-red-500/30">
                {line.text}
              </div>
            );
          } else {
            return (
              <div key={idx} className="text-text-secondary pl-2 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          }
        })}

        {/* Snake retro minigame screen */}
        {isPlayingSnake && (
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-black/40 flex flex-col items-center gap-3">
            <div className="flex justify-between w-full font-mono text-[10px] text-emerald-500 uppercase tracking-widest px-2 border-b border-emerald-500/10 pb-1.5">
              <span>Game: Snake.sh</span>
              <span>Score: {score}</span>
            </div>

            <div className="border border-emerald-500/30 p-2 bg-[#02080c] rounded-md font-mono text-sm leading-none flex flex-col items-center">
              {renderBoard()}
            </div>

            {gameOver ? (
              <div className="text-center space-y-2">
                <p className="text-red-400 font-bold font-mono text-xs uppercase animate-pulse">Game Over</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSnake([[5, 5], [5, 6], [5, 7]]);
                      setDir([0, -1]);
                      setGameOver(false);
                      setScore(0);
                      playTone(400, 100);
                    }}
                    className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider border border-emerald-500 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    Retry
                  </button>
                  <button
                    onClick={exitGame}
                    className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider border border-[#1f6f78]/40 text-[#b7c6d1] rounded-md hover:bg-[#1f6f78]/20 transition-all"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-[10px] font-mono text-text-tertiary uppercase flex gap-4 mt-1 select-none">
                <span>[Arrows] Navigate</span>
                <span>[Esc] Stop Game</span>
              </div>
            )}

            {/* Mobile virtual directional buttons */}
            {!gameOver && (
              <div className="grid grid-cols-3 gap-1.5 w-32 md:hidden mt-2 select-none">
                <div />
                <button
                  onClick={() => dir[1] !== 1 && setDir([0, -1])}
                  className="h-8 rounded bg-[#1f6f78]/30 flex items-center justify-center text-white border border-[#1f6f78]/40 active:bg-[#1f6f78]"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={() => dir[0] !== 1 && setDir([-1, 0])}
                  className="h-8 rounded bg-[#1f6f78]/30 flex items-center justify-center text-white border border-[#1f6f78]/40 active:bg-[#1f6f78]"
                >
                  ◀
                </button>
                <button
                  onClick={() => dir[1] !== -1 && setDir([0, 1])}
                  className="h-8 rounded bg-[#1f6f78]/30 flex items-center justify-center text-white border border-[#1f6f78]/40 active:bg-[#1f6f78]"
                >
                  ▼
                </button>
                <button
                  onClick={() => dir[0] !== -1 && setDir([1, 0])}
                  className="h-8 rounded bg-[#1f6f78]/30 flex items-center justify-center text-white border border-[#1f6f78]/40 active:bg-[#1f6f78]"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terminal prompt input (only visible when not playing snake) */}
      {!isPlayingSnake && (
        <form onSubmit={handleTerminalSubmit} className="flex items-center mt-3 pt-2.5 border-t border-border-subtle/30 font-mono text-xs">
          <span className="text-accent-primary mr-2 font-bold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-text-primary outline-none"
            placeholder="Type a command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="text-text-tertiary hover:text-accent-primary p-1 transition-colors">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
