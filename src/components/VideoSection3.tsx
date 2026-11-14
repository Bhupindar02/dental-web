'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import VideoOverlay, { VideoOverlayProps } from './VideoOverlay';

// Re-export VideoOverlay as required by specification
export { VideoOverlay };
export type { VideoOverlayProps };

export interface VideoSection3Props {
  /**
   * Path or remote CDN URL containing video frames.
   * Defaults to "https://res.cloudinary.com/qk5wy6np/image/upload"
   */
  videoFramePath?: string;

  /**
   * Total number of frames in the sequence (Empty area to active clinic flow).
   * Defaults to 448
   */
  totalFrames?: number;

  /**
   * Filename prefix before the frame number.
   * Defaults to "dental-2frame"
   */
  framePrefix?: string;

  /**
   * Digits to pad with zeros. 0 for unpadded integers.
   * Defaults to 0 (e.g., dental-2frame1.webp ... dental-2frame448.webp)
   */
  padDigits?: number;

  /**
   * Extension of the frame image files.
   * Defaults to ".webp"
   */
  frameExtension?: string;

  /**
   * Main heading displayed in the bottom overlay.
   * Defaults to "Professional Clinic Design - Built for Your Comfort"
   */
  overlayTitle?: string;

  /**
   * Supporting message in the bottom overlay.
   * Defaults to "Every space designed for your peace of mind."
   */
  overlayDescription?: string;

  /**
   * Category/badge tag displayed at top.
   * Defaults to "CLINIC CONTINUITY & DESIGN"
   */
  badgeText?: string;

  /**
   * Optional custom wrapper class name.
   */
  className?: string;
}

