'use client';

import React from 'react';
import Image from 'next/image';

export interface BusinessHours {
  monFri: string;
  sat: string;
  sun: string;
}

export interface LocationSectionProps {
  /**
   * Clinic physical street address.
   */
  address?: string;

  /**
   * Clinic contact telephone number.
   */
  phone?: string;

  /**
   * Clinic official contact email address.
   */
  email?: string;

  /**
   * Business hours schedule object or formatted string.
   */
  hours?: BusinessHours;

  /**
   * Google Maps Embed API URL.
   * Pre-configured default targets Vadodara, Gujarat.
   */
  mapEmbedUrl?: string;

  /**
   * Optional custom wrapper CSS classes.
   */
  className?: string;

  /**
   * Optional Google Maps direct directions URL.
   */
  directionsUrl?: string;

  /**
   * Narrative description of the location and transit landmarks.
   */
  locationDescription?: string;
}

// Pre-configured Google Maps Embed URL for Vadodara, Gujarat
const DEFAULT_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68688970923!2d73.10304604907156!3d22.32283857500506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin';

const DEFAULT_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Alkapuri,+Vadodara,+Gujarat+390007';

export const LocationSection: React.FC<LocationSectionProps> = ({
  address = 'Aurora Dental Clinic, 402-404 Productivity House, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007, India',
  phone = '+91 98250 12345',
  email = 'care@auroradental.in',
  hours = {
    monFri: '9:00 AM – 6:00 PM',
    sat: '10:00 AM – 4:00 PM',
    sun: 'Closed',
  },
  mapEmbedUrl = DEFAULT_MAP_EMBED_URL,
  directionsUrl = DEFAULT_DIRECTIONS_URL,
  locationDescription = 'Centrally situated in the medical hub of Alkapuri, Vadodara. Located just 5 minutes from Vadodara Central Railway Station and 15 minutes from Vadodara Airport (BDQ), featuring dedicated valet parking and full wheelchair accessibility.',
  className = '',
}) => {
  // Normalize phone for tel: link
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  return (
    <section
      id="location"
      className={`py-16 sm:py-24 bg-slate-50 relative overflow-hidden ${className}`}
      aria-label="Aurora Dental Clinic Location and Contact Information"
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#06b6d4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#06b6d4]/10 text-[#0891b2] border border-[#06b6d4]/20 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            VISIT OUR VADODARA PRACTICE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Location &amp; Contact Details
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Experience world-class cosmetic and implant dentistry at our flagship clinical facility in Vadodara, Gujarat.
          </p>
        </div>

        {/* 
          Responsive Layout Grid:
          Stacked on mobile (grid-cols-1), side-by-side on desktop (lg:grid-cols-12)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 
            (2) Contact Information Card (Left on Desktop: 5 columns)
          */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Clinic Branding & Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                    AURORA<span className="text-[#06b6d4] font-semibold ml-1">DENTAL</span>
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    We Design Smiles &bull; Vadodara, Gujarat
                  </p>
                </div>

                {/* ISO/Medical Quality Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  ISO Certified
                </span>
              </div>

              {/* Location Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {locationDescription}
              </p>

              {/* Details List */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Clinic Address</span>
                    <address className="not-italic text-slate-600 leading-relaxed">
                      {address}
                    </address>
                  </div>
                </div>

                {/* Clickable Phone (tel: link) */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Telephone</span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-[#06b6d4] hover:text-[#0891b2] font-semibold transition-colors flex items-center gap-1.5"
                    >
                      {phone}
                      <span className="text-[10px] text-slate-400 font-normal">(Tap to Call)</span>
                    </a>
                  </div>
                </div>

                {/* Clickable Email (mailto: link) */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Email Support</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-[#06b6d4] hover:text-[#0891b2] font-semibold transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Business Hours Schedule */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <span className="font-bold text-slate-900 block mb-1">Business Hours</span>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-700">
                        <span>Monday &ndash; Friday:</span>
                        <span className="font-semibold text-slate-900">{hours.monFri}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Saturday:</span>
                        <span className="font-semibold text-slate-900">{hours.sat}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Sunday:</span>
                        <span className="font-bold text-rose-500">{hours.sun}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Testimonial Pill */}
              <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-[#06b6d4]/20 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Verified Patient Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-slate-700 font-medium italic mt-0.5">
                    &ldquo;Best dental clinic in Vadodara! Painless treatment &amp; modern facility.&rdquo;
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 not-italic">
                    &mdash; Ritu Patel, Verified Patient
                  </span>
                </div>
              </div>
            </div>

            {/* (5) "Get Directions" Button (Opening Google Maps in New Tab) */}
            <div className="pt-6">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white text-xs sm:text-sm uppercase tracking-wider bg-[#06b6d4] hover:bg-[#0891b2] shadow-md shadow-[#06b6d4]/25 hover:shadow-lg hover:shadow-[#06b6d4]/35 transition-all duration-200 flex items-center justify-center gap-2 group transform active:scale-[0.99]"
              >
                <span>Get Directions in Google Maps</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* 
            (1) Embedded Google Map (Right on Desktop: 7 columns)
            Responsive 16:9 container with max-height 500px
          */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative aspect-video max-h-[500px] w-full rounded-3xl overflow-hidden shadow-xl shadow-slate-200/80 border border-slate-200 bg-slate-200 group">
              <iframe
                title="Aurora Dental Clinic Google Map - Vadodara, Gujarat"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Top Map Location Badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                  Vadodara, Gujarat, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
