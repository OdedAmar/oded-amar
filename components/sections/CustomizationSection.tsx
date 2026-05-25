import type { SiteContent } from "@/types/content";

interface Props {
  customization: SiteContent["customization"];
}

export default function CustomizationSection({ customization }: Props) {
  return (
    <section id="customization" className="py-20 lg:py-28 bg-brand-soft overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-brand-black rounded-2xl p-8 md:p-12 border border-brand-turquoise/20 text-center">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-turquoise/5 to-transparent rounded-2xl pointer-events-none" />

          {/* Quote icon */}
          <div className="w-12 h-12 rounded-full bg-brand-turquoise/10 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-turquoise">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white mb-6 relative">
            {customization.headline}
          </h2>
          <p className="text-brand-gray text-base lg:text-lg leading-relaxed relative max-w-2xl mx-auto">
            {customization.text}
          </p>

          <div className="mt-8 relative">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-turquoise hover:bg-brand-turquoise-light text-brand-black font-bold px-8 py-3.5 rounded-full transition-colors"
            >
              דברו עם עודד על האירוע שלכם
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
