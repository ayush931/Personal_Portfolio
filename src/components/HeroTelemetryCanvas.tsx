"use client";

import React, { useEffect, useRef, useState } from "react";

interface PeerCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  ping: number;
}

export const HeroTelemetryCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fps, setFps] = useState(60);
  const [packetCount, setPacketCount] = useState(14820);
  const [activePeers, setActivePeers] = useState(3);
  const mousePosRef = useRef({ x: 150, y: 150, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimer = performance.now();

    // Simulated peer cursors
    const peers: PeerCursor[] = [
      {
        id: "p1",
        name: "node-mumbai.edge",
        color: "#5EEAD4",
        x: 100,
        y: 120,
        targetX: 100,
        targetY: 120,
        ping: 18,
      },
      {
        id: "p2",
        name: "node-singapore.edge",
        color: "#00FF9C",
        x: 320,
        y: 200,
        targetX: 320,
        targetY: 200,
        ping: 42,
      },
      {
        id: "p3",
        name: "node-frankfurt.edge",
        color: "#FFB020",
        x: 220,
        y: 310,
        targetX: 220,
        targetY: 310,
        ping: 98,
      },
    ];

    // Grid layout points
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener("mousemove", handleMouseMove);
      containerEl.addEventListener("mouseleave", handleMouseLeave);
    }

    // Packet ticks animation
    let packetTimer = 0;

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // FPS Counter
      frameCounter++;
      if (time - fpsTimer >= 1000) {
        setFps(frameCounter);
        frameCounter = 0;
        fpsTimer = time;
        setPacketCount((prev) => prev + Math.floor(15 + Math.random() * 20));
      }

      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update peer target locations periodically
      packetTimer += delta;
      if (packetTimer > 0.8) {
        packetTimer = 0;
        peers.forEach((peer) => {
          peer.targetX = Math.random() * (width - 120) + 60;
          peer.targetY = Math.random() * (height - 120) + 60;
        });
      }

      // Move peers with spring interpolation
      peers.forEach((peer) => {
        peer.x += (peer.targetX - peer.x) * 0.05;
        peer.y += (peer.targetY - peer.y) * 0.05;
      });

      // Local cursor position
      const localPos = mousePosRef.current.active
        ? mousePosRef.current
        : { x: width * 0.65, y: height * 0.45, active: false };

      // Render vector connection lines & packet diffs
      const allNodes = [
        ...peers.map((p) => ({ x: p.x, y: p.y, color: p.color, label: p.name })),
        { x: localPos.x, y: localPos.y, color: "#5EEAD4", label: "LOCAL_HOST (Ayush)" },
      ];

      for (let i = 0; i < allNodes.length; i++) {
        for (let j = i + 1; j < allNodes.length; j++) {
          const n1 = allNodes[i];
          const n2 = allNodes[j];
          const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);

          if (dist < 320) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            const alpha = (1 - dist / 320) * 0.25;
            ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw traveling packet tick
            const tickPos = (time * 0.15 + i * 50) % 1;
            const px = n1.x + (n2.x - n1.x) * tickPos;
            const py = n1.y + (n2.y - n1.y) * tickPos;
            ctx.fillStyle = n1.color;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Render Peers Cursors
      peers.forEach((peer) => {
        // Cursor pointer SVG shape
        ctx.save();
        ctx.translate(peer.x, peer.y);

        // Radar ping ring
        const ringRadius = (time * 0.05 + peer.ping) % 30;
        ctx.strokeStyle = peer.color;
        ctx.globalAlpha = 1 - ringRadius / 30;
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Pointer triangle
        ctx.fillStyle = peer.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(12, 10);
        ctx.lineTo(5, 12);
        ctx.closePath();
        ctx.fill();

        // Label box
        ctx.fillStyle = "#121215";
        ctx.strokeStyle = "#24242C";
        ctx.lineWidth = 1;
        ctx.fillRect(14, 12, 140, 20);
        ctx.strokeRect(14, 12, 140, 20);

        ctx.fillStyle = peer.color;
        ctx.font = "10px monospace";
        ctx.fillText(`${peer.name}`, 20, 26);
        ctx.fillStyle = "#A1A1AA";
        ctx.fillText(`${peer.ping}ms`, 126, 26);

        ctx.restore();
      });

      // Render Local Host Cursor
      ctx.save();
      ctx.translate(localPos.x, localPos.y);

      ctx.fillStyle = "#5EEAD4";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(12, 10);
      ctx.lineTo(5, 12);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#09090B";
      ctx.strokeStyle = "#5EEAD4";
      ctx.lineWidth = 1;
      ctx.fillRect(14, 12, 130, 22);
      ctx.strokeRect(14, 12, 130, 22);

      ctx.fillStyle = "#5EEAD4";
      ctx.font = "bold 10px monospace";
      ctx.fillText("AYUSH_SYS", 20, 26);
      ctx.fillStyle = "#00FF9C";
      ctx.fillText("0ms SYNC", 90, 26);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (containerEl) {
        containerEl.removeEventListener("mousemove", handleMouseMove);
        containerEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] bg-oled-card border border-oled-border rounded-lg overflow-hidden select-none"
    >
      {/* Real-time Telemetry Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Hardware Telemetry Overlay Box Header */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 bg-oled-bg/80 backdrop-blur-md border border-oled-border rounded text-[11px] font-mono text-oled-muted pointer-events-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-signal-cyan animate-ping" />
            <span className="text-signal-cyan font-semibold">SYNC_ENGINE // VEC_DIFF</span>
          </div>
          <span className="hidden sm:inline text-oled-border">|</span>
          <span className="hidden sm:inline">STATE: MULTIPLAYER_BROADCAST</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>
            FPS: <strong className="text-signal-green font-mono">{fps}</strong>
          </span>
          <span className="hidden sm:inline">
            PACKETS: <strong className="text-signal-amber font-mono">{packetCount}</strong>
          </span>
        </div>
      </div>

      {/* Bottom Live Debugger Log Stream */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between px-3 py-1.5 bg-oled-bg/90 backdrop-blur-md border border-oled-border rounded text-[10px] font-mono text-oled-muted pointer-events-none">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-signal-amber">&gt; websocket_channel[0]:</span>
          <span className="text-oled-text truncate">
            CRDT state vector diff applied (32 bytes, ACK=0x9A)
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-signal-green font-semibold">LATENCY BUDGET &lt; 100ms</span>
        </div>
      </div>
    </div>
  );
};
