export default function AddSaleForm({ amount, setAmount, createSale, loading }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Add Sale</h3>
        <p className="mt-1 text-sm text-slate-500">
          Create a new sales entry by entering the amount below.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          step="0.01"
          placeholder="Amount (e.g. 250.75)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
          onClick={createSale}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Adding..." : "Add Sale"}
        </button>
      </div>
    </div>
  );
}