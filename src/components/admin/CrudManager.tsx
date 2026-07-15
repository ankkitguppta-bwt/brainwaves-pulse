import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ImageUpload } from "@/components/admin/ImageUpload";

type FieldType = "text" | "textarea" | "url" | "number" | "select" | "checkbox" | "date" | "image";
export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  colSpan?: 1 | 2;
  aspect?: string;
  aspectLabel?: string;
  folder?: string;
};

type Props<T> = {
  queryKey: unknown[];
  listFn: any;
  upsertFn: any;
  deleteFn: any;
  fields: FieldDef[];
  columns: { key: string; label: string; render?: (row: T) => React.ReactNode }[];
  newDefaults: Record<string, any>;
  title: string;
};

export function CrudManager<T extends { id: string }>({
  queryKey, listFn, upsertFn, deleteFn, fields, columns, newDefaults, title,
}: Props<T>) {
  const qc = useQueryClient();
  const list = useServerFn(listFn as any);
  const upsert = useServerFn(upsertFn as any);
  const del = useServerFn(deleteFn as any);
  const q = useQuery({ queryKey, queryFn: () => list() });
  const [editing, setEditing] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const payload: any = { ...editing };
      // coerce
      for (const f of fields) {
        if (f.type === "number") payload[f.name] = Number(payload[f.name] ?? 0);
        if (f.type === "checkbox") payload[f.name] = Boolean(payload[f.name]);
      }
      await upsert({ data: payload });
      await qc.invalidateQueries({ queryKey });
      setEditing(null);
    } catch (err: any) {
      setError(err.message ?? "Save failed");
    } finally { setBusy(false); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await del({ data: { id } });
    await qc.invalidateQueries({ queryKey });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy">{title}</h1>
        <button onClick={() => setEditing({ ...newDefaults })}
          className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-soft">
          + New
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>{columns.map((c) => <th key={c.key} className="px-4 py-2">{c.label}</th>)}<th className="px-4 py-2 w-32">Actions</th></tr>
          </thead>
          <tbody>
            {q.isLoading && <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center">Loading…</td></tr>}
            {q.data?.map((row: any) => (
              <tr key={row.id} className="border-t border-slate-100">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2 align-top">{c.render ? c.render(row) : String(row[c.key] ?? "—")}</td>
                ))}
                <td className="px-4 py-2">
                  <button onClick={() => setEditing({ ...row })} className="mr-2 text-navy hover:underline">Edit</button>
                  <button onClick={() => remove(row.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {q.data && q.data.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-muted-foreground">No items yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div className="mt-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-navy">{editing.id ? "Edit" : "New"}</h2>
            <form onSubmit={save} className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.colSpan === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={4} value={editing[f.name] ?? ""} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
                  ) : f.type === "select" ? (
                    <select value={editing[f.name] ?? ""} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm">
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="mt-2 flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!editing[f.name]} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })} />
                      {f.placeholder ?? "Enabled"}
                    </label>
                  ) : (
                    <input
                      type={f.type === "url" ? "url" : f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      required={f.required} placeholder={f.placeholder}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                    />
                  )}
                </div>
              ))}
              {error && <p className="sm:col-span-2 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <div className="sm:col-span-2 flex gap-2 pt-2">
                <button disabled={busy} className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-60">
                  {busy ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-input px-5 py-2 text-sm hover:bg-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
