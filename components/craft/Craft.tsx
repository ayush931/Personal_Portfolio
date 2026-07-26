"use client";

import { Code2, Sparkles, Sliders, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useExperienceStore } from "@/store/experience-store";

const presets = [
  { id: "cobalt", name: "Cobalt Resonance", description: "Fresnel rim lighting with high-frequency noise displacement", primary: "#2146f3", secondary: "#ef4d2f" },
  { id: "acid", name: "Acid Cybernetics", description: "High-contrast monochromatic grid tone with acid highlights", primary: "#d9ff45", secondary: "#151515" },
  { id: "vermilion", name: "Vermilion Heat", description: "Thermal gradient displacement with subtle film grain", primary: "#ef4d2f", secondary: "#2146f3" },
];

export function Craft() {
  const [activePreset, setActivePreset] = useState(presets[0]);
  const [speed, setSpeed] = useState(1.0);
  const [displacement, setDisplacement] = useState(0.38);

  const hoverTarget = useExperienceStore((state) => state.hoverTarget);
  const setHoverTarget = useExperienceStore((state) => state.setHoverTarget);

  return (
    <div className="relative isolate bg-canvas px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              04 / Craft & Lab
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Interactive Shader & Motion Experiments.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-4 py-2 font-mono text-xs text-ink-muted">
            <Sparkles size={14} className="text-cobalt animate-spin" />
            <span>Live WebGL Uniform Sync</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Controls & Presets */}
          <div className="flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-kicker uppercase tracking-kicker text-cobalt mb-6">
                <Sliders size={16} />
                <span>Shader Lab Controls</span>
              </div>

              {/* Presets */}
              <div className="space-y-3 mb-8">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2">
                  Preset Shading Profiles
                </span>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      activePreset.id === preset.id
                        ? "border-cobalt bg-canvas shadow-sm"
                        : "border-line bg-canvas-raised hover:border-ink-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-semibold text-ink">{preset.name}</span>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                    </div>
                    <p className="font-mono text-xs text-ink-muted mt-1">{preset.description}</p>
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-6 border-t border-line pt-6">
                <div>
                  <div className="flex justify-between font-mono text-xs text-ink mb-2">
                    <span>Displacement Amplitude</span>
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
                  <div className="flex justify-between font-mono text-xs text-ink mb-2">
                    <span>Oscillation Speed</span>
                    <span className="text-cobalt">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cobalt cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-muted">
              <span>Hover canvas hero object to trigger 3D reaction</span>
              <button
                onClick={() => setHoverTarget(hoverTarget ? null : "hero-object")}
                className="inline-flex items-center gap-1.5 text-cobalt hover:underline"
              >
                <RefreshCw size={12} />
                <span>Toggle 3D Hover</span>
              </button>
            </div>
          </div>

          {/* GLSL Code Preview */}
          <div className="rounded-panel border border-line bg-ink text-canvas p-8 overflow-hidden font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line/20 pb-4 mb-6">
                <div className="flex items-center gap-2 text-acid">
                  <Code2 size={16} />
                  <span className="uppercase tracking-widest text-kicker font-bold">HeroObject.vert (GLSL)</span>
                </div>
                <span className="text-ink-muted">Uniforms Active</span>
              </div>

              <pre className="overflow-x-auto text-line/90 leading-relaxed space-y-1">
                <code>{`// Custom Vertex Displacement Shader
uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying float vDisplacement;

float noise(vec3 p) {
  vec3 i = floor(p); vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + vec3(1.0)), f.x);
}

void main() {
  // Real-time uniform values applied:
  float displacement = noise(position * 1.35 + vec3(0.0, uTime * ${speed.toFixed(1)}, 0.0)) * ${displacement.toFixed(2)};
  vec3 displacedPosition = position + normal * displacement * (1.0 + uHover * 0.3);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}`}</code>
              </pre>
            </div>

            <div className="mt-8 pt-6 border-t border-line/20 flex items-center justify-between text-ink-muted text-[0.6875rem]">
              <span>GPU Pipeline: WebGL 2.0 / GLSL 300 es</span>
              <span className="text-acid">Status: 60 FPS Target</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
