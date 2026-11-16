"use client";
import { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Leaf } from 'lucide-react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavLink = memo<NavLinkProps>(({ href, children, isActive = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={href}
                className={`relative pb-1 transition-colors duration-300 ease-in-out no-underline inline-block ${
                    isActive 
                        ? 'text-green-600 font-semibold' 
                        : isHovered 
                        ? 'text-green-600' 
                        : 'text-gray-800'
                }`}
            >
                {children}
            </Link>
            <span
                className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ease-in-out ${
                    isHovered || isActive ? 'w-full' : 'w-0'
                }`}
            />
        </div>
    );
});

NavLink.displayName = 'NavLink';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const navigationItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/our_product', label: 'Our Products' },
        { href: '/blog', label: 'Blog' },
        { href: '/manufacturing', label: 'Manufacturing' },
        { href: '/distribution', label: 'Distribution' },
        { href: '/contact', label: 'Contact Us' },
    ];

    return (
        <nav className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-50/80 sticky top-0 z-50 transition-all duration-300">
            {/* Logo and Brand */}
            <Link
                href="/"
                className="flex items-center gap-3 sm:gap-4 group relative py-1 focus:outline-none"
                aria-label="MHAHRR Natural Home"
            >
                {/* Logo with Animated Halo & Micro-Interactions */}
                <div className="relative flex items-center justify-center flex-shrink-0">
                    {/* Pulsing Ambient Botanical Glow behind logo */}
                    <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/25 via-teal-400/20 to-emerald-600/15 rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:scale-115 transition-all duration-700 pointer-events-none" />

                    {/* Orbiting / Shimmering Ring on Hover */}
                    <div className="absolute inset-0 rounded-full border border-emerald-400/30 group-hover:border-emerald-500/70 group-hover:scale-105 group-hover:rotate-180 transition-all duration-1000 pointer-events-none" />

                    {/* Circle Frame: Kept Standard Size while Logo Inside Fills the Circle */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-emerald-50/60 shadow-sm border border-emerald-100/70 group-hover:shadow-md transition-all duration-500 flex-shrink-0">
                        {/* Enlarged Logo Graphic Inside the Circle (fills circle edge-to-edge) */}
                        <Image
                            src="/logo/logo_without_text_bgremove.png"
                            alt="MHAHRR Natural Logo"
                            fill
                            sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                            className="object-contain scale-135 filter drop-shadow-sm group-hover:scale-145 group-hover:-rotate-3 group-hover:brightness-105 transition-all duration-500"
                            priority
                        />
                    </div>

                    {/* Tiny Floating Sparkle Accent */}
                    <span className="absolute -top-1 -right-1 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5 fill-emerald-400/30 text-emerald-600" />
                    </span>
                </div>

                {/* Company Name with Creative Typography & Animation */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-emerald-950 to-gray-800 group-hover:from-emerald-700 group-hover:via-emerald-600 group-hover:to-teal-600 bg-clip-text text-transparent transition-all duration-500">
                            MHAHRR
                        </span>
                        <span className="text-base sm:text-lg md:text-xl font-serif italic font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors duration-300">
                            Natural&apos;s
                        </span>
                        <Leaf className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:rotate-45 group-hover:scale-125 transition-all duration-500" />
                    </div>

                    {/* Animated Tagline with Sliding Underline Effect */}
                    <div className="relative inline-block w-fit overflow-hidden">
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-emerald-700 transition-colors duration-300">
                            Healing Solution
                        </p>
                        {/* Underline glide animation on hover */}
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-emerald-500 to-teal-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </div>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                {navigationItems.map(({ href, label }) => (
                    <NavLink
                        key={href}
                        href={href}
                        isActive={pathname === href}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-800 hover:text-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded-md"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                    
                    {/* Menu Panel */}
                    <div className="absolute top-full left-0 right-0 bg-white shadow-xl lg:hidden z-50 border-t border-gray-100">
                        <div className="flex flex-col py-4 px-6 space-y-1">
                            {navigationItems.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMenu}
                                    className={`py-3 px-4 rounded-lg transition-all duration-200 ${
                                        pathname === href
                                            ? 'text-green-600 bg-green-50 font-semibold'
                                            : 'text-gray-800 hover:text-green-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default memo(Navbar);
