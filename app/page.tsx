"use client";
import {useCallback,useEffect,useMemo,useRef,useState} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";

const photos={
  hero:"/media/hero.jpg",
  pizza:"/media/pizza.jpg",
  burger:"/media/burger.jpg",
  pasta:"/media/pasta.jpg",
  table:"/media/table.jpg",
  salad:"/media/salad.jpg",
  chef:"/media/chef.jpg",
  fries:"/media/fries.jpg"
};
const categories=["همه","پیتزا","برگر","پاستا","ساید"] as const;
const dishes=[
 {id:1,category:"پیتزا",title:"پیتزا آتشفشان",english:"THE VOLCANO",description:"سس گوجه دست‌ساز، موزارلا، پپرونی تند و عسل چیلی",price:"۴۸۹",image:photos.pizza,tag:"محبوب‌ترین"},
 {id:2,category:"برگر",title:"برگر اسموکی",english:"SMOKE SIGNAL",description:"گوشت آبدار، چدار دودی، خیارشور و سس مخصوص لب",price:"۴۵۹",image:photos.burger,tag:"پیشنهاد سرآشپز"},
 {id:3,category:"پاستا",title:"پاستا سبز",english:"GREEN THEORY",description:"ریحان تازه، پستو، پارمزان و سیر برشته",price:"۳۸۹",image:photos.pasta,tag:"گیاهی"},
 {id:4,category:"ساید",title:"سیب‌زمینی آزمایشگاهی",english:"CRISPY FORMULA",description:"سیب‌زمینی طلایی با ادویه دست‌ساز و سس پنیر",price:"۱۹۹",image:photos.fries,tag:"کنار غذا"},
 {id:5,category:"ساید",title:"سالاد رنگی",english:"COLOUR CRUNCH",description:"سبزیجات فصل، آووکادو و سس لیمو",price:"۲۷۹",image:photos.salad,tag:"سبک"},
];

