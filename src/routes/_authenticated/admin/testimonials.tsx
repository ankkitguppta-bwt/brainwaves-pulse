import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";
import { listAllTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <CrudManager
      title="Testimonials"
      queryKey={["testimonials", "all"]}
      listFn={listAllTestimonials}
      upsertFn={upsertTestimonial}
      deleteFn={deleteTestimonial}
      newDefaults={{ type: "text", author: "", title: "", quote: "", video_url: "", thumbnail_url: "", is_featured: false, sort_order: 0 }}
      fields={[
        { name: "type", label: "Type", type: "select", options: [
          { label: "Text", value: "text" }, { label: "Video", value: "video" },
        ]},
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "author", label: "Author", type: "text", required: true },
        { name: "title", label: "Title / role", type: "text" },
        { name: "quote", label: "Quote (text testimonials)", type: "textarea" },
        { name: "video_url", label: "Video URL", type: "url", placeholder: "MP4 or YouTube URL", colSpan: 2 },
        { name: "thumbnail_url", label: "Thumbnail URL (optional)", type: "url", colSpan: 2 },
        { name: "is_featured", label: "Featured", type: "checkbox", placeholder: "Show on landing page", colSpan: 2 },
      ]}
      columns={[
        { key: "type", label: "Type" },
        { key: "author", label: "Author" },
        { key: "title", label: "Title" },
        { key: "is_featured", label: "Featured", render: (r: any) => (r.is_featured ? "★" : "") },
      ]}
    />
  ),
});
