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
    author: "Dr. Ankit Gupta",
    role: "Founder & CEO, Brain Wave Analyst & Counsellor",
    institution: "BrainWaves Tech (Formerly The Brain Seeders)",
    category: "Clinical & Psychology",
    metricBadge: "12,000+ Individuals Helped",
    verifiedStudy: "Over 20,000 Hours of Counselling & Analysis",
    quote:
      "After years of relying on qualitative questionnaires, I realized the fundamental limitation: subjective self-reporting can never capture the true state of mind. By engineering a patented system that quantifies 5 major brainwave bands and 9 qualitative parameters objectively, we eliminated human intervention bias and made clinical-grade cognitive analysis accessible in just 2 minutes.",
  },
  {
    id: "res-test-2",
    author: "Francesco Garripoli",
    role: "Chief Technology Advisor & Global Technology Partner",
    institution: "WujiTech — U.S. Patent Holder in Real-Time Brainwave Monitoring",
    category: "BCI Engineering",
    metricBadge: "USA Patented EEG Telemetry",
    verifiedStudy: "Emmy Award-Winning Producer & ACM/SIGGRAPH President",
    quote:
      "The BrainWaves Tech mathematical pipeline bridges cutting-edge signal processing with plug-and-play usability. The dry-electrode hardware captures 0.5 Hz real-time signals with zero-delay wireless telemetry, while the cloud-based analytics engine translates raw EEG into actionable cognitive reports — no laboratory setup required.",
  },
  {
    id: "res-test-3",
    author: "Mrs. Nitya Gupta",
    role: "Co-Founder & Chief Marketing Officer",
    institution: "BrainWaves Tech",
    category: "Corporate Wellness",
    metricBadge: "B2B Strategic Framework",
    verifiedStudy: "500+ Enterprise Ecosystems Targeted",
    quote:
      "Scaling neurofeedback from a single B2C clinic to a nationwide B2B model required rethinking how practitioners, educational institutions, and corporate enterprises adopt mental wellness technology. By equipping partners with patented software, hardware, and accredited training, we now deploy objective cognitive assessment across thousands of communities simultaneously.",
  },
  {
    id: "res-test-4",
    author: "Swapnil Prabhat",
    role: "Technical Product & Marketing Manager",
    institution: "BrainWaves Tech — AI/ML & Mental Health",
    category: "Institutional & Education",
    metricBadge: "1,000+ Community Outreach",
    verifiedStudy: "Gen-Z Engagement & Social Impact Leadership",
    quote:
      "Working at the intersection of deep-tech and market strategy, I've seen how quantified brainwave data transforms sceptical institutions into active adopters. When school administrators and corporate HR leaders can visually see Alpha/Beta symmetry shifts and stress-band attenuation in real time, the conversation shifts from 'why neurofeedback?' to 'how soon can we deploy?'",
  },
  {
    id: "res-test-5",
    author: "Dr. Paras Kaul",
    role: "Senior Neurofeedback & BCI Research Advisor",
    institution: "California-Based Neurofeedback Researcher & BCI Specialist",
    category: "Academic & IIT Research",
    metricBadge: "30+ Years in Brainwave Interfaces",
    verifiedStudy: "Peer-Reviewed Research & Global Forum Presenter",
    quote:
      "Having worked with real-time brainwave interfaces since 1992, I can attest that BrainWaves Tech's approach of integrating non-invasive dry electrodes with automated sensor grounding verification addresses the most persistent barrier in neurofeedback adoption: clinical-grade accuracy without laboratory-grade complexity.",
  },
  {
    id: "res-test-6",
    author: "Mr. Vikas Patel",
    role: "Chief Technology & Web Infrastructure Manager",
    institution: "Jeevijay Technologies Pvt. Ltd. × BrainWaves Tech",
    category: "Integrative Therapy",
    metricBadge: "Enterprise-Grade SaaS Platform",
    verifiedStudy: "Scalable Architecture for Aditya Birla, Jio, TCS, Tata",
    quote:
      "Architecting the BrainWaves Tech cloud platform required building a system that handles real-time 0.5 Hz brainwave signal translation at scale, while maintaining secure digital processes for sensitive cognitive data. The AI-powered analytics engine delivers 14-parameter reports with 92%+ diagnostic accuracy, all within a plug-and-play B2B deployment framework.",
  },
];
