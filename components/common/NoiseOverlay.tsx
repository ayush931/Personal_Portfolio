"use client";

import { useEffect, useState } from "react";

export function NoiseOverlay() {
  const [noiseUrl, setNoiseUrl] = useState<string>("");

  useEffect(() => {
    // Generate a lightweight tileable 128x128 noise image once on client load
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 18; // Very subtle opacity
    }

    ctx.putImageData(imgData, 0, 0);
    setNoiseUrl(canvas.toDataURL("image/png"));
  }, []);

  if (!noiseUrl) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.035]"
      style={{
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}
