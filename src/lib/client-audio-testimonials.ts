type AudioModule = string;

const audioModules = import.meta.glob<AudioModule>(
  "../assets/audio/*.{ogg,mp3,wav,m4a,mp4,aac}",
  { eager: true, import: "default", query: "?url" },
);

export interface ClientAudioItem {
  id: string;
  title: string;
  role: string;
  category: string;
  tag: string;
  durationApprox: string;
  summary: string;
  url: string;
}

const AUDIO_METADATA: Record<string, { role: string; category: string; tag: string; duration: string; summary: string }> = {
  aditya: {
    role: "Software Professional",
    category: "Cognitive Performance",
    tag: "Focus & Calmness",
    duration: "0:48",
    summary: "Experienced a noticeable shift in day-to-day concentration and mental quietude following targeted frequency sessions.",
  },
  ankur: {
    role: "Senior Enterprise Manager",
    category: "Stress Management",
    tag: "Burnout Relief",
    duration: "0:58",
    summary: "Objective scan identified high Beta frequency overload; acoustic sessions provided rapid decompression from workplace pressure.",
  },
  "ashutosh sharma": {
    role: "Consultant",
    category: "Sleep Architecture",
    tag: "Restorative Sleep",
    duration: "0:21",
    summary: "Deep restorative sleep quality improved significantly within the first week of neuro-acoustic sound therapy.",
  },
  ayush: {
    role: "Engineering Student",
    category: "Academic Focus",
    tag: "Memory & Focus",
    duration: "1:17",
    summary: "Exam preparation anxiety normalized and sustained study focus increased after custom neuro-frequency sound sessions.",
  },
  meenakshi: {
    role: "Healthcare Professional",
    category: "Emotional Wellbeing",
    tag: "Anxiety Regulation",
    duration: "1:16",
    summary: "Pre- and post-therapy brainwave graphs showed empirical emotional stabilization and sustained nervous system balance.",
  },
  prachi: {
    role: "Yoga & Mindfulness Coach",
    category: "Mindfulness & Coherence",
    tag: "Alpha Coherence",
    duration: "0:34",
    summary: "Live brainwave biofeedback confirmed deeper Alpha-wave coherence during meditation practices with measurable stillness.",
  },
  uma: {
    role: "Corporate Executive",
    category: "Mental Vitality",
    tag: "Fatigue Reduction",
    duration: "0:42",
    summary: "Chronic afternoon brain fog cleared up, returning natural mental clarity and stamina throughout the workday.",
  },
};

function formatTitle(filename: string): string {
  const clean = filename.replace(/[-_]/g, " ").trim();
  return clean
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export const clientAudioTestimonials: ClientAudioItem[] = Object.entries(audioModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url], index) => {
    const filenameWithExt = path.split("/").pop() ?? `audio-${index + 1}`;
    const nameWithoutExt =
      filenameWithExt.substring(0, filenameWithExt.lastIndexOf(".")) || filenameWithExt;
    const lowerKey = nameWithoutExt.toLowerCase().trim();
    const personName = formatTitle(nameWithoutExt);
    const meta = AUDIO_METADATA[lowerKey] ?? {
      role: "Verified Client",
      category: "Cognitive Wellness",
      tag: "Neurofeedback Outcome",
      duration: "0:45",
      summary: "Client voice testimonial sharing real experience, cognitive improvement, and wellness outcomes with BrainWaves Tech.",
    };

    return {
      id: `audio-testimonial-${index + 1}`,
      title: personName,
      role: meta.role,
      category: meta.category,
      tag: meta.tag,
      durationApprox: meta.duration,
      summary: meta.summary,
      url,
    };
  });
