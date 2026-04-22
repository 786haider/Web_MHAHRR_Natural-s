"use client";

import { ReactNode } from "react";
import { useInView } from "./useInView";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Reveal({ children, direction = "up", delay = 0, className = "" }: RevealProps) {
  const [ref, visible] = useInView();
  
  const base = "transition-all duration-700 ease-out";
  const hidden = {
    up:    "opacity-0 translate-y-10",
    down:  "opacity-0 -translate-y-10",
    left:  "opacity-0 -translate-x-12",
    right: "opacity-0 translate-x-12",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${visible ? "opacity-100 translate-x-0 translate-y-0" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
