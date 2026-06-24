import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400">
          <XCircle size={40} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Cancelled</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">No charges were made. You can try again anytime.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-2xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
