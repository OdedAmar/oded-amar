import { getContent } from "@/lib/content";
import SiteHeader from "@/components/sections/SiteHeader";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import WhyItWorksSection from "@/components/sections/WhyItWorksSection";
import ShowTypesSection from "@/components/sections/ShowTypesSection";
import WhatIncludedSection from "@/components/sections/WhatIncludedSection";
import CustomizationSection from "@/components/sections/CustomizationSection";
import SuitableForSection from "@/components/sections/SuitableForSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default async function Home() {
  const content = await getContent();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:bg-brand-turquoise focus:text-brand-black focus:px-4 focus:py-2 focus:rounded-lg"
      >
        דלג לתוכן
      </a>

      <SiteHeader
        header={content.header}
        whatsappPhone={content.contact.whatsappPhone}
      />

      <main id="main">
        <HeroSection
          hero={content.hero}
          whatsappPhone={content.contact.whatsappPhone}
        />
        <VideoSection video={content.video} />
        <WhyItWorksSection whyItWorks={content.whyItWorks} />
        <ShowTypesSection showTypes={content.showTypes} />
        <WhatIncludedSection whatIncluded={content.whatIncluded} />
        <CustomizationSection customization={content.customization} />
        <SuitableForSection suitableFor={content.suitableFor} />
        <SocialProofSection socialProof={content.socialProof} />
        <FAQSection faq={content.faq} />
        <ContactSection
          contact={content.contact}
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>

      <SiteFooter
        footer={content.footer}
        header={content.header}
        contact={content.contact}
      />

      <WhatsAppButton phone={content.contact.whatsappPhone} />
    </>
  );
}
