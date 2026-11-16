"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Leaf,
  Eye,
  X,
  MessageCircle,
  Heart,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Skincare Essentials' | 'Wellness Range' | 'Herbal Remedies';
  image: string;
  tag: string;
  isSignature?: boolean;
  description: string;
  benefits: string[];
}

export interface CollectionSection {
  id: 'skincare' | 'wellness' | 'herbal';
  title: 'Skincare Essentials' | 'Wellness Range' | 'Herbal Remedies';
  tagline: string;
  description: string;
  thumbnail: string;
  accentColor: string;
  products: ProductItem[];
}

const OIL_THUMBNAIL = "/product_img/oilImg2.png";

export const COLLECTIONS_DATA: CollectionSection[] = [
  {
    id: 'skincare',
    title: 'Skincare Essentials',
    tagline: 'Radiant Glow & Pure Nourishment',
    description: 'Nourish, protect, and rejuvenate your skin naturally with organic cold-pressed botanicals and soothing herbal extracts.',
    thumbnail: OIL_THUMBNAIL,
    accentColor: 'from-emerald-600 to-teal-700',
    products: [
      {
        id: 'skin-oil',
        name: 'Signature Herbal Hair & Skin Oil',
        subtitle: 'Multi-Restorative Botanical Formula',
        category: 'Skincare Essentials',
        image: OIL_THUMBNAIL,
        tag: 'Signature Formula',
        isSignature: true,
        description: 'Our flagship 100% pure herbal oil blend, crafted with hand-selected botanicals to deeply nourish, hydrate, and protect skin and hair.',
        benefits: ['Deep hydration & glow', 'Rich in natural antioxidants', '100% Pure Botanical'],
      },
      {
        id: 'skin-1',
        name: 'Pure Glow Botanical Elixir',
        subtitle: 'Radiance Enhancing Serum',
        category: 'Skincare Essentials',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.18.59 PM.jpeg',
        tag: 'Bestseller',
        description: 'A luxurious herbal infusion designed to restore natural skin radiance, diminish dullness, and promote a supple, balanced complexion.',
        benefits: ['Promotes youthful radiance', 'Gentle on all skin types', 'Cold-pressed herbs'],
      },
      {
        id: 'skin-2',
        name: 'Herbal Hydrating Glow Toner',
        subtitle: 'Refreshing Facial Mist & Essence',
        category: 'Skincare Essentials',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.18.59 PM (1).jpeg',
        tag: 'Hydrating',
        description: 'Infused with distilled floral waters and botanical extracts to tone, refresh, and lock in moisture throughout the day.',
        benefits: ['Restores skin pH balance', 'Pore-refining hydration', 'Instant fresh glow'],
      },
      {
        id: 'skin-3',
        name: 'Soothing Rejuvenation Essence',
        subtitle: 'Calming Botanical Complex',
        category: 'Skincare Essentials',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM.jpeg',
        tag: 'Soothing',
        description: 'A soothing herbal remedy specially crafted for stressed or sensitive skin, delivering anti-inflammatory botanical care.',
        benefits: ['Calms redness & irritation', 'Intensive moisture barrier repair', 'Zero harsh chemicals'],
      },
      {
        id: 'skin-4',
        name: 'Organic Herb Radiance Cream',
        subtitle: 'Deep Conditioning Moisture Therapy',
        category: 'Skincare Essentials',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (1).jpeg',
        tag: 'Deep Care',
        description: 'A velvety organic cream packed with nourishing herbal phytonutrients to deeply soften, smoothen, and revitalize skin texture.',
        benefits: ['Velvety soft hydration', 'Protects against dry weather', 'Fast absorbing formula'],
      },
      {
        id: 'skin-5',
        name: 'Gentle Clarifying Face Therapy',
        subtitle: 'Pure Herbal Detox Solution',
        category: 'Skincare Essentials',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (2).jpeg',
        tag: 'Clarifying',
        description: 'Traditional antibacterial and cleansing herbs blended to gently clarify pores and soothe blemishes without drying.',
        benefits: ['Clears and balances skin', 'Natural botanical astringent', 'Non-comedogenic'],
      },
    ],
  },
  {
    id: 'wellness',
    title: 'Wellness Range',
    tagline: 'Holistic Vitality & Daily Balance',
    description: 'Empower your daily wellness routine with time-honored herbal formulations designed to harmonize mind, body, and spirit.',
    thumbnail: OIL_THUMBNAIL,
    accentColor: 'from-teal-600 to-emerald-800',
    products: [
      {
        id: 'well-oil',
        name: 'Signature Herbal Hair & Skin Oil',
        subtitle: 'Multi-Restorative Botanical Formula',
        category: 'Wellness Range',
        image: OIL_THUMBNAIL,
        tag: 'Signature Formula',
        isSignature: true,
        description: 'Our master herbal oil formulation, designed for comprehensive full-body nourishment, massage therapy, and daily wellness revitalization.',
        benefits: ['Multi-purpose body wellness', 'Promotes calmness & relaxation', 'Traditional cold-infusion'],
      },
      {
        id: 'well-1',
        name: 'Vital Balance Herbal Extract',
        subtitle: 'Daily Natural Energy & Stamina',
        category: 'Wellness Range',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (3).jpeg',
        tag: 'Vitality',
        description: 'A holistic botanical supplement formulated to restore vitality, support digestion, and boost daily stamina naturally.',
        benefits: ['Daily energy booster', 'Supports digestive wellness', '100% Natural ingredients'],
      },
      {
        id: 'well-2',
        name: 'Holistic Wellness Herbal Tonic',
        subtitle: 'Rejuvenating Apothecary Blend',
        category: 'Wellness Range',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (4).jpeg',
        tag: 'Holistic',
        description: 'Crafted according to classical herbal wisdom to harmonize body systems and promote enduring well-being.',
        benefits: ['Nourishes body reserves', 'Supports gentle detoxification', 'Rich in botanical nutrients'],
      },
      {
        id: 'well-3',
        name: 'Pure Herbal Health Fortifier',
        subtitle: 'Immunity & Strength Formula',
        category: 'Wellness Range',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (5).jpeg',
        tag: 'Immunity',
        description: 'Synergistic combination of potent medicinal herbs crafted to strengthen natural bodily defenses and vitality.',
        benefits: ['Immune defense support', 'Adaptogenic herbs', 'Ancient natural recipe'],
      },
      {
        id: 'well-4',
        name: 'Botanical Energy & Stamina Drops',
        subtitle: 'Concentrated Vital Herbal Infusion',
        category: 'Wellness Range',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (6).jpeg',
        tag: 'Concentrate',
        description: 'Fast-absorbing natural herbal concentrate to invigorate fatigue and promote sustained mental focus and vitality.',
        benefits: ['Combats everyday fatigue', 'Sharpens mental clarity', 'Free of artificial additives'],
      },
      {
        id: 'well-5',
        name: 'Restorative Body Harmony Elixir',
        subtitle: 'Stress Relief & Relaxation Blend',
        category: 'Wellness Range',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (7).jpeg',
        tag: 'Relaxation',
        description: 'A calming apothecary preparation formulated to ease body tension, reduce daily stress, and promote restorative rest.',
        benefits: ['Deep relaxation & calm', 'Soothes tension and stress', 'Gentle nightly companion'],
      },
    ],
  },
  {
    id: 'herbal',
    title: 'Herbal Remedies',
    tagline: 'Time-Tested Traditional Healing',
    description: 'Authentic therapeutic apothecary remedies prepared with potent healing herbs for deep, restorative natural wellness.',
    thumbnail: OIL_THUMBNAIL,
    accentColor: 'from-emerald-700 to-green-900',
    products: [
      {
        id: 'herb-oil',
        name: 'Signature Herbal Hair & Skin Oil',
        subtitle: 'Multi-Restorative Botanical Formula',
        category: 'Herbal Remedies',
        image: OIL_THUMBNAIL,
        tag: 'Signature Formula',
        isSignature: true,
        description: 'Our traditional herbal therapeutic oil, providing targeted soothing relief, scalp care, and revitalizing tissue support.',
        benefits: ['Therapeutic botanical oil', 'Stimulates follicles & skin healing', 'Handcrafted batch preparation'],
      },
      {
        id: 'herb-1',
        name: 'Traditional Therapeutic Herbal Balm',
        subtitle: 'Deep Soothing Ache & Joint Relief',
        category: 'Herbal Remedies',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (8).jpeg',
        tag: 'Therapeutic',
        description: 'Concentrated herbal salve infused with active botanical extracts to quickly ease muscle soreness, joint stiffness, and fatigue.',
        benefits: ['Fast warming relief', 'Deep penetrating formula', '100% Natural waxes & herbs'],
      },
      {
        id: 'herb-2',
        name: 'Ancient Healing Herbal Extract',
        subtitle: 'Concentrated Medicinal Remedy',
        category: 'Herbal Remedies',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (9).jpeg',
        tag: 'Ancient Healer',
        description: 'A potent apothecary formula drawn from ancient botanical texts, offering multi-dimensional support for recovery and vigor.',
        benefits: ['Traditional healing heritage', 'High potency botanical extract', 'Chemical-free processing'],
      },
      {
        id: 'herb-3',
        name: 'Deep Relief Botanical Salve',
        subtitle: 'Intensive Skin & Tissue Recovery',
        category: 'Herbal Remedies',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (10).jpeg',
        tag: 'Fast Relief',
        description: 'Specialized herbal salve formulated to calm inflamed skin, accelerate natural tissue recovery, and soften roughness.',
        benefits: ['Accelerates recovery', 'Soothes inflammation', 'Nourishing barrier care'],
      },
      {
        id: 'herb-4',
        name: 'Pure Organic Herbal Remedy',
        subtitle: 'Authentic Traditional Preparation',
        category: 'Herbal Remedies',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (11).jpeg',
        tag: 'Pure Organic',
        description: 'A pure unadulterated herbal formulation prepared according to strict purity standards to nurture natural body homeostasis.',
        benefits: ['Uncompromised purity', 'Wildcrafted organic herbs', 'Zero preservatives'],
      },
      {
        id: 'herb-5',
        name: 'Herbal Apothecary Healing Potion',
        subtitle: 'Master Restorative Formulation',
        category: 'Herbal Remedies',
        image: '/product_img/WhatsApp Image 2026-11-08 at 9.19.00 PM (12).jpeg',
        tag: 'Master Blend',
        description: 'A balanced blend of therapeutic herbs carefully simmered to extract maximum restorative essence for whole-body healing.',
        benefits: ['Holistic regenerative power', 'Time-honored formula', 'Pure nature in every drop'],
      },
    ],
  },
];

