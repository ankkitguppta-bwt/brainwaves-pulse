import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";
import { listAllCaseStudies, upsertCaseStudy, deleteCaseStudy } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/case-studies")({
  head: () => ({ meta: [{ title: "Case Studies — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <CrudManager
      title="Case Studies"
      queryKey={["case_studies", "all"]}
      listFn={listAllCaseStudies}
      upsertFn={upsertCaseStudy}
      deleteFn={deleteCaseStudy}
      newDefaults={{ title: "", summary: "", body_html: "", image_url: "", published: true, sort_order: 0 }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "image_url", label: "Image", type: "image", aspect: "aspect-video", aspectLabel: "16:9 (1600×900)", folder: "case-studies", colSpan: 2 },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "body_html", label: "Body (HTML allowed)", type: "textarea" },
        { name: "published", label: "Published", type: "checkbox", colSpan: 2 },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "published", label: "Live", render: (r: any) => (r.published ? "✓" : "—") },
        { key: "sort_order", label: "#" },
      ]}
    />
  ),
});
