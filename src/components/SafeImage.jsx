import { useState } from 'react';

export default function SafeImage({ src, alt, className, fallbackLabel, width, height, eager }) {
  const [failed, setFailed] = useState(false);
  const clean = typeof src === 'string' ? src.trim() : '';

  if (!clean || failed) {
    return (
      <div
        className={`${className || ''} flex items-center justify-center bg-rose-petal/15`}
        role="img"
        aria-label={alt || 'Gambar tidak tersedia'}
      >
        <span className="text-4xl" aria-hidden="true">
          {fallbackLabel || '💗'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={clean}
      alt={alt || ''}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
