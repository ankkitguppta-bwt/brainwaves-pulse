import { useEffect, useLayoutEffect, useRef } from "react";
import heroVideo from "@/assets/video/final_landing_page_loop.mp4";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

let cachedHeroVideo: HTMLVideoElement | null = null;

function getOrCreateHeroVideo(): HTMLVideoElement | null {
  if (typeof window === "undefined") return null;

  if (!cachedHeroVideo) {
    const video = document.createElement("video");
    video.src = heroVideo;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.className = "pointer-events-none absolute inset-0 h-full w-full object-cover";
    video.style.position = "absolute";
    video.style.inset = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.pointerEvents = "none";

    // Start warming up the decoder and buffering immediately
    video.load();
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        // Autoplay may wait for user interaction in some strict environments
      });
    }

    cachedHeroVideo = video;
  }

  return cachedHeroVideo;
}

// Prewarm video instance on module load
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => getOrCreateHeroVideo());
  } else {
    setTimeout(() => getOrCreateHeroVideo(), 0);
  }
}

export function HeroBackgroundVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const video = getOrCreateHeroVideo();
    const container = containerRef.current;
    if (!video || !container) return;

    if (!container.contains(video)) {
      container.appendChild(video);
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy handled
      });
    }

    return () => {
      // Pause on unmount to save resources, but keep decoded frames and buffer alive in memory
      video.pause();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    >
      <noscript>
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </noscript>
    </div>
  );
}
