import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function SalesChart({ sales, isDarkMode }) {
  const chartData = sales.map((s) => ({
    date: s.created_at
      ? new Date(s.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : "Unknown",
    amount: s.amount,
  }));

  const strokeColor = isDarkMode ? "#60a5fa" : "#2563eb"; // blue-400 / blue-600
  const fillColor = isDarkMode ? "url(#colorDark)" : "url(#colorLight)";
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0"; // slate-700 / slate-200
  const textColor = isDarkMode ? "#94a3b8" : "#64748b"; // slate-400 / slate-500

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: textColor }}
            stroke={gridColor}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          
          <YAxis
            tick={{ fontSize: 12, fill: textColor }}
            stroke={gridColor}
            axisLine={false}
            tickLine={false}
            dx={-10}
            tickFormatter={(value) => `$${value}`}
          />
          
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#f8fafc' : '#0f172a',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{ color: strokeColor, fontWeight: 'bold' }}
          />
          
          <Area
            type="monotone"
            dataKey="amount"
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={1}
            fill={fillColor}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}