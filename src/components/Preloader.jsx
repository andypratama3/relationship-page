import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HEART_PATH =
  'M50 88 C35 75 10 55 10 30 C10 15 22 8 32 12 C40 15 46 22 50 30 C54 22 60 15 68 12 C78 8 90 15 90 30 C90 55 65 75 50 88 Z';

export default function Preloader({ onLoaded }) {
  const containerRef = useRef(null);
  const heartWrapRef = useRef(null);
  const heartBeatRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const onLoadedRef = useRef(onLoaded);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    let mounted = true;
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (mounted) onLoadedRef.current?.();
      },
    });

    tl.fromTo(
      heartWrapRef.current,
      { scale: 0, rotation: -30 },
      { scale: 1, rotation: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' }
    )
      .fromTo(
        [textRef.current, percentRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      )
      .to(counter, {
        v: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (mounted) setProgress(Math.round(counter.v));
        },
      })
      .to(heartWrapRef.current, {
        scale: 1.12,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });

    // Detak lembut selama mengisi (node dalam, biar tidak rebutan scale dengan timeline)
    const beat = gsap.to(heartBeatRef.current, {
      scale: 1.05,
      duration: 0.55,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 0.9,
    });

    return () => {
      mounted = false;
      beat.kill();
      tl.kill();
    };
  }, []);

  // Level cairan: 0 (kosong) -> 100 (penuh). Rect naik dari bawah ke atas.
  const level = Math.min(100, Math.max(0, progress));
  const rectY = 100 - level;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1a0a10]"
    >
      <div className="text-center px-4 max-w-full">
        <div ref={heartWrapRef} className="mx-auto mb-6 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52">
          <div ref={heartBeatRef} className="w-full h-full">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              role="img"
              aria-label={`Memuat ${level} persen`}
              style={{
                filter: `drop-shadow(0 0 ${12 + level * 0.35}px rgba(255,182,193,${
                  0.25 + (level / 100) * 0.5
                }))`,
              }}
            >
              <defs>
                <clipPath id="love-fill-clip">
                  <path d={HEART_PATH} />
                </clipPath>
                <linearGradient id="love-fill-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#800F2F" />
                  <stop offset="55%" stopColor="#C9184A" />
                  <stop offset="100%" stopColor="#FFB6C1" />
                </linearGradient>
              </defs>

              {/* Badan love kosong */}
              <path
                d={HEART_PATH}
                fill="rgba(255,182,193,0.08)"
                stroke="rgba(255,182,193,0.25)"
                strokeWidth="1.5"
              />

              {/* Isi love: naik dari bawah ke atas */}
              <g clipPath="url(#love-fill-clip)">
                <rect
                  x="0"
                  y={rectY}
                  width="100"
                  height="100"
                  fill="url(#love-fill-grad)"
                />
                {/* Permukaan cairan */}
                {level > 0 && level < 100 && (
                  <ellipse
                    cx="50"
                    cy={rectY}
                    rx="60"
                    ry="5"
                    fill="#FFD6C9"
                    opacity="0.7"
                  />
                )}
                {/* Kilau */}
                <ellipse
                  cx="32"
                  cy="30"
                  rx="10"
                  ry="16"
                  fill="#fff"
                  opacity="0.18"
                  transform="rotate(-20 32 30)"
                />
              </g>

              {/* Outline love */}
              <path
                d={HEART_PATH}
                fill="none"
                stroke="#FFB6C1"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p
          ref={percentRef}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl text-rose-petal mb-3 tabular-nums"
        >
          {level}%
        </p>
        <p
          ref={textRef}
          className="text-base sm:text-lg md:text-xl text-rose-petal font-playfair"
        >
          Menyiapkan sesuatu untukmu...
        </p>
      </div>
    </div>
  );
}
