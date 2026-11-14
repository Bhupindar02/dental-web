'use client';

import React from 'react';

export interface VideoOverlayProps {
  /**
   * Primary title/heading displayed on the overlay.
   */
  text: string;

  /**
   * Subtext/descriptor providing additional context.
   */
  description: string;

  /**
   * Label for the interactive scroll indicator.
   * Defaults to "Scroll to Explore"
   */
  actionText?: string;

  /**
   * Accent color for the animated chevron arrow.
   * Defaults to "text-cyan-700"
   */
  arrowColorClass?: string;

  /**
   * Optional custom CSS class string.
   */
  className?: string;
}

/**
 * Reusable white gradient overlay component for full-width video sections.
 * Layers an 85% opacity bottom-to-transparent gradient with high-contrast typography
 * and an interactive scroll indicator.
 */
export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  text,
  description,
  actionText = 'Scroll to Explore',
  arrowColorClass = 'text-cyan-700',
  className = '',
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-[15%] min-h-[110px] sm:min-h-[135px] md:min-h-[155px] bg-gradient-to-t from-white/85 to-transparent flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-4 sm:pb-6 z-20 pointer-events-none ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Responsive Typography Block */}
        <div className="max-w-3xl">
          <h2 className="text-slate-900 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight drop-shadow-sm">
            {text}
          </h2>
          <p className="text-slate-800 font-semibold text-xs sm:text-sm md:text-base mt-1 tracking-normal drop-shadow-sm">
            {description}
          </p>
        </div>

        {/* Subtle Interactive Scroll Guide */}
        <div className="flex items-center gap-3 text-slate-800 self-start md:self-end pb-0.5">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800/90">
              {actionText}
            </span>
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 ${arrowColorClass} animate-bounce`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;

