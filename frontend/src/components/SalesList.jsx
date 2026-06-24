import { Receipt, Calendar, ArrowUpRight } from "lucide-react";

export default function SalesList({ sales }) {
  if (!sales.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <Receipt size={24} />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">No transactions found</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adding a new sale to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sales.map((s) => (
        <div
          key={s.id}
          className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm dark:border-white/5 dark:bg-slate-800/50 dark:hover:border-white/10 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Transaction #{s.id.toString().slice(0, 8)}
                </p>
                {s.category && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                    {s.category}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={12} />
                <span>
                  {s.created_at
                    ? new Date(s.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "Unknown date"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-slate-900 dark:text-white">
              ${Number(s.amount).toFixed(2)}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-500">Completed</p>
          </div>
        </div>
      ))}
    </div>
  );
}