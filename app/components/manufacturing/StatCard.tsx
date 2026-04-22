"use client";

import { FadeUp } from "./FadeUp";

export function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="bg-white rounded-xl p-5 border border-green-100/50 shadow-sm text-center flex flex-col items-center justify-center min-h-[120px] group hover:border-green-300 transition-colors duration-300">
        <div className="text-3xl font-bold text-green-800 mb-1 font-serif group-hover:scale-110 transition-transform duration-300">
          {value}
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </div>
      </div>
    </FadeUp>
  );
}
