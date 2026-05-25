"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/leads");
      router.refresh();
    } else {
      setError("סיסמה שגויה.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-brand-white mb-1">כניסה לאדמין</h1>
          <p className="text-brand-gray text-sm">עודד אמר | ניהול</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-brand-soft border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-brand-gray mb-1.5">
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-brand-black border border-white/10 text-brand-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-turquoise/60 focus:ring-1 focus:ring-brand-turquoise/30"
              placeholder="הכניסו את הסיסמה"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-turquoise hover:bg-brand-turquoise-light disabled:opacity-60 text-brand-black font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}
