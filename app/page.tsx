"use client";
import {useCallback,useEffect,useMemo,useState} from "react";
import {FoodIcon,PizzaIntro,BurgerIllustration,CutleryCloseIcon,type FoodKind} from "../components/FoodIllustrations";
import PastaRitual from "../components/PastaRitual";
import Image from "next/image";
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
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced)return;
  let lenis:Lenis|undefined, tick:((t:number)=>void)|undefined;
  if(window.matchMedia("(pointer:fine)").matches){
   lenis=new Lenis({duration:1.02,smoothWheel:true,anchors:true});
   tick=(time:number)=>lenis?.raf(time*1000);
   gsap.ticker.add(tick);
   lenis.on("scroll",ScrollTrigger.update);
  }
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>{
    gsap.fromTo(el,{y:35,autoAlpha:0},{
      y:0,autoAlpha:1,duration:.94,ease:"power3.out",
      scrollTrigger:{trigger:el,start:"top 91%",once:true}
    });
   });
   gsap.fromTo(".hero-heading span",{y:"110%"},{y:"0%",stagger:.13,duration:1.13,ease:"power4.out"});
   gsap.to(".hero-photo",{yPercent:8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
   // Reaches the burger => play ONE standalone GSAP timeline, independent from scrolling.
   const burger=document.querySelector<HTMLElement>(".food-burger-builder");
   const burgerStage=burger?.querySelector<HTMLElement>(".food-burger-stage");
   if(burger&&burgerStage){
    const layers=Array.from(burgerStage.querySelectorAll<SVGElement>(".food-burger-layer"));
    const burgerTL=gsap.timeline({paused:true});
    layers.forEach((layer,i)=>burgerTL.fromTo(layer,{
      y:-280-i*34,autoAlpha:0,rotation:i%2===0?-4:4,
    },{
      y:0,autoAlpha:1,rotation:0,duration:.79,ease:"back.out(1.15)"
    },i*.36));
    burgerTL.fromTo(".food-burger-finish",{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.45},">-.1");
    burgerTL.fromTo(".food-burger-copy h2",{autoAlpha:.6,y:14},{autoAlpha:1,y:0,duration:.55},">-.15");
    ScrollTrigger.create({
      trigger:burgerStage,start:"top 87%",once:true,onEnter:()=>burgerTL.play()
    });
   }
   // The pasta scene has its OWN playhead, triggered on arrival, never scrubbed or pinned.
   const pasta=document.querySelector<HTMLElement>(".food-pasta-ritual");
   if(pasta){
    const timeline=gsap.timeline({paused:true});
    timeline.fromTo(".food-pasta-cloth",{scale:0,rotation:-26,autoAlpha:0,transformOrigin:"50% 50%"},{scale:1,rotation:0,autoAlpha:1,duration:.82,ease:"back.out(1.08)"},0);
    timeline.fromTo(".food-pasta-plate",{y:-195,scale:.9,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:.72,ease:"back.out(1.08)"},.62);
    timeline.fromTo(".food-pasta-fork",{x:-270,rotation:-14,autoAlpha:0},{x:0,rotation:0,autoAlpha:1,duration:.74,ease:"power3.out"},1.13);
    timeline.fromTo(".food-pasta-spoon",{x:270,rotation:14,autoAlpha:0},{x:0,rotation:0,autoAlpha:1,duration:.74,ease:"power3.out"},1.2);
    timeline.fromTo(".food-pasta-sauce",{scale:.65,autoAlpha:0,transformOrigin:"50% 50%"},{scale:1,autoAlpha:1,duration:.52,ease:"power2.out"},1.6);
    const noodles=gsap.utils.toArray<SVGGElement>(".food-pasta-noodle");
    timeline.fromTo(noodles,{y:-220,autoAlpha:0,rotation:-8},{y:0,autoAlpha:1,rotation:0,duration:.72,stagger:.105,ease:"back.out(1.03)"},1.77);
    timeline.fromTo(".food-pasta-garnish",{scale:.45,autoAlpha:0,transformOrigin:"50% 50%"},{scale:1,autoAlpha:1,duration:.48,ease:"back.out(1.4)"},3.44);
    timeline.call(()=>pasta.classList.add("is-steaming"),[],3.9);
    timeline.fromTo(".food-pasta-copy > *",{autoAlpha:0,y:26},{autoAlpha:1,y:0,stagger:.13,duration:.68,ease:"power3.out"},3.55);
    timeline.fromTo(".food-pasta-scene-label",{autoAlpha:0},{autoAlpha:1,duration:.4},3.75);
    ScrollTrigger.create({
      trigger:".food-pasta-scene",start:"top 85%",once:true,onEnter:()=>timeline.play()
    });
   }
   gsap.fromTo(".dish-card",{y:48,autoAlpha:0},{y:0,autoAlpha:1,stagger:.13,duration:.74,ease:"power3.out",
     scrollTrigger:{trigger:".dish-grid",start:"top 86%",once:true}});
   gsap.fromTo(".faq-item",{y:25,autoAlpha:0},{y:0,autoAlpha:1,stagger:.13,duration:.65,ease:"power2.out",
     scrollTrigger:{trigger:".faq-list",start:"top 85%",once:true}});
   gsap.fromTo(".final-cta > *",{y:30,autoAlpha:0},{y:0,autoAlpha:1,stagger:.17,duration:.78,ease:"power3.out",
     scrollTrigger:{trigger:".final-cta",start:"top 87%",once:true}});
   gsap.fromTo(".site-footer > *",{y:25,autoAlpha:0},{y:0,autoAlpha:1,stagger:.15,duration:.7,ease:"power2.out",
     scrollTrigger:{trigger:".site-footer",start:"top 93%",once:true}});
  });
  ScrollTrigger.refresh();
  return()=>{
    ctx.revert();
    document.querySelector(".food-pasta-ritual")?.classList.remove("is-steaming");
    if(tick)gsap.ticker.remove(tick);
    lenis?.destroy();
  };
 },[ready]);
}

