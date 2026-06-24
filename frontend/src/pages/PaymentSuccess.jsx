import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <CheckCircle size={40} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Successful!</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">You've upgraded to SaaS Dashboard Pro.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-2xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
