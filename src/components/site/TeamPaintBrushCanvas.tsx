import { useEffect, useRef } from "react";

type BrushSegment = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  sourceCenterY: number;
  destCenterY: number;
  color: string;
  color2: string;
  glow: string;
};

const BRUSH_PALETTES = [
  { c1: "#14b8a6", c2: "#06b6d4", glow: "rgba(20,184,166,0.45)" }, // Teal -> Cyan
  { c1: "#0ea5e9", c2: "#6366f1", glow: "rgba(14,165,233,0.45)" }, // Sky -> Indigo
  { c1: "#8b5cf6", c2: "#ec4899", glow: "rgba(139,92,246,0.45)" }, // Violet -> Pink
  { c1: "#f97316", c2: "#f59e0b", glow: "rgba(249,115,22,0.45)" }, // Orange -> Amber
  { c1: "#10b981", c2: "#14b8a6", glow: "rgba(16,185,129,0.45)" }, // Emerald -> Teal
] as const;

interface TeamPaintBrushCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
  skipIndex?: number;
  reducedMotion?: boolean;
}

/**
 * Ultra-smooth HTML5 Canvas paint brush renderer that paints rich, textured,
 * organic acrylic/calligraphy brush curves with gentle, gradual scroll pacing.
 */
export function TeamPaintBrushCanvas({
  containerRef,
  skipIndex,
  reducedMotion = false,
}: TeamPaintBrushCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let segments: BrushSegment[] = [];
    let progressArr: number[] = [];
    let targetProgressArr: number[] = [];
    let width = 0;
    let height = 0;
    let lastTime = performance.now();

    // Bristle profile for realistic multi-fiber acrylic brush strokes
    const bristleOffsets = [
      { offset: -0.85, width: 2.0, alpha: 0.32, phase: 0.1 },
      { offset: -0.55, width: 2.8, alpha: 0.50, phase: 1.2 },
      { offset: -0.25, width: 4.2, alpha: 0.72, phase: 2.4 },
      { offset: 0.00, width: 6.5, alpha: 0.92, phase: 0.0 }, // Central core body
      { offset: 0.25, width: 4.2, alpha: 0.72, phase: 3.6 },
      { offset: 0.55, width: 2.8, alpha: 0.50, phase: 4.8 },
      { offset: 0.85, width: 2.0, alpha: 0.32, phase: 5.9 },
    ];

    // Splatter particles system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }
    const particles: Particle[] = [];

    function updateSizeAndSegments() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);

      // Extract row and photo bounds
      const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-person-id]"));
      const photos = Array.from(container.querySelectorAll<HTMLElement>("[data-person-photo]"));

      if (rows.length < 2 || photos.length < 2) {
        segments = [];
        progressArr = [];
        targetProgressArr = [];
        return;
      }

      const clearance = 28;
      const newSegments: BrushSegment[] = [];

      for (let i = 0; i < rows.length - 1 && i < photos.length - 1; i++) {
        if (typeof skipIndex === "number" && i === skipIndex) continue;

        const rowA = rows[i].getBoundingClientRect();
        const rowB = rows[i + 1].getBoundingClientRect();
        const photoA = photos[i].getBoundingClientRect();
        const photoB = photos[i + 1].getBoundingClientRect();

        const start = {
          x: photoA.left - rect.left + photoA.width / 2,
          y: rowA.bottom - rect.top + clearance,
        };
        const end = {
          x: photoB.left - rect.left + photoB.width / 2,
          y: rowB.top - rect.top - clearance,
        };

        if (end.y - start.y < 30) continue;

        const sourceCenterY = rowA.top - rect.top + rowA.height * 0.4;
        const destCenterY = rowB.top - rect.top + rowB.height * 0.4;

        const pal = BRUSH_PALETTES[i % BRUSH_PALETTES.length];
        newSegments.push({
          start,
          end,
          sourceCenterY,
          destCenterY,
          color: pal.c1,
          color2: pal.c2,
          glow: pal.glow,
        });
      }

      segments = newSegments;
      if (progressArr.length !== segments.length) {
        progressArr = segments.map(() => (reducedMotion ? 1 : 0));
        targetProgressArr = segments.map(() => (reducedMotion ? 1 : 0));
      }
    }

    /**
     * Gradual & Smooth Scroll Synchronization:
     * Calculates segment progress across the full scroll distance between consecutive team cards.
     * The stroke advances steadily and gently as the user scrolls from one card into the next.
     */
    function updateScrollProgress() {
      if (!container || reducedMotion) return;
      const rect = container.getBoundingClientRect();
      // Viewport focal line (center of viewport where reading occurs)
      const focalY = window.innerHeight * 0.54;

      segments.forEach((seg, i) => {
        const startY = rect.top + seg.sourceCenterY;
        const endY = rect.top + seg.destCenterY;
        const scrollSpan = Math.max(300, endY - startY);

        const currentProgress = (focalY - startY) / scrollSpan;
        targetProgressArr[i] = Math.max(0, Math.min(1, currentProgress));
      });
    }

    // Bezier curve evaluation with continuous normal tangent calculation
    function getBezierPoint(
      p0: { x: number; y: number },
      c0: { x: number; y: number },
      c1: { x: number; y: number },
      p1: { x: number; y: number },
      t: number,
    ) {
      const it = 1 - t;
      const it2 = it * it;
      const it3 = it2 * it;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = it3 * p0.x + 3 * it2 * t * c0.x + 3 * it * t2 * c1.x + t3 * p1.x;
      const y = it3 * p0.y + 3 * it2 * t * c0.y + 3 * it * t2 * c1.y + t3 * p1.y;

      // First derivative for tangent vector
      const dx = 3 * it2 * (c0.x - p0.x) + 6 * it * t * (c1.x - c0.x) + 3 * t2 * (p1.x - c1.x);
      const dy = 3 * it2 * (c0.y - p0.y) + 6 * it * t * (c1.y - c0.y) + 3 * t2 * (p1.y - c1.y);
      const len = Math.hypot(dx, dy) || 1;

      return {
        x,
        y,
        nx: -dy / len,
        ny: dx / len,
      };
    }

    function spawnPaintDroplet(x: number, y: number, color: string) {
      if (particles.length > 30) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.4;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.3,
        size: Math.random() * 2.0 + 1.0,
        alpha: Math.random() * 0.55 + 0.3,
        color,
        life: 0,
        maxLife: Math.floor(Math.random() * 26 + 18),
      });
    }

    function render(now: number) {
      if (!ctx || width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Velvety fluid exponential damping
      const smoothing = 1 - Math.exp(-6.5 * dt);

      for (let i = 0; i < progressArr.length; i++) {
        if (reducedMotion) {
          progressArr[i] = 1;
        } else {
          const target = targetProgressArr[i] ?? 0;
          const diff = target - progressArr[i];
          if (Math.abs(diff) < 0.0003) {
            progressArr[i] = target;
          } else {
            progressArr[i] += diff * smoothing;
          }
        }
      }

      // Draw each paint stroke segment
      segments.forEach((seg, segIdx) => {
        const progress = progressArr[segIdx] ?? 0;
        if (progress <= 0.001) return;

        const { start, end, color, color2, glow } = seg;
        const dy = end.y - start.y;
        const dx = end.x - start.x;

        // Smooth S-curve control points with natural sweep
        const c0 = { x: start.x + dx * 0.04, y: start.y + dy * 0.52 };
        const c1 = { x: end.x - dx * 0.04, y: end.y - dy * 0.52 };

        // Linear gradient along the stroke
        const grad = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color2);

        // Continuous sampling resolution
        const sampleSteps = Math.max(40, Math.ceil(progress * 130));

        // 1. Soft Volumetric Paint Glow Underneath
        ctx.save();
        ctx.shadowColor = glow;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 15;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        for (let s = 0; s <= sampleSteps; s++) {
          const t = (s / sampleSteps) * progress;
          const pt = getBezierPoint(start, c0, c1, end, t);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();

        // 2. Multi-Strand Acrylic Calligraphy Bristles
        bristleOffsets.forEach((bristle) => {
          ctx.save();
          ctx.strokeStyle = grad;
          ctx.globalAlpha = bristle.alpha;
          ctx.lineWidth = bristle.width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();

          for (let s = 0; s <= sampleSteps; s++) {
            const t = (s / sampleSteps) * progress;
            const pt = getBezierPoint(start, c0, c1, end, t);

            // Natural pressure tapering: slim at start and landing, lush and wide in the arc
            const taper = Math.sin(Math.PI * t) ** 0.55;
            // Stable spatial texture based on path parameter t
            const wave = Math.sin(t * 14 + bristle.phase + segIdx * 2) * 1.4;
            const lateralOffset = (bristle.offset * 8.5 + wave) * Math.max(0.18, taper);

            const px = pt.x + pt.nx * lateralOffset;
            const py = pt.y + pt.ny * lateralOffset;

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.restore();
        });

        // 3. Leading Wet Brush Head / Paint Energy Orb
        if (progress > 0.02 && progress < 0.995) {
          const tipPt = getBezierPoint(start, c0, c1, end, progress);

          // Reactive micro paint droplets while actively painting
          const isMoving = Math.abs(targetProgressArr[segIdx] - progress) > 0.005;
          if (isMoving && Math.random() < 0.35) {
            spawnPaintDroplet(tipPt.x, tipPt.y, color2);
          }

          ctx.save();
          ctx.fillStyle = color2;
          ctx.shadowColor = color2;
          ctx.shadowBlur = 14;

          // Outer glowing brush tip bloom
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(tipPt.x, tipPt.y, 5, 0, Math.PI * 2);
          ctx.fill();

          // Inner hot spark
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = 0.98;
          ctx.beginPath();
          ctx.arc(tipPt.x, tipPt.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // 4. Anchor Nodes (Wet ink drop at start & destination)
        ctx.save();
        // Start anchor ink drop
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Destination anchor ink drop
        if (progress > 0.92) {
          const arrivalAlpha = Math.min(1, (progress - 0.92) / 0.08);
          ctx.fillStyle = color2;
          ctx.globalAlpha = arrivalAlpha * 0.9;
          ctx.beginPath();
          ctx.arc(end.x, end.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 5. Update & Render Flying Paint Droplets
      for (let pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
        const p = particles[pIdx];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.95;

        if (p.life >= p.maxLife || p.size <= 0.2) {
          particles.splice(pIdx, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    // Observers and event listeners
    const resizeObserver = new ResizeObserver(() => {
      updateSizeAndSegments();
      updateScrollProgress();
    });
    resizeObserver.observe(container);

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateSizeAndSegments);

    // Initial setup
    updateSizeAndSegments();
    updateScrollProgress();
    animId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateSizeAndSegments);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, [containerRef, skipIndex, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    />
  );
}
