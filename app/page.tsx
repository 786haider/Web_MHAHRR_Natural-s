"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Leaf, Sparkles, Heart } from 'lucide-react';
import PhilosophySection from './components/PhilosophySection';
import CuratedCollectionsSection from './components/CuratedCollectionsSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const curatedRef = useRef<HTMLDivElement>(null);
  const whereWeAreRef = useRef<HTMLDivElement>(null);
  const readyToEmbraceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = [
        { ref: curatedRef, name: 'curated' },
        { ref: whereWeAreRef, name: 'whereWeAre' },
        { ref: readyToEmbraceRef, name: 'readyToEmbrace' }
      ];

      sections.forEach(({ ref, name }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.top < windowHeight * 0.75) {
            setVisibleSections(prev => {
              if (!prev.includes(name)) {
                return [...prev, name];
              }
              return prev;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee { animation: marquee 30s linear infinite; }
      .card-enter { opacity: 1; transform: translateY(0); }
      .card-exit { opacity: 0; transform: translateY(50px); }

      @keyframes slideUpFade {
        from {
          opacity: 0;
          transform: translateY(60px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-slide-up {
        animation: slideUpFade 0.8s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80')",
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-300" />
            <span>EST. NOVEMBER 2025 • KARACHI</span>
          </div>

          <h1
            className={`text-7xl md:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Natural Healing </span>
            <span className="text-emerald-300 italic font-serif">Solutions</span>
          </h1>

          <h2
            className={`text-4xl md:text-5xl font-light text-white mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Herbal Care for Skin & Health
          </h2>

          <p
            className={`text-xl md:text-2xl text-white/90 mb-4 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Discover the synergy of botanical wisdom, purity, and humanity in our herbal skincare products.
          </p>

          <p
            className={`text-lg md:text-xl text-white/80 mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            MHAHRR Natural Formulations for timeless natural wellness remedies.
          </p>

          <button
            onClick={scrollToContent}
            className={`group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <span className="flex items-center gap-2">
              Explore Collection
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Text Marquee */}
      <section className="py-12 bg-gray-100 overflow-hidden">
        <div className="whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="text-6xl md:text-8xl font-bold text-blue-200 uppercase tracking-wider">
             |• لقد خلقنا الإنسان في أحسن تقويم
            </span>
          </div>
          <div className="inline-block animate-marquee">
            <span className="text-6xl md:text-8xl font-bold text-green-200 uppercase tracking-wider">
              hhhh لقد خلقنا الإنسان في أحسن تقويم •|
            </span>
          </div>
        </div>
      </section>

      <PhilosophySection />

      <CuratedCollectionsSection />

      {/* Where We Are Section */}
      <section
        ref={whereWeAreRef}
        className={`py-24 bg-gradient-to-b from-emerald-50 to-white ${
          visibleSections.includes('whereWeAre') ? 'animate-slide-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Where We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with us on social media and stay updated with our latest products, wellness tips, and community stories.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-125 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
                {/* Instagram SVG icon */}
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-base group-hover:text-pink-600 transition-colors">Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-125 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-base group-hover:text-black transition-colors">TikTok</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-125 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-base group-hover:text-blue-600 transition-colors">Facebook</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-125 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-base group-hover:text-black transition-colors">X</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-125 cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
                {/* LinkedIn SVG icon */}
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-semibold text-base group-hover:text-blue-700 transition-colors">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Ready to Embrace Natural Healing Section */}
      <section
        ref={readyToEmbraceRef}
        className={`relative py-32 overflow-hidden ${
          visibleSections.includes('readyToEmbrace') ? 'animate-slide-up' : 'opacity-0'
        }`}
      >
        {/* Animated Green Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 animate-gradient"></div>

        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>

          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

          <div className="absolute top-10 right-20 opacity-20">
            <Leaf className="w-16 h-16 text-white animate-float" />
          </div>
          <div className="absolute bottom-10 left-20 opacity-20">
            <Leaf className="w-20 h-20 text-white animate-float" style={{ animationDelay: '3s' }} />
          </div>
          <div className="absolute top-1/3 left-10 opacity-15">
            <Sparkles className="w-12 h-12 text-white animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to Embrace
            <br />
            <span className="text-emerald-100 italic font-serif">Natural Healing?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have switched to MHAHRR Natural for a healthier, purer lifestyle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-white text-emerald-700 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

            {/* Fixed: border-3 → border-2 (border-3 is not a valid Tailwind class) */}
            <button className="group px-10 py-5 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold transition-all duration-300 hover:bg-white hover:text-emerald-700 hover:scale-105 hover:shadow-2xl">
              Get in Touch
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-16 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-full">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Trusted by 10,000+ Natural Health Enthusiasts</span>
          </div>
        </div>
      </section>
    </div>
  );
}