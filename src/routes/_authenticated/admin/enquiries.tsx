import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { listEnquiries, markEnquiryRead, deleteEnquiry } from "@/lib/data/admin.functions";
import { CardListSkeleton } from "@/components/admin/AdminSkeleton";
import { useConfirm } from "@/components/admin/ConfirmDialog";


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
  const { confirm, dialog } = useConfirm();
  const [actionError, setActionError] = useState<{ message: string; retry: () => void } | null>(null);

  async function doDelete(id: string) {
    setActionError(null);
    const toastId = toast.loading("Deleting enquiry…");
    try {
      await del({ data: { id } });
      await qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry deleted", { id: toastId });
    } catch (err: any) {
      const message = err?.message ?? "Delete failed. Please try again.";
      setActionError({ message, retry: () => void doDelete(id) });
      toast.error("Delete failed", { id: toastId, description: message, action: { label: "Retry", onClick: () => void doDelete(id) } });
    }
  }

  async function doMark(id: string, isRead: boolean) {
    setActionError(null);
    try {
      await mark({ data: { id, is_read: isRead } });
      await qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success(isRead ? "Marked as read" : "Marked as unread");
    } catch (err: any) {
      const message = err?.message ?? "Could not update this enquiry.";
      setActionError({ message, retry: () => void doMark(id, isRead) });
      toast.error("Update failed", { description: message, action: { label: "Retry", onClick: () => void doMark(id, isRead) } });
    }
  }

  async function confirmDelete(id: string) {
    const ok = await confirm({
      title: "Delete this enquiry?",
      description: "This enquiry will be permanently deleted. This cannot be undone.",
      confirmLabel: "Delete",
    });
    if (ok) await doDelete(id);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">Contact Enquiries</h1>
      {actionError && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{actionError.message}</span>
          <div className="flex gap-2">
            <button onClick={actionError.retry} className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700">Retry</button>
            <button onClick={() => setActionError(null)} className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold hover:bg-red-100">Dismiss</button>
          </div>
        </div>
      )}
      <div className="mt-6 space-y-3">
        {q.isLoading && <CardListSkeleton />}
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
                <button onClick={async () => { if (await confirm({ title: "Delete this enquiry?", description: "This enquiry will be permanently deleted. This cannot be undone.", confirmLabel: "Delete" })) { await del({ data: { id: e.id } }); qc.invalidateQueries({ queryKey: ["enquiries"] }); } }}
                  aria-label="Delete" title="Delete"
                  className="inline-flex items-center rounded-full border border-red-200 px-2.5 py-1 text-red-600 hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {e.message && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{e.message}</p>}
          </div>
        ))}
      </div>
      {dialog}
    </div>
  );
}
