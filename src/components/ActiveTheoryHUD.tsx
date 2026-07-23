"use client";

import React, { useEffect, useState } from "react";
import { Activity, Volume2, VolumeX, Command } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface ActiveTheoryHUDProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const ActiveTheoryHUD: React.FC<ActiveTheoryHUDProps> = ({
  onOpenCommandPalette,
  activeSection,
}) => {
  const [fps, setFps] = useState<number>(60);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    setIsMuted(audioEngine.getMuted());

    // FPS Calculator
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFPS = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFPS);
    };
    animId = requestAnimationFrame(calcFPS);

    // Mouse Coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Scroll Progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.round(current));
      }
    };

    // Live UTC / Local Clock
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const clockTimer = setInterval(updateClock, 1000);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(clockTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex flex-wrap items-center justify-between gap-3 text-xs font-mono select-none">
      {/* Left Telemetry Cluster */}
      <div className="pointer-events-auto flex items-center space-x-3 bg-oled-bg/90 backdrop-blur-md border border-oled-border px-3 py-1.5 rounded-full shadow-2xl text-oled-muted">
        <div className="flex items-center space-x-1.5 text-signal-cyan">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-bold">{fps} FPS</span>
        </div>

        <span className="text-oled-border">|</span>

        <div className="hidden sm:flex items-center space-x-1.5 text-[11px]">
          <span>X: <strong className="text-oled-text">{mousePos.x}</strong></span>
          <span>Y: <strong className="text-oled-text">{mousePos.y}</strong></span>
        </div>

        <span className="hidden sm:inline text-oled-border">|</span>

        <div className="flex items-center space-x-1.5 text-[11px]">
          <span className="text-signal-green uppercase font-bold">{activeSection}</span>
          <span className="text-signal-amber font-mono">[{scrollProgress}%]</span>
        </div>
      </div>

      {/* Right Controls Cluster */}
      <div className="pointer-events-auto flex items-center space-x-2 bg-oled-bg/90 backdrop-blur-md border border-oled-border px-3 py-1.5 rounded-full shadow-2xl">
        {/* Live Clock */}
        <div className="hidden md:flex items-center space-x-1 text-oled-muted text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
          <span>PATNA {currentTime} IST</span>
        </div>

        <span className="hidden md:inline text-oled-border">|</span>

        {/* Dedicated Single Mute Button in Telemetry Dock */}
        <button
          onClick={handleToggleSound}
          onMouseEnter={() => audioEngine.playHover()}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all text-[11px] font-bold ${
            isMuted
              ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20"
              : "bg-signal-green/10 border-signal-green/40 text-signal-green hover:bg-signal-green/20 shadow-glow-green"
          }`}
          title={isMuted ? "Unmute background synth music & UI sound FX" : "Mute all sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>MUTE AUDIO</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-signal-green shrink-0 animate-pulse" />
              <div className="flex items-end space-x-0.5 h-3 mr-1">
                <span className="w-0.5 bg-signal-green animate-[ping_1s_infinite_ease-in-out] h-2" />
                <span className="w-0.5 bg-signal-cyan animate-[ping_1.2s_infinite_ease-in-out] h-3" />
                <span className="w-0.5 bg-signal-green animate-[ping_0.8s_infinite_ease-in-out] h-1.5" />
              </div>
              <span>AUDIO ON</span>
            </>
          )}
        </button>

        {/* Command Palette Launcher */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenCommandPalette();
          }}
          onMouseEnter={() => audioEngine.playHover()}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-signal-cyan/10 border border-signal-cyan/40 text-signal-cyan hover:bg-signal-cyan hover:text-oled-bg font-bold transition-all text-[11px] shadow-glow-cyan"
        >
          <Command className="w-3 h-3" />
          <span>Ctrl + K</span>
        </button>
      </div>
    </div>
  );
};
