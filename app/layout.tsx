import type { Metadata } from "next";
import "./globals.css";
import "./food-motion.css";
export const metadata: Metadata = {
  title: "TASTE LAB | آزمایشگاه طعم",
  description: "تجربه‌ای متفاوت از طعم؛ منوی خلاقانه، فضای پرانرژی و رزرو میز در TASTE LAB.",
  metadataBase: new URL("https://taste-lab-restaurant.vercel.app"),
  openGraph: { title: "TASTE LAB — طعم رو جور دیگه تجربه کن", description: "Food is an experiment. Taste is the result.", type: "website", locale: "fa_IR" },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="fa" dir="rtl"><head>
<link rel="preload" as="image" href="/media/hero.jpg" fetchPriority="high"/>
<script dangerouslySetInnerHTML={{__html:"try{var u=navigator.userAgent;var old=/iP(?:hone|ad|od)/.test(u)&&/OS (?:[0-9]|1[0-5])_/.test(u);var m=navigator.deviceMemory;var lite=old||(m&&m<=2)||(navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=2);if(lite)document.documentElement.classList.add('taste-lite-device');setTimeout(function(){var s=document.querySelector('.site-wrap');if(s&&!s.classList.contains('site-ready'))document.documentElement.classList.add('taste-intro-failsafe')},6500)}catch(e){}"}}/>
<style>{".taste-lite-device .food-intro,.taste-intro-failsafe .food-intro{display:none!important}.taste-lite-device .site-wrap,.taste-intro-failsafe .site-wrap{opacity:1!important;visibility:visible!important}"}</style>
</head><body>{children}</body></html>}