export default function Page(){
 const [ready,setReady]=useState(false),[navOpen,setNavOpen]=useState(false),[category,setCategory]=useState<string>("همه"),[reserveOpen,setReserveOpen]=useState(false),[submitted,setSubmitted]=useState(false),[faq,setFaq]=useState(-1);
 const finishIntro=useCallback(()=>setReady(true),[]);const close=()=>setNavOpen(false);const list=useMemo(()=>category==="همه"?dishes:dishes.filter(d=>d.category===category),[category]);useAnimations(ready);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){close();setReserveOpen(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{document.body.style.overflow=navOpen||reserveOpen?"hidden":"";return()=>{document.body.style.overflow=""}},[navOpen,reserveOpen]);
 return <><PizzaIntro done={finishIntro}/><div className={`site-wrap ${ready?"site-ready":""}`} id="top">
 <header className="site-header"><Brand/><div className="header-links"><a href="#story">داستان ما</a><a href="#menu">منوی غذا</a><a href="#pasta-ritual">پاستا</a><a href="#experience">تجربه</a></div><div className="header-actions"><button className="book-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={17}/></button><button className={"menu-toggle"+(navOpen?" is-open":"")} aria-label={navOpen?"بستن منو":"باز کردن منوی پیتزایی"} aria-expanded={navOpen} aria-controls="taste-menu" onClick={()=>setNavOpen(v=>!v)}><FoodIcon kind="پیتزا" size={29}/><span>{navOpen?"بستن":"منو"}</span></button></div></header>
 <div className={`menu-overlay ${navOpen?"open":""}`} id="taste-menu" aria-hidden={!navOpen}>
   <div className="menu-overlay-top">
     <span dir="ltr">TASTE LAB / MENU</span>
     <button type="button" className="menu-cutlery-close" onClick={close} aria-label="بستن منو" tabIndex={navOpen?0:-1}>
       <CutleryCloseIcon size={38}/><span>بستن</span>
     </button>
   </div>
   <nav aria-label="ناوبری سایت">
     {[
       ["خانه","#top"],["داستان ما","#story"],["منوی غذا","#menu"],
       ["مراسم پاستا","#pasta-ritual"],["تجربه لب","#experience"],["رزرو میز","#booking"]
     ].map(([t,h],i)=><a key={h} tabIndex={navOpen?0:-1}
       style={{"--order":i} as React.CSSProperties} href={h}
       onClick={e=>{close();if(h==="#booking"){e.preventDefault();setSubmitted(false);setReserveOpen(true)}}}>
       <span>0{i+1}</span>{t}<Arrow size={36}/>
     </a>)}
   </nav>
   <div className="menu-burger-scene" aria-label="عکس واقعی همبرگر با بخار متحرک">
     <svg className="menu-burger-steam" viewBox="0 0 160 100" fill="none" aria-hidden="true">
       <path d="M32 95 C5 73 56 59 31 36 S49 12 39 1"/>
       <path d="M82 95 C60 73 110 55 83 36 S102 9 88 1"/>
       <path d="M130 95 C103 73 150 59 126 35 S143 11 133 1"/>
     </svg>
     <Image className="menu-burger-photo" src="/media/menu-burger.png"
       width={640} height={427} sizes="(max-width: 700px) 83vw, 370px" quality={82}
       alt="عکس واقعی چیزبرگر بدون پس‌زمینه" priority/>
   </div>
   <div className="overlay-bottom" dir="ltr">GOOD FOOD. NO RULES. <FoodIcon kind="برگر" size={22}/></div>
 </div>
 <main>
 <section className="hero" aria-labelledby="hero-title"><div className="hero-picture"><div className="hero-photo" style={{backgroundImage:`linear-gradient(90deg,rgba(15,15,13,.42),rgba(15,15,13,.04)),url('${photos.hero}')`}}/><div className="hero-overlay"/><div className="hero-index">TASTE LAB / FRESH & BOLD / 2026</div><div className="hero-center"><div className="hero-eyebrow" data-reveal>خوشمزه‌تر از چیزی که فکر می‌کنی <span><FoodIcon kind="پیتزا" size={23}/></span></div><h1 id="hero-title" className="hero-heading"><span>طعم رو</span><span className="hero-heading-outline">زندگی کن.</span></h1><p className="hero-lead">اینجا غذا یه قانون نداره؛ یه ماجراجوییه.</p><a href="#menu" className="hero-round-cta" aria-label="کشف منو"><Arrow size={34}/><span>کشف منو</span></a></div><div className="hero-footer"><span>۰۱ / ۰۷</span><span>برای کشف بیشتر اسکرول کن ↓</span><span>GOOD FOOD. NO RULES.</span></div></div></section>
 <div className="running-strip" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>JUST ONE MORE SLICE <b><FoodIcon kind="پیتزا" size={23}/></b> MADE WITH LOVE <b><FoodIcon kind="همه" size={23}/></b> NO BORING BITES <b><FoodIcon kind="برگر" size={23}/></b></span>)}</div></div>
 <section className="story content-grid" id="story"><div className="section-aside" data-reveal>01 — داستان آزمایشگاه</div><div className="story-content"><div className="tiny-label" data-reveal>WHAT WE BELIEVE <span><FoodIcon kind="همه" size={25}/></span></div><h2 data-reveal>ما غذا رو<br/><em>جدی نمی‌گیریم،</em><br/>طعمش رو چرا.</h2><p data-reveal>از اولین برش پیتزا تا آخرین جرعه نوشیدنی، هر جزئیات فرصتیه برای ساختن یک تجربه متفاوت. دستورهای تکراری رو کنار گذاشتیم تا هر بار چیز تازه‌ای کشف کنی.</p><a href="#experience" className="inline-link">درباره تجربه لب <Arrow size={24}/></a></div><div className="story-badge" aria-hidden="true"><FoodIcon kind="پیتزا" size={67}/><span>MADE FRESH</span></div></section>
 <section className="food-burger-builder" id="burger-build" aria-labelledby="burger-title">
  <div className="food-burger-copy"><span className="tiny-label">02 / BUILD THE BITE</span><h2 id="burger-title">هر لایه،<br/><em>یه دلیل برای<br/>عاشق‌شدن.</em></h2><p>از نان برشته تا گوشت آبدار، همه‌چی سر جای خودش می‌شینه. وقتی به این بخش می‌رسی، مواد برگر خودشون لایه‌به‌لایه کنار هم می‌شینن.</p><div className="food-burger-labels" aria-label="مواد برگر"><span>نان کنجدی</span><span>کاهوی تازه</span><span>گوجه</span><span>چدار</span><span>گوشت</span></div><span className="food-burger-finish">THE PERFECT STACK / 06 LAYERS</span></div>
  <div className="food-burger-stage"><BurgerIllustration/><span className="food-burger-stage-note" dir="ltr">ASSEMBLED WITH LOVE</span></div>
 </section><PastaRitual/><section className="menu-section" id="menu"><div className="menu-head"><div><span className="tiny-label" data-reveal>04 — THE EXPERIMENTS</span><h2 data-reveal>چی میل داری؟ <i><FoodIcon kind="پیتزا" size={37}/></i></h2></div><p data-reveal>از آشپزخونه ما تا میز تو. با دست درست‌شده، با عشق سرو‌شده.</p></div><div className="filter-row" role="group" aria-label="فیلتر دسته غذاها">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?"active":""}><FoodIcon kind={c as FoodKind} size={30}/><span>{c}</span></button>)}</div><div className="dish-grid">{list.map(d=><article className="dish-card" key={d.id}><div className="dish-photo" style={{backgroundImage:`url('${d.image}')`}}><span className="dish-badge">{d.tag}</span><div className="dish-photo-icon"><FoodIcon kind={d.category as FoodKind} size={27}/></div></div><div className="dish-meta" data-food-card-detail><span>{d.english}</span><span>{d.category}</span></div><div className="dish-name" data-food-card-detail><h3>{d.title}</h3><strong>{d.price} <small>هزار تومان</small></strong></div><p>{d.description}</p></article>)}</div><div className="menu-bottom"><span>مزه‌ها برای همه‌اند، قوانین نه.</span><button className="dark-pill" onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>یه میز رزرو کن <Arrow size={21}/></button></div></section>
 <section className="experience" id="experience"><div className="experience-image" style={{backgroundImage:`url('${photos.table}')`}}/><div className="experience-cover"/><div className="experience-content"><span className="tiny-label" data-reveal>05 — THE GOOD TIMES</span><h2 data-reveal>اینجا فقط<br/>غذا نمی‌خوریم؛<br/><em>خاطره می‌سازیم.</em></h2><p data-reveal>برای قرارهای بی‌برنامه، خنده‌های بلند و شب‌هایی که دلت نمی‌خواد تموم بشن.</p><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}} className="white-pill">یه جا برام نگه دار <Arrow size={20}/></button></div><span className="experience-side">FRESH STORIES EVERY DAY — TASTE LAB</span></section>
 <section className="manifesto"><div className="manifesto-number">06 / NOT AN ORDINARY KITCHEN</div><div className="manifesto-image" style={{backgroundImage:`url('${photos.chef}')`}}/><div className="manifesto-text"><span className="tiny-label" data-reveal>EVERYTHING FROM SCRATCH</span><h2 data-reveal>کمتر تکرار،<br/><span>بیشتر خلاقیت.</span></h2><p data-reveal>مواد اولیه تازه، ترکیب‌های غیرمنتظره و تیمی که عاشق امتحان‌کردن چیزهای جدیده. هر بشقاب، امضای خودشو داره.</p><div className="manifesto-stamp" data-reveal>MADE DIFFERENTLY <span><FoodIcon kind="پاستا" size={35}/></span></div></div></section>
 <section className="faq-section"><div className="faq-head"><span data-reveal>07 — قبل از اومدن</span><h2 data-reveal>چند سؤال خوشمزه</h2></div><div className="faq-list">{[["رزرو میز الزامیه؟","نه، بدون رزرو هم می‌تونی بیای؛ اما برای روزهای شلوغ بهتره از قبل هماهنگ کنی."],["غذای گیاهی هم دارید؟","بله. در بخش منو چند گزینه گیاهی داریم و ترکیب منو به‌صورت فصلی تغییر می‌کنه."],["این سایت امکان ثبت سفارش آنلاین داره؟","این نسخه یک دموی طراحی رستوران است؛ رزرو و پرداخت واقعی بعد از اتصال به سرویس مربوط فعال می‌شود."]].map(([q,a],i)=><div className={`faq-item ${faq===i?"expanded":""}`} key={i}><button aria-expanded={faq===i} aria-controls={"faq-answer-"+i} onClick={()=>setFaq(faq===i?-1:i)}><span>0{i+1}</span>{q}<b aria-hidden="true" className="faq-plus">+</b></button><div className="faq-answer" id={"faq-answer-"+i} aria-hidden={faq!==i}><p>{a}</p></div></div>)}</div></section>
 <section className="final-cta" id="booking"><div className="final-star"><FoodIcon kind="همه" size={80}/></div><p>فقط یه میز با یه تجربه تازه فاصله داری.</p><h2>بیا یه چیزی<br/>خوشمزه بسازیم.</h2><button onClick={()=>{setSubmitted(false);setReserveOpen(true)}}>رزرو میز <Arrow size={27}/></button></section>
 </main><footer className="site-footer"><Brand/><div><a href="#story">درباره ما</a><a href="#menu">منوی غذا</a><a href="#experience">تجربه</a></div><div className="footer-details"><span>تهران · ایران — مکان نمایشی</span><span>© TASTE LAB 2026 — DEMO EXPERIENCE</span></div></footer>
 </div>
 {reserveOpen&&<div className="reservation-modal" role="dialog" aria-modal="true" aria-label="رزرو میز نمایشی"><div className="modal-backdrop" onClick={()=>setReserveOpen(false)}/><section className="modal-panel"><div className="modal-top"><span>TASTE LAB / BOOKING</span><button onClick={()=>setReserveOpen(false)} aria-label="بستن">✕</button></div>{submitted?<div className="modal-done"><FoodIcon kind="پیتزا" size={72}/><h2>میزت توی تصورت رزرو شد!</h2><p>این سایت نسخه نمایشی است؛ درخواست ثبت واقعی یا پیامک ارسال نشده است.</p><button className="dark-pill" onClick={()=>setReserveOpen(false)}>بازگشت به سایت</button></div>:<><span className="tiny-label">A TABLE FOR GOOD TIMES</span><h2>یه میز برای<br/><em>خاطره‌های تازه.</em></h2><p>فرم زیر فقط برای نمایش تجربه رزرو طراحی شده است.</p><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>اسم شما<input required maxLength={70} placeholder="نام و نام خانوادگی"/></label><div className="form-two"><label>روز موردنظر<input type="date" min={new Date().toISOString().slice(0,10)} required/></label><label>تعداد نفرات<select defaultValue="2">{Array.from({length:10},(_,i)=><option key={i} value={i+1}>{i+1} نفر</option>)}</select></label></div><label>شماره تماس<input type="tel" placeholder="09xxxxxxxxx" pattern="09[0-9]{9}" required dir="ltr"/></label><button className="dark-pill" type="submit">ثبت رزرو نمایشی <Arrow size={20}/></button></form></>}</section></div>}
 </>
}
