import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919893064372?text=Hi%20BrainWaves%20Tech%2C%20I%27d%20like%20to%20know%20more."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-[#25D366]/20 transition hover:scale-110"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle aria-hidden="true" className="relative h-8 w-8 fill-[#25D366] text-[#128C3E]" strokeWidth={1.8} />
    </a>
  );
}
