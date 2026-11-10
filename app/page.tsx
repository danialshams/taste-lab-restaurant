"use client";
import {useCallback,useEffect,useMemo,useState} from "react";
import {FoodIcon,PizzaIntro,BurgerIllustration,type FoodKind} from "../components/FoodIllustrations";
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
const categories=["همه","پیتزا","برگر","ساندویچ","پاستا","ساید"] as const;
const dishes=[
 {id:1,category:"پیتزا",title:"پیتزا آتشفشان",english:"THE VOLCANO",description:"سس گوجه دست‌ساز، موزارلا، پپرونی تند و عسل چیلی",price:"۴۸۹",image:photos.pizza,tag:"محبوب‌ترین"},
 {id:2,category:"برگر",title:"برگر اسموکی",english:"SMOKE SIGNAL",description:"گوشت آبدار، چدار دودی، خیارشور و سس مخصوص لب",price:"۴۵۹",image:photos.burger,tag:"پیشنهاد سرآشپز"},
 {id:6,category:"ساندویچ",title:"ساندویچ کلب هاوس",english:"THE CLUBHOUSE",description:"نان برشته، مرغ مزه‌دار، سبزیجات و سس مخصوص",price:"۳۹۹",image:photos.burger,tag:"تازه"},
 {id:3,category:"پاستا",title:"پاستا سبز",english:"GREEN THEORY",description:"ریحان تازه، پستو، پارمزان و سیر برشته",price:"۳۸۹",image:photos.pasta,tag:"گیاهی"},
 {id:4,category:"ساید",title:"سیب‌زمینی آزمایشگاهی",english:"CRISPY FORMULA",description:"سیب‌زمینی طلایی با ادویه دست‌ساز و سس پنیر",price:"۱۹۹",image:photos.fries,tag:"کنار غذا"},
 {id:5,category:"ساید",title:"سالاد رنگی",english:"COLOUR CRUNCH",description:"سبزیجات فصل، آووکادو و سس لیمو",price:"۲۷۹",image:photos.salad,tag:"سبک"},
];

function Arrow({size=24}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6 6 18M18 6H8M18 6v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Brand(){return <a className="brand" href="#top" aria-label="TASTE LAB - خانه" dir="ltr"><span className="brand-star"><FoodIcon kind="همه" size={33}/></span><span>TASTE<span className="brand-light">LAB</span></span><small>FOOD EXPERIMENTS</small></a>}
function useAnimations(ready:boolean){
 useEffect(()=>{
  if(!ready)return;
  gsap.registerPlugin(ScrollTrigger);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let lenis:Lenis|undefined,tick:((t:number)=>void)|undefined;
  if(matchMedia("(pointer:fine)").matches){lenis=new Lenis({duration:1.05,smoothWheel:true,anchors:true});tick=(t:number)=>lenis?.raf(t*1000);gsap.ticker.add(tick);lenis.on("scroll",ScrollTrigger.update)}
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>gsap.fromTo(el,{y:45,autoAlpha:0},{y:0,autoAlpha:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true}}));
   gsap.fromTo(".hero-heading span",{y:"110%"},{y:"0%",stagger:.12,duration:1.15,ease:"power4.out"});
   gsap.to(".hero-photo",{yPercent:9,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
   const burger=document.querySelector(".food-burger-builder");
   if(burger){
    const layers=Array.from(burger.querySelectorAll<SVGElement>(".food-burger-layer"));
    const pin=matchMedia("(min-width: 900px)").matches;
    const assemble=gsap.timeline({scrollTrigger:{trigger:burger,start:pin?"top top":"top 80%",end:pin?"+=1650":"bottom 40%",scrub:.7,pin,anticipatePin:1,invalidateOnRefresh:true}});
    layers.forEach((layer,i)=>assemble.fromTo(layer,{y:-265-i*31,autoAlpha:0,rotation:i%2?5:-4},{y:0,autoAlpha:1,rotation:0,duration:.72,ease:"power2.out"},i*.48));
    assemble.fromTo(".food-burger-finish",{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.7},">-.1");
   }
  });
  ScrollTrigger.refresh();
  return()=>{ctx.revert();if(tick)gsap.ticker.remove(tick);lenis?.destroy();ScrollTrigger.getAll().forEach(t=>t.kill())}
 },[ready]);
}

