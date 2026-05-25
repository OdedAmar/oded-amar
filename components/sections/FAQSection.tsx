"use client";

import { useState } from "react";
import type { SiteContent } from "@/types/content";

interface Props {
  faq: SiteContent["faq"];
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right text-brand-white font-semibold text-base hover:bg-brand-soft/50 transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-brand-turquoise/40 flex items-center justify-center text-brand-turquoise transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-brand-gray text-sm leading-relaxed border-t border-white/8">
          <div className="pt-4">{answer}</div>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ faq }: Props) {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-brand-soft">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white">
            {faq.headline}
          </h2>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
