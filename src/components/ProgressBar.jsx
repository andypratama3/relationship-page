import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-rose-gold/10">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-rose-petal via-rose-gold to-deep-blush"
      />
    </div>
  );
}
