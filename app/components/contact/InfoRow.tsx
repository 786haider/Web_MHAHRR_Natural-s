"use client";

import { Reveal } from "./Reveal";

interface InfoRowProps {
  icon: string;
  title: string;
  lines: string[];
  delay?: number;
}

export function InfoRow({ icon, title, lines, delay = 0 }: InfoRowProps) {
  return (
    <Reveal direction="left" delay={delay}>
      <div className="flex items-start gap-5 group cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-100 group-hover:-rotate-6">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">{title}</h3>
          {lines.map((line, i) => (
            <p key={i} className="text-gray-500 text-sm">{line}</p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
