import Image from "next/image";
import type { SiteContent } from "@/types/content";

interface Props {
  hero: SiteContent["hero"];
  whatsappPhone: string;
}

export default function HeroSection({ hero, whatsappPhone }: Props) {
  const waUrl = `https://wa.me/${whatsappPhone}`;

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-24">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-turquoise/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content — right in RTL */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-turquoise/10 border border-brand-turquoise/30 text-brand-turquoise text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              מעל 20 שנות ניסיון בבמה
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-white leading-tight mb-5">
              {hero.headline.split(".").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}.
                    <br />
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-brand-gray text-base sm:text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              {hero.subheadline}
            </p>

            {/* Value props */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mb-8 justify-center lg:justify-start flex-wrap">
              {hero.valueProps.map((prop) => (
                <div
                  key={prop}
                  className="flex items-center gap-2 text-sm text-brand-gray"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise flex-shrink-0" />
                  {prop}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-brand-turquoise hover:bg-brand-turquoise-light text-brand-black font-bold text-base px-7 py-4 rounded-full transition-all duration-200 hover:scale-105 glow-turquoise"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-500/60 hover:border-green-400 text-green-400 hover:text-green-300 font-semibold text-base px-7 py-4 rounded-full transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {hero.ctaSecondary}
              </a>
            </div>

            {/* Video button */}
            <div className="mt-5">
              <a
                href="#video"
                className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-turquoise text-sm font-medium transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-brand-gray/40 group-hover:border-brand-turquoise flex items-center justify-center transition-colors">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M0 0l10 6-10 6V0z" />
                  </svg>
                </span>
                {hero.videoButtonText}
              </a>
            </div>
          </div>

          {/* Portrait image — left in RTL */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]">
              {/* Glow behind image */}
              <div className="absolute inset-4 bg-brand-turquoise/10 rounded-2xl blur-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-brand-turquoise/20">
                <Image
                  src={hero.portraitUrl}
                  alt="עודד מנסטר"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
                {/* Subtle bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-brand-black/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-brand-gold text-brand-black text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-brand-gold/20">
                +20 שנות ניסיון
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
