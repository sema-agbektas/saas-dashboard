import { Wallet, DollarSign, TrendingUp } from "lucide-react";

export default function SummaryCards({ summary }) {
  if (!summary) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Total Sales */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 dark:bg-blue-500/10"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Sales</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {summary.total_sales}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp size={16} />
              <span>+12.5% from last month</span>
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Wallet size={28} />
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              ${Number(summary.total_revenue).toFixed(2)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp size={16} />
              <span>+8.2% from last month</span>
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <DollarSign size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}