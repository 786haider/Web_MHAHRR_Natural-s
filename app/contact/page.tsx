"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";

import { useInView } from "../components/contact/useInView";

import { Reveal } from "../components/contact/Reveal";

import { FloatingInput } from "../components/contact/FloatingInput";

import { FloatingTextarea } from "../components/contact/FloatingTextarea";

import { InfoRow } from "../components/contact/InfoRow";
import styles from "./contact.module.css";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafb" }}
    >
      {/* ── Hero Banner ── */}
      <div
        className="relative text-center py-16 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #c8f0d0 0%, #b2dfe8 50%, #d4f0e8 100%)",
        }}
      >
        {/* decorative blobs */}
        <div
          className="blob absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7bc67e, transparent)", animationDelay: "0s" }}
        />
        <div
          className="blob absolute -bottom-10 -right-10 w-56 h-56 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #4caf50, transparent)", animationDelay: "0.3s" }}
        />

        <h1 className={`${styles.playfair} text-4xl md:text-5xl font-bold text-gray-800 relative z-10`}>
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base hero-sub relative z-10">
          Have questions about our products? We&apos;d love to hear from you.
        </p>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* ── Left: Contact Info ── */}
        <div className="space-y-8">
          <Reveal direction="left">
            <h2 className={`${styles.playfair} text-2xl font-bold text-gray-800`}>Contact Information</h2>
          </Reveal>

          <div className="space-y-7">
            <InfoRow icon="📍" title="Our Location" lines={["Karachi, Sindh", "Pakistan"]} delay={80} />
            <InfoRow icon="✉️" title="Email Us" lines={["info@mhahrr.com"]} delay={180} />
            <InfoRow icon="📞" title="Call Us" lines={["+92 123 456 789"]} delay={280} />
          </div>

          {/* Brand Card */}
          <Reveal direction="left" delay={380}>
            <div
              className="rounded-2xl p-6 border border-green-100 transition-all duration-300 hover:shadow-lg hover:shadow-green-100 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #f0faf0, #e8f5e9)" }}
            >
              <h3 className="font-bold text-gray-800 text-base mb-1">MHAHRR Natural</h3>
              <p className="text-green-700 text-sm font-medium mb-3">
                Healing Solutions, Care for your skin and health
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Founded in November 2025, we are committed to providing natural herbal solutions for beauty, skincare, and healthcare.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Right: Form Card ── */}
        <div
          className="card-animate rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-100"
          style={{ background: "#ffffff" }}
        >
          <h2 className={`${styles.playfair} text-2xl font-bold text-gray-800 mb-6`}>Send Us a Message</h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div
                className="check-pop w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg,#e8f5e9,#c8e6c9)" }}
              >
                ✅
              </div>
              <p className="font-semibold text-green-700 text-lg">Message Sent!</p>
              <p className="text-gray-400 text-sm text-center">We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                required
                value={form.fullName}
                onChange={handleChange}
              />
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
              <FloatingInput
                label="Subject"
                name="subject"
                placeholder="What is this regarding?"
                required
                value={form.subject}
                onChange={handleChange}
              />
              <FloatingTextarea
                label="Message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                required
                value={form.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-80"
                style={
                  sending
                    ? { background: "#3a8a3e" }
                    : undefined
                }
                {...(!sending && { className: "w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 btn-shimmer" })}
              >
                {sending ? (
                  <>
                    <span className="text-white/80 text-xs">Sending</span>
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full dot1" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full dot2" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full dot3" />
                    </span>
                  </>
                ) : (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}