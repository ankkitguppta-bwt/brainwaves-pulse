import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/video/final_landing_page_loop.mp4";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is completely muted for guaranteed autoplay
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsVideoReady(true);
          })
          .catch(() => {
            // Autoplay policy retry on user touch/click/scroll if blocked
            const onInteraction = () => {
              video.play().catch(() => {});
              window.removeEventListener("touchstart", onInteraction);
              window.removeEventListener("click", onInteraction);
              window.removeEventListener("scroll", onInteraction);
            };
            window.addEventListener("touchstart", onInteraction, { passive: true, once: true });
            window.addEventListener("click", onInteraction, { passive: true, once: true });
            window.addEventListener("scroll", onInteraction, { passive: true, once: true });
          });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
      video.addEventListener("canplay", playVideo, { once: true });
    }

    // Resume video playback if user returns from another browser tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && video.paused) {
        playVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden bg-navy"
    >
      {/* Ambient Neural Glow Backdrop for Instant First Paint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.25),rgba(6,36,58,0.95))]" />

      {/* Declarative High-Performance Video Element */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          isVideoReady ? "opacity-100" : "opacity-90"
        }`}
      />
    </div>
  );
}
