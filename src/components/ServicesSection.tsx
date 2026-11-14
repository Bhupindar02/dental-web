import React from 'react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const services: ServiceItem[] = [
  {
    id: 'cosmetic',
    title: 'Smile Makeovers & Veneers',
    subtitle: 'Cosmetic Artistry',
    description:
      'Ultra-thin custom porcelain veneers and comprehensive aesthetic smile designs crafted with 3D facial symmetry analysis.',
    tags: ['Porcelain Veneers', 'Gum Contouring', 'Enamel Sculpting'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'implants',
    title: 'Dental Implants & Restoration',
    subtitle: 'Permanent Replacement',
    description:
      'Computer-guided titanium and zirconia implants replicating natural tooth root structure with lifelong durability and natural aesthetics.',
    tags: ['All-on-4', 'Single Tooth Implants', 'Bone Regeneration'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 'ortho',
    title: 'Invisalign & Clear Aligners',
    subtitle: 'Invisible Orthodontics',
    description:
      'Virtually invisible orthodontic solutions tailored with digital iTero 3D impressions to discreetly straighten teeth without metal brackets.',
    tags: ['Invisalign Diamond Provider', 'Teen & Adult', 'Accelerated Ortho'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'whitening',
    title: 'Laser Teeth Whitening',
    subtitle: 'Instant Radiant Brightness',
    description:
      'Medical-grade Philips Zoom! laser acceleration lightening smiles up to 8 shades in a single comfortable 45-minute clinical appointment.',
    tags: ['In-Office Zoom!', 'Zero-Sensitivity Formula', 'Take-Home Trays'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'general',
    title: 'Preventative & Laser Care',
    subtitle: 'Total Oral Wellness',
    description:
      'Ultrasonic periodontal therapy, gentle ozone hygiene, and biocompatible restorations preserving natural tooth vitality for life.',
    tags: ['Painless Cleanings', 'Laser Periodontics', 'Oral DNA Screening'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'sedation',
    title: 'Comfort & Sedation Dentistry',
    subtitle: 'Anxiety-Free Treatment',
    description:
      'Relax in our ergonomic suites equipped with noise-cancelling headphones, nitrous oxide, and oral conscious sedation for complete serenity.',
    tags: ['Nitrous Oxide', 'Oral Sedation', 'Warm Blanket & VR Suites'],
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-100 text-sky-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            Specialized Care Menu
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Dental Solutions <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
              Crafted For Perfection
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From precision cosmetic enhancements to gentle preventative wellness, every treatment is engineered with modern digital dentistry and tailored to your personal aesthetic goals.
          </p>
        </div>

        {/* Services Grid (2-3 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-sky-50 to-cyan-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-gradient-to-tr group-hover:from-sky-600 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-600 mt-5">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 group-hover:text-sky-700 mt-5 transition-colors"
                  >
                    Schedule Consultation
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

