"use client";

import { useState, useEffect, useRef } from "react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, [JSON.stringify(options)]);
  return [ref, visible] as const;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, direction = "up", delay = 0, className = "" }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right", delay?: number, className?: string }) {
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

// ─── Accordion Card ───────────────────────────────────────────────────────────
function AccordionCard({ icon, title, items, defaultOpen = false }: { icon: string, title: string, items: string[], defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(defaultOpen ? "auto" : "0px");

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? `${bodyRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-shadow duration-300 ${
        open ? "border-green-300 shadow-lg shadow-green-100" : "border-green-100"
      } bg-[#f9fdf9]`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-green-50 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-[#1a2e1a] text-[0.95rem]">{title}</span>
        </div>
        {/* Animated chevron */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-400 flex-shrink-0 ${
            open ? "bg-green-600 rotate-180" : "bg-green-100 rotate-0"
          }`}
          style={{ transition: "transform 0.4s cubic-bezier(.22,1,.36,1), background 0.25s" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#fff" : "#3a8a3e"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
      </button>

      {/* Sliding body */}
      <div
        style={{
          height,
          transition: "height 0.45s cubic-bezier(.22,1,.36,1)",
          overflow: "hidden",
        }}
      >
        <ul ref={bodyRef} className="px-6 pb-5 space-y-2.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[#6b7c6b]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.35s ease ${i * 60 + 100}ms, transform 0.35s ease ${i * 60 + 100}ms`,
              }}
            >
              <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer, isOpen, onToggle }: { question: string, answer: string, isOpen: boolean, onToggle: () => void }) {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? `${bodyRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-2xl border overflow-hidden bg-white transition-shadow duration-300 ${
        isOpen ? "border-green-300 shadow-md shadow-green-50" : "border-green-100"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-[18px] text-left hover:bg-green-50 transition-colors duration-200 focus:outline-none"
      >
        <span className="font-semibold text-[#1a2e1a] text-[0.92rem] pr-4">{question}</span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-250`}
          style={{
            background: isOpen ? "#3a8a3e" : "#e8f5e9",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1), background 0.25s",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#fff" : "#3a8a3e"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
      </button>
      <div style={{ height, transition: "height 0.42s cubic-bezier(.22,1,.36,1)", overflow: "hidden" }}>
        <p ref={bodyRef} className="px-6 pb-5 text-sm text-[#6b7c6b] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Channel Card ─────────────────────────────────────────────────────────────
function ChannelCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="group bg-[#f9fdf9] border border-green-100 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-100 cursor-pointer">
      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
        {icon}
      </div>
      <h3 className="font-semibold text-[#1a2e1a] mb-2 text-[0.95rem]">{title}</h3>
      <p className="text-[0.83rem] text-[#6b7c6b] leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DistributionNetwork() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const channels = [
    { icon: "🏪", title: "Direct Sales", desc: "Purchase directly from MINAMBA. Trusted service for customers who prioritize authenticity and quality." },
    { icon: "📍", title: "Retail Partners", desc: "Find our products at carefully selected retail partners committed to healthy, quality products." },
    { icon: "📦", title: "Wholesale Distribution", desc: "Competitive pricing for bulk orders and business partnerships across the region." },
    { icon: "🛒", title: "Online Marketplaces", desc: "Available on major e-commerce platforms for convenient shopping and fast delivery." },
  ];

  const logistics = [
    {
      icon: "🚚",
      title: "Shipping & Handling",
      items: [
        "Secure packaging to ensure product integrity",
        "Temperature-controlled transport for sensitive products",
        "Real-time tracking for all shipments",
        "Fast delivery times with multiple courier options",
      ],
      defaultOpen: true,
    },
    {
      icon: "🏭",
      title: "Warehouse Management",
      items: [
        "Strategic warehouse locations for effective distribution",
        "Inventory management system for product availability",
        "Climate-controlled storage to preserve product quality",
        "Quality checks at every distribution point",
      ],
      defaultOpen: true,
    },
  ];

  const faqs = [
    { q: "How do I become a retail partner?", a: "Contact us through our partnership form or email us directly. We'll schedule a call to understand your business needs and discuss how we can work together to bring MINAMBA products to your customers." },
    { q: "What are the minimum order quantities for wholesale?", a: "Wholesale minimum order quantities vary by product line. Generally we start at 50 units per SKU. Get in touch for a custom quote tailored to your business scale and requirements." },
    { q: "Do you offer international shipping?", a: "Yes! We are currently expanding our international presence. We ship to select countries across East Africa and are growing globally. Contact us to confirm availability in your region." },
    { q: "What online marketplaces carry your products?", a: "MINAMBA products are available on major e-commerce platforms in our region. Visit our website for direct links to all official storefronts and verified seller listings." },
  ];

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#f9fdf9", color: "#1a2e1a" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .playfair { font-family: 'Playfair Display', serif; }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .globe-spin { animation: spinSlow 10s linear infinite; display:inline-block; }
        @keyframes pulseRing {
          0%   { transform:scale(0.85); opacity:1; }
          100% { transform:scale(1.5);  opacity:0; }
        }
        .pulse-ring::after {
          content:'';
          position:absolute; inset:-10px;
          border-radius:50%;
          border:2px solid rgba(58,138,62,0.35);
          animation: pulseRing 2.5s ease-out infinite;
          pointer-events:none;
        }
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-title { animation: heroFadeUp 0.85s cubic-bezier(.22,1,.36,1) both; }
        .hero-sub   { animation: heroFadeUp 0.85s cubic-bezier(.22,1,.36,1) 0.2s both; }
      `}</style>

      {/* ── Hero ── */}
      <div
        className="text-center py-20 px-6"
        style={{ background: "linear-gradient(160deg,#f0faf0 0%,#ffffff 100%)" }}
      >
        <h1 className="playfair text-4xl md:text-5xl font-bold text-[#1a2e1a] hero-title">
          Distribution Network
        </h1>
        <p className="text-[#6b7c6b] mt-3 text-base hero-sub">
          Making MINAMBA Natural products accessible to every one
        </p>
      </div>

      {/* ── Distribution Channels ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal direction="up">
            <h2 className="playfair text-3xl text-center mb-2">Our Distribution Channels</h2>
            <p className="text-center text-[#6b7c6b] text-sm mb-10">Multiple ways to access our premium natural products</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((c, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <ChannelCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage & Reach ── */}
      <section className="py-16 px-6" style={{ background: "#f9fdf9" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <Reveal direction="left">
            <h2 className="playfair text-3xl mb-3">Coverage &amp; Reach</h2>
            <p className="text-[#6b7c6b] text-[0.92rem] mb-6 leading-relaxed">
              Based in Nairobi, Kenya, we have established a strong distribution network to serve customers across the region.
            </p>
            <ul className="space-y-3">
              {[
                "Primary distribution hub in Nairobi",
                "Partnerships with regional retailers",
                "Fast and reliable shipping nationwide",
                "Expanding international presence",
              ].map((item, i) => (
                <Reveal key={i} direction="left" delay={i * 90 + 100}>
                  <li className="flex items-center gap-3 text-sm text-[#1a2e1a]">
                    <span className="text-green-600 font-bold">✓</span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Right — globe */}
          <Reveal direction="right">
            <div
              className="rounded-3xl flex flex-col items-center justify-center py-14 px-6 text-center"
              style={{ background: "linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%)" }}
            >
              <div className="relative inline-block pulse-ring mb-5">
                <span className="globe-spin text-6xl">🌐</span>
              </div>
              <h3 className="font-semibold text-[#1a2e1a] text-lg mb-1">Growing Globally</h3>
              <p className="text-[#6b7c6b] text-sm">Expanding our reach every day</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Logistics & Delivery — Accordion ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal direction="up">
            <h2 className="playfair text-3xl text-center mb-2">Logistics &amp; Delivery</h2>
            <p className="text-center text-[#6b7c6b] text-sm mb-10">Click a card to expand or collapse details</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {logistics.map((l, i) => (
              <Reveal key={i} direction="up" delay={i * 120}>
                <AccordionCard {...l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6" style={{ background: "#f9fdf9" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal direction="up">
            <h2 className="playfair text-3xl text-center mb-2">Frequently Asked Questions</h2>
            <p className="text-center text-[#6b7c6b] text-sm mb-10">Everything about our distribution</p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <FaqItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Opportunities ── */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <Reveal direction="up">
            <h2 className="playfair text-3xl mb-2">Partnership Opportunities</h2>
            <p className="text-[#6b7c6b] text-sm mb-10">Opportunities for wholesale, retail or resale business</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <div
              className="max-w-xl mx-auto rounded-2xl border border-green-100 p-10"
              style={{ background: "#f9fdf9" }}
            >
              <p className="text-[#6b7c6b] text-[0.92rem] leading-relaxed mb-7">
                We&apos;re always looking for passionate partners who share our commitment to natural wellness and quality.
                Contact us to explore wholesale, retail, and distribution opportunities.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "#3a8a3e",
                  boxShadow: "0 4px 0 #2d6e30",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2d6e30"; e.currentTarget.style.boxShadow = "0 2px 0 #1e5221"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#3a8a3e"; e.currentTarget.style.boxShadow = "0 4px 0 #2d6e30"; }}
              >
                Get In Touch →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <div
        className="py-20 px-6 text-center text-white"
        style={{ background: "linear-gradient(135deg,#2d6e30 0%,#3a8a3e 100%)" }}
      >
        <Reveal direction="up">
          <h2 className="playfair text-3xl md:text-4xl mb-3">Order Your Products Today</h2>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <p className="text-white/80 text-sm mb-8">
            Choose from multiple convenient ways to get MINAMBA Natural products
          </p>
        </Reveal>
        <Reveal direction="up" delay={220}>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm border-2 border-white/60 text-white transition-all duration-200 hover:border-white hover:bg-white/15 hover:-translate-y-0.5"
          >
            Shop Now →
          </a>
        </Reveal>
      </div>
    </main>
  );
}