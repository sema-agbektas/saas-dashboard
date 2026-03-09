export default function SummaryCards({ summary }) {
  if (!summary) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Total Sales */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total Sales</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          {summary.total_sales}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Number of completed sales
        </p>
      </div>

      {/* Total Revenue */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total Revenue</p>
        <p className="mt-2 text-3xl font-bold text-emerald-600">
          ${Number(summary.total_revenue).toFixed(2)}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Total generated revenue
        </p>
      </div>
    </div>
  );
}