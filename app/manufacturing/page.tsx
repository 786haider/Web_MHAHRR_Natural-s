"use client";

import { useState } from "react";
import Link from "next/link";
import { productionItems, qualityItems, steps, sustainablePoints, faqs } from "./data";
import styles from "./manufacturing.module.css";
import { useFadeIn } from "../components/manufacturing/useFadeIn";
import { FadeUp } from "../components/manufacturing/FadeUp";
import { SlideIn } from "../components/manufacturing/SlideIn";
import { CheckItem } from "../components/manufacturing/CheckItem";
import { FAQItem } from "../components/manufacturing/FAQItem";
import { FloatingBadge } from "../components/manufacturing/FloatingBadge";
import { ProcessStep } from "../components/manufacturing/ProcessStep";
import { StatCard } from "../components/manufacturing/StatCard";

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ManufacturingPage() {
  useFadeIn(); // Hook for fade-in animations

  return (
    <>
      <main className="overflow-x-hidden font-sans">
        {/* ── HERO ── */}
        <section
          className="relative flex items-center justify-center text-center overflow-hidden px-6 py-32 min-h-[50vh]"
          style={{ background: "linear-gradient(155deg,#f0faf5 0%,#e6f4ec 45%,#cce8d9 100%)" }}
        >
          {/* animated blobs */}
          <div
            className={`absolute -top-20 -right-24 w-96 h-96 rounded-full pointer-events-none ${styles.heroLeaf}`}
            style={{
              background: "radial-gradient(circle,rgba(126,200,160,.3) 0%,transparent 70%)",
            }}
          />
          <div
            className={`absolute -bottom-16 -left-20 w-80 h-80 rounded-full pointer-events-none ${styles.heroLeaf} ${styles.heroLeafReverse}`}
            style={{
              background: "radial-gradient(circle,rgba(74,155,111,.18) 0%,transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl">
            <div className={styles.slideDown}>
              <FloatingBadge>Our Facilities</FloatingBadge>
            </div>

            <div className={styles.slideDown} style={{ animationDelay: "0.15s" }}>
              <h1 className={`text-4xl md:text-5xl font-bold text-green-950 leading-tight ${styles.serif}`}>
                Manufacturing Facilities
              </h1>
            </div>

            <div className={styles.slideDown} style={{ animationDelay: "0.3s" }}>
              <p className="text-sm md:text-base text-green-700 font-light leading-relaxed max-w-md">
                State-of-the-art facilities committed to quality and sustainability — where science meets craftsmanship.
              </p>
            </div>

            <div className={styles.slideDown} style={{ animationDelay: "0.45s" }}>
              <a
                href="#excellence"
                className="relative inline-flex items-center gap-2 bg-green-700 text-white px-7 py-3 rounded-full text-sm font-medium overflow-hidden group"
                style={{ transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(74,155,111,.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span className="relative z-10">Explore More ↓</span>
                <span
                  className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20"
                  style={{ transition: "opacity 0.3s" }}
                />
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-gray-50 py-10 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "500K+", label: "Units / Month" },
              { value: "ISO", label: "Certified" },
              { value: "40+", label: "Products" },
            ].map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* ── EXCELLENCE ── */}
        <section id="excellence" className="bg-white py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeUp className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-semibold text-green-950 mb-3 ${styles.serif}`}>
                Our Manufacturing Excellence
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                Located in Karachi, Pakistan, our facilities are equipped with modern technology and staffed by experienced professionals.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SlideIn from="left">
                <div className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-2xl">🏭</span>
                    <h3 className={`text-lg font-semibold text-green-950 ${styles.serif}`}>
                      Production Capacity
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {productionItems.map((item, i) => (
                      <CheckItem key={item} text={item} delay={i * 0.08} />
                    ))}
                  </ul>
                </div>
              </SlideIn>

              <SlideIn from="right" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-2xl">🛡️</span>
                    <h3 className={`text-lg font-semibold text-green-950 ${styles.serif}`}>
                      Quality Standards
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {qualityItems.map((item, i) => (
                      <CheckItem key={item} text={item} delay={i * 0.08} />
                    ))}
                  </ul>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeUp className="text-center mb-14">
              <h2 className={`text-3xl md:text-4xl font-semibold text-green-950 mb-3 ${styles.serif}`}>
                Our Manufacturing Process
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                A meticulous four-stage process ensuring every product meets our rigorous standards.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {steps.map((step, i) => (
                <ProcessStep key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SUSTAINABLE ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SlideIn from="left">
              <div className="flex flex-col gap-4">
                <FloatingBadge>♻️ Green First</FloatingBadge>
                <h2 className={`text-3xl md:text-4xl font-semibold text-green-950 leading-snug mt-1 ${styles.serif}`}>
                  Sustainable Manufacturing
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We are committed to minimizing our environmental impact through sustainable manufacturing practices.
                </p>
                <ul className="flex flex-col gap-3 mt-1">
                  {sustainablePoints.map((pt, i) => (
                    <CheckItem key={pt} text={pt} delay={i * 0.1} />
                  ))}
                </ul>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.15}>
              <div className="flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {[0, 0.5, 1].map((d) => (
                    <div
                      key={d}
                      className={`absolute rounded-full border-2 border-green-300/30 ${styles.ripple}`}
                      style={{
                        width: "280px",
                        height: "280px",
                        animationDelay: `${d}s`,
                      }}
                    />
                  ))}
                  <div
                    className="relative w-64 h-64 rounded-3xl flex flex-col items-center justify-center text-center p-8 overflow-hidden z-10"
                    style={{
                      background: "linear-gradient(135deg,#c8e6d5 0%,#a8d8be 45%,#7ec4a2 100%)",
                      boxShadow: "0 14px 44px rgba(74,155,111,.22)",
                    }}
                  >
                    <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full border border-white/30 pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-white/30 pointer-events-none" />
                    <div className={`text-5xl mb-3 relative z-10 ${styles.heroLeaf}`}>🌿</div>
                    <h3 className={`text-lg font-semibold text-green-950 mb-1 relative z-10 ${styles.serif}`}>
                      Eco-Conscious
                    </h3>
                    <p className="text-xs text-green-800 italic relative z-10">
                      Sustainable from source to shelf
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── FAQ TOGGLE ── */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <FadeUp className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-semibold text-green-950 mb-3 ${styles.serif}`}>
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Everything you need to know about our manufacturing process.
              </p>
            </FadeUp>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-24 px-6 text-center overflow-hidden bg-green-800">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(126,200,160,.14) 0%,transparent 70%)" }}
          />

          <FadeUp className="relative z-10 max-w-lg mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${styles.serif}`}>
              Experience Our Quality
            </h2>
            <p className="text-sm text-green-200/80 leading-relaxed mb-8 italic">
              Discover products made with precision, care, and commitment to excellence.
            </p>
            <Link
              href="/ourProduct"
              className="inline-block px-8 py-3 border border-white/40 rounded-full text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/80 hover:-translate-y-1"
            >
              Shop Now →
            </Link>
          </FadeUp>
        </section>
      </main>
    </>
  );
}
