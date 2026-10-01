import confetti from 'canvas-confetti';

let cachedHeart;

function heartShape() {
  if (cachedHeart !== undefined) return cachedHeart;
  try {
    cachedHeart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
  } catch {
    cachedHeart = null;
  }
  return cachedHeart;
}

// Pengganti confetti({ shapes: ['heart'] }) yang invalid.
// 'heart' bukan shape bawaan canvas-confetti -> partikel gagal render.
// Pakai shapeFromText + zIndex di atas overlay (lightbox 10000).
export function burstHearts({
  big = false,
  origin,
  particleCount,
  spread,
  startVelocity,
  ticks = 150,
  scalar,
} = {}) {
  const heart = heartShape();
  return confetti({
    particleCount: particleCount ?? (big ? 200 : 25),
    spread: spread ?? (big ? 180 : 90),
    startVelocity: startVelocity ?? (big ? 45 : 32),
    ticks,
    origin: origin ?? { y: 0.6 },
    shapes: heart ? [heart] : ['circle'],
    scalar: scalar ?? (big ? 1 : 0.7),
    zIndex: 11000,
    disableForReducedMotion: true,
  });
}
