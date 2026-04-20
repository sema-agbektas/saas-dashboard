import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://saas-dashboard-api-tj2g.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      let res;
      for (let i = 0; i < 3; i++) {
        try {
          res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (res.ok) break;
        } catch {
          if (i < 2) await new Promise(r => setTimeout(r, 3000));
        }
      }
      if (!res) throw new Error("Connection failed");

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      setMsg("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMsg("Connection error: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-slate-950" />
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 p-10 xl:p-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              SaaS Analytics Platform
            </div>

            <div className="mt-10 max-w-xl">
              <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
                Track revenue, monitor sales, and manage your dashboard with clarity.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300 xl:text-lg">
                A clean analytics experience built for modern businesses. Secure login,
                real-time sales overview, and a streamlined workflow.
              </p>
            </div>
          </div>

          <div className="relative z-10 p-10 xl:p-14">
            <div className="grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-400">Revenue</p>
                <p className="mt-2 text-2xl font-semibold">$48.2K</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-400">Growth</p>
                <p className="mt-2 text-2xl font-semibold">+18.4%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-400">Orders</p>
                <p className="mt-2 text-2xl font-semibold">1,284</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side / form */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SaaS Analytics Platform
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300">
                  Welcome back
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Access your sales dashboard and continue managing your analytics.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-200">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-300 transition hover:text-blue-200"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {msg && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      msg.toLowerCase().includes("successful")
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-red-500/30 bg-red-500/10 text-red-300"
                    }`}
                  >
                    {msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-center text-sm text-slate-400">
                  Demo credentials are prefilled for quick access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}