import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";
import { listAllMedia, upsertMedia, deleteMedia } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/media")({
  head: () => ({ meta: [{ title: "Media & Recognition — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <CrudManager
      title="Media & Recognition"
      queryKey={["media", "all"]}
      listFn={listAllMedia}
      upsertFn={upsertMedia}
      deleteFn={deleteMedia}
      newDefaults={{ kind: "media", title: "", outlet: "", url: "", image_url: "", body: "", entry_date: "", sort_order: 0 }}
      fields={[
        { name: "kind", label: "Kind", type: "select", options: [
          { label: "Media coverage", value: "media" },
          { label: "Recognition / award", value: "recognition" },
          { label: "Explainer video", value: "explainer_video" },
          { label: "YouTube podcast", value: "youtube_podcast" },
          { label: "Video testimonial", value: "video_testimonial" },
          { label: "Audio testimonial", value: "audio_testimonial" },
          { label: "Written testimonial", value: "written_testimonial" },
        ]},
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "title", label: "Title", type: "text", required: true, colSpan: 2 },
        { name: "outlet", label: "Outlet / awarding body / author", type: "text" },
        { name: "entry_date", label: "Date", type: "date" },
        { name: "url", label: "Link URL (article, video, podcast or audio)", type: "url", colSpan: 2 },
        { name: "body", label: "Quote / description", type: "textarea" },
        { name: "image_url", label: "Image / logo", type: "image", aspect: "aspect-video", aspectLabel: "16:9 (1200×675)", folder: "media", colSpan: 2 },
      ]}
      columns={[
        { key: "kind", label: "Kind" },
        { key: "title", label: "Title" },
        { key: "outlet", label: "Outlet" },
        { key: "entry_date", label: "Date" },
      ]}
    />
  ),
});
