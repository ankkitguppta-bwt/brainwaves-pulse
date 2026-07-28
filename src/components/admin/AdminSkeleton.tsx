/** Shared shimmer skeletons for admin panel loading states. */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

export function TableSkeleton({ columns = 4, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-t border-slate-100">
          {Array.from({ length: columns }).map((__, c) => (
            <td key={c} className="px-4 py-3">
              <Bar className={`h-3.5 ${c === 0 ? "w-3/4" : "w-1/2"}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function CardListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
          <Bar className="h-4 w-40" />
          <Bar className="mt-3 h-3 w-2/3" />
          <Bar className="mt-2 h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function StatCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
          <Bar className="h-3 w-24" />
          <Bar className="mt-3 h-8 w-16" />
          <Bar className="mt-2 h-3 w-28" />
        </div>
      ))}
    </>
  );
}

export function EditorSkeleton() {
  return (
    <div>
      <Bar className="h-7 w-48" />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Bar className="h-3 w-16" />
          <Bar className="h-12 w-full" />
          <Bar className="h-3 w-20" />
          <Bar className="h-[400px] w-full" />
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <Bar className="h-4 w-24" />
            <Bar className="h-9 w-full" />
            <Bar className="h-9 w-full" />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <Bar className="h-4 w-28" />
            <Bar className="aspect-video w-full" />
            <Bar className="h-16 w-full" />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <Bar className="h-4 w-16" />
            <Bar className="h-9 w-full" />
            <Bar className="h-14 w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
