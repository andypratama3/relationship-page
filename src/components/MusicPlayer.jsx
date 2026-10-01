import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, Minimize2 } from 'lucide-react';
import { content, formatContent } from '../config/content';

const BAR_LEVELS = [38, 62, 45, 78, 55, 88, 40, 70, 52, 95, 48, 66, 58, 82, 42, 74, 50, 68, 60, 44];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const audioRef = useRef(null);
  const autoPlayRef = useRef(false);

  const formattedContent = useMemo(() => formatContent(content), []);
  const playlist = formattedContent.playlist || [];
  const playlistLen = playlist.length;
  const hasPlaylist = playlistLen > 0;
  const currentSrc = hasPlaylist ? playlist[currentTrack % playlistLen]?.src?.trim() || '' : '';

  const stopAndReset = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const openTrack = (e) => {
      const i = Number(e?.detail?.index);
      if (!Number.isFinite(i) || i < 0 || i >= playlistLen) return;
      audioRef.current?.pause();
      setIsPlaying(false);
      autoPlayRef.current = true;
      setCurrentTrack(i);
      setIsMinimized(false);
    };
    window.addEventListener('romance:play-track', openTrack);
    return () => window.removeEventListener('romance:play-track', openTrack);
  }, [playlistLen]);

  // Auto-putar setelah ganti lagu via MusicSection
  useEffect(() => {
    if (autoPlayRef.current && audioRef.current && currentSrc) {
      autoPlayRef.current = false;
      const p = audioRef.current.play();
      if (p && typeof p.catch === 'function') {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack, currentSrc]);

  const handlePlayPause = () => {
    if (!hasPlaylist || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const p = audioRef.current.play();
      if (p && typeof p.catch === 'function') {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (!hasPlaylist) return;
    stopAndReset();
    setCurrentTrack((prev) => (prev + 1) % playlistLen);
  };

  const handlePrev = () => {
    if (!hasPlaylist) return;
    stopAndReset();
    setCurrentTrack((prev) => (prev - 1 + playlistLen) % playlistLen);
  };

  const handleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);
  };

  const track = hasPlaylist ? playlist[currentTrack % playlistLen] : null;

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000]">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            aria-label="Buka pemutar musik"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-strong flex items-center justify-center glow-rose transition-all duration-300 hover:scale-110 text-rose-petal touch-manipulation"
          >
            <Music2 size={24} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : (
          <div className="glass-strong rounded-2xl p-4 glow-rose transition-all duration-500 w-[calc(100vw-2rem)] max-w-[320px] sm:min-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br from-rose-petal to-deep-blush flex items-center justify-center text-white ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '3s' }}
                  aria-hidden="true"
                >
                  <Music2 size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-playfair text-rose-petal">
                    {track?.title || 'Belum ada lagu'}
                  </p>
                  <p className="text-xs text-rose-gold">
                    {track?.artist || 'Tambahkan di config/content.js'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                aria-label="Perkecil pemutar musik"
                className="text-rose-gold hover:text-rose-petal transition-colors"
              >
                <Minimize2 size={20} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={!hasPlaylist}
                aria-label="Lagu sebelumnya"
                className="text-rose-gold hover:text-rose-petal transition-colors disabled:opacity-40"
              >
                <SkipBack size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                onClick={handlePlayPause}
                disabled={!hasPlaylist}
                aria-label={isPlaying ? 'Jeda' : 'Putar'}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-petal to-deep-blush flex items-center justify-center hover:scale-110 transition-transform text-white disabled:opacity-40"
              >
                {isPlaying ? (
                  <Pause size={20} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Play size={20} strokeWidth={2} aria-hidden="true" className="ml-1" />
                )}
              </button>
              <button
                onClick={handleNext}
                disabled={!hasPlaylist}
                aria-label="Lagu berikutnya"
                className="text-rose-gold hover:text-rose-petal transition-colors disabled:opacity-40"
              >
                <SkipForward size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                onClick={handleMute}
                aria-label={isMuted ? 'Suarakan' : 'Bisukan'}
                className="text-rose-gold hover:text-rose-petal transition-colors"
              >
                {isMuted ? (
                  <VolumeX size={20} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Volume2 size={20} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="mt-3 flex gap-1 items-end h-8 justify-center" aria-hidden="true">
              {BAR_LEVELS.map((h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-rose-petal rounded-full transition-all duration-150 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    height: isPlaying ? `${h}%` : '4px',
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {currentSrc ? (
        <audio
          key={currentSrc}
          ref={audioRef}
          src={currentSrc}
          preload="auto"
          onEnded={handleNext}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : null}
    </>
  );
}
