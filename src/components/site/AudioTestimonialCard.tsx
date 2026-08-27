import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Headphones, Sparkles, CheckCircle2 } from "lucide-react";
import type { ClientAudioItem } from "@/lib/client-audio-testimonials";

interface AudioTestimonialCardProps {
  item: ClientAudioItem;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

// Fixed acoustic wave pattern seed
const WAVE_BARS = [
  35, 55, 75, 45, 90, 60, 40, 85, 100, 65, 50, 80, 95, 70, 45, 85, 60, 90, 75, 50, 70, 85, 60, 40, 65, 45,
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioTestimonialCard({
  item,
  isPlaying,
  onPlay,
  onPause,
}: AudioTestimonialCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync playback with parent state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play policy catch
          onPause();
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, onPause]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleEnded = () => {
    onPause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleSeek = (percentage: number) => {
    if (audioRef.current && duration > 0) {
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) onPlay();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.22)] ${
        isPlaying
          ? "border-teal shadow-[0_20px_50px_-15px_rgba(20,184,166,0.3)] ring-1 ring-teal/30"
          : "border-navy/10 hover:border-teal/30"
      }`}
    >
      {/* Subtle top accent bar */}
      <span
        className={`absolute inset-x-0 top-0 h-1 transition-opacity duration-300 ${
          isPlaying
            ? "bg-gradient-to-r from-teal via-cyan-400 to-teal opacity-100"
            : "bg-gradient-to-r from-teal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={item.url}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
            <Headphones className="h-3.5 w-3.5" />
            {item.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange">
            <Sparkles className="h-3 w-3" />
            {item.tag}
          </span>
        </div>

        {/* Client identity & Quote summary */}
        <div className="mt-4 flex items-start gap-3.5">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold transition-transform duration-300 ${
              isPlaying
                ? "bg-gradient-to-br from-teal to-cyan-600 text-white shadow-md shadow-teal/30 scale-105"
                : "bg-teal/10 text-navy group-hover:bg-teal/20"
            }`}
          >
            {item.title.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-lg font-bold text-navy">{item.title}</h3>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" title="Verified Client" />
            </div>
            <p className="truncate text-xs font-medium text-muted-foreground">{item.role}</p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-600 italic">
          "{item.summary}"
        </p>
      </div>

      {/* Modern Interactive Audio Player Deck */}
      <div className="mt-6 rounded-2xl border border-navy/5 bg-slate-50/80 p-4 backdrop-blur-sm">
        {/* Animated Waveform Scrubber */}
        <div
          role="slider"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            handleSeek(pos);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") handleSeek(Math.min(1, (currentTime + 5) / (duration || 1)));
            if (e.key === "ArrowLeft") handleSeek(Math.max(0, (currentTime - 5) / (duration || 1)));
          }}
          className="group/wave relative flex h-11 w-full cursor-pointer items-end justify-between gap-[3px] rounded-xl px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          title="Click to seek anywhere in audio"
        >
          {WAVE_BARS.map((barHeight, idx) => {
            const barProgress = (idx / (WAVE_BARS.length - 1)) * 100;
            const isPlayed = barProgress <= progressPercent;

            return (
              <span
                key={idx}
                className={`w-full rounded-full transition-all duration-200 ${
                  isPlayed
                    ? "bg-gradient-to-t from-teal to-cyan-500 shadow-sm shadow-teal/20"
                    : "bg-navy/15 group-hover/wave:bg-navy/25"
                } ${isPlaying ? "animate-pulse" : ""}`}
                style={{
                  height: isPlaying
                    ? `${Math.max(20, Math.min(100, barHeight + Math.sin(idx + currentTime * 8) * 22))}%`
                    : `${barHeight}%`,
                  animationDuration: `${0.6 + (idx % 4) * 0.25}s`,
                }}
              />
            );
          })}
        </div>

        {/* Player Controls Bar */}
        <div className="mt-3.5 flex items-center justify-between border-t border-navy/5 pt-3">
          <div className="flex items-center gap-3">
            {/* Play / Pause Primary Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio story" : "Play audio story"}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${
                isPlaying
                  ? "bg-gradient-to-r from-teal to-cyan-600 shadow-teal/30 ring-2 ring-teal/40"
                  : "bg-navy hover:bg-teal hover:shadow-teal/25"
              }`}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 fill-white ml-0.5" />
              )}
            </button>

            {/* Quick Restart */}
            <button
              type="button"
              onClick={handleRestart}
              aria-label="Restart audio from beginning"
              title="Restart"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-navy/5 hover:text-navy"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Time Counter */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-slate-700">
              {formatTime(currentTime)}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">/</span>
            <span className="font-mono text-xs text-muted-foreground">
              {isLoaded && duration > 0 ? formatTime(duration) : item.durationApprox}
            </span>

            {/* Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute" : "Mute"}
              className="ml-1 grid h-7 w-7 place-items-center rounded text-slate-400 transition hover:text-navy"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-500" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
