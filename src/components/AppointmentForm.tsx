'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceCategory: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    serviceCategory: 'Cosmetic Consultation',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Client-side validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full legal name.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format (e.g., patient@example.com).';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a valid contact telephone number.';
    } else if (
      !(phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith('91')))
    ) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred appointment date.';
    } else {
      const selected = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.preferredDate = 'Appointment date cannot be in the past.';
      }
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select your preferred appointment time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error on edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission network call
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceNumber(randomRef);
      setSubmissionSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      serviceCategory: 'Cosmetic Consultation',
      notes: '',
    });
    setErrors({});
    setSubmissionSuccess(false);
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-200/40 via-cyan-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-100 text-sky-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            Reserve Your Visit
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Smile Consultation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Take the first step toward your dream smile. Our clinical concierge will confirm your private suite appointment within 2 business hours.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-7 sm:p-10 lg:p-12 transition-all">
          {submissionSuccess ? (
            /* Success Feedback State */
            <div className="text-center py-8 sm:py-12 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2">
                  Your request has been received. Our clinical concierge will contact you at{' '}
                  <span className="font-semibold text-slate-800">{formData.email}</span> to finalize your reservation details.
                </p>
              </div>

              <div className="inline-block p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="text-slate-500 font-medium block">Reference Tracking ID:</span>
                <span className="font-mono text-base font-bold text-sky-700">{referenceNumber}</span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Aarav Patel"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                        : 'border-slate-300 bg-white focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-rose-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="aarav.patel@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                        : 'border-slate-300 bg-white focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone Number (tel) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                        : 'border-slate-300 bg-white focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs font-medium text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Treatment / Service Category */}
                <div className="space-y-1.5">
                  <label htmlFor="serviceCategory" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Desired Treatment
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all cursor-pointer"
                  >
                    <option value="Cosmetic Consultation">Smile Makeover & Veneers</option>
                    <option value="Dental Implants">Dental Implants & All-on-4</option>
                    <option value="Invisalign Aligners">Invisalign & Clear Aligners</option>
                    <option value="Teeth Whitening">Laser Teeth Whitening</option>
                    <option value="Hygiene & Preventative">Preventative Care & Cleaning</option>
                    <option value="Emergency Dental">Urgent / Emergency Care</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.preferredDate
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                        : 'border-slate-300 bg-white focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-xs font-medium text-rose-500 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="space-y-1.5">
                  <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.preferredTime
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200'
                        : 'border-slate-300 bg-white focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.preferredTime && (
                    <p className="text-xs font-medium text-rose-500 mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Clinical Notes (Optional) */}
              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Smile Goals or Special Medical Requests (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share any specific goals, concerns, or accommodations (e.g., dental anxiety, preferred sedation, timeline for upcoming wedding)..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600 hover:from-sky-500 hover:to-cyan-400 shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Securing Suite Reservation...
                    </>
                  ) : (
                    <>
                      Confirm Priority Appointment
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400">
                🔒 HIPAA Compliant &bull; 100% Confidential &bull; No Obligation Initial Assessment
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

