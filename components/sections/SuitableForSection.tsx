import type { SiteContent } from "@/types/content";

interface Props {
  suitableFor: SiteContent["suitableFor"];
}

export default function SuitableForSection({ suitableFor }: Props) {
  return (
    <section id="suitable" className="py-20 lg:py-28 bg-brand-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white">
            {suitableFor.headline}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {suitableFor.items.map((item, i) => (
            <div
              key={i}
              className="bg-brand-soft/60 border border-white/8 hover:border-brand-turquoise/40 text-brand-gray hover:text-brand-white px-5 py-3 rounded-full text-sm font-medium transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
