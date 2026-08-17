type VideoModule = string;

const modules = import.meta.glob<VideoModule>(
  "../assets/client/testimonials/*.mp4",
  { eager: true, import: "default", query: "?url" },
);

export const clientTestimonialVideos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url], index) => ({
    id: `client-testimonial-${index + 1}`,
    title: path.match(/VIDEO\s+(\d+)/i)?.[1]
      ? `Client testimonial ${path.match(/VIDEO\s+(\d+)/i)?.[1]}`
      : `Client testimonial ${index + 1}`,
    author: "BrainWaves Tech community",
    video_url: url,
    thumbnail_url: null,
  }));
