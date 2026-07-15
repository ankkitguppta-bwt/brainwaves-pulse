import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";
import { listAllPeople, upsertPerson, deletePerson } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/people")({
  head: () => ({ meta: [{ title: "People — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <CrudManager
      title="Leaders, Team & Advisors"
      queryKey={["people", "all"]}
      listFn={listAllPeople}
      upsertFn={upsertPerson}
      deleteFn={deletePerson}
      newDefaults={{ category: "team", name: "", role: "", description: "", image_url: "", sort_order: 0 }}
      fields={[
        { name: "category", label: "Category", type: "select", options: [
          { label: "Leadership", value: "leadership" },
          { label: "Team", value: "team" },
          { label: "Advisor", value: "advisor" },
        ]},
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "name", label: "Name", type: "text", required: true, colSpan: 2 },
        { name: "role", label: "Role / title", type: "text", colSpan: 2 },
        { name: "image_url", label: "Photo URL", type: "url", placeholder: "https://…", colSpan: 2 },
        { name: "description", label: "Description", type: "textarea" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "role", label: "Role" },
        { key: "sort_order", label: "#" },
      ]}
    />
  ),
});
