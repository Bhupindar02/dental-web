import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface VideoScrubberProps {
  /**
   * Directory where frame images are located.
   * e.g., "/videos/video_1_frames"
   */
  frameDirectory: string;

  /**
   * Total number of frames in the sequence (e.g., 300, 450, 600).
   */
  totalFrames: number;

  /**
   * Prefix before the frame number. Default: "frame_"
   */
  framePrefix?: string;

  /**
   * Extension of the frame image files. Default: ".webp"
   */
  frameExtension?: string;

  /**
   * Number of digits to pad with zeroes (e.g., 4 -> 0001). Default: 4
   */
  digits?: number;

  /**
   * Initial active frame index (1-indexed). Default: 1
   */
  initialFrame?: number;

  /**
   * Optional width for canvas container. Default: 100%
   */
  width?: number | string;

  /**
   * Optional height for canvas container. Default: auto
   */
  height?: number | string;

  /**
   * Image sizing behavior on canvas: 'contain' | 'cover'. Default: 'contain'
   */
  objectFit?: 'contain' | 'cover';

  /**
   * Show interactive scrubber slider bar below video. Default: true
   */
  showControls?: boolean;

  /**
   * Allow dragging horizontally across the canvas to scrub frames. Default: true
   */
  dragToScrub?: boolean;

  /**
   * Callback fired when current frame changes.
   */
  onFrameChange?: (frame: number) => void;

  /**
   * Additional custom CSS classes
   */
  className?: string;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  frameDirectory,
  totalFrames,
  framePrefix = 'frame_',
  frameExtension = '.webp',
  digits = 4,
  initialFrame = 1,
  width = '100%',
  height = 'auto',
  objectFit = 'contain',
  showControls = true,
  dragToScrub = true,
  onFrameChange,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState<number>(initialFrame);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartFrameRef = useRef<number>(1);
  const playAnimationRef = useRef<number | null>(null);

  // Helper to format frame path or CDN URL
  const getFramePath = useCallback(
    (frameIndex: number) => {
      const formattedIndex = digits > 0 ? String(frameIndex).padStart(digits, '0') : String(frameIndex);
      const cleanDirectory = frameDirectory.replace(/\/+$/, '');
      const cleanExtension = frameExtension.startsWith('.') ? frameExtension : `.${frameExtension}`;
      return `${cleanDirectory}/${framePrefix}${formattedIndex}${cleanExtension}`;
    },
    [frameDirectory, framePrefix, frameExtension, digits]
  );

  // Preload frame images
  useEffect(() => {
    let isMounted = true;
    imagesRef.current.clear();
    setLoadedCount(0);
    setIsLoading(true);

    const loadImages = async () => {
      let loaded = 0;
      const initialBatch = Math.min(totalFrames, 30); // Prioritize initial frames for fast display

      const loadImage = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = getFramePath(index);
          img.onload = () => {
            if (isMounted) {
              imagesRef.current.set(index, img);
              loaded += 1;
              setLoadedCount(loaded);
              if (index === initialFrame) {
                drawFrame(index);
              }
            }
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
        });
      };

      // Load initial batch first
      for (let i = 1; i <= initialBatch; i++) {
        await loadImage(i);
      }

      if (isMounted) {
        setIsLoading(false);
      }

      // Load remainder in background
      for (let i = initialBatch + 1; i <= totalFrames; i++) {
        if (!isMounted) break;
        await loadImage(i);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [totalFrames, getFramePath, initialFrame]);

  // Draw specific frame onto canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imagesRef.current.get(frameIndex);
      if (!img) return;

      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (objectFit === 'cover') {
        const hRatio = canvas.width / img.naturalWidth;
        const vRatio = canvas.height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
        const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;
        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShiftX,
          centerShiftY,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    },
    [objectFit]
  );

  // Render on frame update
  useEffect(() => {
    drawFrame(currentFrame);
    if (onFrameChange) {
      onFrameChange(currentFrame);
    }
  }, [currentFrame, drawFrame, onFrameChange]);

  const updateFrame = useCallback(
    (newFrame: number) => {
      const clamped = Math.max(1, Math.min(totalFrames, Math.round(newFrame)));
      setCurrentFrame(clamped);
    },
    [totalFrames]
  );

  // Autoplay handler
  useEffect(() => {
    if (!isPlaying) {
      if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
      return;
    }

    let lastTimestamp = performance.now();
    const frameInterval = 1000 / 30; // 30 fps playback

    const step = (now: number) => {
      const elapsed = now - lastTimestamp;
      if (elapsed >= frameInterval) {
        lastTimestamp = now - (elapsed % frameInterval);
        setCurrentFrame((prev) => {
          if (prev >= totalFrames) {
            return 1; // loop playback
          }
          return prev + 1;
        });
      }
      playAnimationRef.current = requestAnimationFrame(step);
    };

    playAnimationRef.current = requestAnimationFrame(step);

    return () => {
      if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
    };
  }, [isPlaying, totalFrames]);

  // Pointer / Drag Scrubbing on Canvas
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!dragToScrub) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = currentFrame;
    setIsPlaying(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const containerWidth = containerRef.current.clientWidth || 600;
    const frameDelta = (deltaX / containerWidth) * totalFrames;
    updateFrame(dragStartFrameRef.current + frameDelta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore if already released
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      updateFrame(currentFrame + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      updateFrame(currentFrame - 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsPlaying((prev) => !prev);
    }
  };

  const progressPercentage = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div
      ref={containerRef}
      className={`video-scrubber-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        position: 'relative',
        userSelect: 'none',
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Video Frame Scrubber"
    >
      {/* Canvas Display */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#000',
          cursor: dragToScrub ? (isDraggingRef.current ? 'grabbing' : 'grab') : 'default',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />

        {/* Loading Indicator Overlay */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'sans-serif',
            }}
          >
            Loading frames: {progressPercentage}% ({loadedCount}/{totalFrames})
          </div>
        )}
      </div>

      {/* Scrubber Controls */}
      {showControls && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
            padding: '6px 12px',
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            borderRadius: '6px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            style={{
              background: '#374151',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              padding: '4px 10px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <input
            type="range"
            min={1}
            max={totalFrames}
            value={currentFrame}
            onChange={(e) => {
              setIsPlaying(false);
              updateFrame(Number(e.target.value));
            }}
            style={{
              flex: 1,
              cursor: 'pointer',
              accentColor: '#3b82f6',
            }}
            aria-label="Frame Scrubber Slider"
          />

          <span style={{ minWidth: '85px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {currentFrame} / {totalFrames}
          </span>
        </div>
      )}
    </div>
  );
};

export default VideoScrubber;

