"use client";

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Leaf,
  Sparkles,
  Search,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
  CheckCircle2,
  ShoppingBag,
  MessageCircle,
  Hash,
  BookOpen,
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from './blogData';

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tagParam = searchParams.get('tag');

  const [activeTag, setActiveTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Sync active tag with search params
  useEffect(() => {
    if (tagParam) {
      setActiveTag(tagParam);
      // Automatically open the post if it matches exactly
      const matched = BLOG_POSTS.find(
        (p) => p.tag.toLowerCase() === tagParam.toLowerCase() || p.slug === tagParam
      );
      if (matched) {
        setSelectedPost(matched);
      }
    } else {
      setActiveTag('all');
    }
  }, [tagParam]);

  // Filtered posts based on active tag and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesTag =
        activeTag === 'all' ||
        post.tag.toLowerCase() === activeTag.toLowerCase() ||
        post.hashtag.toLowerCase().includes(activeTag.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hashtag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchQuery]);

  const handleTagClick = (tag: string) => {
    if (tag === 'all') {
      setActiveTag('all');
      router.push('/blog');
    } else {
      setActiveTag(tag);
      router.push(`/blog?tag=${tag}`);
    }
  };

  const getWhatsAppBlogLink = (postTitle: string) => {
    const text = encodeURIComponent(
      `Hello MHAHRR Natural! I was reading your blog article on "${postTitle}" and would like to learn more about your related herbal products.`
    );
    return `https://wa.me/92123456789?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-white">
      {/* ─── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-br from-emerald-950 via-teal-950 to-gray-950 text-white overflow-hidden">
        {/* Ambient Blur Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 border border-emerald-400/30 backdrop-blur-md">
            <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>The MHAHRR Botanical Chronicles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Herbality, Purity <span className="text-emerald-400 font-serif italic">&amp; Living Wisdom</span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Immerse yourself in our dedicated apothecary blog. Explore the science of living herbs, ancestral recipes, clean beauty standards, and holistic daily wellness.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search botanical topics, herbs, recipes..."
              className="w-full bg-white/10 border border-emerald-400/30 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-emerald-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all text-sm sm:text-base backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Tag Navigation Cloud ────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200">
            <button
              onClick={() => handleTagClick('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex-shrink-0 shadow-sm ${
                activeTag === 'all'
                  ? 'bg-emerald-700 text-white shadow-emerald-700/25'
                  : 'bg-stone-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              All Articles ({BLOG_POSTS.length})
            </button>

            {BLOG_POSTS.map((post) => {
              const isSelected = activeTag.toLowerCase() === post.tag.toLowerCase();
              return (
                <button
                  key={post.id}
                  onClick={() => handleTagClick(post.tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-600 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <span className={isSelected ? 'text-emerald-200' : 'text-emerald-600'}>#</span>
                  <span>{post.tag}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {post.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Main Content Grid ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Active Filter Notice */}
        {activeTag !== 'all' && (
          <div className="mb-10 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-emerald-700" />
              <p className="text-sm text-emerald-950">
                Filtered by topic: <span className="font-bold">#{activeTag}</span> ({filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'})
              </p>
            </div>
            <button
              onClick={() => handleTagClick('all')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              Clear filter <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-sm text-gray-600 mb-6">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword or browse our complete library.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTag('all');
                router.push('/blog');
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm shadow-md hover:bg-emerald-800 transition-colors"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
              >
                {/* Article Cover Image */}
                <div className="relative h-56 w-full overflow-hidden bg-emerald-950">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-900 backdrop-blur-md shadow-sm">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {post.category}
                    </span>
                    <span className="bg-emerald-600/90 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Hashtag Overlay on bottom of image */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {post.hashtag}
                    </span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {post.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        {post.author}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-emerald-800 font-medium italic mb-3">
                      {post.subtitle}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
                      Read Herbality Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <span className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                      {post.count}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* ─── FULL ARTICLE READER MODAL ───────────────────────────────────────── */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Nav inside modal */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {selectedPost.hashtag}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  • {selectedPost.readTime}
                </span>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              {/* Title & Meta */}
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-emerald-700 mb-2">
                  {selectedPost.category}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {selectedPost.title}
                </h2>
                <p className="text-lg text-emerald-900/90 font-serif italic mb-6">
                  {selectedPost.subtitle}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 pb-6 border-b border-gray-100 flex-wrap">
                  <span className="font-semibold text-gray-900">By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.authorRole}</span>
                  <span>•</span>
                  <span>{selectedPost.publishDate}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-emerald-950">
                <Image
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>

              {/* Intro Callout */}
              <div className="bg-emerald-50/80 rounded-2xl p-6 border-l-4 border-emerald-600 text-emerald-950 text-base sm:text-lg leading-relaxed font-medium">
                {selectedPost.content.intro}
              </div>

              {/* Article Content Sections */}
              <div className="space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg">
                {selectedPost.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {section.heading}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {section.body}
                    </p>
                    {section.bullets && (
                      <ul className="space-y-2 mt-3 bg-stone-50 p-4 rounded-xl border border-gray-100">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm text-gray-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Herbality Pledge Box */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The MHAHRR Herbality Pledge</span>
                </div>
                <p className="text-lg sm:text-xl font-serif italic text-emerald-100">
                  &ldquo;{selectedPost.content.herbalityPledge}&rdquo;
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Key Botanical Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {selectedPost.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA & Actions */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getWhatsAppBlogLink(selectedPost.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <Link
                    href="/our_product"
                    onClick={() => setSelectedPost(null)}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop Related Products</span>
                  </Link>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors w-full sm:w-auto"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-24">
      <div className="text-center space-y-4">
        <Leaf className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
        <p className="text-gray-600 text-sm font-semibold">Loading MHAHRR Botanical Chronicles...</p>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoadingSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}
