"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Leaf, Eye, X, MessageCircle, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'all' | 'skincare' | 'wellness' | 'herbal'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filterCollections = activeTab === 'all'
    ? COLLECTIONS_DATA
    : COLLECTIONS_DATA.filter((col) => col.id === activeTab);

  const totalProducts = COLLECTIONS_DATA.reduce((acc, col) => acc + col.products.length, 0);

  const getWhatsAppLink = (productName: string, category: string) => {
    const message = encodeURIComponent(
      `Hello MHAHRR Natural! I am interested in ordering/inquiring about "${productName}" from the ${category} collection.`
    );
    return `https://wa.me/92123456789?text=${message}`;
  };

  return (
    <section id="curated-collections" className="py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -ml-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Pure Botanical Formulations</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Curated <span className="text-emerald-700 italic font-serif">Collections</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Discover our handcrafted range of natural wellness and skincare solutions. Every formulation is made with pure herbs, natural cold-pressed oils, and timeless botanical wisdom.
          </p>
        </div>

        {/* 3 Main Collection Banners (Thumbnail is oilImg2.png for all 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {COLLECTIONS_DATA.map((col) => {
            const isCurrentActive = activeTab === col.id;
            return (
              <div
                key={col.id}
                onClick={() => setActiveTab(isCurrentActive ? 'all' : col.id)}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${
                  isCurrentActive ? 'border-emerald-600 ring-4 ring-emerald-500/20 -translate-y-2' : 'border-gray-100 hover:-translate-y-2'
                }`}
              >
                {/* Thumbnail Image: oilImg2.png */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-emerald-950">
                  <Image
                    src={col.thumbnail}
                    alt={`${col.title} Collection Thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/40 to-transparent"></div>

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
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
                    {isCurrentActive ? 'Showing this collection' : 'Explore this collection'}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
              activeTab === 'all'
                ? 'bg-emerald-700 text-white shadow-emerald-700/25 shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            All Collections ({totalProducts})
          </button>

          {COLLECTIONS_DATA.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                activeTab === col.id
                  ? 'bg-emerald-700 text-white shadow-emerald-700/25 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              {col.title} ({col.products.length})
            </button>
          ))}
        </div>

        {/* Collection Sections & Products */}
        <div className="space-y-20">
          {filterCollections.map((collection) => (
            <div key={collection.id} className="scroll-mt-24">
              {/* Category Sub-header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500 shadow-sm">
                      <Image
                        src={collection.thumbnail}
                        alt="Section Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Section Category
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1 max-w-2xl">
                    {collection.description}
                  </p>
                </div>

                <div className="text-sm font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl self-start sm:self-auto border border-emerald-100">
                  {collection.products.length} Botanical Formulations
                </div>
              </div>

              {/* Product Cards Grid (Includes oilImg2.png + WhatsApp sample images) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.products.map((product) => (
                  <div
                    key={`${collection.id}-${product.id}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-1.5"
                  >
                    {/* Product Image Frame */}
                    <div className="relative aspect-[4/3] w-full bg-emerald-50/50 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Tag Badge */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {product.isSignature ? (
                          <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            <Sparkles className="w-3 h-3" />
                            {product.tag}
                          </span>
                        ) : (
                          <span className="bg-emerald-600/95 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      {/* Quick View Overlay Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md opacity-90 group-hover:opacity-100 transition-all hover:scale-110"
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4 text-emerald-700" />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
                          <span className="text-emerald-700 font-semibold">{product.category}</span>
                          <span className="flex items-center gap-1 text-emerald-600">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Natural Sample
                          </span>
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5">
                          {product.name}
                        </h4>

                        <p className="text-xs text-gray-500 mb-3 italic">
                          {product.subtitle}
                        </p>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Key Benefits */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {product.benefits.map((b, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-emerald-50 text-emerald-800 font-medium px-2.5 py-1 rounded-md"
                            >
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-2.5 px-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>

                        <a
                          href={getWhatsAppLink(product.name, product.category)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-2.5 px-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5"
                          title="Inquire on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for Quick View */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-scaleUp"
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
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-5 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
