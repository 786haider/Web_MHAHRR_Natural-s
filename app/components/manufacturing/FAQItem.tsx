"use client";

import { useState } from "react";
import { FadeUp } from "./FadeUp";

export function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeUp delay={index * 0.1}>
      <div 
        className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
          isOpen ? 'border-green-300 shadow-md' : 'border-green-50 shadow-sm hover:border-green-200 hover:shadow-md'
        }`}
      >
        <button
          className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm font-semibold text-green-950">{q}</span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-green-100' : 'bg-gray-50'
          }`}>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </button>
        
        <div 
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? '200px' : '0px' }}
        >
          <div className="px-6 pb-4 pt-1 border-t border-gray-50">
            <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
