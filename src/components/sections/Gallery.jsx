import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { content, formatContent } from '../../config/content';
import SafeImage from '../SafeImage';
import { burstHearts } from '../../utils/confetti';

export default function Gallery() {
  const sectionRef = useRef(null);
  const lastHoverRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const formattedContent = useMemo(() => formatContent(content), []);
  const images = formattedContent.gallery || [];
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      if (document.querySelectorAll('.gallery-item').length > 0) {
        gsap.from('.gallery-item', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
          y: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Kunci scroll + tombol panah saat lightbox buka
  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIndex, images.length]);

  const handleNext = () => {
    if (images.length === 0) return;
    setSelectedIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setSelectedIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  };

  const handleHover = (e) => {
    const now = Date.now();
    if (now - lastHoverRef.current < 600) return;
    lastHoverRef.current = now;
    const hasCoords = typeof e?.clientX === 'number' && typeof e?.clientY === 'number';
    burstHearts({
      particleCount: 15,
      spread: 60,
      origin: hasCoords
        ? {
            x: Math.min(0.98, Math.max(0.02, e.clientX / window.innerWidth)),
            y: Math.min(0.98, Math.max(0.02, e.clientY / window.innerHeight)),
          }
        : { y: 0.6 },
      scalar: 0.5,
    });
  };

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-mid to-bg-deep" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="gallery-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-16">
          Momen Indah Kita 📸
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[220px] sm:auto-rows-[260px] lg:auto-rows-[300px]">
          {images.length > 0 ? (
            images.map((image, index) => (
              <button
                key={image || index}
                type="button"
                className={`gallery-item text-left relative overflow-hidden rounded-2xl cursor-pointer group card-3d ${
                  index % 3 === 0 ? 'sm:row-span-2' : ''
                }`}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={handleHover}
                onFocus={handleHover}
                aria-label={`Buka kenangan ${index + 1}`}
              >
                <SafeImage
                  src={image}
                  alt={`Kenangan ${index + 1}`}
                  fallbackLabel="📸"
                  width={800}
                  height={600}
                  eager={index === 0}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500">
                  <span className="font-playfair text-rose-petal text-lg">
                    Kenangan #{index + 1}
                  </span>
                </span>
              </button>
            ))
          ) : (
            <p className="col-span-3 text-center font-cormorant text-rose-petal">
              Tambahkan foto di config/content.js
            </p>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Kenangan ${(selectedIndex ?? 0) + 1}`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            aria-label="Tutup"
            className="absolute top-6 right-6 text-white hover:text-rose-petal transition-colors"
          >
            <X size={32} strokeWidth={2} aria-hidden="true" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-6 z-10 w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center rounded-full bg-black/50 sm:bg-transparent text-white hover:text-rose-petal transition-colors touch-manipulation"
          >
            <ChevronLeft size={48} strokeWidth={2} aria-hidden="true" className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>

          <SafeImage
            src={selectedImage}
            alt={`Kenangan ${(selectedIndex ?? 0) + 1}`}
            fallbackLabel="📸"
            width={1200}
            height={900}
            eager
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 sm:right-6 z-10 w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center rounded-full bg-black/50 sm:bg-transparent text-white hover:text-rose-petal transition-colors touch-manipulation"
          >
            <ChevronRight size={48} strokeWidth={2} aria-hidden="true" className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
        </div>
      )}
    </section>
  );
}
