"use client";

import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  from: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideIn({ children, from, delay = 0, className = "" }: SlideInProps) {
  const initialTransform = from === "left" ? "translateX(-30px)" : "translateX(30px)";
  const slideClass = from === "left" ? "slide-in-left" : "slide-in-right";

  return (
    <div 
      className={`${slideClass} ${className}`} 
      data-delay={delay}
      style={{ 
        opacity: 0, 
        transform: initialTransform,
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      <style jsx global>{`
        .slide-in-left.visible, .slide-in-right.visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
