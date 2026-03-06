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
      const url =`${API_BASE}/sales?range_days=${rangeDays}`;
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
    init();
  }, []);

  const filteredSales = sales.filter((s) => {
    if (!s.created_at) return true;
    const t = new Date(s.created_at).getTime();
    const cutoff = Date.now() - rangeDays * 24 * 60 * 60 * 1000;
    return t >= cutoff;
  });

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

      <SummaryCards summary={summary} />
      <SalesChart sales={filteredSales} />
      <AddSaleForm 
        amount={amount} 
        setAmount={setAmount} 
        createSale={createSale} 
        loading={loading} 
      />
      <FilterButtons rangeDays={rangeDays} setRangeDays={setRangeDays} />
      <SalesList sales={filteredSales} />
    </div>
  );
}