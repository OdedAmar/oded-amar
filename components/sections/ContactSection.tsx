"use client";

import { useState, useCallback } from "react";
import TurnstileWidget from "@/components/ui/TurnstileWidget";
import type { SiteContent } from "@/types/content";

interface Props {
  contact: SiteContent["contact"];
  turnstileSiteKey: string;
}

interface FormData {
  fullName: string;
  phone: string;
  eventType: string;
  company: string;
  email: string;
  eventDate: string;
  participants: string;
  location: string;
  packageInterest: string;
  message: string;
  honeypot: string;
}

const initialForm: FormData = {
  fullName: "",
  phone: "",
  eventType: "",
  company: "",
  email: "",
  eventDate: "",
  participants: "",
  location: "",
  packageInterest: "",
  message: "",
  honeypot: "",
};

const eventTypes = [
  "אירוע חברה",
  "יום גיבוש",
  "ועד עובדים",
  "הרמת כוסית",
  "מסיבת סוף שנה",
  "כנס",
  "אחר",
];

const packageOptions = ["ערב מעודד בלבד", "משחקי הכיף בלבד", "שניהם", "עדיין לא יודע"];

export default function ContactSection({ contact, turnstileSiteKey }: Props) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const waUrl = `https://wa.me/${contact.whatsappPhone}?text=${encodeURIComponent("שלום עודד, אני מעוניין לשמוע עוד על המופעים שלך")}`;

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleTurnstile = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "אירעה שגיאה. נסו שוב.");
        return;
      }
      setStatus("success");
      setForm(initialForm);
      setTurnstileToken("");
    } catch {
      setStatus("error");
      setErrorMsg("אירעה שגיאה בשליחה. בדקו את החיבור לאינטרנט ונסו שוב.");
    }
  };

  const inputBase =
    "w-full bg-brand-soft/50 border border-white/10 text-brand-white placeholder-brand-gray/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-turquoise/60 focus:ring-1 focus:ring-brand-turquoise/30 transition-colors";
  const labelBase = "block text-sm font-medium text-brand-gray mb-1.5";

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-black stage-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white mb-4">
            {contact.headline}
          </h2>
          <p className="text-brand-gray text-base">{contact.subheadline}</p>
        </div>

        {status === "success" ? (
          <div className="bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-turquoise/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29C7C7" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-white mb-2">הפרטים התקבלו</h3>
            <p className="text-brand-gray">עודד יחזור אליכם בהקדם עם התאמה לאירוע שלכם.</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-green-500/60 text-green-400 px-6 py-3 rounded-full text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              דברו עם עודד בוואטסאפ
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-brand-soft/30 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-5">
            {/* Honeypot — hidden from humans */}
            <input
              type="text"
              name="website"
              value={form.honeypot}
              onChange={set("honeypot")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Required fields */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>
                  שם מלא <span className="text-brand-turquoise">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="ישראל ישראלי"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>
                  טלפון <span className="text-brand-turquoise">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="050-0000000"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>
                סוג האירוע <span className="text-brand-turquoise">*</span>
              </label>
              <select
                required
                value={form.eventType}
                onChange={set("eventType")}
                className={inputBase}
              >
                <option value="">בחרו סוג אירוע</option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Optional fields */}
            <p className="text-xs text-brand-gray/50 pt-1">השדות הבאים הם אופציונליים</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>חברה / ארגון</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="שם החברה"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>אימייל</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="your@email.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>תאריך האירוע</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={set("eventDate")}
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>כמות משתתפים משוערת</label>
                <input
                  type="text"
                  value={form.participants}
                  onChange={set("participants")}
                  placeholder="לדוגמה: 80 אנשים"
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelBase}>מיקום האירוע</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={set("location")}
                  placeholder="עיר / מקום האירוע"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>תכנית מבוקשת</label>
                <select
                  value={form.packageInterest}
                  onChange={set("packageInterest")}
                  className={inputBase}
                >
                  <option value="">בחרו תכנית</option>
                  {packageOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase}>הודעה חופשית</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={set("message")}
                placeholder="פרטים נוספים, שאלות, בקשות מיוחדות..."
                className={`${inputBase} resize-none`}
              />
            </div>

            {/* Turnstile */}
            {turnstileSiteKey && (
              <TurnstileWidget
                siteKey={turnstileSiteKey}
                onVerify={handleTurnstile}
              />
            )}

            {errorMsg && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex-1 bg-brand-turquoise hover:bg-brand-turquoise-light disabled:opacity-60 text-brand-black font-bold py-4 rounded-full transition-colors text-base"
              >
                {status === "sending" ? "שולח..." : contact.ctaText}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-500/60 hover:border-green-400 text-green-400 font-semibold px-6 py-4 rounded-full transition-all text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {contact.whatsappText}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
