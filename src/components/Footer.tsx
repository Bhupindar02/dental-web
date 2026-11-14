import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#walkthrough" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M12 2C7.5 2 4 5.5 4 10c0 3.5 2 6 4 9 1 1.5 2 3 4 3s3-1.5 4-3c2-3 4-5.5 4-9 0-4.5-3.5-8-8-8z" />
                  <path d="M9 10c1 1.5 2 2 3 2s2-.5 3-2" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                AURORA<span className="text-cyan-400 font-light ml-1">DENTAL</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We Design Smiles &bull; Providing high-precision aesthetic and restorative dental care with patient-first hospitality in Alkapuri, Vadodara.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300">
                IDA Accredited
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300">
                Invisalign Diamond Apex
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Explore Walkthrough
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#walkthrough" className="hover:text-cyan-400 transition-colors">
                  Reception to Chair
                </Link>
              </li>
              <li>
                <Link href="#results" className="hover:text-cyan-400 transition-colors">
                  Smile Transformations
                </Link>
              </li>
              <li>
                <Link href="#clinic-continuity" className="hover:text-cyan-400 transition-colors">
                  Clinic Tour & Comfort
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-cyan-400 transition-colors">
                  Meet the Doctors
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Treatments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Specialized Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#services" className="hover:text-cyan-400 transition-colors">
                  Porcelain Veneers
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-cyan-400 transition-colors">
                  Guided Dental Implants
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-cyan-400 transition-colors">
                  Invisalign Clear Aligners
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-cyan-400 transition-colors">
                  Laser Whitening & Hygiene
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Concierge Access
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="text-white font-medium">402-404 Productivity House, RC Dutt Rd</p>
              <p>Alkapuri, Vadodara, Gujarat 390007</p>
              <p className="pt-1">
                <a href="tel:+919825012345" className="text-cyan-400 font-mono hover:underline">
                  +91 98250 12345
                </a>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-[11px] text-slate-500">Sat: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} AURORA DENTAL. All rights reserved. &ldquo;We Design Smiles&rdquo; is a registered trademark.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">HIPAA Compliance</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

