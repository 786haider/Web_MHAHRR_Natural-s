"use client";

import React from 'react';
import Link from 'next/link';
import { Hash, Sparkles, TrendingUp, Search, ArrowRight, Leaf } from 'lucide-react';

const TRENDING_HASHTAGS = [
  { tag: '#MhahrrNaturals', count: 'Official', featured: true },
  { tag: '#HerbalSkincare', count: 'Trending' },
  { tag: '#PureHerbalOil', count: 'Signature', featured: true },
  { tag: '#NaturalRemedies', count: 'Popular' },
  { tag: '#OrganicWellness', count: 'Top Rated' },
  { tag: '#CleanBeauty', count: 'Verified' },
  { tag: '#ChemicalFree', count: '100% Pure', featured: true },
  { tag: '#HolisticHealing', count: 'Apothecary' },
  { tag: '#KarachiOrganics', count: 'Local Craft' },
  { tag: '#GlowNaturally', count: 'Beauty' },
  { tag: '#ColdPressedHairOil', count: 'Must Have', featured: true },
  { tag: '#AyurvedicCare', count: 'Heritage' },
  { tag: '#BotanicalCare', count: 'Plant Based' },
  { tag: '#CrueltyFreeSkincare', count: 'Ethical' },
];

const SEARCH_KEYWORDS = [
  { term: 'Organic Hair Oil', path: '/our_product' },
  { term: 'Herbal Neem Face Wash', path: '/our_product' },
  { term: 'Turmeric Radiance Mask', path: '/our_product' },
  { term: 'Natural Rose Water Toner', path: '/our_product' },
  { term: 'Soothing Aloe Vera Gel', path: '/our_product' },
  { term: 'Cold-Pressed Botanical Oils', path: '/our_product' },
  { term: 'Chemical-Free Apothecary', path: '/our_product' },
  { term: 'Healing Solutions Karachi', path: '/our_product' },
  { term: 'Herbal Remedies for Hair Growth', path: '/our_product' },
  { term: 'Natural Glowing Skin Formula', path: '/our_product' },
];

export default function TrendingKeywordsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden border-t border-gray-100">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 shadow-sm border border-emerald-200/60">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Trending Topics &amp; Search Keywords</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Trending With <span className="text-emerald-700 font-serif italic">MHAHRR Natural</span>
          </h3>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Join thousands searching for clean, chemical-free herbal formulations and organic remedies. Explore popular topics, community hashtags, and trending botanical remedies.
          </p>
        </div>

        {/* Trending Hashtags Cloud (Links directly to dedicated Herbality blog articles) */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Hash className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Community Hashtags &amp; Herbality Blogs
              </h4>
            </div>
            <span className="text-xs text-emerald-700 font-semibold text-center sm:text-right">
              ✨ Click any hashtag to read its dedicated Herbality blog →
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
            {TRENDING_HASHTAGS.map(({ tag, count, featured }, idx) => {
              const cleanTag = tag.replace('#', '');
              return (
                <Link
                  key={idx}
                  href={`/blog?tag=${cleanTag}`}
                  className={`group inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border shadow-sm hover:scale-105 hover:shadow-md cursor-pointer ${
                    featured
                      ? 'bg-emerald-700 text-white border-emerald-600 shadow-emerald-700/20'
                      : 'bg-white text-gray-700 hover:text-emerald-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                  title={`Read blog on ${tag}`}
                >
                  <span className={featured ? 'text-emerald-200 font-bold' : 'text-emerald-600 font-bold'}>#</span>
                  <span>{cleanTag}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      featured
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-50 text-emerald-800 group-hover:bg-emerald-100'
                    }`}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Trending Search Topics */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">
                  Most Searched Botanical Formulations
                </h4>
                <p className="text-xs text-gray-500">
                  Quick links to popular searches in our store
                </p>
              </div>
            </div>

            <Link
              href="/our_product"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {SEARCH_KEYWORDS.map(({ term, path }, idx) => (
              <Link
                key={idx}
                href={path}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-50 hover:bg-emerald-600 text-gray-700 hover:text-white border border-gray-200/80 hover:border-emerald-600 transition-all duration-300 hover:shadow-sm"
              >
                <Leaf className="w-3 h-3 text-emerald-600 group-hover:text-white transition-colors" />
                <span>{term}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

