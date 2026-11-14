import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  specialties: string[];
  image: string;
}

const team: TeamMember[] = [
  {
    name: 'Dr. Ananya Sharma',
    role: 'Lead Cosmetic & Restorative Dentist',
    credentials: 'BDS, MDS (Prosthodontics) • Fellow, IAACD • 14+ Years Exp.',
    bio: 'Recognized among Gujarat’s leading aesthetic dental surgeons, Dr. Ananya combines digital 3D smile design with minimally invasive porcelain artistry.',
    specialties: ['Digital Smile Design', 'Porcelain Veneers', 'Full-Mouth Rehabilitation'],
    image: '/images/doctors/dr-ananya-sharma.jpg',
  },
  {
    name: 'Dr. Rajesh Iyer',
    role: 'Chief Implantologist & Oral Surgeon',
    credentials: 'BDS, MDS (Oral Surgery) • Diplomate, ICOI (USA) • 16+ Years Exp.',
    bio: 'A pioneer in computer-guided 3D implant placement and bone regeneration, delivering lifelong, permanent smile restorations with painless precision.',
    specialties: ['Guided Implant Surgery', 'All-On-4 Specialists', 'Sedation Dentistry'],
    image: '/images/doctors/dr-rajesh-iyer.jpg',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Specialist Orthodontist & Aligner Expert',
    credentials: 'BDS, MDS (Orthodontics) • Certified Invisalign® Diamond Provider',
    bio: 'Specializing in discreet clear aligner therapy and orthodontic smile transformation for adults and teenagers, focused on facial harmony and airway wellness.',
    specialties: ['Invisalign Clear Aligners', 'Airway Orthodontics', 'Accelerated Retention'],
    image: '/images/doctors/dr-priya-nair.jpg',
  },
];

const clinicalStats = [
  { value: '15+', label: 'Years of Excellence', detail: 'Serving Gujarat smiles' },
  { value: '12,000+', label: 'Smiles Transformed', detail: 'Documented results' },
  { value: '99.8%', label: 'Patient Satisfaction', detail: 'Verified 5-star reviews' },
  { value: '100%', label: 'Digital Dentistry', detail: 'Zero messy impressions' },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clinic Story & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-100 text-cyan-800">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
              Our Story &amp; Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Where Precision Dentistry Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                Warm Indian Hospitality
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At <strong className="text-slate-900">AURORA DENTAL</strong>, we believe every smile is as unique as a fingerprint. Founded in Vadodara with a mission to banish dental anxiety, our clinic combines soothing spa-like serenity with the latest 3D digital oral imaging technology.
            </p>

            <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 italic text-slate-700 font-medium text-base bg-cyan-50/50 rounded-r-xl">
              &ldquo;Our mission is to craft radiant, healthy smiles that empower our patients across Gujarat with unshakable confidence for a lifetime.&rdquo;
            </blockquote>

            <div className="pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                Our Clinical Standards
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Ultra-low Radiation 3D CBCT
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">✓</span>
                  In-House Ceramic Artistry Lab
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Hospital-Grade Air Purification
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Zero-Wait Private Scheduling
                </li>
              </ul>
            </div>
          </div>

          {/* Clinic Atmospheric Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Aurora Dental Modern Architectural Operatory"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30 uppercase tracking-wider">
                  Vadodara Flagship Facility
                </span>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  Equipped with German acoustic isolation, ergonomic memory-foam dental suites, and zero-anxiety conscious sedation.
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                ★ 4.9
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Top Rated Dental Center
                </p>
                <p className="text-xs text-slate-500">Over 800+ verified Google Reviews in Gujarat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-cyan-950 text-white mb-20 sm:mb-28 shadow-xl">
          {clinicalStats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{stat.label}</div>
              <div className="text-xs text-slate-300 font-medium">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Meet Your Smile Architects Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-100 text-slate-700 mb-3">
            Renowned Clinical Specialists
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Meet Your Smile Architects
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Board-certified prosthodontists, implant surgeons, and orthodontic pioneers dedicated to transforming smiles with precision and artistry.
          </p>
        </div>

        {/* Doctors Grid with Proper Portrait Aspect Ratio and Clean Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col group"
            >
              {/* Doctor Portrait Container (aspect-[3/4] for natural vertical framing with object-top) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Subtle Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0891b2] shadow-sm border border-cyan-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                    {member.role.split('&')[0].trim()}
                  </span>
                </div>
              </div>

              {/* Doctor Details Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-[#06b6d4] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-[#0891b2] uppercase tracking-wider mt-0.5 mb-1.5">
                    {member.role}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {member.credentials}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Specialties Tag Pills */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-cyan-50/80 text-cyan-800 border border-cyan-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