function PizzaIcon({size=34}:{size?:number}) {return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 8C19 3 31 3 41 9L23 43 8 8Z" fill="currentColor"/><path d="M8 8C19 3 31 3 41 9" stroke="#171713" strokeWidth="4" strokeLinecap="round"/><circle cx="24" cy="20" r="3" fill="#171713"/><circle cx="19" cy="12" r="2.8" fill="#171713"/><circle cx="29" cy="29" r="2.5" fill="#171713"/></svg>}
function Arrow({size=24}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6 6 18M18 6H8M18 6v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Brand(){return <a className="brand" href="#top" aria-label="TASTE LAB - خانه" dir="ltr"><span className="brand-star">✳</span><span>TASTE<span className="brand-light">LAB</span></span><small>FOOD EXPERIMENTS</small></a>}
function PizzaAssembly({active}:{active:boolean}){
 const outer = "M 110 110 L 77.09 30.55 A 86 86 0 0 1 142.91 30.55 Z";
 const cheese = "M 110 110 L 81.30 40.71 A 75 75 0 0 1 138.70 40.71 Z";
 const crust = "M 77.09 30.55 A 86 86 0 0 1 142.91 30.55";
 return <svg className={`pizza-assembly ${active?"is-active":""}`} viewBox="0 0 220 220" role="img" aria-label="هشت برش پیتزای واقعی که یکی پس از دیگری به شکل مارپیچ یک پیتزا را کامل می‌کنند">
   <defs>
     <linearGradient id="slice-cheese" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe69b"/><stop offset=".44" stopColor="#f9b63c"/><stop offset="1" stopColor="#ef8e21"/></linearGradient>
     <linearGradient id="slice-crust" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9a257"/><stop offset=".6" stopColor="#b96b2e"/><stop offset="1" stopColor="#ffca7d"/></linearGradient>
     <filter id="pizza-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#4b1d10" floodOpacity=".32"/></filter>
   </defs>
   <g filter="url(#pizza-shadow)">
   {Array.from({length:8},(_,i)=>{
     const angle=i*Math.PI/4;
     const style={"--i":i,"--sx":`${Math.round(-73*Math.sin(angle))}px`,"--sy":`${Math.round(-73*(1-Math.cos(angle)))}px`} as React.CSSProperties;
     return <g key={i} className={`pizza-piece ${i===0?"pizza-piece--first":""}`} style={style}>
       <g transform={`rotate(${i*45} 110 110)`}>
         <path d={outer} fill="#b74019" stroke="#8d361a" strokeWidth="1.2"/>
         <path d={cheese} fill="url(#slice-cheese)" stroke="#d86f20" strokeWidth="1"/>
         <path d={crust} fill="none" stroke="url(#slice-crust)" strokeWidth="12" strokeLinecap="round"/>
         <path d={crust} fill="none" stroke="#fbd493" strokeWidth="2.2" opacity=".8"/>
         <circle cx="108" cy="53" r="9.3" fill="#ad3024" stroke="#e86b3c" strokeWidth="2"/>
         <circle cx="122" cy="68" r="6.5" fill="#be3727" stroke="#ee874f" strokeWidth="1.6"/>
         <circle cx="101" cy="83" r="6.5" fill="#a53124" stroke="#ee874f" strokeWidth="1.8"/>
         <path d="M 110 89 Q 95 88 99 98 Q 109 102 110 89 M 110 89 Q 124 87 121 98 Q 113 102 110 89" fill="#338447" stroke="#1c6c37" strokeWidth=".5"/>
         <ellipse cx="91" cy="61" rx="4" ry="2" transform="rotate(-30 91 61)" fill="#fff0b7" opacity=".85"/>
         <circle cx="116" cy="93" r="2.4" fill="#f8dd88"/>
       </g>
     </g>;
   })}
   </g>
 </svg>;
}
function Intro({done}:{done:()=>void}){
 const [active,setActive]=useState(false),[show,setShow]=useState(true);
 const completed=useRef(false);
 const finish=useCallback(()=>{
   if(completed.current)return;
   completed.current=true;
   try{sessionStorage.setItem("taste-intro-seen-v2","1")}catch{}
   setShow(false);done();
 },[done]);
 useEffect(()=>{
   let seen=false;try{seen=sessionStorage.getItem("taste-intro-seen-v2")==="1"}catch{}
   if(seen||window.matchMedia("(prefers-reduced-motion: reduce)").matches){const raf=requestAnimationFrame(finish);return()=>cancelAnimationFrame(raf)}
   const frame=requestAnimationFrame(()=>setActive(true));
   const timer=window.setTimeout(finish,2800);
   return()=>{cancelAnimationFrame(frame);clearTimeout(timer)};
 },[finish]);
 if(!show)return null;
 return <div className="pizza-intro" role="status" aria-label="در حال آماده‌سازی پیتزا" onClick={finish}>
   <PizzaAssembly active={active}/>
   <div className="intro-title" dir="ltr">TASTE LAB<span>✳</span></div>
   <p>از یک برش شروع می‌شه؛ به یک تجربه کامل می‌رسه.</p>
   <span className="intro-skip">برای عبور لمس کن</span>
 </div>;
}
function useAnimations(ready:boolean){useEffect(()=>{if(!ready)return;const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;gsap.registerPlugin(ScrollTrigger);if(reduced)return;const lenis=new Lenis({duration:1.12,smoothWheel:true,anchors:true,touchMultiplier:1.2});const tick=(time:number)=>lenis.raf(time*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);lenis.on("scroll",ScrollTrigger.update);const ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el)=>gsap.fromTo(el,{y:65,opacity:0},{y:0,opacity:1,duration:1.0,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));gsap.fromTo(".hero-heading span",{y:"110%"},{y:"0%",stagger:.13,duration:1.25,ease:"power4.out",delay:.1});gsap.to(".hero-photo",{yPercent:12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});gsap.utils.toArray<HTMLElement>(".dish-card").forEach((el,i)=>gsap.fromTo(el,{y:90,opacity:0,rotate:i%2?3:-3},{y:0,opacity:1,rotate:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true}}));});ScrollTrigger.refresh();return()=>{ctx.revert();gsap.ticker.remove(tick);lenis.destroy();ScrollTrigger.getAll().forEach(t=>t.kill())}},[ready])}

