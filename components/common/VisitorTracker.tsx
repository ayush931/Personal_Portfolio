"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    // Only track once per browser session
    const trackedSession = sessionStorage.getItem("portfolio_tracked");
    if (trackedSession) return;

    try {
      fetch("/api/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: window.location.pathname + window.location.hash,
          referrer: document.referrer || "Direct",
        }),
      }).then(() => {
        sessionStorage.setItem("portfolio_tracked", "true");
      });
    } catch (err) {
      console.error("[Visitor Tracker] Error recording visit:", err);
    }
  }, []);

  return null;
}
