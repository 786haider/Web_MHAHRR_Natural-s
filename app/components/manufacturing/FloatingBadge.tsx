"use client";

import { ReactNode } from "react";

export function FloatingBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-green-200/50 shadow-sm text-xs font-semibold text-green-800 tracking-wide uppercase">
      {children}
    </div>
  );
}