export default function Page(){
 const [ready,setReady]=useState(false),[navOpen,setNavOpen]=useState(false),[category,setCategory]=useState<string>("همه"),[reserveOpen,setReserveOpen]=useState(false),[submitted,setSubmitted]=useState(false),[faq,setFaq]=useState(-1);
 const finishIntro=useCallback(()=>setReady(true),[]);const close=()=>setNavOpen(false);const list=useMemo(()=>category==="همه"?dishes:dishes.filter(d=>d.category===category),[category]);useAnimations(ready);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){close();setReserveOpen(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{document.body.style.overflow=navOpen||reserveOpen?"hidden":"";return()=>{document.body.style.overflow=""}},[navOpen,reserveOpen]);
 return <><PizzaIntro done={finishIntro}/><div className={`site-wrap ${ready?"site-ready":""}`} id="top">
 <header className="site-header"><Brand/><div className="header-links"><a href="#story">داستان ما</a><a href="#menu">منوی غذا</a><a href="#experience">تجربه</a></div><div className="header-actions"><button className="book-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={17}/></button><button className="menu-toggle" aria-label={navOpen?"بستن منو":"باز کردن منوی پیتزایی"} aria-expanded={navOpen} onClick={()=>setNavOpen(v=>!v)}><PizzaIcon size={29}/><span>{navOpen?"بستن":"منو"}</span></button></div></header>
 <div className={`menu-overlay ${navOpen?"open":""}`} aria-hidden={!navOpen}><div className="menu-overlay-top"><span>MENU / 01</span><button onClick={close}>بستن ✕</button></div><nav aria-label="ناوبری سایت">{[["خانه","#top"],["داستان ما","#story"],["منوی غذا","#menu"],["تجربه لب","#experience"],["رزرو میز","#booking"]].map(([t,h],i)=><a key={h} style={{"--order":i} as React.CSSProperties} href={h} onClick={e=>{close();if(h==="#booking"){e.preventDefault();setSubmitted(false);setReserveOpen(true)}}}><span>0{i+1}</span>{t}<Arrow size={36}/></a>)}</nav><div className="overlay-bottom">GOOD FOOD. NO RULES. <span><FoodIcon kind="پیتزا" size={24}/></span></div></div>
 <main>
 <section className="hero" aria-labelledby="hero-title"><div className="hero-picture"><div className="hero-photo" style={{backgroundImage:`linear-gradient(90deg,rgba(15,15,13,.42),rgba(15,15,13,.04)),url('${photos.hero}')`}}/><div className="hero-overlay"/><div className="hero-index">TASTE LAB / FRESH & BOLD / 2026</div><div className="hero-center"><div className="hero-eyebrow" data-reveal>خوشمزه‌تر از چیزی که فکر می‌کنی <span>🍕</span></div><h1 id="hero-title" className="hero-heading"><span>طعم رو</span><span className="hero-heading-outline">زندگی کن.</span></h1><p className="hero-lead">اینجا غذا یه قانون نداره؛ یه ماجراجوییه.</p><a href="#menu" className="hero-round-cta" aria-label="کشف منو"><Arrow size={34}/><span>کشف منو</span></a></div><div className="hero-footer"><span>۰۱ / ۰۵</span><span>برای کشف بیشتر اسکرول کن ↓</span><span>GOOD FOOD. NO RULES.</span></div></div></section>
 <div className="running-strip" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>JUST ONE MORE SLICE <b><FoodIcon kind="پیتزا" size={23}/></b> MADE WITH LOVE <b>🍕</b> NO BORING BITES <b>🍕</b></span>)}</div></div>
 <section className="story content-grid" id="story"><div className="section-aside" data-reveal>01 — داستان آزمایشگاه</div><div className="story-content"><div className="tiny-label" data-reveal>WHAT WE BELIEVE <span>🍕</span></div><h2 data-reveal>ما غذا رو<br/><em>جدی نمی‌گیریم،</em><br/>طعمش رو چرا.</h2><p data-reveal>از اولین برش پیتزا تا آخرین جرعه نوشیدنی، هر جزئیات فرصتیه برای ساختن یک تجربه متفاوت. دستورهای تکراری رو کنار گذاشتیم تا هر بار چیز تازه‌ای کشف کنی.</p><a href="#experience" className="inline-link">درباره تجربه لب <Arrow size={24}/></a></div><div className="story-badge" aria-hidden="true">100%<span>FRESH<br/>IDEAS</span></div></section>
 <section className="food-burger-builder" id="burger-build" aria-labelledby="burger-title">
  <div className="food-burger-copy"><span className="tiny-label">02 / BUILD THE BITE</span><h2 id="burger-title">هر لایه،<br/><em>یه دلیل برای<br/>عاشق‌شدن.</em></h2><p>از نان برشته تا گوشت آبدار، همه‌چی سر جای خودش می‌شینه. اسکرول کن و برگرمون رو لایه‌به‌لایه بساز.</p><div className="food-burger-labels" aria-label="مواد برگر"><span>نان کنجدی</span><span>کاهوی تازه</span><span>گوجه</span><span>چدار</span><span>گوشت</span></div><span className="food-burger-finish">THE PERFECT STACK / 06 LAYERS</span></div>
  <div className="food-burger-stage"><BurgerIllustration/><span className="food-burger-stage-note" dir="ltr">BUILDING YOUR CRAVING · ↓</span></div>
 </section><section className="menu-section" id="menu"><div className="menu-head"><div><span className="tiny-label" data-reveal>02 — THE EXPERIMENTS</span><h2 data-reveal>چی میل داری؟ <i><FoodIcon kind="پیتزا" size={37}/></i></h2></div><p data-reveal>از آشپزخونه ما تا میز تو. با دست درست‌شده، با عشق سرو‌شده.</p></div><div className="filter-row" role="group" aria-label="فیلتر دسته غذاها">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?"active":""}><FoodIcon kind={c as FoodKind} size={30}/><span>{c}</span></button>)}</div><div className="dish-grid">{list.map(d=><article className="dish-card" key={d.id}><div className="dish-photo" style={{backgroundImage:`url('${d.image}')`}}><span className="dish-badge">{d.tag}</span><div className="dish-photo-icon"><FoodIcon kind={d.category as FoodKind} size={27}/></div></div><div className="dish-meta"><span>{d.english}</span><span>{d.category}</span></div><div className="dish-name"><h3>{d.title}</h3><strong>{d.price} <small>هزار تومان</small></strong></div><p>{d.description}</p></article>)}</div><div className="menu-bottom"><span>مزه‌ها برای همه‌اند، قوانین نه.</span><button className="dark-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>یه میز رزرو کن <Arrow size={21}/></button></div></section>
 <section className="experience" id="experience"><div className="experience-image" style={{backgroundImage:`url('${photos.table}')`}}/><div className="experience-cover"/><div className="experience-content"><span className="tiny-label" data-reveal>03 — THE GOOD TIMES</span><h2 data-reveal>اینجا فقط<br/>غذا نمی‌خوریم؛<br/><em>خاطره می‌سازیم.</em></h2><p data-reveal>برای قرارهای بی‌برنامه، خنده‌های بلند و شب‌هایی که دلت نمی‌خواد تموم بشن.</p><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}} className="white-pill">یه جا برام نگه دار <Arrow size={20}/></button></div><span className="experience-side">FRESH STORIES EVERY DAY — TASTE LAB</span></section>
 <section className="manifesto"><div className="manifesto-number">04 / NOT AN ORDINARY KITCHEN</div><div className="manifesto-image" style={{backgroundImage:`url('${photos.chef}')`}}/><div className="manifesto-text"><span className="tiny-label" data-reveal>EVERYTHING FROM SCRATCH</span><h2 data-reveal>کمتر تکرار،<br/><span>بیشتر خلاقیت.</span></h2><p data-reveal>مواد اولیه تازه، ترکیب‌های غیرمنتظره و تیمی که عاشق امتحان‌کردن چیزهای جدیده. هر بشقاب، امضای خودشو داره.</p><div className="manifesto-stamp">MADE DIFFERENTLY <span>🍕</span></div></div></section>
 <section className="faq-section"><div className="faq-head"><span>05 — قبل از اومدن</span><h2 data-reveal>چند سؤال خوشمزه</h2></div><div className="faq-list">{[["رزرو میز الزامیه؟","نه، بدون رزرو هم می‌تونی بیای؛ اما برای روزهای شلوغ بهتره از قبل هماهنگ کنی."],["غذای گیاهی هم دارید؟","بله. در بخش منو چند گزینه گیاهی داریم و ترکیب منو به‌صورت فصلی تغییر می‌کنه."],["این سایت امکان ثبت سفارش آنلاین داره؟","این نسخه یک دموی طراحی رستوران است؛ رزرو و پرداخت واقعی بعد از اتصال به سرویس مربوط فعال می‌شود."]].map(([q,a],i)=><div className={`faq-item ${faq===i?"expanded":""}`} key={i}><button aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}><span>0{i+1}</span>{q}<b>{faq===i?"−":"+"}</b></button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>
 <section className="final-cta" id="booking"><div className="final-star"><FoodIcon kind="همه" size={80}/></div><p>فقط یه میز با یه تجربه تازه فاصله داری.</p><h2>بیا یه چیزی<br/>خوشمزه بسازیم.</h2><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={27}/></button></section>
 </main><footer className="site-footer"><Brand/><div><a href="#story">درباره ما</a><a href="#menu">منوی غذا</a><a href="#experience">تجربه</a></div><div className="footer-details"><span>تهران · ایران — مکان نمایشی</span><span>© TASTE LAB 2026 — DEMO EXPERIENCE</span></div></footer>
 </div>
 {reserveOpen&&<div className="reservation-modal" role="dialog" aria-modal="true" aria-label="رزرو میز نمایشی"><div className="modal-backdrop" onClick={()=>setReserveOpen(false)}/><section className="modal-panel"><div className="modal-top"><span>TASTE LAB / BOOKING</span><button onClick={()=>setReserveOpen(false)} aria-label="بستن">✕</button></div>{submitted?<div className="modal-done"><FoodIcon kind="پیتزا" size={72}/><h2>میزت توی تصورت رزرو شد!</h2><p>این سایت نسخه نمایشی است؛ درخواست ثبت واقعی یا پیامک ارسال نشده است.</p><button className="dark-pill" onClick={()=>setReserveOpen(false)}>بازگشت به سایت</button></div>:<><span className="tiny-label">A TABLE FOR GOOD TIMES</span><h2>یه میز برای<br/><em>خاطره‌های تازه.</em></h2><p>فرم زیر فقط برای نمایش تجربه رزرو طراحی شده است.</p><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>اسم شما<input required maxLength={70} placeholder="نام و نام خانوادگی"/></label><div className="form-two"><label>روز موردنظر<input type="date" min={new Date().toISOString().slice(0,10)} required/></label><label>تعداد نفرات<select defaultValue="2">{Array.from({length:10},(_,i)=><option key={i} value={i+1}>{i+1} نفر</option>)}</select></label></div><label>شماره تماس<input type="tel" placeholder="09xxxxxxxxx" pattern="09[0-9]{9}" required dir="ltr"/></label><button className="dark-pill" type="submit">ثبت رزرو نمایشی <Arrow size={20}/></button></form></>}</section></div>}
 </>
}
