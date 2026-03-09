import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SalesChart({ sales }) {
  const chartData = sales.map((s) => ({
    date: s.created_at
      ? new Date(s.created_at).toLocaleDateString()
      : "Unknown",
    amount: s.amount,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Sales Chart
        </h3>
        <p className="text-sm text-slate-500">
          Visual overview of recent sales performance.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#64748b"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#64748b"
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}