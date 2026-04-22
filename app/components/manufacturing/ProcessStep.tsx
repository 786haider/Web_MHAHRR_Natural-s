"use client";

import { FadeUp } from "./FadeUp";

export function ProcessStep({ step, index }: { step: { title: string; desc: string }; index: number }) {
  return (
    <FadeUp delay={index * 0.1}>
      <div className="bg-white rounded-2xl p-6 border border-green-50 shadow-sm relative h-full flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xs border-2 border-white shadow-sm z-10">
          0{index + 1}
        </div>
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-green-700 font-serif italic text-lg">M</span>
        </div>
        <h3 className="text-sm font-bold text-green-950 mb-2 uppercase tracking-wide">
          {step.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-grow">
          {step.desc}
        </p>
      </div>
    </FadeUp>
  );
}
