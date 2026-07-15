'use client';

const bootLines = [
  'booting anotherayush.in terminal station',
  'mounting DocStream pipeline: OCR -> XML -> EPUB',
  'loading NexoGrafix / ShipU / Shabra deploy logs',
  'standing by for recruiter fast-exit HUD',
];

export function BootLoader() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#061018] text-[#b7c6d1]">
      <div className="w-[min(92vw,680px)] rounded-3xl border border-[#1f6f78]/40 bg-[#0d1b22]/80 p-6 font-mono text-xs shadow-2xl shadow-black/40">
        <div className="mb-4 flex items-center gap-2 text-[#d8a657]">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#d8a657]" />
          <span className="h-3 w-3 rounded-full bg-[#1f6f78]" />
          <span className="ml-3 uppercase tracking-[0.24em]">boot sequence</span>
        </div>
        <div className="space-y-2">
          {bootLines.map((line) => (
            <p key={line}><span className="text-[#1f6f78]">$</span> {line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
