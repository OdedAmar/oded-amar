import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "עודד אמר | מופע בידור אינטראקטיבי לאירועי חברה",
  description:
    "מופע בידור אינטראקטיבי עם עודד מנסטר לאירועי חברה, ימי גיבוש וועדי עובדים. סטנדאפ מותאם אישית, משחקים, DJ, תחרות ושיתוף קהל מלא.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full antialiased bg-brand-black text-brand-white">
        {children}
      </body>
    </html>
  );
}
