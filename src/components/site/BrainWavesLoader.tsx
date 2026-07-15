import "./BrainWavesLoader.css";
import logoAsset from "@/assets/brand/logo-dark.png.asset.json";

interface BrainWavesLoaderProps {
  size?: number;
  fullscreen?: boolean;
  label?: string;
  hiding?: boolean;
}

export default function BrainWavesLoader({
  size = 420,
  fullscreen = true,
  label = "Loading",
  hiding = false,
}: BrainWavesLoaderProps) {
  const className = [
    "brainwaves-loader",
    fullscreen ? "brainwaves-loader--fullscreen" : "",
    hiding ? "brainwaves-loader--hiding" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      style={{ ["--loader-width" as string]: `${size}px` }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="brainwaves-loader__logo">
        <img
          src={logoAsset.url}
          alt=""
          aria-hidden="true"
          className="brainwaves-loader__image brainwaves-loader__image--base"
        />
        <div className="brainwaves-loader__reveal">
          <img
            src={logoAsset.url}
            alt=""
            aria-hidden="true"
            className="brainwaves-loader__image"
          />
        </div>
        <div className="brainwaves-loader__shine" aria-hidden="true" />
      </div>
      <span className="brainwaves-loader__text">{label}</span>
    </div>
  );
}
