"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/types/content";

const eventTypeLabels: Record<string, string> = {};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("he-IL", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "handled">("all");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleHandled = async (lead: Lead) => {
    const updated = { ...lead, handled: !lead.handled };
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? updated : l))
    );
    await fetch(`/api/admin/lead/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handled: updated.handled }),
    });
  };

  const filtered = leads.filter((l) => {
    if (filter === "pending") return !l.handled;
    if (filter === "handled") return l.handled;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-brand-gray">
        טוען...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-brand-white">פניות</h1>
          <p className="text-brand-gray text-sm mt-0.5">
            {leads.length} פניות סה&quot;כ
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "handled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                filter === f
                  ? "bg-brand-turquoise text-brand-black font-bold"
                  : "bg-brand-soft text-brand-gray hover:text-brand-white"
              }`}
            >
              {f === "all" ? "הכל" : f === "pending" ? "לטיפול" : "טופל"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-brand-soft border border-white/8 rounded-2xl p-10 text-center text-brand-gray">
          אין פניות עדיין.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className={`bg-brand-soft border rounded-2xl p-5 transition-colors ${
                lead.handled
                  ? "border-white/5 opacity-60"
                  : "border-brand-turquoise/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-bold text-brand-white text-base">
                      {lead.fullName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-turquoise/10 text-brand-turquoise">
                      {lead.eventType}
                    </span>
                    {lead.handled && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                        טופל
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1 text-sm text-brand-gray">
                    <span>
                      <span className="text-brand-gray/50 text-xs">טלפון:</span>{" "}
                      <a href={`tel:${lead.phone}`} className="hover:text-brand-white transition-colors">
                        {lead.phone}
                      </a>
                    </span>
                    {lead.company && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">חברה:</span>{" "}
                        {lead.company}
                      </span>
                    )}
                    {lead.email && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">אימייל:</span>{" "}
                        <a href={`mailto:${lead.email}`} className="hover:text-brand-white transition-colors">
                          {lead.email}
                        </a>
                      </span>
                    )}
                    {lead.eventDate && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">תאריך:</span>{" "}
                        {lead.eventDate}
                      </span>
                    )}
                    {lead.participants && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">משתתפים:</span>{" "}
                        {lead.participants}
                      </span>
                    )}
                    {lead.location && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">מיקום:</span>{" "}
                        {lead.location}
                      </span>
                    )}
                    {lead.packageInterest && (
                      <span>
                        <span className="text-brand-gray/50 text-xs">תכנית:</span>{" "}
                        {lead.packageInterest}
                      </span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="mt-3 text-sm text-brand-gray/70 bg-brand-black/30 rounded-lg px-3 py-2 border-r-2 border-brand-turquoise/30">
                      {lead.message}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-brand-gray/40">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() => toggleHandled(lead)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    lead.handled
                      ? "border-white/10 text-brand-gray hover:border-brand-turquoise/30 hover:text-brand-turquoise"
                      : "border-green-500/40 text-green-400 hover:bg-green-500/10"
                  }`}
                >
                  {lead.handled ? "סמן כלא טופל" : "סמן כטופל"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
