"use client";

import dynamic from "next/dynamic";
import { Code2, Sparkles, Sliders } from "lucide-react";
import { useState } from "react";

const CraftShaderCanvas = dynamic(() => import("./CraftShaderCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full flex items-center justify-center bg-black/40 border border-line/40 rounded-lg text-xs font-mono text-cobalt">
      <span>Initializing WebGL Shader Pipeline...</span>
    </div>
  ),
});

const presets = [
  { id: "cobalt", name: "Cobalt Resonance", description: "Fresnel rim lighting with high-frequency noise displacement", primary: "#2563eb", secondary: "#ef4d2f" },
  { id: "acid", name: "Acid Cybernetics", description: "High-contrast monochromatic grid tone with acid highlights", primary: "#84cc16", secondary: "#111111" },
  { id: "vermilion", name: "Vermilion Heat", description: "Thermal gradient displacement with subtle film grain", primary: "#dc2626", secondary: "#2563eb" },
];

export function Craft() {
  const [activePreset, setActivePreset] = useState(presets[0]);
  const [speed, setSpeed] = useState(1.2);
  const [displacement, setDisplacement] = useState(0.38);

  return (
    <div className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              04 / Craft &amp; Lab
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Interactive Shader &amp; Motion Experiments.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-4 py-2 font-mono text-xs text-ink-muted">
            <Sparkles size={14} className="text-cobalt animate-spin" />
            <span>Real-Time WebGL Shader Sandbox</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Controls & Presets */}
          <div className="flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-6 md:p-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt font-bold mb-6">
                <Sliders size={16} />
                <span>Shader Lab Uniform Controls</span>
              </div>

              {/* Presets */}
              <div className="space-y-3 mb-8">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2 font-semibold">
                  Preset Shading Profiles
                </span>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`w-full text-left rounded-lg border p-4 transition-all ${
                      activePreset.id === preset.id
                        ? "border-cobalt bg-canvas shadow-xs"
                        : "border-line bg-canvas-raised hover:border-ink-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-ink">{preset.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                      </div>
                    </div>
                    <p className="font-mono text-xs text-ink-muted mt-1 leading-relaxed">{preset.description}</p>
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-6 border-t border-line pt-6">
                <div>
                  <div className="flex justify-between font-mono text-xs text-ink font-semibold mb-2">
                    <span>Displacement Amplitude (uDisplacement)</span>
                    <span className="text-cobalt">{displacement.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.05"
                    value={displacement}
                    onChange={(e) => setDisplacement(parseFloat(e.target.value))}
                    className="w-full accent-cobalt cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-ink font-semibold mb-2">
                    <span>Oscillation Speed (uSpeed)</span>
                    <span className="text-cobalt">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cobalt cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-line font-mono text-xs text-ink-muted flex items-center justify-between">
              <span>Status: Active WebGL Context</span>
              <span className="text-cobalt font-semibold">60 FPS Target</span>
            </div>
          </div>

          {/* Right: Live WebGL Canvas Preview + GLSL Code Panel */}
          <div className="rounded-panel border border-line bg-ink text-canvas p-6 md:p-8 overflow-hidden font-mono text-xs space-y-6">
            
            {/* Live Interactive WebGL Shader Object Render */}
            <div>
              <div className="flex items-center justify-between border-b border-line/20 pb-3 mb-4">
                <span className="text-[0.65rem] uppercase tracking-wider text-acid font-bold">Live 3D Shader Output</span>
                <span className="text-[0.65rem] text-chrome">Target: icosahedronGeometry</span>
              </div>
              <CraftShaderCanvas
                speed={speed}
                displacement={displacement}
                primaryColor={activePreset.primary}
                secondaryColor={activePreset.secondary}
              />
            </div>

            {/* GLSL Code Preview */}
            <div className="pt-2 border-t border-line/20">
              <div className="flex items-center justify-between pb-3 mb-3">
                <div className="flex items-center gap-2 text-acid">
                  <Code2 size={16} />
                  <span className="uppercase tracking-widest text-xs font-bold">Vertex Shader (GLSL 300 es)</span>
                </div>
                <span className="text-chrome text-[0.65rem]">Real-Time Sync</span>
              </div>

              <pre className="overflow-x-auto text-emerald-400 font-mono leading-relaxed text-[0.75rem] bg-zinc-950 p-4 rounded-md border border-zinc-800 shadow-inner">
                <code>
                  <span className="text-zinc-500">{"// Live GLSL Uniforms"}</span>{"\n"}
                  <span className="text-purple-400">uniform</span> <span className="text-sky-300">float</span> uTime;{"\n"}
                  <span className="text-purple-400">uniform</span> <span className="text-sky-300">float</span> uSpeed; <span className="text-amber-300">{`// ${speed.toFixed(1)}x`}</span>{"\n"}
                  <span className="text-purple-400">uniform</span> <span className="text-sky-300">float</span> uDisplacement; <span className="text-amber-300">{`// ${displacement.toFixed(2)}`}</span>{"\n"}
                  <span className="text-purple-400">uniform</span> <span className="text-sky-300">vec3</span> uPrimary; <span className="text-amber-300">{`// ${activePreset.primary}`}</span>{"\n\n"}
                  <span className="text-purple-400">void</span> <span className="text-blue-400">main</span>() {"{\n"}
                  {"  "}<span className="text-sky-300">float</span> wave = <span className="text-blue-400">sin</span>(position.y * <span className="text-emerald-300">3.0</span> + uTime * uSpeed) * <span className="text-emerald-300">0.1</span>;{"\n"}
                  {"  "}<span className="text-sky-300">float</span> disp = <span className="text-blue-400">noise</span>(position * <span className="text-emerald-300">1.5</span> + <span className="text-sky-300">vec3</span>(<span className="text-emerald-300">0.0</span>, uTime * uSpeed * <span className="text-emerald-300">0.2</span>, <span className="text-emerald-300">0.0</span>)) * uDisplacement + wave;{"\n"}
                  {"  "}<span className="text-sky-300">vec3</span> displaced = position + normal * disp;{"\n"}
                  {"  "}gl_Position = projectionMatrix * modelViewMatrix * <span className="text-sky-300">vec4</span>(displaced, <span className="text-emerald-300">1.0</span>);{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
