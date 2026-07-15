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
      newDefaults={{ kind: "media", title: "", outlet: "", url: "", image_url: "", entry_date: "", sort_order: 0 }}
      fields={[
        { name: "kind", label: "Kind", type: "select", options: [
          { label: "Media coverage", value: "media" },
          { label: "Recognition / award", value: "recognition" },
        ]},
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "title", label: "Title", type: "text", required: true, colSpan: 2 },
        { name: "outlet", label: "Outlet / awarding body", type: "text" },
        { name: "entry_date", label: "Date", type: "date" },
        { name: "url", label: "Link URL", type: "url", colSpan: 2 },
        { name: "image_url", label: "Image URL", type: "url", colSpan: 2 },
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
