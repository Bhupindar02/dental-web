'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import LocationSection from '@/components/LocationSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

// Dynamic lazy imports for canvas-intensive video frame sections
const HeroVideoSection = dynamic(() => import('@/components/HeroVideoSection'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video min-h-[420px] bg-slate-950 flex items-center justify-center text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading Walkthrough...</span>
      </div>
    </div>
  ),
});

const ResultsVideoSection = dynamic(() => import('@/components/ResultsVideoSection'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video min-h-[420px] bg-slate-950 flex items-center justify-center text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading Transformations...</span>
      </div>
    </div>
  ),
});

const VideoSection3 = dynamic(() => import('@/components/VideoSection3'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video min-h-[420px] bg-slate-950 flex items-center justify-center text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading Clinic Experience...</span>
      </div>
    </div>
  ),
});

export default function AuroraDentalMainPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth selection:bg-[#06b6d4] selection:text-white">
      {/* 
        Sticky Navigation Component
        - Teal branding (#06b6d4)
        - Active link highlighting on scroll
        - Smooth scroll to section
        - Desktop horizontal menu & mobile hamburger drawer
        - Teal CTA button
      */}
      <Navigation sections={['home', 'videos', 'gallery', 'about', 'services', 'location', 'booking']} />

      <main className="w-full">
        {/* ============================================================== */}
        {/* (1) THREE VIDEO HERO SECTIONS                                  */}
        {/* ============================================================== */}

        {/* SECTION 1: Home / Reception to Chair Walkthrough */}
        <section id="home" className="w-full scroll-mt-20">
          <div id="walkthrough">
            <HeroVideoSection
              videoFramePath="https://res.cloudinary.com/qk5wy6np/image/upload"
              framePrefix="frame_"
              padDigits={4}
              totalFrames={300}
              overlayTitle="We Design Smiles - Professional Dental Care"
              overlayDescription="Your journey to perfect smiles starts here."
              clinicName="AURORA DENTAL"
            />
          </div>
        </section>

        {/* SECTION 2: Gallery / Results Wall Transformation */}
        <section id="gallery" className="w-full scroll-mt-20">
          <div id="results">
            <ResultsVideoSection
              videoFramePath="https://res.cloudinary.com/qk5wy6np/image/upload"
              framePrefix="dental-frame"
              padDigits={0}
              totalFrames={448}
              overlayTitle="See Our Smile Transformations - Before & After Results"
              overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles."
              badgeText="TRANSFORMATION GALLERY"
            />
          </div>
        </section>

        {/* SECTION 3: Videos / Clinic Continuity & Patient Comfort */}
        <section id="videos" className="w-full scroll-mt-20">
          <div id="clinic-continuity">
            <VideoSection3
              videoFramePath="https://res.cloudinary.com/qk5wy6np/image/upload"
              framePrefix="dental-2frame"
              padDigits={0}
              totalFrames={448}
              overlayTitle="Professional Clinic Design - Built for Your Comfort"
              overlayDescription="Every space designed for your peace of mind."
              badgeText="CONTINUITY & COMFORT"
            />
          </div>
        </section>

        {/* ============================================================== */}
        {/* ABOUT US SECTION                                               */}
        {/* ============================================================== */}
        <section id="about" className="w-full scroll-mt-20">
          <AboutSection />
        </section>

        {/* ============================================================== */}
        {/* SERVICES / TREATMENTS MENU GRID                                */}
        {/* ============================================================== */}
        <section id="services" className="w-full scroll-mt-20">
          <ServicesSection />
        </section>

        {/* ============================================================== */}
        {/* (3) APPOINTMENT BOOKING FORM (BEFORE LOCATION SECTION)         */}
        {/* ============================================================== */}
        <div id="booking" className="w-full scroll-mt-20">
          <BookingForm />
        </div>

        {/* ============================================================== */}
        {/* (2) LOCATION & GOOGLE MAPS (16:9 CONTAINER)                    */}
        {/* ============================================================== */}
        <div id="location" className="w-full scroll-mt-20">
          <LocationSection />
        </div>
      </main>

      {/* Comprehensive Medical Clinic Footer */}
      <Footer />
    </div>
  );
}