export default function CuratedCollectionsSection() {
  const router = useRouter();
  const [isQuestionHovered, setIsQuestionHovered] = useState(false);
  const [isListToggled, setIsListToggled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'skincare' | 'wellness' | 'herbal'>('all');

  const totalProducts = COLLECTIONS_DATA.reduce((acc, col) => acc + col.products.length, 0);

  // Flattened products list
  const allProductsList: ProductItem[] = COLLECTIONS_DATA.flatMap((col) => col.products);

  const displayedListProducts = activeCategoryFilter === 'all'
    ? allProductsList
    : COLLECTIONS_DATA.find((c) => c.id === activeCategoryFilter)?.products || [];

  const isListVisible = isQuestionHovered || isListToggled;

  const handleQuestionClick = (e: React.MouseEvent) => {
    // If user clicked the link or question container, navigate to Our Product page
    router.push('/our_product');
  };

  const getWhatsAppLink = (productName: string, category: string) => {
    const message = encodeURIComponent(
      `Hello MHAHRR Natural! I am interested in ordering/inquiring about "${productName}" from the ${category} collection.`
    );
    return `https://wa.me/92123456789?text=${message}`;
  };

  return (
    <section id="curated-collections" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -ml-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm border border-emerald-200/60">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Pure Botanical Formulations</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Curated <span className="text-emerald-700 italic font-serif">Collections</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Discover our carefully crafted range of natural wellness and skincare solutions. Every formulation is made with pure herbs, cold-pressed oils, and timeless botanical wisdom.
          </p>
        </div>

        {/* 3 Main Collection Overview Cards (Thumbnail is oilImg2.png for all 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {COLLECTIONS_DATA.map((col) => (
            <Link
              key={col.id}
              href="/our_product"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:-translate-y-2 flex flex-col"
            >
              {/* Thumbnail Image: oilImg2.png */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-emerald-950">
                <Image
                  src={col.thumbnail}
                  alt={`${col.title} Collection Thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/40 to-transparent"></div>

                {/* Badges on Thumbnail */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Thumbnail: oilimg2.png
                  </span>
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {col.products.length} Products
                  </span>
                </div>

                {/* Title & Tagline overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                    {col.tagline}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    {col.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 bg-white flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                  Explore {col.title}
                </span>
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── ANIMATED QUESTION & HOVER LIST CONTAINER ──────────────────────── */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsQuestionHovered(true)}
          onMouseLeave={() => setIsQuestionHovered(false)}
        >
          {/* Animated Question Prompt Banner (Clicking navigates to /our_product) */}
          <div
            onClick={handleQuestionClick}
            className={`group relative rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl border-2 ${
              isListVisible
                ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 border-emerald-400 ring-4 ring-emerald-500/20'
                : 'bg-gradient-to-r from-emerald-950 via-teal-950 to-gray-950 border-emerald-600/40 hover:border-emerald-400'
            }`}
          >
            {/* Animated Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-3 max-w-2xl">
                {/* Floating Question Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-bold tracking-wide border border-emerald-400/30 backdrop-blur-md">
                  <HelpCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Curious to See Our Products?</span>
                </div>

                {/* Animated Main Question */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  Would you like to explore our handcrafted herbal remedies?
                </h3>

                {/* Instruction Subtitle */}
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                  <span className="font-semibold text-emerald-300">Move your cursor over this box</span> to preview our formulations in a quick list, or <span className="underline decoration-emerald-400 underline-offset-4 font-semibold text-white">click anywhere</span> to visit our full Product Store!
                </p>
              </div>

              {/* Action Button & Indicator */}
              <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Go to Our Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Mobile Tap Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsListToggled((prev) => !prev);
                  }}
                  className="md:hidden text-xs text-emerald-200 underline font-semibold py-1 px-3"
                >
                  {isListToggled ? '▲ Hide Quick List' : '▼ Tap to Preview List'}
                </button>

                <span className="text-[11px] text-emerald-200/80 font-mono tracking-wider hidden md:block">
                  {isListVisible ? '🟢 Previewing List Below' : 'Hover to Preview List ⚡'}
                </span>
              </div>
            </div>
          </div>

          {/* ─── HOVER REVEALED LIST FORM ────────────────────────────────────── */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isListVisible
                ? 'max-h-[900px] opacity-100 translate-y-0 mt-6'
                : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 flex flex-col">
              {/* List Header & Category Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Quick Product List Preview
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Showing {displayedListProducts.length} formulations divided across our 3 collections
                  </p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategoryFilter === 'all'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    All ({allProductsList.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('skincare')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategoryFilter === 'skincare'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    Skincare (6)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('wellness')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategoryFilter === 'wellness'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    Wellness (6)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('herbal')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategoryFilter === 'herbal'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    Herbal Remedies (6)
                  </button>
                </div>
              </div>

              {/* Product Items in List Form (Scrollable container) */}
              <div className="max-h-[460px] overflow-y-auto pr-2 divide-y divide-gray-100 space-y-1">
                {displayedListProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group/item flex items-center justify-between gap-4 p-3.5 rounded-2xl hover:bg-emerald-50/70 transition-all duration-300 cursor-pointer"
                  >
                    {/* Left: Product Thumbnail & Title in List Form */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-emerald-50/80 border border-emerald-100 flex-shrink-0 group-hover/item:scale-105 transition-transform duration-300">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                            {product.category}
                          </span>
                          {product.isSignature ? (
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Signature Blend
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                              {product.tag}
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm sm:text-base font-bold text-gray-900 group-hover/item:text-emerald-700 transition-colors truncate">
                          {product.name}
                        </h5>

                        <p className="text-xs text-gray-500 truncate hidden sm:block">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="p-2 rounded-xl text-gray-500 hover:text-emerald-700 hover:bg-white transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <Link
                        href="/our_product"
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/60 hover:bg-emerald-200/60 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Sticky Footer Call To Action */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/60 rounded-2xl p-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-emerald-950">
                    Ready to place an order or view full pricing?
                  </p>
                  <p className="text-xs text-emerald-800">
                    Explore all categories, ingredients, and place direct WhatsApp orders on our dedicated store page.
                  </p>
                </div>

                <Link
                  href="/our_product"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>Visit Our Product Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Quick View */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image in Modal */}
              <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-emerald-50/70 overflow-hidden flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                {selectedProduct.isSignature && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Signature Blend
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info in Modal */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit mb-3">
                    <Leaf className="w-3.5 h-3.5" />
                    {selectedProduct.category}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-sm text-emerald-800 font-medium mb-4 italic">
                    {selectedProduct.subtitle}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Key Botanical Benefits
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProduct.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Heart className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppLink(selectedProduct.name, selectedProduct.category)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-5 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <Link
                    href="/our_product"
                    className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors text-center"
                  >
                    Store Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
