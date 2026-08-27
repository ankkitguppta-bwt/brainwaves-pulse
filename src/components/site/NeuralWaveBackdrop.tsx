import React from "react";

export function NeuralWaveBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Soft volumetric depth bloom */}
      <div className="absolute left-1/2 top-12 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-teal/10 blur-[100px] sm:h-[450px] sm:w-[800px] sm:blur-[130px]" />
      <div className="absolute right-10 top-1/3 h-[250px] w-[250px] rounded-full bg-cyan-500/5 blur-[80px]" />

      {/* Subtle scientific grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />

      {/* Subtle harmonic EEG wave lines */}
      <svg
        className="absolute left-1/2 top-1/2 h-full w-[1400px] -translate-x-1/2 -translate-y-1/2 opacity-25"
        viewBox="0 0 1400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="30%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary harmonic EEG trace */}
        <path
          d="M0 200 Q 175 140, 350 200 T 700 200 T 1050 200 T 1400 200"
          stroke="url(#wave-grad-1)"
          strokeWidth="1.5"
          className="motion-safe:animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        {/* Secondary subtle high-frequency EEG wave */}
        <path
          d="M0 200 C 120 180, 180 220, 300 195 C 420 170, 480 230, 600 200 C 720 170, 780 225, 900 195 C 1020 165, 1080 230, 1200 200 C 1320 170, 1380 215, 1400 200"
          stroke="url(#wave-grad-2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
