import {useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

export default function Dashboard() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");

    async function fetchSummary(){
        setError("");
        const token = localStorage.getItem("token");
        try {
      const res = await fetch(`${API_BASE}/dashboard/summary/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        if(res.status === 401){
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }
        if (!res.ok) throw new Error("Failed to fetch dashboard summary");
        const data = await res.json();
        setSummary(data);
    }catch (err){
        setError(err.message || "error");
    }
    }
    useEffect(() => {
        fetchSummary();
    }, []);

    function logout(){
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div style={{maxWidth: 520, margin: "60px auto", fontFamily: "Arial"}}>
            <h2>Dashboard Summary</h2>
            <button onClick={logout} style={{marginBottom: 16}}>Logout</button>
            {error && <div style={{color: "crimson"}}>{error}</div>}
            {!summary ? (
                <div>Loading...</div>
            ) : (
                <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }} >
                    <div><b>Total Sales:</b> ${summary.total_sales}</div>
                    <div><b>Total Revenue:</b> ${summary.total_revenue.toFixed(2)}</div>
                </div>
            )}
        </div>

    );}
    
    