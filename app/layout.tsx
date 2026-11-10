import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "TASTE LAB | آزمایشگاه طعم",
  description: "تجربه‌ای متفاوت از طعم؛ منوی خلاقانه، فضای پرانرژی و رزرو میز در TASTE LAB.",
  metadataBase: new URL("https://taste-lab-restaurant.vercel.app"),
  openGraph: { title: "TASTE LAB — طعم رو جور دیگه تجربه کن", description: "Food is an experiment. Taste is the result.", type: "website", locale: "fa_IR" },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="fa" dir="rtl"><body>{children}</body></html>}
