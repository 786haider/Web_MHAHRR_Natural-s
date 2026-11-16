"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

export interface PhilosophyCardProps {
  index: number;
  pillarNumber: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  quote: string;
  description: string;
  imageUrl: string;
  color: 'emerald' | 'teal' | 'amber';
  keyPoints: string[];
  onSelect?: () => void;
}

export const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  pillarNumber,
  icon,
  title,
  badge,
  quote,
  description,
  imageUrl,
  color,
  keyPoints,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const themeConfig = {
    emerald: {
      gradientBorder: 'hover:border-emerald-400/80',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
      iconBoxBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30',
      accentGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      titleColor: 'group-hover:text-emerald-700',
      checkColor: 'text-emerald-600',
      pillNumber: 'text-emerald-600/40 group-hover:text-emerald-600/70',
      ambientRing: 'group-hover:ring-emerald-400/30',
      btnHover: 'group-hover:bg-emerald-600 group-hover:text-white',
    },
    teal: {
      gradientBorder: 'hover:border-teal-400/80',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200/60',
      iconBoxBg: 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-teal-500/30',
      accentGlow: 'from-teal-500/10 via-cyan-500/5 to-transparent',
      titleColor: 'group-hover:text-teal-700',
      checkColor: 'text-teal-600',
      pillNumber: 'text-teal-600/40 group-hover:text-teal-600/70',
      ambientRing: 'group-hover:ring-teal-400/30',
      btnHover: 'group-hover:bg-teal-600 group-hover:text-white',
    },
    amber: {
      gradientBorder: 'hover:border-amber-400/80',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200/60',
      iconBoxBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/30',
      accentGlow: 'from-amber-500/10 via-orange-500/5 to-transparent',
      titleColor: 'group-hover:text-amber-800',
      checkColor: 'text-amber-600',
      pillNumber: 'text-amber-600/40 group-hover:text-amber-600/70',
      ambientRing: 'group-hover:ring-amber-400/30',
      btnHover: 'group-hover:bg-amber-600 group-hover:text-white',
    },
  };

  const currentTheme = themeConfig[color];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={`group relative bg-white/95 rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2.5 flex flex-col cursor-pointer ${currentTheme.gradientBorder} ${currentTheme.ambientRing} ring-0 hover:ring-4`}
    >
      {/* Ambient background glow inside the card on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${currentTheme.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      {/* Card Visual Header Image */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-950">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient dark scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:via-black/30 transition-colors duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${currentTheme.badgeBg}`}
          >
            <Sparkles className="w-3 h-3" />
            {badge}
          </span>

          <span
            className={`text-xl font-mono font-extrabold transition-colors duration-300 ${currentTheme.pillNumber}`}
          >
            {pillarNumber}
          </span>
        </div>

        {/* Floating Animated Icon Badge */}
        <div className="absolute -bottom-6 left-6 z-20">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${currentTheme.iconBoxBg}`}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-10 p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Title & Principle Number */}
          <div className="flex items-baseline justify-between mb-2">
            <h3
              className={`text-2xl sm:text-3xl font-bold text-gray-900 transition-colors duration-300 ${currentTheme.titleColor}`}
            >
              {title}
            </h3>
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">
              Pillar {pillarNumber}
            </span>
          </div>

          {/* Poetic Quote */}
          <p className="text-sm sm:text-base font-serif italic text-emerald-800/90 mb-4 bg-emerald-50/60 px-3.5 py-2 rounded-xl border border-emerald-100/60">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Detailed Narrative */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {description}
          </p>

          {/* Key Commitment Checkpoints */}
          <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
            {keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${currentTheme.checkColor}`}
                />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
            Discover {title}
          </span>

          <div
            className={`w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-sm ${currentTheme.btnHover}`}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
