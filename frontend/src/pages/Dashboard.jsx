import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import SalesChart from "../components/SalesChart";
import AddSaleForm from "../components/AddSaleForm";
import FilterButtons from "../components/FilterButtons";
import SalesList from "../components/SalesList";
const API_BASE = "https://saas-dashboard-api-tj2g.onrender.com";

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [sales, setSales] = useState([]);
  const [amount, setAmount] = useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [rangeDays, setRangeDays] = useState(7);

  function getToken() {
    return localStorage.getItem("token");
  }
  async function fetchSummary() {
    const token = getToken();
    const res = await fetch(`${API_BASE}/dashboard/summary`,{
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
    }
    if (!res.ok) throw new Error("Failed to fetch summary");
    const data = await res.json();
    setSummary(data);
  }
    async function fetchSales() {
      const token = getToken();
      const url =`${API_BASE}/sales/filter?days=${rangeDays}`;
      const res = await fetch(url,{
          headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
      }
      if (!res.ok) throw new Error("Failed to fetch sales");
      const data = await res.json();
      setSales(data);
    }
    async function createSale() {
        setError("");
        const value= Number(amount);
        if (!Number.isFinite(value) || value <= 0) {
            setError("Please enter a valid positive number for amount.");
            return;
        }

        const token = getToken();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: value }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.detail || "Failed to create sale");
        return;
      }

      setAmount("");
      await fetchSales();
      await fetchSummary();
    } catch (e) {
      setError(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function init() {
    try {
      setError("");
      await fetchSummary();
      await fetchSales();
    } catch (e) {
      setError(e.message || "Error");
    }
  }

 useEffect(() => {
    const token = getToken();
    if (!token) {
        navigate("/login");
        return;
    }
    init();
}, [rangeDays]);
useEffect(() => {
    if (sales.length === 0) {
        fetchSales();
    }
}, [sales]);
  const filteredSales = sales.filter((s) => {
    if (!s.created_at) return true;
    const t = new Date(s.created_at).getTime();
    const cutoff = Date.now() - rangeDays * 24 * 60 * 60 * 1000;
    return t >= cutoff;
  });

 return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">
                Overview
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Sales Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Track sales performance, monitor recent activity, and manage your
                revenue data from one clean workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Active Range
                </p>
                <p className="mt-1 text-lg font-semibold">{rangeDays} Days</p>
              </div>

              <button
                onClick={logout}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 shadow-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <SummaryCards summary={summary} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Sales Performance
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Visual overview of recent sales activity.
                </p>
              </div>
              <SalesChart sales={filteredSales} />
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Add New Sale
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quickly create a new sales entry.
                </p>
              </div>
              <AddSaleForm
                amount={amount}
                setAmount={setAmount}
                createSale={createSale}
                loading={loading}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Filter Sales
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Switch between different time ranges.
                </p>
              </div>
              <div className="text-sm text-slate-500">
                Showing data for the last{" "}
                <span className="font-semibold text-slate-800">{rangeDays}</span>{" "}
                days
              </div>
            </div>

            <FilterButtons rangeDays={rangeDays} setRangeDays={setRangeDays} />
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Sales
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Detailed list of filtered sales records.
              </p>
            </div>
            <SalesList sales={filteredSales} />
          </div>
        </div>
      </div>
    </div>
  );
}