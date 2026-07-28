import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Activity, ChevronRight, X } from "lucide-react";

import { BANDS, type BandContent, type BandId } from "@/components/site/brainwave-content";

/* ── shared curve maths: ribbon + coils sample the same function ── */
const CURVE_GLSL = `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  uniform float uSpeed;
  uniform float uTwist;
  uniform float uTwistFreq;
  uniform float uWidth;
  uniform float uLength;
  uniform float uPhase;

  float centerY(float x, float t) {
    float env = 0.72 + 0.28 * sin(x * uFreq * 0.31 - t * uSpeed * 0.45 + uPhase);
    float y  = sin(x * uFreq + t * uSpeed + uPhase) * uAmp * env;
    y += sin(x * uFreq * 2.09 + t * uSpeed * 1.24 + uPhase) * uAmp * 0.075;
    return y;
  }

  void frameAt(float x, float t, out vec3 C, out vec3 dirW, out vec3 dirN) {
    float e = 0.01;
    float y0 = centerY(x, t);
    float y1 = centerY(x + e, t);
    C = vec3(x, y0, 0.0);
    vec3 T = normalize(vec3(e, y1 - y0, 0.0));
    vec3 inPlane  = normalize(vec3(-T.y, T.x, 0.0));
    vec3 outPlane = vec3(0.0, 0.0, 1.0);
    float ang = uTwist * sin(x * uTwistFreq + t * uSpeed * 0.7 + uPhase);
    dirW = normalize(cos(ang) * inPlane + sin(ang) * outPlane);
    dirN = normalize(cross(T, dirW));
  }

  vec3 ribbonPoint(float u, float v, float t) {
    float x = (u - 0.5) * uLength;
    vec3 C, dirW, dirN;
    frameAt(x, t, C, dirW, dirN);
    return C + dirW * (v - 0.5) * uWidth;
  }
`;

const RIBBON_VERT = `
  ${CURVE_GLSL}
  varying vec3 vPosW;
  varying vec3 vNormW;
  varying vec2 vUvC;
  varying float vEdge;
  void main() {
    vUvC = uv;
    vEdge = abs(uv.y - 0.5) * 2.0;
    float e = 0.004;
    vec3 p  = ribbonPoint(uv.x, uv.y, uTime);
    vec3 pu = ribbonPoint(uv.x + e, uv.y, uTime);
    vec3 pv = ribbonPoint(uv.x, uv.y + e, uTime);
    vNormW = normalize(cross(pu - p, pv - p));
    vec4 world = modelMatrix * vec4(p, 1.0);
    vPosW = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const RIBBON_FRAG = `
  precision highp float;
  uniform vec3  uColA;
  uniform vec3  uColB;
  uniform vec3  uColC;
  uniform float uOpacity;
  uniform float uTime;
  varying vec3  vPosW;
  varying vec3  vNormW;
  varying vec2  vUvC;
  varying float vEdge;
  void main() {
    vec3 V = normalize(cameraPosition - vPosW);
    vec3 N = normalize(vNormW);
    float facing = abs(dot(N, V));
    float fres   = pow(1.0 - facing, 2.0);

    float m = 0.5 + 0.5 * sin(vUvC.x * 7.5 - uTime * 0.3);
    vec3 col = mix(uColA, uColB, m);
    col = mix(col, uColC, pow(1.0 - facing, 3.0) * 0.8);
    col += uColC * pow(vEdge, 6.0) * 0.28;

    float ridge = pow(1.0 - facing, 9.0);
    col += vec3(1.0) * ridge * 0.5;

    float alpha = 0.07 + fres * 0.46 + pow(vEdge, 8.0) * 0.32 + ridge * 0.28;
    gl_FragColor = vec4(col * (0.55 + fres * 1.3), alpha * uOpacity);
  }
