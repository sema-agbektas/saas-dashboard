export default function SalesList({ sales }) {
  if (!sales.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">No sales yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Sales List</h3>
        <p className="text-sm text-slate-500">
          Recent sales records from your dashboard.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr
                key={s.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="py-2">
                  {s.created_at
                    ? new Date(s.created_at).toLocaleDateString()
                    : "Unknown"}
                </td>

                <td className="py-2 font-semibold text-slate-900">
                  ${s.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}