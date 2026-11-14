'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface HeroVideoSectionProps {
  /**
   * Path or remote CDN URL containing video frames.
   * Defaults to "https://res.cloudinary.com/qk5wy6np/image/upload"
   */
  videoFramePath?: string;

  /**
   * Total number of frames in the walkthrough sequence.
   * Defaults to 300
   */
  totalFrames?: number;

  /**
   * Filename prefix before the frame number.
   * Defaults to "frame_"
   */
  framePrefix?: string;

  /**
   * Digits to pad with zeros. 0 for unpadded integers.
   * Defaults to 4 (e.g., frame_0001.webp)
   */
  padDigits?: number;

  /**
   * Extension of the frame image files.
   * Defaults to ".webp"
   */
  frameExtension?: string;

  /**
   * Main heading displayed in the bottom overlay.
   * Defaults to "We Design Smiles - Professional Dental Care"
   */
  overlayTitle?: string;

  /**
   * Supporting tagline/descriptor in the bottom overlay.
   * Defaults to "Your journey to perfect smiles starts here."
   */
  overlayDescription?: string;

  /**
   * Clinic brand name badge.
   * Defaults to "AURORA DENTAL"
   */
  clinicName?: string;
}

const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  videoFramePath = 'https://res.cloudinary.com/qk5wy6np/image/upload',
  totalFrames = 300,
  framePrefix = 'frame_',
  padDigits = 4,
  frameExtension = '.webp',
  overlayTitle = 'We Design Smiles - Professional Dental Care',
  overlayDescription = 'Your journey to perfect smiles starts here.',
  clinicName = 'AURORA DENTAL',
}) => {
  // Frame state tracked via useState as required
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [loadedFramesCount, setLoadedFramesCount] = useState<number>(0);

  // References
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  
  // Interpolation & animation state for cinematic parallax scrub
  const targetFrameRef = useRef<number>(1);
  const displayedFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  // Touch tracking for mobile/touch screen support
  const touchStartYRef = useRef<number>(0);

  /**
   * Constructs the absolute asset path or CDN URL for a given frame index.
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
   * Renders a specific frame to the high-DPI HTML5 canvas.
   */
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesCacheRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Adapt canvas internal buffer resolution to match source asset
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  /**
   * 1. Intersection Observer for lazy-loading performance optimization.
   * Video frames are only loaded when the hero enters or approaches the viewport.
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
        rootMargin: '200px 0px', // Pre-trigger slightly before reaching viewport
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
   * Priority loads initial frame instantly, followed by smooth chunked preloading.
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
            setLoadedFramesCount((prev) => prev + 1);

            // Paint first frame immediately on arrival
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
      // Step A: Load Frame 1 for immediate crisp display
      await loadSingleImage(1);
      if (isMounted) {
        setIsPreloading(false);
      }

      // Step B: Load key milestone frames for responsive scrub start
      const priorityStep = Math.max(1, Math.floor(totalFrames / 30));
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
   * Employs linear damping (lerp) to deliver a buttery-smooth parallax scrub feel.
   */
  useEffect(() => {
    const updateLoop = () => {
      const target = targetFrameRef.current;
      const current = displayedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.02) {
        // Damping factor for smooth cinematic glide
        const nextFrameVal = current + diff * 0.18;
        displayedFrameRef.current = nextFrameVal;

        const frameInt = Math.max(1, Math.min(totalFrames, Math.round(nextFrameVal)));
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
   * Captures wheel ticks and scrubs smoothly through frames without audio.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Frame sensitivity coefficient (fine-tuned for natural mouse/trackpad inertia)
      const sensitivity = 0.22;
      const delta = e.deltaY * sensitivity;

      const newTarget = Math.max(1, Math.min(totalFrames, targetFrameRef.current + delta));

      // Check boundary conditions: allow page scroll if at start/end
      const atStartScrollingUp = targetFrameRef.current <= 1 && e.deltaY < 0;
      const atEndScrollingDown = targetFrameRef.current >= totalFrames && e.deltaY > 0;

      if (!atStartScrollingUp && !atEndScrollingDown) {
        e.preventDefault();
      }

      targetFrameRef.current = newTarget;
    };

    // Touch event listeners for mobile gesture scrubbing
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

  // Scrub percentage calculation
  const scrubPercentage = Math.round((currentFrame / totalFrames) * 100);

  return (
    <section
      ref={containerRef}
      className="relative w-full aspect-video min-h-[420px] md:min-h-[560px] lg:min-h-[680px] max-h-screen overflow-hidden bg-slate-950 select-none shadow-2xl"
      aria-label={`${clinicName} Walkthrough Hero Experience`}
    >
      {/* Clinic Walkthrough Canvas Layer */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none transition-opacity duration-700"
          style={{ opacity: isPreloading ? 0.3 : 1 }}
        />
      </div>

      {/* Top Clinic Branding Pill */}
      <div className="absolute top-4 left-6 sm:top-6 sm:left-10 z-20 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-cyan-950 shadow-md border border-white/40">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          {clinicName}
        </span>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-md text-white/80 border border-white/10">
          Virtual Walkthrough
        </span>
      </div>

      {/* Frame Counter & Interactive Scrub Indicator (Top Right) */}
      <div className="absolute top-4 right-6 sm:top-6 sm:right-10 z-20 hidden md:flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white/90">
        <span className="font-mono text-cyan-400 font-semibold">{scrubPercentage}%</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <span className="font-mono text-slate-300">
          Frame {String(currentFrame).padStart(3, '0')} / {totalFrames}
        </span>
      </div>

      {/* Subtle First-Load Placeholder */}
      {isPreloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm z-10 transition-opacity">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">
              Loading Clinic Experience...
            </p>
          </div>
        </div>
      )}

      {/* 
        Bottom 15% White Gradient Overlay & Content:
        Layer white gradient overlay (bottom-to-transparent, 85% opacity) 
        using `bg-gradient-to-t from-white/85 to-transparent`
      */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] min-h-[110px] sm:min-h-[135px] md:min-h-[155px] bg-gradient-to-t from-white/85 to-transparent flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-4 sm:pb-6 z-20 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          {/* Responsive Typography Overlay */}
          <div className="max-w-3xl">
            <h1 className="text-slate-900 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight drop-shadow-sm">
              {overlayTitle}
            </h1>
            <p className="text-slate-800 font-semibold text-xs sm:text-sm md:text-base mt-1 tracking-normal drop-shadow-sm">
              {overlayDescription}
            </p>
          </div>

          {/* Interactive Subtle Scroll Indicator / Arrow */}
          <div className="flex items-center gap-3 text-slate-800 self-start md:self-end pb-0.5">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800/90">
                Scroll to Explore
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700 animate-bounce"
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

      {/* Walkthrough Scrubber Progress Bar Track */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30 pointer-events-none">
        <div
          className="h-full bg-cyan-600 transition-all duration-75"
          style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroVideoSection;

