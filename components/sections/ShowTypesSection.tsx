import type { SiteContent } from "@/types/content";

interface Props {
  showTypes: SiteContent["showTypes"];
}

export default function ShowTypesSection({ showTypes }: Props) {
  return (
    <section id="shows" className="py-20 lg:py-28 bg-brand-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white">
            {showTypes.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {showTypes.shows.map((show, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 border overflow-hidden ${
                i === 0
                  ? "border-brand-turquoise/40 bg-brand-turquoise/5"
                  : "border-brand-gold/40 bg-brand-gold/5"
              }`}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 inset-x-0 h-0.5 ${
                  i === 0 ? "bg-brand-turquoise" : "bg-brand-gold"
                }`}
              />

              {/* Show name */}
              <h3
                className={`text-xl font-black mb-3 ${
                  i === 0 ? "text-brand-turquoise" : "text-brand-gold"
                }`}
              >
                {show.name}
              </h3>

              {/* Description */}
              <p className="text-brand-gray text-sm leading-relaxed mb-5">
                {show.description}
              </p>

              {/* Duration */}
              <div
                className={`inline-flex items-center gap-1.5 text-sm font-semibold mb-5 ${
                  i === 0 ? "text-brand-turquoise" : "text-brand-gold"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {show.duration}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {show.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-gray">
                    <span
                      className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        i === 0 ? "bg-brand-turquoise" : "bg-brand-gold"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Suitable for */}
              <div>
                <p className="text-xs text-brand-gray/60 font-medium mb-2">מתאים ל:</p>
                <div className="flex flex-wrap gap-2">
                  {show.suitableFor.map((s) => (
                    <span
                      key={s}
                      className={`text-xs px-3 py-1 rounded-full border ${
                        i === 0
                          ? "border-brand-turquoise/30 text-brand-turquoise/80"
                          : "border-brand-gold/30 text-brand-gold/80"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={`mt-6 inline-flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                  i === 0
                    ? "bg-brand-turquoise/15 hover:bg-brand-turquoise/25 text-brand-turquoise"
                    : "bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold"
                }`}
              >
                שאלות? דברו איתנו
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