export const VideoSection3: React.FC<VideoSection3Props> = ({
  videoFramePath = 'https://res.cloudinary.com/qk5wy6np/image/upload',
  totalFrames = 448,
  framePrefix = 'dental-2frame',
  padDigits = 0,
  frameExtension = '.webp',
  overlayTitle = 'Professional Clinic Design - Built for Your Comfort',
  overlayDescription = 'Every space designed for your peace of mind.',
  badgeText = 'CLINIC CONTINUITY & DESIGN',
  className = '',
}) => {
  // Frame state tracking via useState
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // References
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());

  // Interpolation & animation state for cinematic parallax scrub
  const targetFrameRef = useRef<number>(1);
  const displayedFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  // Touch tracking for mobile/touch devices
  const touchStartYRef = useRef<number>(0);

  /**
   * Constructs asset URL or CDN path for each frame index.
   */
  const getFrameUrl = useCallback(
    (frameIndex: number): string => {
      const formattedIndex =
        padDigits > 0 ? String(frameIndex).padStart(padDigits, '0') : String(frameIndex);
      const cleanPath = videoFramePath.replace(/\/+$/, '');
      const cleanExt = frameExtension.startsWith('.') ? frameExtension : `.${frameExtension}`;
      return `${cleanPath}/${framePrefix}${formattedIndex}${cleanExt}`;
    },
    [videoFramePath, framePrefix, padDigits, frameExtension]
  );

  /**
   * Draws frame to HTML5 Canvas.
   */
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesCacheRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  /**
   * 1. Intersection Observer for lazy loading.
   */
  useEffect(() => {
    const targetElement = containerRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * 2. Progressive Frame Loading Pipeline.
   * Loads initial frame for instant view, then streams sequence.
   */
  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;
    const cache = imagesCacheRef.current;

    const loadSingleImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (cache.has(index)) {
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (isMounted) {
            cache.set(index, img);
            setLoadedCount((prev) => prev + 1);

            if (index === 1 && displayedFrameRef.current === 1) {
              renderFrameToCanvas(1);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    const preloadPipeline = async () => {
      // Step A: Load initial frame instantly
      await loadSingleImage(1);
      if (isMounted) {
        setIsPreloading(false);
      }

      // Step B: Load landmark frames across walkthrough
      const priorityStep = Math.max(1, Math.floor(totalFrames / 35));
      for (let i = 1; i <= totalFrames; i += priorityStep) {
        if (!isMounted) return;
        await loadSingleImage(i);
      }

      // Step C: Stream remaining frames in background
      for (let i = 1; i <= totalFrames; i++) {
        if (!isMounted) return;
        if (!cache.has(i)) {
          await loadSingleImage(i);
        }
      }
    };

    preloadPipeline();

    return () => {
      isMounted = false;
    };
  }, [isInView, totalFrames, getFrameUrl, renderFrameToCanvas]);

  /**
   * 3. Cinematic Frame Interpolation Loop (RAF).
   * Damped linear interpolation for fluid parallax scrubbing.
   */
  useEffect(() => {
    const updateLoop = () => {
      const target = targetFrameRef.current;
      const current = displayedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.02) {
        const nextVal = current + diff * 0.18;
        displayedFrameRef.current = nextVal;

        const frameInt = Math.max(1, Math.min(totalFrames, Math.round(nextVal)));
        setCurrentFrame(frameInt);
        renderFrameToCanvas(frameInt);
      }

      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, renderFrameToCanvas]);

  /**
   * 4. Smooth Mouse Wheel Scrolling Listener.
   * Scrubs through frames frame-by-frame smoothly without audio.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const sensitivity = 0.22;
      const delta = e.deltaY * sensitivity;

      const newTarget = Math.max(1, Math.min(totalFrames, targetFrameRef.current + delta));

      // Boundary condition: let normal page scroll take over at start or end
      const atStartScrollingUp = targetFrameRef.current <= 1 && e.deltaY < 0;
      const atEndScrollingDown = targetFrameRef.current >= totalFrames && e.deltaY > 0;

      if (!atStartScrollingUp && !atEndScrollingDown) {
        e.preventDefault();
      }

      targetFrameRef.current = newTarget;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = (touchStartYRef.current - currentY) * 0.45;
      touchStartYRef.current = currentY;

      const newTarget = Math.max(1, Math.min(totalFrames, targetFrameRef.current + deltaY));
      targetFrameRef.current = newTarget;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [totalFrames]);

  const scrubPercentage = Math.round((currentFrame / totalFrames) * 100);

  return (
    <div className={`w-full flex flex-col items-center py-6 sm:py-10 md:py-14 px-0 ${className}`}>
      {/* Visual Separation & Section Heading Divider */}
      <div className="w-full flex items-center justify-center mb-8 sm:mb-12 md:mb-16 px-6">
        <div className="flex items-center gap-4 w-full max-w-6xl">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-200 flex-1" />
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
            Phase 03 &bull; Clinic Continuity &bull; Comfort
          </div>
          <div className="h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-200 flex-1" />
        </div>
      </div>

      {/* 16:9 Responsive Video Section Container */}
      <section
        ref={containerRef}
        className="relative w-full aspect-video min-h-[420px] md:min-h-[560px] lg:min-h-[680px] max-h-screen overflow-hidden bg-slate-950 select-none shadow-2xl"
        aria-label="Clinic Continuity Walkthrough - Patient Area to Active Care"
      >
        {/* Walkthrough Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover pointer-events-none transition-opacity duration-700"
            style={{ opacity: isPreloading ? 0.3 : 1 }}
          />
        </div>

        {/* Top Badging & Transformation Phase Label */}
        <div className="absolute top-4 left-6 sm:top-6 sm:left-10 z-20 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-slate-900 shadow-md border border-white/40">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            {badgeText}
          </span>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-md text-white/80 border border-white/10">
            Area to Care Flow
          </span>
        </div>

        {/* Frame Progress Indicator (Top Right) */}
        <div className="absolute top-4 right-6 sm:top-6 sm:right-10 z-20 hidden md:flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white/90">
          <span className="font-mono text-violet-400 font-semibold">{scrubPercentage}%</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="font-mono text-slate-300">
            Frame {String(currentFrame).padStart(3, '0')} / {totalFrames}
          </span>
        </div>

        {/* First-Load Preloader Overlay */}
        {isPreloading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm z-10 transition-opacity">
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">
                Loading Experience...
              </p>
            </div>
          </div>
        )}

        {/*
          Reusable VideoOverlay Child Component:
          Renders the 15% white gradient overlay with custom typography and scroll indicator
        */}
        <VideoOverlay
          text={overlayTitle}
          description={overlayDescription}
          actionText="Scroll to Experience"
          arrowColorClass="text-violet-700"
        />

        {/* Walkthrough Scrubber Progress Track */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30 pointer-events-none">
          <div
            className="h-full bg-violet-600 transition-all duration-75"
            style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
          />
        </div>
      </section>
    </div>
  );
};

export default VideoSection3;

