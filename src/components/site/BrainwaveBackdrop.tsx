export function BrainwaveBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="bwg1" x1="0" x2="1">
          <stop offset="0" stopColor="#12B8B0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#12B8B0" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="bwg2" x1="0" x2="1">
          <stop offset="0" stopColor="#F6A400" stopOpacity="0.8" />
          <stop offset="1" stopColor="#F6A400" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        className="eeg-line"
        d="M0,200 Q60,140 120,200 T240,200 T360,200 Q420,90 480,200 T600,200 T720,200 Q780,260 840,200 T960,200 T1080,200 T1200,200"
        fill="none"
        stroke="url(#bwg1)"
        strokeWidth="2"
      />
      <path
        className="eeg-line"
        style={{ animationDelay: "1.5s" }}
        d="M0,260 Q80,220 160,260 T320,260 Q400,180 480,260 T640,260 T800,260 Q880,310 960,260 T1200,260"
        fill="none"
        stroke="url(#bwg2)"
        strokeWidth="1.5"
      />
      <path
        className="eeg-line"
        style={{ animationDelay: "0.7s" }}
        d="M0,140 Q120,100 240,140 T480,140 T720,140 T960,140 T1200,140"
        fill="none"
        stroke="url(#bwg1)"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
