import type { SiteContent } from "@/types/content";

interface Props {
  whyItWorks: SiteContent["whyItWorks"];
}

const icons: Record<number, React.ReactNode> = {
  0: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  1: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  2: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  3: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function WhyItWorksSection({ whyItWorks }: Props) {
  return (
    <section id="why" className="py-20 lg:py-28 bg-brand-black stage-gradient">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white">
            {whyItWorks.headline}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {whyItWorks.items.map((item, i) => (
            <div
              key={i}
              className="bg-brand-soft/60 border border-white/8 rounded-2xl p-6 hover:border-brand-turquoise/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center mb-4 group-hover:bg-brand-turquoise/20 transition-colors">
                {icons[i]}
              </div>
              <h3 className="text-lg font-bold text-brand-white mb-2">
                {item.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
