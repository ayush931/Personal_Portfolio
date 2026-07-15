'use client';

import { stations, type StationId } from '@/lib/portfolio-data';

type FlatSchematicProps = {
  activeStation: StationId;
  onStationChange: (station: StationId) => void;
};

export function FlatSchematic({ activeStation, onStationChange }: FlatSchematicProps) {
  return (
    <div className="relative min-h-105 rounded-4xl border border-[#1f6f78]/30 bg-[#07131a] p-4 shadow-2xl shadow-black/30 md:min-h-155 md:p-6">
      <div className="absolute inset-4 rounded-3xl bg-[linear-gradient(rgba(31,111,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(31,111,120,0.12)_1px,transparent_1px)] bg-size-[28px_28px]" />
      <div className="relative grid h-full min-h-97.5 grid-cols-2 gap-3 md:min-h-142.5 md:grid-cols-3">
        {stations.map((station, index) => (
          <button
            key={station.id}
            onClick={() => onStationChange(station.id)}
            className={`group rounded-3xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-[#d8a657] ${activeStation === station.id ? 'border-[#d8a657] bg-[#d8a657]/15' : 'border-[#1f6f78]/35 bg-[#0d1b22]/85 hover:border-[#1f6f78]'}`}
            style={{ transform: `translateY(${index % 2 ? 20 : 0}px)` }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d8a657]">{station.object}</span>
            <span className="mt-2 block font-display text-lg font-bold text-white">{station.nav}</span>
            <span className="mt-2 block text-xs leading-5 text-[#b7c6d1]">{station.summary}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
