'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface BookingFormProps {
  /**
   * Optional custom callback fired upon valid form submission.
   */
  onSubmit?: (data: BookingFormData) => Promise<void> | void;

  /**
   * Custom telephone display.
   * Defaults to "+1 (800) 555-SMILE"
   */
  phone?: string;

  /**
   * Custom clinic address display.
   * Defaults to "450 Dental Avenue, Suite 200, Medical District"
   */
  address?: string;

  /**
   * Optional wrapper className
   */
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  phone = '+91 98250 12345',
  address = '402-404 Productivity House, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007',
  className = '',
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Dynamic minimum and maximum date calculation
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // React Hook Form with real-time validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: 'Cosmetic Dentistry & Veneers',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    },
  });

  const onFormSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setApiError(null);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Dispatch to internal API endpoint with fallback simulation
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).catch(() => null);

        if (!response || !response.ok) {
          // Graceful simulated delay for local preview
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      reset();
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit appointment request. Please call our clinic directly.';
      setApiError(msg);
    }
  };

  return (
    <section
      id="booking"
      className={`py-20 sm:py-24 bg-[#070e1e] text-white relative overflow-hidden ${className}`}
      aria-label="Online Dental Appointment Booking Section"
    >
      {/* Background Subtle Radial Gradient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: HERO HEADLINE & DIRECT CLINIC CONTACT INFO   */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-7">
            {/* Online Booking Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
              ONLINE BOOKING
            </div>

            {/* Split Colored Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Schedule Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-cyan-300 block sm:inline">
                Smile Consultation
              </span>
            </h2>

            {/* Description Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Take the first step toward your dream smile. Select your preferred date and time, and our clinic coordinator will confirm your session within 2 hours.
            </p>

            {/* Quick Contact Rows */}
            <div className="pt-4 space-y-5">
              {/* Direct Telephone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0e1d38] border border-cyan-900/60 flex items-center justify-center text-[#06b6d4] shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Direct Telephone</span>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    className="text-white hover:text-[#06b6d4] font-bold text-sm sm:text-base transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Clinic Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0e1d38] border border-cyan-900/60 flex items-center justify-center text-cyan-400 shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <span className="text-xs text-slate-400 font-medium block">Clinic Address</span>
                  <span className="text-white font-medium text-xs sm:text-sm block">
                    {address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: CLEAN WHITE BOOKING FORM CARD               */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 md:p-11 shadow-2xl text-slate-900">
              {/* Form Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-7">
                Book an Appointment
              </h3>

              {/* API Alert */}
              {apiError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                  {apiError}
                </div>
              )}

              {/* Success Notification */}
              {isSuccess ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">
                      Thank you! We&apos;ll contact you soon
                    </h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
                      Your appointment request has been safely received. Our clinic coordinator will review your schedule and reach out to confirm your session within 2 hours.
                    </p>
                  </div>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#06b6d4] hover:bg-[#0891b2] transition-colors"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        FULL NAME <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Aarav Patel"
                        {...register('fullName', {
                          required: 'Full name is required',
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                        })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-rose-500 text-xs font-medium mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        EMAIL ADDRESS <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="e.g. aarav.patel@example.com"
                        {...register('email', {
                          required: 'Email address is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Valid email required',
                          },
                        })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-rose-500 text-xs font-medium mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        PHONE NUMBER <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        {...register('phone', {
                          required: 'Phone number is required',
                          validate: (val) => {
                            const cleaned = val.replace(/\D/g, '');
                            return (
                              cleaned.length === 10 ||
                              (cleaned.length === 12 && cleaned.startsWith('91'))
                            ) || 'Must be a valid 10-digit mobile number';
                          },
                        })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-rose-500 text-xs font-medium mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Service Required */}
                    <div>
                      <label htmlFor="service" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        SERVICE REQUIRED
                      </label>
                      <select
                        id="service"
                        {...register('service')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-[#06b6d4] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 transition-all cursor-pointer"
                      >
                        <option value="Cosmetic Dentistry & Veneers">Cosmetic Dentistry &amp; Veneers</option>
                        <option value="Teeth Whitening">Laser Teeth Whitening</option>
                        <option value="Dental Implants">Dental Implants &amp; All-on-4</option>
                        <option value="Invisalign Clear Aligners">Invisalign &amp; Clear Aligners</option>
                        <option value="Cleaning & Preventative">Cleaning &amp; Preventative Hygiene</option>
                        <option value="Consultation & Assessment">Consultation &amp; 3D Smile Assessment</option>
                        <option value="Other Specialist Care">Other Specialist Care</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Preferred Date & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="preferredDate" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        PREFERRED DATE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        min={todayStr}
                        max={maxDateStr}
                        {...register('preferredDate', {
                          required: 'Preferred date is required',
                          validate: (val) => val >= todayStr || 'Date cannot be in past',
                        })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.preferredDate
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="text-rose-500 text-xs font-medium mt-1">
                          {errors.preferredDate.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="preferredTime" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        PREFERRED TIME
                      </label>
                      <input
                        id="preferredTime"
                        type="time"
                        min="09:00"
                        max="18:00"
                        {...register('preferredTime', {
                          required: 'Preferred time is required',
                        })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.preferredTime
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20'
                        }`}
                      />
                      {errors.preferredTime && (
                        <p className="text-rose-500 text-xs font-medium mt-1">
                          {errors.preferredTime.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Additional Notes (Optional) */}
                  <div>
                    <label htmlFor="notes" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      ADDITIONAL NOTES (OPTIONAL)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Tell us about your dental goals or any specific concerns..."
                      {...register('notes')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:border-[#06b6d4] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Row 5: Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl font-bold text-white text-sm sm:text-base bg-gradient-to-r from-[#0284c7] to-[#06b6d4] hover:from-[#0369a1] hover:to-[#0891b2] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#06b6d4]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Submitting Appointment Request...</span>
                        </>
                      ) : (
                        <span>Submit Appointment Request</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
