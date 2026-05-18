import { Plus, DollarSign } from "lucide-react";

export default function AddSaleForm({ amount, setAmount, createSale, loading }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
          <DollarSign size={18} />
        </div>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
        />
      </div>

      <button
        onClick={createSale}
        disabled={loading || !amount}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
        ) : (
          <>
            <Plus size={18} className="transition-transform group-hover:rotate-90" />
            <span>Add Transaction</span>
          </>
        )}
      </button>
    </div>
  );
}