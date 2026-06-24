import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Moon, Sun, LogOut, LayoutDashboard, Settings, Bell } from "lucide-react";
import api from "../api/axios";
import { useTheme } from "../context/ThemeContext";

import SummaryCards from "../components/SummaryCards";
import SalesChart from "../components/SalesChart";
import AddSaleForm from "../components/AddSaleForm";
import FilterButtons from "../components/FilterButtons";
import SalesList from "../components/SalesList";

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [amount, setAmount] = useState("");
  const [rangeDays, setRangeDays] = useState(7);

  // Veri Çekme (Queries)
  const { data: summary, isLoading: isSummaryLoading, isError: isSummaryError } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/summary");
      return data;
    },
  });

  const { data: sales = [], isLoading: isSalesLoading, isError: isSalesError } = useQuery({
    queryKey: ["sales", rangeDays],
    queryFn: async () => {
      const { data } = await api.get(`/sales/filter?days=${rangeDays}`);
      return data;
    },
  });

  // Yeni Satış Ekleme (Mutation)
  const createSaleMutation = useMutation({
    mutationFn: async (value) => {
      const { data } = await api.post("/sales", { amount: value });
      return data;
    },
    onSuccess: () => {
      toast.success("Sale added successfully!");
      setAmount("");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || "Failed to add sale.");
    },
  });

  function createSale() {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Please enter a valid positive number for amount.");
      return;
    }
    createSaleMutation.mutate(value);
  }

  async function handleUpgrade() {
    try {
      const { data } = await api.post("/payments/create-checkout-session");
      window.location.href = data.checkout_url;
    } catch {
      toast.error("Failed to start checkout. Please try again.");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  }

  const isLoading = isSummaryLoading || isSalesLoading;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <LayoutDashboard size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">SaaS<span className="text-blue-500">Board</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              <Bell size={20} />
            </button>
            <button 
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-blue-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Live Overview
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome back, User
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Here's what's happening with your projects today. Monitor sales, track revenue, and analyze growth.
              </p>
            </div>
          </div>
        </div>

        {(isSummaryError || isSalesError) && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            Failed to load data. Please refresh the page.
          </div>
        )}

        {/* Top Cards */}
        <div className="mb-8">
          {isLoading ? (
             <div className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
          ) : (
             <SummaryCards summary={summary} />
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          
          {/* Main Chart Area */}
          <div className="xl:col-span-2 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Revenue Analytics
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Visual overview of your recent performance.
                  </p>
                </div>
                <FilterButtons rangeDays={rangeDays} setRangeDays={setRangeDays} />
              </div>
              
              {isLoading ? (
                 <div className="h-72 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
              ) : (
                 <SalesChart sales={sales} isDarkMode={isDarkMode} />
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recent Transactions
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Detailed list of your latest sales records.
                </p>
              </div>
              {isLoading ? (
                 <div className="space-y-4">
                    <div className="h-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                 </div>
              ) : (
                 <SalesList sales={sales} />
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <AddSaleForm
                amount={amount}
                setAmount={setAmount}
                createSale={createSale}
                loading={createSaleMutation.isPending}
              />
            </div>
            
            {/* Promo / Info Card */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-white/20 p-3 backdrop-blur-md">
                <Settings size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Pro Features</h3>
              <p className="mb-6 text-sm text-blue-100">
                Unlock advanced analytics, multiple team members, and custom reports.
              </p>
              <button onClick={handleUpgrade} className="w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-600 transition hover:bg-slate-50">
                Upgrade Plan
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}