export default function Page(){
 const [ready,setReady]=useState(false),[navOpen,setNavOpen]=useState(false),[category,setCategory]=useState<string>("همه"),[reserveOpen,setReserveOpen]=useState(false),[submitted,setSubmitted]=useState(false),[faq,setFaq]=useState(-1);
 const finishIntro=useCallback(()=>setReady(true),[]);const close=()=>setNavOpen(false);const list=useMemo(()=>category==="همه"?dishes:dishes.filter(d=>d.category===category),[category]);useAnimations(ready);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){close();setReserveOpen(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{document.body.style.overflow=navOpen||reserveOpen?"hidden":"";return()=>{document.body.style.overflow=""}},[navOpen,reserveOpen]);
 return <><Intro done={finishIntro}/><div className={`site-wrap ${ready?"site-ready":""}`} id="top">
 <header className="site-header"><Brand/><div className="header-links"><a href="#story">داستان ما</a><a href="#menu">منوی غذا</a><a href="#experience">تجربه</a></div><div className="header-actions"><button className="book-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={17}/></button><button className="menu-toggle" aria-label={navOpen?"بستن منو":"باز کردن منوی پیتزایی"} aria-expanded={navOpen} onClick={()=>setNavOpen(v=>!v)}><PizzaIcon size={29}/><span>{navOpen?"بستن":"منو"}</span></button></div></header>
 <div className={`menu-overlay ${navOpen?"open":""}`} aria-hidden={!navOpen}><div className="menu-overlay-top"><span>MENU / 01</span><button onClick={close}>بستن ✕</button></div><nav aria-label="ناوبری سایت">{[["خانه","#top"],["داستان ما","#story"],["منوی غذا","#menu"],["تجربه لب","#experience"],["رزرو میز","#booking"]].map(([t,h],i)=><a key={h} style={{"--order":i} as React.CSSProperties} href={h} onClick={e=>{close();if(h==="#booking"){e.preventDefault();setSubmitted(false);setReserveOpen(true)}}}><span>0{i+1}</span>{t}<Arrow size={36}/></a>)}</nav><div className="overlay-bottom">GOOD FOOD. NO RULES. <span>✳</span></div></div>
 <main>
 <section className="hero" aria-labelledby="hero-title"><div className="hero-picture"><div className="hero-photo" style={{backgroundImage:`linear-gradient(90deg,rgba(15,15,13,.42),rgba(15,15,13,.04)),url('${photos.hero}')`}}/><div className="hero-overlay"/><div className="hero-index">TASTE LAB / FRESH & BOLD / 2026</div><div className="hero-center"><div className="hero-eyebrow" data-reveal>خوشمزه‌تر از چیزی که فکر می‌کنی <span>✳</span></div><h1 id="hero-title" className="hero-heading"><span>طعم رو</span><span className="hero-heading-outline">زندگی کن.</span></h1><p className="hero-lead">اینجا غذا یه قانون نداره؛ یه ماجراجوییه.</p><a href="#menu" className="hero-round-cta" aria-label="کشف منو"><Arrow size={34}/><span>کشف منو</span></a></div><div className="hero-footer"><span>۰۱ / ۰۵</span><span>برای کشف بیشتر اسکرول کن ↓</span><span>GOOD FOOD. NO RULES.</span></div></div></section>
 <div className="running-strip" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>JUST ONE MORE SLICE <b>✳</b> MADE WITH LOVE <b>✳</b> NO BORING BITES <b>✳</b></span>)}</div></div>
 <section className="story content-grid" id="story"><div className="section-aside" data-reveal>01 — داستان آزمایشگاه</div><div className="story-content"><div className="tiny-label" data-reveal>WHAT WE BELIEVE <span>✳</span></div><h2 data-reveal>ما غذا رو<br/><em>جدی نمی‌گیریم،</em><br/>طعمش رو چرا.</h2><p data-reveal>از اولین برش پیتزا تا آخرین جرعه نوشیدنی، هر جزئیات فرصتیه برای ساختن یک تجربه متفاوت. دستورهای تکراری رو کنار گذاشتیم تا هر بار چیز تازه‌ای کشف کنی.</p><a href="#experience" className="inline-link">درباره تجربه لب <Arrow size={24}/></a></div><div className="story-badge" aria-hidden="true">100%<span>FRESH<br/>IDEAS</span></div></section>
 <section className="menu-section" id="menu"><div className="menu-head"><div><span className="tiny-label" data-reveal>02 — THE EXPERIMENTS</span><h2 data-reveal>چی میل داری؟ <i>✳</i></h2></div><p data-reveal>از آشپزخونه ما تا میز تو. با دست درست‌شده، با عشق سرو‌شده.</p></div><div className="filter-row" role="group" aria-label="فیلتر دسته غذاها">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?"active":""}>{c}{c==="پیتزا"?" 🍕":c==="برگر"?" 🍔":""}</button>)}</div><div className="dish-grid">{list.map(d=><article className="dish-card" key={d.id}><div className="dish-photo" style={{backgroundImage:`url('${d.image}')`}}><span className="dish-badge">{d.tag}</span><div className="dish-photo-icon">✳</div></div><div className="dish-meta"><span>{d.english}</span><span>{d.category}</span></div><div className="dish-name"><h3>{d.title}</h3><strong>{d.price} <small>هزار تومان</small></strong></div><p>{d.description}</p></article>)}</div><div className="menu-bottom"><span>مزه‌ها برای همه‌اند، قوانین نه.</span><button className="dark-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>یه میز رزرو کن <Arrow size={21}/></button></div></section>
 <section className="experience" id="experience"><div className="experience-image" style={{backgroundImage:`url('${photos.table}')`}}/><div className="experience-cover"/><div className="experience-content"><span className="tiny-label" data-reveal>03 — THE GOOD TIMES</span><h2 data-reveal>اینجا فقط<br/>غذا نمی‌خوریم؛<br/><em>خاطره می‌سازیم.</em></h2><p data-reveal>برای قرارهای بی‌برنامه، خنده‌های بلند و شب‌هایی که دلت نمی‌خواد تموم بشن.</p><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}} className="white-pill">یه جا برام نگه دار <Arrow size={20}/></button></div><span className="experience-side">FRESH STORIES EVERY DAY — TASTE LAB</span></section>
 <section className="manifesto"><div className="manifesto-number">04 / NOT AN ORDINARY KITCHEN</div><div className="manifesto-image" style={{backgroundImage:`url('${photos.chef}')`}}/><div className="manifesto-text"><span className="tiny-label" data-reveal>EVERYTHING FROM SCRATCH</span><h2 data-reveal>کمتر تکرار،<br/><span>بیشتر خلاقیت.</span></h2><p data-reveal>مواد اولیه تازه، ترکیب‌های غیرمنتظره و تیمی که عاشق امتحان‌کردن چیزهای جدیده. هر بشقاب، امضای خودشو داره.</p><div className="manifesto-stamp">MADE DIFFERENTLY <span>✳</span></div></div></section>
 <section className="faq-section"><div className="faq-head"><span>05 — قبل از اومدن</span><h2 data-reveal>چند سؤال خوشمزه</h2></div><div className="faq-list">{[["رزرو میز الزامیه؟","نه، بدون رزرو هم می‌تونی بیای؛ اما برای روزهای شلوغ بهتره از قبل هماهنگ کنی."],["غذای گیاهی هم دارید؟","بله. در بخش منو چند گزینه گیاهی داریم و ترکیب منو به‌صورت فصلی تغییر می‌کنه."],["این سایت امکان ثبت سفارش آنلاین داره؟","این نسخه یک دموی طراحی رستوران است؛ رزرو و پرداخت واقعی بعد از اتصال به سرویس مربوط فعال می‌شود."]].map(([q,a],i)=><div className={`faq-item ${faq===i?"expanded":""}`} key={i}><button aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}><span>0{i+1}</span>{q}<b>{faq===i?"−":"+"}</b></button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>
 <section className="final-cta" id="booking"><div className="final-star">✳</div><p>فقط یه میز با یه تجربه تازه فاصله داری.</p><h2>بیا یه چیزی<br/>خوشمزه بسازیم.</h2><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={27}/></button></section>
 </main><footer className="site-footer"><Brand/><div><a href="#story">درباره ما</a><a href="#menu">منوی غذا</a><a href="#experience">تجربه</a></div><div className="footer-details"><span>تهران · ایران — مکان نمایشی</span><span>© TASTE LAB 2026 — DEMO EXPERIENCE</span></div></footer>
 </div>
 {reserveOpen&&<div className="reservation-modal" role="dialog" aria-modal="true" aria-label="رزرو میز نمایشی"><div className="modal-backdrop" onClick={()=>setReserveOpen(false)}/><section className="modal-panel"><div className="modal-top"><span>TASTE LAB / BOOKING</span><button onClick={()=>setReserveOpen(false)} aria-label="بستن">✕</button></div>{submitted?<div className="modal-done"><PizzaIcon size={72}/><h2>میزت توی تصورت رزرو شد!</h2><p>این سایت نسخه نمایشی است؛ درخواست ثبت واقعی یا پیامک ارسال نشده است.</p><button className="dark-pill" onClick={()=>setReserveOpen(false)}>بازگشت به سایت</button></div>:<><span className="tiny-label">A TABLE FOR GOOD TIMES</span><h2>یه میز برای<br/><em>خاطره‌های تازه.</em></h2><p>فرم زیر فقط برای نمایش تجربه رزرو طراحی شده است.</p><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>اسم شما<input required maxLength={70} placeholder="نام و نام خانوادگی"/></label><div className="form-two"><label>روز موردنظر<input type="date" min={new Date().toISOString().slice(0,10)} required/></label><label>تعداد نفرات<select defaultValue="2">{Array.from({length:10},(_,i)=><option key={i} value={i+1}>{i+1} نفر</option>)}</select></label></div><label>شماره تماس<input type="tel" placeholder="09xxxxxxxxx" pattern="09[0-9]{9}" required dir="ltr"/></label><button className="dark-pill" type="submit">ثبت رزرو نمایشی <Arrow size={20}/></button></form></>}</section></div>}
 </>
}
