import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Waves } from "lucide-react";

export type WaveInfo = {
  name: string;
  range: string;
  desc: string;
  detail: string;
  /** approx dominant frequency in Hz for animation speed */
  hz: number;
  /** stroke color */
  color: string;
};

export const WAVES: WaveInfo[] = [
  {
    name: "Alpha",
    range: "8–12 Hz",
    hz: 10,
    color: "#12B8B0",
    desc: "Relaxed, calm awareness · meditation",
    detail:
      "Alpha waves emerge during wakeful relaxation with closed eyes, light meditation and creative flow. They bridge the conscious and subconscious mind and are associated with reduced stress, improved learning and a calm-yet-alert mental state.",
  },
  {
    name: "Beta",
    range: "13–30 Hz",
    hz: 20,
    color: "#F6A400",
    desc: "Focus, attention, active thinking",
    detail:
      "Beta waves dominate during active thinking, problem solving, decision making and focused mental activity. Balanced beta supports productivity and alertness; excessive beta can appear as anxiety or over-arousal.",
  },
  {
    name: "Theta",
    range: "4–8 Hz",
    hz: 6,
    color: "#12B8B0",
    desc: "Creativity, deep relaxation, learning",
    detail:
      "Theta waves appear in deep relaxation, light sleep, hypnosis and vivid imagery. They are linked with memory consolidation, intuition, emotional processing and accelerated learning states.",
  },
  {
    name: "Delta",
    range: "0.5–4 Hz",
    hz: 2,
    color: "#F6A400",
    desc: "Deep sleep, restoration, healing",
    detail:
      "Delta waves are the slowest and highest-amplitude brainwaves, dominant during deep, dreamless sleep. They are essential for physical restoration, immune function, hormone regulation and healing.",
  },
  {
    name: "Gamma",
    range: "30–100 Hz",
    hz: 40,
    color: "#12B8B0",
    desc: "Peak performance, cognitive binding",
    detail:
      "Gamma waves are the fastest brainwaves, associated with peak cognitive functioning, high-level information processing, perception binding and expanded consciousness reported in advanced meditators.",
  },
];

function WaveAnim({ wave }: { wave: WaveInfo }) {
  // Build an animated SVG waveform whose speed/amplitude reflects the band.
  const duration = Math.max(1.2, 8 / wave.hz); // slower for delta, faster for gamma
  const amp = Math.min(38, 60 / Math.sqrt(wave.hz)); // higher amp for slow waves
  const cycles = Math.min(10, Math.max(2, Math.round(wave.hz / 3)));

  const buildPath = (phase: number) => {
    const w = 800;
    const h = 220;
    const mid = h / 2;
    const step = 4;
    let d = `M 0 ${mid}`;
    for (let x = 0; x <= w; x += step) {
      const t = (x / w) * cycles * Math.PI * 2 + phase;
      const y = mid + Math.sin(t) * amp + Math.sin(t * 2) * (amp * 0.15);
      d += ` L ${x} ${y.toFixed(2)}`;
    }
    return d;
  };

  return (
    <div className="relative aspect-[16/6] w-full overflow-hidden rounded-2xl bg-navy">
      <svg viewBox="0 0 800 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${wave.name}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={wave.color} stopOpacity="0" />
            <stop offset="50%" stopColor={wave.color} stopOpacity="1" />
            <stop offset="100%" stopColor={wave.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* faint grid */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={(i * 800) / 10}
            x2={(i * 800) / 10}
            y1={0}
            y2={220}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {/* echoes */}
        <path d={buildPath(0)} fill="none" stroke={wave.color} strokeOpacity="0.25" strokeWidth={1.5} />
        <path d={buildPath(1.2)} fill="none" stroke={wave.color} strokeOpacity="0.4" strokeWidth={2} />
        {/* main */}
        <path
          d={buildPath(0)}
          fill="none"
          stroke={`url(#g-${wave.name})`}
          strokeWidth={3}
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            dur={`${duration}s`}
            repeatCount="indefinite"
            values={[
              buildPath(0),
              buildPath(Math.PI / 2),
              buildPath(Math.PI),
              buildPath((3 * Math.PI) / 2),
              buildPath(Math.PI * 2),
            ].join(";")}
          />
        </path>
      </svg>
    </div>
  );
}

export function WaveModal({
  wave,
  onChange,
  onClose,
}: {
  wave: WaveInfo | null;
  onChange: (w: WaveInfo) => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!wave} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl overflow-hidden border-0 bg-white p-0">
        {wave && (
          <div className="grid gap-0 md:grid-cols-[1fr_220px]">
            <div className="p-6">
              <DialogTitle className="sr-only">{wave.name} Waves</DialogTitle>
              <WaveAnim wave={wave} />
              <div className="mt-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-3xl font-bold text-navy">{wave.name} Waves</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ background: `${wave.color}22`, color: wave.color }}
                  >
                    {wave.range}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{wave.desc}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">{wave.detail}</p>
              </div>
            </div>
            <aside className="border-t border-border bg-secondary/40 p-4 md:border-l md:border-t-0">
              <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Other waves
              </p>
              <div className="flex gap-3 overflow-x-auto md:flex-col md:gap-2 md:overflow-visible">
                {WAVES.map((w) => {
                  const active = w.name === wave.name;
                  return (
                    <button
                      key={w.name}
                      type="button"
                      onClick={() => onChange(w)}
                      className={`group flex min-w-[140px] items-center gap-3 rounded-xl border p-3 text-left transition md:min-w-0 ${
                        active
                          ? "border-teal bg-white shadow-sm"
                          : "border-border bg-white/70 hover:border-teal/50 hover:bg-white"
                      }`}
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                        style={{ background: `${w.color}1a` }}
                      >
                        <Waves className="h-4 w-4" style={{ color: w.color }} />
                      </span>
                      <span className="min-w-0">
                        <p className="truncate text-sm font-semibold text-navy">{w.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{w.range}</p>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
