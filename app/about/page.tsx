'use client';

import { useEffect, useRef } from 'react';

export default function About() {
    const heroRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                @keyframes gradient-shift {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-fade-in {
                    animation: fadeInUp 1s ease-out forwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-pulse-glow {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                .gradient-animated {
                    background-size: 200% 200%;
                    animation: gradient-shift 8s ease infinite;
                }
            `}</style>

            {/* Hero Section with Animated Gradient */}
            <div 
                ref={heroRef}
                className="relative bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 gradient-animated py-32 px-4 overflow-hidden"
            >
                {/* Floating Decorative Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full opacity-30 animate-float blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400 rounded-full opacity-25 animate-float blur-2xl" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-400 rounded-full opacity-30 animate-float blur-2xl" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-20 right-1/4 w-36 h-36 bg-lime-300 rounded-full opacity-20 animate-float blur-3xl" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-emerald-500 rounded-full opacity-25 animate-float blur-2xl" style={{ animationDelay: '3s' }}></div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
                            About{' '}
                            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                                MHAHRR Natural
                            </span>
                        </h1>
                    </div>
                    
                    <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
                        <p className="text-xl md:text-2xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
                            Discover our story, mission, and commitment to natural wellness
                        </p>
                    </div>

                    {/* Animated Decorative Line */}
                    <div className="animate-on-scroll opacity-0 mt-12" style={{ animationDelay: '0.6s' }}>
                        <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
                    </div>
                </div>

                {/* Animated Leaves/Icons */}
                <div className="absolute bottom-10 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
                    <svg className="w-16 h-16 text-emerald-500 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                </div>

                <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '3s' }}>
                    <svg className="w-20 h-20 text-teal-500 opacity-30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>

                <div className="absolute bottom-1/4 right-1/3 animate-float" style={{ animationDelay: '5s' }}>
                    <svg className="w-14 h-14 text-green-500 opacity-25" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    </svg>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                Our Story
                            </h2>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                MHAHRR Natural was founded in November 2025 in Karachi, Sindh, Pakistan, with a vision to revolutionize the natural wellness industry. Our journey began with a simple belief: nature holds the answers to our health and beauty needs.
                            </p>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                From humble beginnings, we&apos;ve grown into a trusted brand dedicated to creating herbal beauty, skincare, and healthcare products that truly make a difference. Every product we create is a testament to our commitment to quality, purity, and the healing power of nature.
                            </p>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Today, we&apos;re proud to serve customers who share our passion for natural wellness and sustainable living.
                            </p>
                        </div>

                        {/* Right Content - Founded Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* Leaf Icon */}
                            <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
                                <svg className="w-32 h-32 text-emerald-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10 Z" fill="currentColor" opacity="0.1"/>
                                    <path d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10 Z"/>
                                    <path d="M50 20 L50 80" strokeWidth="2"/>
                                    <path d="M50 35 Q60 45 50 55" strokeWidth="2"/>
                                    <path d="M50 45 Q40 55 50 65" strokeWidth="2"/>
                                </svg>
                            </div>
                            
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Founded 2025
                            </h3>
                            
                            <p className="text-xl text-gray-700 font-medium">
                                Karachi, Pakistan
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="bg-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-16">
                        Our Mission & Vision
                    </h2>

                    {/* Mission & Vision Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Our Mission Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                {/* Mission Icon */}
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <circle cx="12" cy="12" r="6"/>
                                        <circle cx="12" cy="12" r="2"/>
                                    </svg>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Our Mission
                                </h3>
                            </div>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To create and deliver premium natural herbal products that enhance beauty, promote skin health, and support overall wellness. We are committed to using only the finest natural ingredients, free from harmful chemicals, to ensure our customers receive products they can trust.
                            </p>
                        </div>

                        {/* Our Vision Card */}
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-10 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                {/* Vision Icon */}
                                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Our Vision
                                </h3>
                            </div>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To become a globally recognized leader in natural wellness, known for our unwavering commitment to quality, sustainability, and customer care. We envision a world where natural healing is accessible to everyone, and where people choose wellness rooted in nature.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Core Values Section */}
            <div className="bg-gray-100 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 font-light">
                            Three pillars that guide every decision we make
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Herbality */}
                        <div className="text-center group">
                            {/* Icon Circle */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                                <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5z"/>
                                    <path d="M12 7c-1.38 0-2.5 1.12-2.5 2.5S10.62 12 12 12s2.5-1.12 2.5-2.5S13.38 7 12 7z"/>
                                    <path d="M5 22h14" strokeLinecap="round"/>
                                </svg>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Herbality
                            </h3>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Harnessing the healing power of nature&apos;s finest herbs to create products that nurture and restore
                            </p>
                        </div>

                        {/* Purity */}
                        <div className="text-center group">
                            {/* Icon Circle */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-cyan-100 rounded-full mb-6 group-hover:bg-cyan-200 transition-colors duration-300">
                                <svg className="w-12 h-12 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                                </svg>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Purity
                            </h3>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Like water, our products are pure and essential, free from harmful chemicals and artificial additives
                            </p>
                        </div>

                        {/* Humanity */}
                        <div className="text-center group">
                            {/* Icon Circle */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                                <svg className="w-12 h-12 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Humanity
                            </h3>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Care and compassion guide everything we do, ensuring wellness for both people and planet
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Our Founders Think Section */}
            <div className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            What Our Founders Think
                        </h2>
                        <p className="text-xl text-gray-600 font-light">
                            The vision and passion behind MHAHRR Natural&apos;s creation
                        </p>
                    </div>

                    {/* Founders Quote and Image Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Left - Quote Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 flex flex-col justify-center">
                            {/* Lightbulb Icon */}
                            <div className="mb-6">
                                <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                                    <circle cx="12" cy="12" r="5"/>
                                </svg>
                            </div>

                            <blockquote className="text-2xl md:text-3xl text-gray-800 font-serif italic leading-relaxed mb-8">
                                &quot;We realized that the most powerful solutions for skin and health have existed for centuries in nature. Our mission is to unlock this ancient wisdom and make it accessible to everyone.&quot;
                            </blockquote>

                            <p className="text-lg font-bold text-gray-900">
                                — MHAHRR Natural Founders
                            </p>
                        </div>

                        {/* Right - Image */}
                        <div className="rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-auto">
                            <img 
                                src="/logo/logo_without_text_bgremove.png" 
                                alt="Founder working with natural herbs" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Values/Principles Section */}
                    <div className="space-y-8">
                        {/* Passion for Wellness */}
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                                <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                    Passion for Wellness
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    We developed MHAHRR Natural because we witnessed the growing disconnect between people and nature. Our founders believe that true wellness comes from reconnecting with natural remedies that have stood the test of time.
                                </p>
                            </div>
                        </div>

                        {/* Commitment to Quality */}
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                    Commitment to Quality
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Every product is crafted with meticulous attention to detail. Our founders refuse to compromise on purity, potency, or ethics. We believe that our customers deserve nothing less than the absolute best nature has to offer.
                                </p>
                            </div>
                        </div>

                        {/* Community & Impact */}
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                                <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                    Community & Impact
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    We&apos;re not just building a brand; we&apos;re building a movement. Our founders are driven by the desire to create positive change in our community and contribute to a more sustainable, compassionate world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why We Created MHAHRR Natural Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 py-28 px-4 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse-glow"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600 rounded-full blur-3xl opacity-30 animate-float"></div>
                </div>

                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Title with Decorative Elements */}
                    <div className="mb-20 text-center">
                        <div className="inline-block mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-400"></div>
                                <svg className="w-8 h-8 text-emerald-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <div className="h-px w-16 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-400"></div>
                            </div>
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent">
                                Why We Created
                            </span>
                            <br />
                            <span className="text-white">
                                MHAHRR Natural
                            </span>
                        </h2>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Content Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Card 1 - The Gap */}
                        <div className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl transform group-hover:rotate-12 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-6 right-6 w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-300 font-bold text-lg">01</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                                    The Critical Gap
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    Our founders recognized a critical gap in the wellness market: the absence of truly authentic, pure, and effective natural products. In a world saturated with chemical-laden skincare and health products, they saw an opportunity to create something different—something rooted in tradition, science, and genuine care.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 - The Journey */}
                        <div className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl transform group-hover:rotate-12 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                        <path d="M2 17l10 5 10-5"/>
                                        <path d="M2 12l10 5 10-5"/>
                                    </svg>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-6 right-6 w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center">
                                    <span className="text-green-300 font-bold text-lg">02</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">
                                    The Research Journey
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    The journey began with extensive research into traditional herbal remedies from across the region. Our founders spent countless hours studying ancient formulations, understanding the science behind them, and perfecting recipes that honor both tradition and modern dermatological knowledge.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 - The Belief */}
                        <div className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-teal-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl transform group-hover:rotate-12 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-6 right-6 w-10 h-10 bg-teal-400/20 rounded-full flex items-center justify-center">
                                    <span className="text-teal-300 font-bold text-lg">03</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">
                                    The Guiding Belief
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    What drives us every single day is the belief that everyone deserves access to products that heal without harm, that nourish without chemicals, and that respect both the human body and the environment. MHAHRR Natural was born from this conviction, and it remains our guiding principle as we grow.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Decorative Quote */}
                    <div className="mt-20 text-center">
                        <div className="max-w-4xl mx-auto relative">
                            <div className="absolute -left-8 -top-8 text-6xl text-emerald-400/20 font-serif">&quot;</div>
                            <p className="text-2xl md:text-3xl text-white/90 italic font-light leading-relaxed">
                                Born from conviction. Guided by tradition. Driven by care.
                            </p>
                            <div className="absolute -right-8 -bottom-8 text-6xl text-emerald-400/20 font-serif">&quot;</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Join Our Wellness Journey CTA Section */}
            <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 py-24 px-4 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse-glow"></div>
                    <div className="absolute bottom-20 right-20 w-56 h-56 bg-white rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                        Join Our Wellness Journey
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
                        Explore our range of natural products and experience the difference quality makes
                    </p>

                    <div className="flex justify-center">
                        <a 
                            href="/products" 
                            className="group inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
                        >
                            Shop Now
                            <svg 
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <div className="h-10 bg-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}