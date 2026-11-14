'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export interface NavigationProps {
  /**
   * Array of section IDs corresponding to on-page anchor targets.
   * Defaults to: ['home', 'videos', 'gallery', 'about', 'services', 'booking']
   */
  sections?: string[];

  /**
   * Optional custom wrapper CSS classes.
   */
  className?: string;
}

interface NavItemConfig {
  label: string;
  id: string;
  aliases?: string[];
}

const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  { label: 'Home', id: 'home', aliases: ['walkthrough', 'hero'] },
  { label: 'Videos', id: 'videos', aliases: ['clinic-continuity', 'walkthrough'] },
  { label: 'Gallery', id: 'gallery', aliases: ['results', 'transformations'] },
  { label: 'About Us', id: 'about', aliases: ['about-us', 'team'] },
  { label: 'Services', id: 'services', aliases: ['treatments', 'menu'] },
  { label: 'Location', id: 'location', aliases: ['map', 'contact'] },
  { label: 'Book Appointment', id: 'booking', aliases: ['book', 'appointment'] },
];

export const Navigation: React.FC<NavigationProps> = ({
  sections,
  className = '',
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Map configured or default section items
  const navItems = useMemo(() => {
    if (!sections || sections.length === 0) {
      return DEFAULT_NAV_ITEMS;
    }

    return DEFAULT_NAV_ITEMS.map((item, index) => {
      const customId = sections[index] || item.id;
      return {
        ...item,
        id: customId,
      };
    });
  }, [sections]);

  // All valid DOM candidate IDs for active tracking
  const targetIds = useMemo(() => {
    return navItems.map((item) => item.id);
  }, [navItems]);

  /**
   * Helper to locate the actual DOM element for an item,
   * checking both primary ID and recognized aliases.
   */
  const findElementForNavItem = (item: NavItemConfig): HTMLElement | null => {
    const primary = document.getElementById(item.id);
    if (primary) return primary;

    if (item.aliases) {
      for (const alias of item.aliases) {
        const el = document.getElementById(alias);
        if (el) return el;
      }
    }
    return null;
  };

  /**
   * Smooth scroll-to-section listener with offset compensation for sticky navbar.
   */
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItemConfig) => {
    e.preventDefault();
    const element = findElementForNavItem(item);

    if (element) {
      const navOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const targetScrollY = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });

      setActiveSection(item.id);
      setIsMobileMenuOpen(false);
    } else {
      // Fallback: standard hash navigation
      window.location.hash = item.id;
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Scroll listener to dynamically update the active navigation item
   * based on viewport scroll position.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const navOffset = 140; // Trigger threshold just below header
      const scrollPosition = window.scrollY + navOffset;

      // Scan backwards so lower page sections take priority when reached
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = findElementForNavItem(item);

        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      // Default back to first item when near page top
      if (navItems.length > 0) {
        setActiveSection(navItems[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/85 backdrop-blur-md ${
        isScrolled ? 'shadow-md border-b border-slate-200/80 py-3' : 'shadow-sm border-b border-slate-100 py-4'
      } ${className}`}
      aria-label="Aurora Dental Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* (1) Clinic Logo & Branding on Left with Teal Accent (#06b6d4) */}
          <Link
            href="#home"
            onClick={(e) => scrollToSection(e, navItems[0])}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aurora Dental Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-sky-500 flex items-center justify-center text-white shadow-md shadow-[#06b6d4]/20 group-hover:scale-105 transition-transform duration-200">
              {/* Dental Tooth SVG Icon */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2C7.5 2 4 5.5 4 10c0 3.5 2 6 4 9 1 1.5 2 3 4 3s3-1.5 4-3c2-3 4-5.5 4-9 0-4.5-3.5-8-8-8z" />
                <path d="M9 10c1 1.5 2 2 3 2s2-.5 3-2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-[#06b6d4] transition-colors duration-200">
                AURORA<span className="text-[#06b6d4] font-semibold ml-1">DENTAL</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-1">
                We Design Smiles
              </span>
            </div>
          </Link>

          {/* (3) Desktop: Horizontal Menu Layout with Active Highlighting */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isBookingCta = item.id === 'booking';

              // Render "Book Appointment" as a prominent CTA button if desired
              if (isBookingCta) {
                return (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item)}
                    className="ml-3 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#06b6d4] hover:bg-[#0891b2] shadow-md shadow-[#06b6d4]/25 hover:shadow-lg hover:shadow-[#06b6d4]/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#06b6d4] bg-cyan-50/70'
                      : 'text-slate-600 hover:text-[#06b6d4] hover:bg-slate-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {/* Active bottom accent bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#06b6d4] rounded-full animate-in fade-in zoom-in-75 duration-200" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* (4) Mobile Hamburger Menu Icon Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Mobile CTA */}
            <Link
              href="#booking"
              onClick={(e) => scrollToSection(e, navItems[navItems.length - 1])}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#06b6d4] shadow-sm"
            >
              Book
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#06b6d4] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/30"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Vertical Menu) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isBookingCta = item.id === 'booking';

              if (isBookingCta) {
                return (
                  <div key={item.id} className="pt-2 mt-1 border-t border-slate-100">
                    <Link
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item)}
                      className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white bg-[#06b6d4] hover:bg-[#0891b2] shadow-md shadow-[#06b6d4]/20 transition-all text-center"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#06b6d4] bg-cyan-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#06b6d4]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

