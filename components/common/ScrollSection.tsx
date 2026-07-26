"use client";

import React, { useRef } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer" | "header" | "article" | "main";
  minHeight?: boolean;
}

export function ScrollSection({
  children,
  id,
  className = "",
  as: Component = "section",
  minHeight = true,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return React.createElement(
    Component,
    {
      ref: sectionRef,
      id,
      className: `${minHeight ? "min-h-svh" : ""} w-full relative isolate ${className}`,
    },
    children
  );
}
