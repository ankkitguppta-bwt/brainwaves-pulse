import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2 } from "lucide-react";
import { listEnquiries, markEnquiryRead, deleteEnquiry } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  head: () => ({ meta: [{ title: "Enquiries — Admin" }, { name: "robots", content: "noindex" }] }),
  component: EnquiriesPage,
});

function EnquiriesPage() {
  const qc = useQueryClient();
  const list = useServerFn(listEnquiries);
  const mark = useServerFn(markEnquiryRead);
  const del = useServerFn(deleteEnquiry);
  const q = useQuery({ queryKey: ["enquiries"], queryFn: () => list() });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">Contact Enquiries</h1>
      <div className="mt-6 space-y-3">
        {q.isLoading && <p>Loading…</p>}
        {q.data?.length === 0 && <p className="text-muted-foreground">No enquiries yet.</p>}
        {q.data?.map((e: any) => (
          <div key={e.id} className={`rounded-2xl border p-5 ${e.is_read ? "border-slate-200 bg-white" : "border-teal/30 bg-teal/5"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display font-semibold text-navy">{e.name} <span className="ml-2 text-sm font-normal text-muted-foreground">{new Date(e.created_at).toLocaleString()}</span></p>
                <p className="text-sm text-muted-foreground">
                  <a href={`mailto:${e.email}`} className="hover:underline">{e.email}</a>
                  {e.phone && <> · <a href={`tel:${e.phone}`} className="hover:underline">{e.phone}</a></>}
                  {e.interest && <> · {e.interest}</>}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={async () => { await mark({ data: { id: e.id, is_read: !e.is_read } }); qc.invalidateQueries({ queryKey: ["enquiries"] }); }}
                  className="rounded-full border border-input px-3 py-1 text-xs hover:bg-secondary">
                  Mark {e.is_read ? "unread" : "read"}
                </button>
                <button onClick={async () => { if (confirm("Delete?")) { await del({ data: { id: e.id } }); qc.invalidateQueries({ queryKey: ["enquiries"] }); } }}
                  aria-label="Delete" title="Delete"
                  className="inline-flex items-center rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50">
                  <Trash2 size={14} className="mr-1" /> Delete
                </button>
              </div>
            </div>
            {e.message && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{e.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
