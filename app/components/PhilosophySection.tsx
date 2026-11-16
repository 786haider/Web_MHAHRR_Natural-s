"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Leaf, Sparkles, Heart, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { PhilosophyCard } from './PhilosophyCard';

interface PhilosophyDetail {
  id: string;
  pillarNumber: string;
  title: string;
  badge: string;
  quote: string;
  description: string;
  fullStory: string;
  imageUrl: string;
  color: 'emerald' | 'teal' | 'amber';
  icon: React.ReactNode;
  keyPoints: string[];
}

const PHILOSOPHY_DATA: PhilosophyDetail[] = [
  {
    id: 'herbality',
    pillarNumber: '01',
    title: 'Herbality',
    badge: 'Botanical Wisdom',
    quote: "From earth's embrace, healing grace.",
    description:
      'Formulated from centuries-old herbal apothecary wisdom, our remedies harness the unadulterated healing essence of whole-plant botanicals and pure cold-pressed oils.',
    fullStory:
      'At MHAHRR Natural, Herbality is not a trend—it is our heritage. We draw upon time-honored traditional remedies, carefully simmering, distilling, and cold-pressing native herbs and flowers. We believe nature has already perfected the healing formulas; our sacred role is simply to capture that living vitality without adulteration or dilution.',
    imageUrl: '/displaying_images/homepage_herbality_image.png',
    color: 'emerald',
    icon: <Leaf className="w-7 h-7 text-white" />,
    keyPoints: [
      'Centuries of proven botanical recipes',
      '100% unadulterated whole-herb extracts',
      'Naturally synchronized with human biology',
    ],
  },
  {
    id: 'purity',
    pillarNumber: '02',
    title: 'Purity',
    badge: 'Radical Cleanliness',
    quote: 'Clean ingredients, clear conscience.',
    description:
      'Radical transparency in every formulation. Every drop is natural, ethically harvested, and 100% free from harmful parabens, sulfates, silicones, and artificial additives.',
    fullStory:
      'True purity means having nothing to hide. We formulate without compromise—zero artificial preservatives, zero synthetic perfumes, and zero microplastics. Each batch undergoes rigorous physical and botanical inspection to guarantee that what touches your skin is pure, gentle, and authentically wholesome.',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=1200&q=80',
    color: 'teal',
    icon: <Sparkles className="w-7 h-7 text-white" />,
    keyPoints: [
      '0% parabens, sulfates & artificial dyes',
      'Wildcrafted & ethically harvested herbs',
      'Honest labeling with zero hidden chemicals',
    ],
  },
  {
    id: 'humanity',
    pillarNumber: '03',
    title: 'Humanity',
    badge: 'Compassionate Care',
    quote: 'Care crafted with compassion.',
    description:
      'True wellness transcends products. We cultivate genuine human connection through 100% cruelty-free ethics, fair agricultural partnerships, and mindful care for people and our shared planet.',
    fullStory:
      'Our name is built upon empathy. Humanity means honoring the hands that plant and harvest our herbs, ensuring fair livelihoods for farming communities, respecting all living beings with cruelty-free practices, and crafting formulations that heal, comfort, and uplift every person who uses them.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    color: 'amber',
    icon: <Heart className="w-7 h-7 text-white" />,
    keyPoints: [
      '100% cruelty-free & ethically produced',
      'Direct partnerships with grower families',
      'Healing wellness accessible for every body',
    ],
  },
];

export default function PhilosophySection() {
  const [activeModal, setActiveModal] = useState<PhilosophyDetail | null>(null);

  const scrollToCollections = () => {
    setActiveModal(null);
    const element = document.getElementById('curated-collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-stone-50/60 via-emerald-50/30 to-white overflow-hidden">
      {/* Decorative ambient background blurs & animated floating particles */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Floating subtle botanical icons */}
      <div className="absolute top-20 right-10 opacity-15 pointer-events-none hidden md:block">
        <Leaf className="w-20 h-20 text-emerald-700 animate-bounce" style={{ animationDuration: '6s' }} />
      </div>
      <div className="absolute bottom-20 left-10 opacity-15 pointer-events-none hidden md:block">
        <Sparkles className="w-16 h-16 text-teal-700 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm border border-emerald-200/60">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>The Trinity of MHAHRR Natural</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Herbality, Purity <span className="text-emerald-700 italic font-serif">&amp; Humanity</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Three eternal principles shape our formulations, guide our community, and inspire every natural creation we bring into the world.
          </p>
        </div>

        {/* 3 Philosophy Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {PHILOSOPHY_DATA.map((item, index) => (
            <PhilosophyCard
              key={item.id}
              index={index}
              pillarNumber={item.pillarNumber}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
              quote={item.quote}
              description={item.description}
              imageUrl={item.imageUrl}
              color={item.color}
              keyPoints={item.keyPoints}
              onSelect={() => setActiveModal(item)}
            />
          ))}
        </div>
      </div>

      {/* Philosophy Detail Modal / Lightbox */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 md:h-auto md:w-5/12 bg-gray-950 overflow-hidden flex-shrink-0">
              <Image
                src={activeModal.imageUrl}
                alt={activeModal.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-300 font-bold block mb-1">
                  Pillar {activeModal.pillarNumber}
                </span>
                <h4 className="text-2xl font-bold">{activeModal.title}</h4>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {activeModal.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  The Principle of {activeModal.title}
                </h3>

                <p className="text-sm sm:text-base font-serif italic text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100/70 mb-4">
                  &ldquo;{activeModal.quote}&rdquo;
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {activeModal.fullStory}
                </p>

                <div className="space-y-2 mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Our Commitment
                  </h5>
                  {activeModal.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToCollections}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-5 rounded-2xl text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
