export type BandId = "alpha" | "beta" | "gamma" | "delta" | "theta";

export type BandContent = {
  id: BandId;
  name: string;
  frequency: string;
  hook: string;
  body: string;
  measures: string;
  /** visual params for the live 3D ribbon */
  colA: string;
  colB: string;
  colC: string;
  freq: number;
  speed: number;
  amp: number;
  twist: number;
  width: number;
  coils: number;
  bubbles: number;
};

/** Order as specified: Alpha → Beta → Gamma → Delta → Theta */
export const BANDS: BandContent[] = [
  {
    id: "alpha",
    name: "Alpha Waves",
    frequency: "8 Hz – 12 Hz",
    hook: "The ultimate state of effortless high performance. Where strategy meets execution without the stress.",
    body: "It is the bridge between your conscious mind and your subconscious. When Alpha oscillations are prominent, it indicates a steady, relaxed, yet alert baseline state where neural network synchronization prevents mental noise.",
    measures: "Control over mind, thought balancing, positivity, and visionary.",
    colA: "#2fb9a8",
    colB: "#7cecc0",
    colC: "#ffcfa6",
    freq: 0.8,
    speed: 0.95,
    amp: 0.92,
    twist: 1.2,
    width: 1.25,
    coils: 2,
    bubbles: 9,
  },
  {
    id: "beta",
    name: "Beta Waves",
    frequency: "12 Hz – 28 Hz",
    hook: "Your day-to-day processing unit. The faster you grasp data, the quicker you dominate deadlines.",
    body: "The standard baseline of your active, waking consciousness. High Beta activity represents fast-firing neurons running across a strongly engaged mind to manage complex sensory-motor data transfer and analytical logic processing.",
    measures: "Active logic, intellectual interpretation, learning, grasping, and memory retention.",
    colA: "#2f7ae0",
    colB: "#9ad2ff",
    colC: "#ffc79a",
    freq: 1.11,
    speed: 1.35,
    amp: 0.8,
    twist: 1.28,
    width: 1.12,
    coils: 3,
    bubbles: 11,
  },
  {
    id: "gamma",
    name: "Gamma Waves",
    frequency: "28 Hz – 100 Hz",
    hook: "The brain's absolute highest gear. Maximum integration, maximum implementation.",
    body: "The fastest of all brainwave frequencies, responsible for binding sensory information. It represents local neuronal assembly integration and cross-modal processing, acting as the brain's optimal window for high-level cognitive synthesis.",
    measures:
      "Implementation, action, reaction, aggression, irritation, anxiety, mood swings, and behavioural regulation states.",
    colA: "#d8b64a",
    colB: "#ffe9a8",
    colC: "#fff6e2",
    freq: 1.56,
    speed: 1.9,
    amp: 0.66,
    twist: 1.34,
    width: 0.98,
    coils: 3,
    bubbles: 13,
  },
  {
    id: "delta",
    name: "Delta Waves",
    frequency: "0.5 Hz – 4 Hz",
    hook: "Your foundational battery system. If your biological baseline is corrupted, your performance collapses.",
    body: "The deepest, slowest waves of the human electrochemical signature. This high-amplitude rhythm indicates a completely detached conscious state where somatic repair mechanisms take precedence.",
    measures: "Core rest architecture, biological sleep quality, internal satisfaction, and self-esteem.",
    colA: "#5b53c9",
    colB: "#a98cf0",
    colC: "#ffd8c4",
    freq: 0.45,
    speed: 0.5,
    amp: 1.15,
    twist: 1.05,
    width: 1.45,
    coils: 2,
    bubbles: 6,
  },
  {
    id: "theta",
    name: "Theta Waves",
    frequency: "4 Hz – 8 Hz",
    hook: "The gateway to your deep mind — where your emotions either power your performance or secretly pull the strings.",
    body: "The twilight frequency commonly experienced during deep drowsiness, active dreaming, or profound meditation. It represents a state where automatic tasks allow the mind to disengage from sensory input without losing memory performance.",
    measures:
      "Thought process, feelings, emotions, rigidness, bluntness, overthinking, negative thinking, emotional thinking and behavioural adaptability.",
    colA: "#3566cf",
    colB: "#8dc2ff",
    colC: "#ffd2b6",
    freq: 0.62,
    speed: 0.72,
    amp: 1.02,
    twist: 1.15,
    width: 1.35,
    coils: 2,
    bubbles: 8,
  },
];
