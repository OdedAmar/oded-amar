"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/types/content";

interface Props {
  header: SiteContent["header"];
  whatsappPhone: string;
}

export default function SiteHeader({ header, whatsappPhone }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${whatsappPhone}`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between gap-4">
        {/* Logo — right side in RTL */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={header.logoUrl}
            alt="עודד אמר"
            width={300}
            height={300}
            className="h-20 w-20 object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-gray">
          {header.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-brand-turquoise transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-brand-turquoise hover:bg-brand-turquoise-light text-brand-black font-bold text-sm px-5 py-2.5 rounded-full transition-colors flex-shrink-0"
        >
          {header.ctaText}
        </a>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-brand-white p-2 rounded-md"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="פתח תפריט"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-soft border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {header.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-gray hover:text-brand-turquoise text-base font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center bg-brand-turquoise hover:bg-brand-turquoise-light text-brand-black font-bold text-sm px-5 py-3 rounded-full transition-colors"
            >
              {header.ctaText}
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center border border-green-500 text-green-400 font-medium text-sm px-5 py-3 rounded-full"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
