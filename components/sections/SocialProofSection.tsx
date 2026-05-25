import type { SiteContent } from "@/types/content";

interface Props {
  socialProof: SiteContent["socialProof"];
}

export default function SocialProofSection({ socialProof }: Props) {
  const hasContent =
    socialProof.enabled &&
    (socialProof.testimonials.length > 0 || socialProof.logos.length > 0);

  if (!hasContent) return null;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-brand-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Client logos */}
        {socialProof.logos.length > 0 && (
          <div className="mb-16">
            <p className="text-center text-brand-gray/60 text-sm font-medium mb-8">
              בין הלקוחות
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {socialProof.logos.map((logo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={logo.url}
                  alt={logo.name}
                  className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {socialProof.testimonials.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialProof.testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-brand-black/60 border border-white/8 rounded-2xl p-6"
              >
                <p className="text-brand-gray text-sm leading-relaxed mb-5">
                  {t.text}
                </p>
                <div className="border-t border-white/8 pt-4">
                  <p className="text-brand-white font-semibold text-sm">{t.name}</p>
                  <p className="text-brand-gray/60 text-xs mt-0.5">
                    {t.role}
                    {t.company && `, ${t.company}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
