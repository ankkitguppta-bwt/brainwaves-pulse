import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { uploadMedia } from "@/lib/data/media.functions";
import { Upload, X, Loader2 } from "lucide-react";

type Props = {
  value: string | null | undefined;
  onChange: (url: string) => void;
  aspect?: string; // e.g. "aspect-video", "aspect-square"
  aspectLabel?: string; // e.g. "16:9 (1600×900)"
  folder?: string;
  className?: string;
};

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result ?? "");
      const comma = s.indexOf(",");
      resolve(comma >= 0 ? s.slice(comma + 1) : s);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  value, onChange, aspect = "aspect-video", aspectLabel, folder = "uploads", className = "",
}: Props) {
  const upload = useServerFn(uploadMedia);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(f: File) {
    if (!f.type.startsWith("image/")) { setError("Please choose an image"); return; }
    if (f.size > 5 * 1024 * 1024) { setError("Max 5 MB"); return; }
    setBusy(true); setError(null);
    try {
      const base64 = await fileToBase64(f);
      const res = await upload({
        data: { filename: f.name, contentType: f.type, base64, folder },
      });
      onChange(res.url);
    } catch (e: any) {
      setError(e.message ?? "Upload failed");
    } finally { setBusy(false); }
  }

  return (
    <div className={className}>
      {aspectLabel && (
        <p className="mb-1 text-[11px] text-muted-foreground">Recommended {aspectLabel}</p>
      )}
      <div
        className={`${aspect} relative w-full max-w-[180px] overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
      >
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 hover:bg-white"
            >
              Replace
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 text-center text-xs text-slate-500 hover:bg-slate-100"
            disabled={busy}
          >
            {busy ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
            ) : (
              <><Upload className="h-4 w-4" /> Click or drop image</>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
