import { useEffect, useRef } from "react";
import heroVideo from "@/assets/video/final_landing_page_loop.mp4";

// ─── Singleton video element ───
// Created once at module load, kept alive for the entire browser session.
// This avoids the decoder-cold-start blank flash when navigating back to "/".
let _video: HTMLVideoElement | null = null;

function getVideo(): HTMLVideoElement {
  if (_video) return _video;

  const v = document.createElement("video");
  v.src = heroVideo;
  v.autoplay = true;
  v.loop = true;
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  // "metadata" (not "auto") avoids forcing the full multi-MB file to buffer
  // immediately — it lets the browser stream progressively instead of treating
  // this decorative background loop as a high-priority blocking fetch.
  v.preload = "metadata";
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  v.setAttribute("muted", "");
  v.setAttribute("autoplay", "");
  v.setAttribute("loop", "");

  // Inline styles guarantee it covers the container no matter what
  Object.assign(v.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
    display: "block",
  });

  // Start loading + decoding immediately
  v.load();
  v.play().catch(() => {});

  _video = v;
  return v;
}

// Create the singleton once this module is imported (at app boot), but only
// after the browser has had a chance to finish the critical first paint —
// starting this large decorative-video fetch immediately competes with
// fonts/CSS/JS for bandwidth and hurts FCP/LCP/Speed Index.
if (typeof window !== "undefined") {
  const schedule: (cb: () => void) => void =
    typeof window.requestIdleCallback === "function"
      ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
      : (cb) => window.setTimeout(cb, 300);
  schedule(() => getVideo());
}

// ─── Component rendered inside the Hero section ───
export function HeroBackgroundVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = getVideo();

    // Move the singleton into this container (reparent, no re-decode)
    if (video.parentElement !== container) {
      container.appendChild(video);
    }

    // Guarantee playback is active
    video.muted = true;
    video.play().catch(() => {});

    return () => {
      // On unmount: pause to save CPU, but keep the element alive in memory.
      // Do NOT remove from DOM — it stays parked wherever it was,
      // which keeps the browser's decoder cache warm.
      video.pause();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      // Navy background is always visible instantly as a fallback
      style={{ backgroundColor: "#06243a" }}
    />
  );
}

// ─── Hidden prewarmer rendered in the root layout ───
// This ensures the video element is created, loaded, and has at least one
// decoded frame ready BEFORE the user ever navigates to "/".
export function HeroVideoPrewarmer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const video = getVideo();

    // Park the video here if it isn't already inside the Hero
    if (!video.parentElement) {
      container.appendChild(video);
    }

    // Keep it playing silently so the first frame is always decoded
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -9999,
      }}
    />
  );
}
