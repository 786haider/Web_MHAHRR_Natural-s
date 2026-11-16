import React from 'react';
import Image from 'next/image';

export default function MarqueeSection() {
  return (
    <section className="py-8 bg-emerald-950/5 border-y border-emerald-900/10 overflow-hidden">
      <div className="whitespace-nowrap flex items-center">
        <div className="inline-flex items-center animate-marquee flex-shrink-0">
          <span className="text-5xl md:text-7xl font-bold text-emerald-900/30 tracking-wider mx-6 font-serif">
            لقد خلقنا الإنسان في أحسن تقويم
          </span>
          <div className="inline-flex items-center justify-center mx-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm border border-emerald-200/70 p-2 flex-shrink-0">
            <Image
              src="/logo/logo_without_text_bgremove.png"
              alt="MHAHRR Natural Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <span className="text-5xl md:text-7xl font-bold text-emerald-800/30 tracking-wider mx-6 font-serif">
            لقد خلقنا الإنسان في أحسن تقويم
          </span>
          <div className="inline-flex items-center justify-center mx-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm border border-emerald-200/70 p-2 flex-shrink-0">
            <Image
              src="/logo/logo_without_text_bgremove.png"
              alt="MHAHRR Natural Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
        <div className="inline-flex items-center animate-marquee flex-shrink-0" aria-hidden="true">
          <span className="text-5xl md:text-7xl font-bold text-emerald-900/30 tracking-wider mx-6 font-serif">
            لقد خلقنا الإنسان في أحسن تقويم
          </span>
          <div className="inline-flex items-center justify-center mx-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm border border-emerald-200/70 p-2 flex-shrink-0">
            <Image
              src="/logo/logo_without_text_bgremove.png"
              alt="MHAHRR Natural Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <span className="text-5xl md:text-7xl font-bold text-emerald-800/30 tracking-wider mx-6 font-serif">
            لقد خلقنا الإنسان في أحسن تقويم
          </span>
          <div className="inline-flex items-center justify-center mx-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm border border-emerald-200/70 p-2 flex-shrink-0">
            <Image
              src="/logo/logo_without_text_bgremove.png"
              alt="MHAHRR Natural Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
