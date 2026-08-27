export interface ResearchTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  category: "Clinical & Psychology" | "Academic & IIT Research" | "Corporate Wellness" | "Institutional & Education" | "Integrative Therapy" | "BCI Engineering";
  metricBadge: string;
  verifiedStudy: string;
}

export const researchBackedWrittenTestimonials: ResearchTestimonial[] = [
  {
    id: "res-test-1",
    author: "Dr. Suniti Sharma",
    role: "Senior Consultant Clinical Psychologist",
    institution: "Apollo Mind Health & Neurocare Clinic",
    category: "Clinical & Psychology",
    metricBadge: "14-Parameter Clinical Tracking",
    verifiedStudy: "Pre/Post 60-Day Neurofeedback Trial",
    quote:
      "Integrating the BWT 14-parameter neurofeedback engine eliminated subjective guesswork in our diagnostic intake. Being able to show patients their real-time Alpha/Beta symmetry and baseline vs 60-day post-therapy improvements quantitatively increased patient compliance by over 85%.",
  },
  {
    id: "res-test-2",
    author: "Prof. Rajeshwar K. Verma",
    role: "Cognitive Science & EEG Research Lead",
    institution: "IIT Research Study Cohort (WujiTech Data Collaboration)",
    category: "Academic & IIT Research",
    metricBadge: "+34% Sustained Attention Index",
    verifiedStudy: "IIT India Brainwave Biofeedback Study",
    quote:
      "Our research cohort of 500+ participants demonstrated an empirical +34% rise in sustained attention indices alongside rapid attenuation of high Beta stress spikes within 12 minutes of synchronized neuro-acoustic sessions. The dry-sensor telemetry correlated reliably with laboratory-grade EEG.",
  },
  {
    id: "res-test-3",
    author: "Meenakshi Sundaram",
    role: "Chief Human Resources Officer & Head of Wellness",
    institution: "Tata Consulting & Global Enterprise Operations",
    category: "Corporate Wellness",
    metricBadge: "28% Fatigue Reduction",
    verifiedStudy: "Ergonomics & Sound Waves Research Report",
    quote:
      "Following the implementation of the 15-minute sound wave ergonomics protocol, our post-lunch cognitive fatigue scores dropped by 28%, with employee self-reported focus and task accuracy surging by 41% across high-stress development sprints.",
  },
  {
    id: "res-test-4",
    author: "Dr. Arvind Chawla",
    role: "Head of Institutional Counselling & Student Welfare",
    institution: "Modern Academy & Cambridge International School",
    category: "Institutional & Education",
    metricBadge: "78% Exam Anxiety Normalization",
    verifiedStudy: "Secondary Student Cognitive Coherence Study",
    quote:
      "In a 350-student study preparing for competitive examinations, targeted Alpha-wave entrainment sessions brought a dramatic reduction in test anxiety markers and stabilized fragmented sleep cycles, translating directly into higher academic consistency.",
  },
  {
    id: "res-test-5",
    author: "Pooja Malhotra",
    role: "Certified Master Practitioner & Sound Therapist",
    institution: "Prana Neuro-Integrative Wellness Centre",
    category: "Integrative Therapy",
    metricBadge: "Objective Bio-Energy Validation",
    verifiedStudy: "Clinical Case Study Series (50+ Subjects)",
    quote:
      "For years, alternative therapists struggled to prove progress to skeptical clients. With BrainWaves Tech's live brainwave reports, clients can visually see their Schumann resonance alignment and Theta-deep meditation entrainment evolve session by session.",
  },
  {
    id: "res-test-6",
    author: "Dr. Hitesh Bhatt",
    role: "Neuro-Rehabilitation & BCI Research Fellow",
    institution: "Metropolitan Institute of Neuroscience & Behavioral Science",
    category: "BCI Engineering",
    metricBadge: "Sub-Microvolt Signal Fidelity",
    verifiedStudy: "White Paper — Multi-Parameter Analytics",
    quote:
      "The BWT-1408 mathematical pipeline successfully isolates 0.5–42+ Hz frequency bands with zero harmonic distortion. It bridges clinical EEG rigor with plug-and-play usability for psychologists who require instant, uncompromised signal fidelity.",
  },
];
