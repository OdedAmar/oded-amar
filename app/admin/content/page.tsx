"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/types/content";

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const set = (path: string, value: unknown) => {
    if (!content) return;
    const parts = path.split(".");
    const updated = JSON.parse(JSON.stringify(content));
    let cur = updated as Record<string, unknown>;
    for (let i = 0; i < parts.length - 1; i++) {
      cur = cur[parts[i]] as Record<string, unknown>;
    }
    cur[parts[parts.length - 1]] = value;
    setContent(updated);
  };

  const handleImageUpload = async (path: string, file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      set(path, url);
    }
  };

  if (!content) {
    return (
      <div className="flex items-center justify-center py-20 text-brand-gray">
        טוען...
      </div>
    );
  }

  const inputClass =
    "w-full bg-brand-black border border-white/10 text-brand-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-turquoise/60 transition-colors";
  const labelClass = "block text-xs font-medium text-brand-gray/70 mb-1.5";
  const sectionClass = "space-y-4 bg-brand-soft/30 border border-white/8 rounded-2xl p-5";

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "sections", label: "סקשנים" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "קשר" },
    { id: "seo", label: "SEO" },
    { id: "social", label: "עדויות" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-xl font-black text-brand-white">עריכת תוכן</h1>
        <button
          onClick={save}
          disabled={saving}
          className="bg-brand-turquoise hover:bg-brand-turquoise-light disabled:opacity-60 text-brand-black font-bold px-6 py-2 rounded-xl text-sm transition-colors"
        >
          {saving ? "שומר..." : saved ? "נשמר!" : "שמור שינויים"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-brand-turquoise text-brand-black font-bold"
                : "bg-brand-soft text-brand-gray hover:text-brand-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === "hero" && (
          <>
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-brand-white mb-3">Hero Section</h3>
              <div>
                <label className={labelClass}>כותרת ראשית</label>
                <input
                  className={inputClass}
                  value={content.hero.headline}
                  onChange={(e) => set("hero.headline", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>תת-כותרת</label>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={(e) => set("hero.subheadline", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>CTA ראשי</label>
                <input
                  className={inputClass}
                  value={content.hero.ctaPrimary}
                  onChange={(e) => set("hero.ctaPrimary", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>CTA משני (וואטסאפ)</label>
                <input
                  className={inputClass}
                  value={content.hero.ctaSecondary}
                  onChange={(e) => set("hero.ctaSecondary", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>כפתור וידאו</label>
                <input
                  className={inputClass}
                  value={content.hero.videoButtonText}
                  onChange={(e) => set("hero.videoButtonText", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>תמונת פורטרט (URL) — או העלו קובץ</label>
                <div className="flex gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    value={content.hero.portraitUrl}
                    onChange={(e) => set("hero.portraitUrl", e.target.value)}
                  />
                  <label className="cursor-pointer bg-brand-soft border border-white/10 hover:border-brand-turquoise/30 text-brand-gray text-sm px-3 rounded-xl flex items-center transition-colors">
                    העלה
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload("hero.portraitUrl", f);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-brand-white mb-3">לוגו</h3>
              <div>
                <label className={labelClass}>URL לוגו</label>
                <div className="flex gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    value={content.header.logoUrl}
                    onChange={(e) => set("header.logoUrl", e.target.value)}
                  />
                  <label className="cursor-pointer bg-brand-soft border border-white/10 hover:border-brand-turquoise/30 text-brand-gray text-sm px-3 rounded-xl flex items-center transition-colors">
                    העלה
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload("header.logoUrl", f);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-brand-white mb-3">וידאו</h3>
              <div>
                <label className={labelClass}>YouTube Video ID (לדוגמה: LSyWn4tF1EU)</label>
                <input
                  className={inputClass}
                  value={content.video.youtubeId}
                  onChange={(e) => set("video.youtubeId", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>כותרת סקשן וידאו</label>
                <input
                  className={inputClass}
                  value={content.video.headline}
                  onChange={(e) => set("video.headline", e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "sections" && (
          <>
            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-brand-white mb-3">התאמה אישית</h3>
              <div>
                <label className={labelClass}>כותרת</label>
                <input
                  className={inputClass}
                  value={content.customization.headline}
                  onChange={(e) => set("customization.headline", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>טקסט</label>
                <textarea
                  className={inputClass}
                  rows={4}
                  value={content.customization.text}
                  onChange={(e) => set("customization.text", e.target.value)}
                />
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className="text-sm font-bold text-brand-white mb-3">
                מתאים ל (פריטים — שורה לכל פריט)
              </h3>
              <textarea
                className={inputClass}
                rows={6}
                value={content.suitableFor.items.join("\n")}
                onChange={(e) =>
                  set(
                    "suitableFor.items",
                    e.target.value.split("\n").filter(Boolean)
                  )
                }
              />
            </div>
          </>
        )}

        {activeTab === "faq" && (
          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-brand-white">שאלות נפוצות</h3>
              <button
                onClick={() =>
                  set("faq.items", [
                    ...content.faq.items,
                    { question: "שאלה חדשה", answer: "תשובה" },
                  ])
                }
                className="text-xs text-brand-turquoise hover:text-brand-turquoise-light transition-colors"
              >
                הוסף שאלה
              </button>
            </div>
            <div className="space-y-4">
              {content.faq.items.map((item, i) => (
                <div key={i} className="bg-brand-black/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-brand-gray/50">שאלה {i + 1}</span>
                    <button
                      onClick={() =>
                        set(
                          "faq.items",
                          content.faq.items.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      מחק
                    </button>
                  </div>
                  <input
                    className={inputClass}
                    value={item.question}
                    onChange={(e) => {
                      const items = [...content.faq.items];
                      items[i] = { ...items[i], question: e.target.value };
                      set("faq.items", items);
                    }}
                    placeholder="שאלה"
                  />
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={item.answer}
                    onChange={(e) => {
                      const items = [...content.faq.items];
                      items[i] = { ...items[i], answer: e.target.value };
                      set("faq.items", items);
                    }}
                    placeholder="תשובה"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className={sectionClass}>
            <h3 className="text-sm font-bold text-brand-white mb-3">פרטי קשר</h3>
            <div>
              <label className={labelClass}>מספר וואטסאפ (פורמט בינלאומי ללא +, לדוגמה: 972501234567)</label>
              <input
                className={inputClass}
                value={content.contact.whatsappPhone}
                onChange={(e) => set("contact.whatsappPhone", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>אימייל לפניות</label>
              <input
                type="email"
                className={inputClass}
                value={content.contact.email}
                onChange={(e) => set("contact.email", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>כותרת סקשן יצירת קשר</label>
              <input
                className={inputClass}
                value={content.contact.headline}
                onChange={(e) => set("contact.headline", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>תת-כותרת</label>
              <input
                className={inputClass}
                value={content.contact.subheadline}
                onChange={(e) => set("contact.subheadline", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>טקסט כפתור שליחה</label>
              <input
                className={inputClass}
                value={content.contact.ctaText}
                onChange={(e) => set("contact.ctaText", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Footer — טלפון (לתצוגה)</label>
              <input
                className={inputClass}
                value={content.footer.phone}
                onChange={(e) => set("footer.phone", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Footer — אימייל</label>
              <input
                className={inputClass}
                value={content.footer.email}
                onChange={(e) => set("footer.email", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className={sectionClass}>
            <h3 className="text-sm font-bold text-brand-white mb-3">SEO</h3>
            <div>
              <label className={labelClass}>כותרת דף (title)</label>
              <input
                className={inputClass}
                value={content.seo.title}
                onChange={(e) => set("seo.title", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>תיאור (meta description)</label>
              <textarea
                className={inputClass}
                rows={3}
                value={content.seo.description}
                onChange={(e) => set("seo.description", e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className={sectionClass}>
            <h3 className="text-sm font-bold text-brand-white mb-3">עדויות ולוגואים</h3>
            <div className="flex items-center gap-3 mb-4">
              <label className={`${labelClass} mb-0`}>הצג סקשן עדויות</label>
              <button
                onClick={() => set("socialProof.enabled", !content.socialProof.enabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  content.socialProof.enabled ? "bg-brand-turquoise" : "bg-brand-gray/20"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    content.socialProof.enabled ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="text-brand-gray/50 text-xs">
              הסקשן יוצג רק כשמופעל וכשיש לפחות עדות אחת או לוגו אחד.
              הוספת עדויות ולוגואים זמינה דרך עדכון ישיר של ה-API (בגרסה הנוכחית).
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 sticky bottom-0 bg-brand-black/80 backdrop-blur py-4">
        <button
          onClick={save}
          disabled={saving}
          className="w-full sm:w-auto bg-brand-turquoise hover:bg-brand-turquoise-light disabled:opacity-60 text-brand-black font-bold px-8 py-3 rounded-xl text-sm transition-colors"
        >
          {saving ? "שומר..." : saved ? "נשמר בהצלחה!" : "שמור שינויים"}
        </button>
      </div>
    </div>
  );
}