`;

const COIL_VERT = `
  ${CURVE_GLSL}
  attribute float aU;
  attribute float aPhi;
  attribute float aRadius;
  varying float vFade;
  void main() {
    float x = (aU - 0.5) * uLength;
    vec3 C, dirW, dirN;
    frameAt(x, uTime, C, dirW, dirN);
    float phi = aPhi + uTime * 0.3;
    vec3 p = C + (cos(phi) * dirW + sin(phi) * dirN) * aRadius;
    vFade = 0.15 + 0.85 * smoothstep(-0.2, 1.0, sin(phi));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const COIL_FRAG = `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() { gl_FragColor = vec4(uColor, vFade * uOpacity); }
`;

const BUBBLE_VERT = `
  ${CURVE_GLSL}
  attribute float aU;
  attribute float aPhi;
  attribute float aRadius;
  attribute float aSize;
  varying float vFade;
  void main() {
    float x = (aU - 0.5) * uLength;
    vec3 C, dirW, dirN;
    frameAt(x, uTime, C, dirW, dirN);
    float phi = aPhi + uTime * 0.3;
    vec3 p = C + (cos(phi) * dirW + sin(phi) * dirN) * aRadius;
    vFade = 0.2 + 0.8 * smoothstep(-0.2, 1.0, sin(phi));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const DUST_VERT = `
  uniform float uTime;
  attribute float aSize;
  attribute float aDrift;
  varying float vFade;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * aDrift + p.x) * 0.1;
    vFade = 0.2 + 0.8 * (0.5 + 0.5 * sin(uTime * aDrift * 1.8 + p.z * 3.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const SPRITE_FRAG = `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = length(d) * 2.0;
    if (r > 1.0) discard;
    float core = pow(1.0 - r, 2.0);
    float rim  = smoothstep(0.7, 0.97, r) * smoothstep(1.0, 0.88, r);
    gl_FragColor = vec4(uColor, (core * 0.5 + rim * 0.85) * vFade * uOpacity);
  }
`;

const CAM_Z = 8;
const TAN_HALF = Math.tan((34 * Math.PI) / 180 / 2);

/* ─────────────────────────────────────────────────────────────── */

export function BrainwaveBands() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [active, setActive] = useState<BandId | null>(null);
  const activeRef = useRef<BandId | null>(null);
  const visibleRef = useRef(true);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* auto-collapse once the section scrolls away */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
      },
      { rootMargin: "-5% 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* live WebGL renderer — one canvas, scissored to the open card's stage */
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const THREE = await import("three");
      if (disposed || !canvasRef.current) return;

      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        setWebgl(false);
        return;
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.autoClear = false;

      const col = (h: string) => new THREE.Color(h);
      type Panel = {
        id: BandId;
        scene: import("three").Scene;
        camera: import("three").PerspectiveCamera;
        uniforms: Record<string, { value: number }>[];
        t: number;
      };
      const panels: Panel[] = [];

      BANDS.forEach((cfg: BandContent) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0, CAM_Z);
        const uniforms: any[] = [];

        const mkBase = (phase: number, ampMul: number, widthMul: number) => ({
          uTime: { value: 0 },
          uAmp: { value: cfg.amp * ampMul },
          uFreq: { value: cfg.freq },
          uSpeed: { value: cfg.speed },
          uTwist: { value: cfg.twist },
          uTwistFreq: { value: cfg.freq * 0.45 },
          uWidth: { value: cfg.width * widthMul },
          uLength: { value: 28 },
          uPhase: { value: phase },
        });

        [
          { phase: 0, opacity: 1.0, ampMul: 1, widthMul: 1, z: 0 },
          { phase: 1.7, opacity: 0.3, ampMul: 0.88, widthMul: 0.62, z: -0.7 },
        ].forEach((s) => {
          const u: any = mkBase(s.phase, s.ampMul, s.widthMul);
          u.uColA = { value: col(cfg.colA) };
          u.uColB = { value: col(cfg.colB) };
          u.uColC = { value: col(cfg.colC) };
          u.uOpacity = { value: s.opacity };
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 420, 24),
            new THREE.ShaderMaterial({
              uniforms: u,
              vertexShader: RIBBON_VERT,
              fragmentShader: RIBBON_FRAG,
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
            }),
          );
          mesh.position.z = s.z;
          mesh.frustumCulled = false;
          scene.add(mesh);
          uniforms.push(u);
        });

        for (let f = 0; f < cfg.coils; f++) {
          const n = 320;
          const u: any = mkBase(f * 0.8, 1, 1);
          u.uColor = { value: col(cfg.colB) };
          u.uOpacity = { value: 0.16 };
          const pos = new Float32Array(n * 3);
          const aU = new Float32Array(n);
          const aPhi = new Float32Array(n);
          const aR = new Float32Array(n);
          const turns = 5 + f * 2.5;
          const radius = cfg.width * (0.42 + f * 0.18);
          for (let i = 0; i < n; i++) {
            const t = i / (n - 1);
            aU[i] = t;
            aPhi[i] = t * Math.PI * 2 * turns + f * 2.1;
            aR[i] = radius * (0.7 + 0.3 * Math.sin(t * Math.PI));
          }
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          g.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
          g.setAttribute("aPhi", new THREE.BufferAttribute(aPhi, 1));
          g.setAttribute("aRadius", new THREE.BufferAttribute(aR, 1));
          const line = new THREE.Line(
            g,
            new THREE.ShaderMaterial({
              uniforms: u,
              vertexShader: COIL_VERT,
              fragmentShader: COIL_FRAG,
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          );
          line.frustumCulled = false;
          scene.add(line);
          uniforms.push(u);
        }

        {
          const n = cfg.bubbles;
          const u: any = mkBase(0, 1, 1);
          u.uColor = { value: col(cfg.colB) };
          u.uOpacity = { value: 0.6 };
          const pos = new Float32Array(n * 3);
          const aU = new Float32Array(n);
          const aPhi = new Float32Array(n);
          const aR = new Float32Array(n);
          const aS = new Float32Array(n);
          for (let i = 0; i < n; i++) {
            aU[i] = Math.random();
            aPhi[i] = Math.random() * Math.PI * 2;
            aR[i] = cfg.width * (0.4 + Math.random() * 0.45);
            aS[i] = 0.022 + Math.random() * 0.03;
          }
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          g.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
          g.setAttribute("aPhi", new THREE.BufferAttribute(aPhi, 1));
          g.setAttribute("aRadius", new THREE.BufferAttribute(aR, 1));
          g.setAttribute("aSize", new THREE.BufferAttribute(aS, 1));
          const pts = new THREE.Points(
            g,
            new THREE.ShaderMaterial({
              uniforms: u,
              vertexShader: BUBBLE_VERT,
              fragmentShader: SPRITE_FRAG,
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          );
          pts.frustumCulled = false;
          scene.add(pts);
          uniforms.push(u);
        }

        /* ambient dust */
        {
          const n = 70;
          const pos = new Float32Array(n * 3);
          const aS = new Float32Array(n);
          const aD = new Float32Array(n);
          for (let i = 0; i < n; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 34;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
            aS[i] = 0.006 + Math.random() * 0.018;
            aD[i] = 0.1 + Math.random() * 0.35;
          }
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          g.setAttribute("aSize", new THREE.BufferAttribute(aS, 1));
          g.setAttribute("aDrift", new THREE.BufferAttribute(aD, 1));
          const u: any = {
            uTime: { value: 0 },
            uColor: { value: col("#e6f2ff") },
            uOpacity: { value: 0.4 },
          };
          const pts = new THREE.Points(
            g,
            new THREE.ShaderMaterial({
              uniforms: u,
              vertexShader: DUST_VERT,
              fragmentShader: SPRITE_FRAG,
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          );
          pts.frustumCulled = false;
          scene.add(pts);
          uniforms.push(u);
        }

        panels.push({
          id: cfg.id,
          scene,
          camera,
          uniforms,
          t: Math.random() * 30,
        });
      });

      const resize = () => renderer.setSize(window.innerWidth, window.innerHeight, false);
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      let last = performance.now();

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visibleRef.current || document.hidden) return;

        renderer.setScissorTest(false);
        renderer.clear();
        renderer.setScissorTest(true);

        const ch = window.innerHeight;

        panels.forEach((p) => {
          if (activeRef.current !== p.id) return;
          const el = stageRefs.current[p.id];
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > ch || r.width === 0 || r.height === 0) return;

          if (!reduce) p.t += dt;
          p.uniforms.forEach((u: any) => {
            u.uTime.value = p.t;
          });

          const aspect = r.width / r.height;
          const len = 2 * TAN_HALF * CAM_Z * aspect * 1.06;
          p.uniforms.forEach((u: any) => {
            if (u.uLength) u.uLength.value = len;
          });

          p.camera.aspect = aspect;
          p.camera.updateProjectionMatrix();

          const bottom = ch - r.bottom;
          renderer.setViewport(r.left, bottom, r.width, r.height);
          renderer.setScissor(r.left, bottom, r.width, r.height);
          renderer.render(p.scene, p.camera);
        });
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        panels.forEach((p) =>
          p.scene.traverse((o: any) => {
            o.geometry?.dispose?.();
            o.material?.dispose?.();
          }),
        );
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  const current = BANDS.find((b) => b.id === active) ?? BANDS[0];
  const rest = BANDS.filter((b) => b.id !== current.id);

  const switchTo = (id: BandId | null) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!doc.startViewTransition || reduce) {
      setActive(id);
      return;
    }
    doc.startViewTransition(() => {
      flushSync(() => setActive(id));
    });
  };

  if (!active) {
    return (
      <div ref={sectionRef} className="relative isolate">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BANDS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              data-aos="fade-up"
              data-aos-delay={i * 80}
              style={{ viewTransitionName: `band-${b.id}` }}
              onClick={() => switchTo(b.id)}
              className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 text-left transition-colors duration-300 hover:border-teal/50"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                <Activity className="h-5 w-5" />
              </span>
              <span className="mt-4 block font-display text-base font-semibold text-navy">{b.name}</span>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-teal">
                {b.frequency}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{b.hook}</span>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy/60 transition-colors group-hover:text-teal">
                Explore
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div ref={sectionRef} className="relative isolate">
      {webgl && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 h-full w-full"
        />
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {/* expanded panel */}
        <div
          style={{ viewTransitionName: `band-${current.id}` }}
          className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
        >

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">{current.name}</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              {current.frequency}
            </span>
          </div>
          <button
            type="button"
            onClick={() => switchTo(null)}

            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 text-navy/50 transition-colors hover:border-teal/50 hover:text-teal"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{current.hook}</p>

          {/* live 3D wave stage */}
          <div className="relative mt-5 overflow-hidden rounded-xl bg-navy">
            <div
              key={current.id}
              ref={(el) => {
                stageRefs.current[current.id] = el;
              }}
              className="h-44 w-full sm:h-56 lg:h-64"
            />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{current.body}</p>
          <dl className="mt-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/50">
              What it measures
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-navy/80">{current.measures}</dd>
          </dl>
        </div>

        {/* collapsed stack */}
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-72">
          {rest.map((b) => (
            <button
              key={b.id}
              type="button"
              style={{ viewTransitionName: `band-${b.id}` }}
              onClick={() => switchTo(b.id)}

              className="group flex flex-1 items-start gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-left transition-colors duration-300 hover:border-teal/50"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                <Activity className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-sm font-semibold text-navy">{b.name}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-teal">
                    {b.frequency}
                  </span>
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                  {b.hook}
                </span>
              </span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-navy/30 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

